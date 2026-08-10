import { useState, useRef, useEffect } from "react";
    import { ScenarioCard } from "../common/ScenarioCard.jsx";
    import { Video, Circle, Square, RotateCcw, Check, Film, ArrowRight, RefreshCw } from "lucide-react";

    function getRecorderMimeType() {
      if (typeof MediaRecorder === "undefined") return "";
      const types = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"];
      return types.find((type) => MediaRecorder.isTypeSupported?.(type)) || "";
    }

    function blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    export function VideoStep({ item, answer, setAnswer, stream, onRequestMedia, onAutoNext }) {
      const videoRef = useRef(null);
      const mediaRecorderRef = useRef(null);
      const chunksRef = useRef([]);

      const [recStatus, setRecStatus] = useState(() => (answer?.submitted ? "submitted" : (answer?.previewUrl || answer?.url) ? "done" : "idle"));
      const [previewUrl, setPreviewUrl] = useState(() => answer?.previewUrl || answer?.url || null);
      const [tempFilename, setTempFilename] = useState(() => answer?.filename || null);
      const [seconds, setSeconds] = useState(0);
      const [recordError, setRecordError] = useState("");
      const [savingFile, setSavingFile] = useState(false);

      const timerRef = useRef(null);
      const MAX_SECONDS = 180;

      useEffect(() => {
        if (stream && videoRef.current && !previewUrl) {
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true;
          videoRef.current.playsInline = true;
          videoRef.current.play().catch((err) => {
            console.warn("Video playback error in VideoStep:", err);
          });
        }
      }, [stream, previewUrl]);

      useEffect(() => {
        return () => clearInterval(timerRef.current);
      }, []);

      function startRecording() {
        if (!stream) {
          if (onRequestMedia) onRequestMedia();
          setRecordError("Camera access is required. Click Re-connect Camera below.");
          return;
        }
        if (typeof MediaRecorder === "undefined") {
          setRecordError("This browser does not support video recording. Please use Chrome or Edge.");
          return;
        }
        try {
          setRecordError("");
          chunksRef.current = [];
          const mimeType = getRecorderMimeType();
          const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

          mr.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
          };

          mr.onerror = () => setRecordError("Recording failed. Please retake your video.");

          mr.onstop = async () => {
            const blob = new Blob(chunksRef.current, { type: mimeType || "video/webm" });
            if (!blob.size) {
              setRecordError("No video data was captured. Please try recording again.");
              setRecStatus("idle");
              return;
            }

            const objUrl = URL.createObjectURL(blob);
            setPreviewUrl(objUrl);
            setRecStatus("done");
            clearInterval(timerRef.current);

            try {
              setSavingFile(true);
              const base64Data = await blobToBase64(blob);
              const res = await fetch("/api/upload-video", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questionId: item.id, base64Data, mimeType }),
              });

              if (res.ok) {
                const data = await res.json();
                if (data.url) {
                  setTempFilename(data.filename);
                  setAnswer({
                    previewUrl: objUrl,
                    url: data.url,
                    filename: data.filename,
                    submitted: false,
                    videoNumber: item.videoNumber,
                  });
                }
              } else {
                setAnswer({ previewUrl: objUrl, url: objUrl, submitted: false, videoNumber: item.videoNumber });
              }
            } catch (err) {
              console.warn("Server upload failed, falling back to local Blob URL:", err);
              setAnswer({ previewUrl: objUrl, url: objUrl, submitted: false, videoNumber: item.videoNumber });
            } finally {
              setSavingFile(false);
            }
          };

          mediaRecorderRef.current = mr;
          mr.start(250);
          setRecStatus("recording");
          setSeconds(0);

          timerRef.current = setInterval(() => {
            setSeconds((s) => {
              if (s + 1 >= MAX_SECONDS) {
                if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
                return MAX_SECONDS;
              }
              return s + 1;
            });
          }, 1000);
        } catch (err) {
          console.error("Could not start MediaRecorder:", err);
          setRecordError("Could not start recorder. Click Re-connect Camera to allow access.");
        }
      }

      function stopRecording() {
        if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
        clearInterval(timerRef.current);
      }

      async function handleReRecord() {
        if (tempFilename) {
          try {
            fetch("/api/delete-video", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ filename: tempFilename }),
            }).catch((err) => {
              console.warn("Delete video fetch warning:", err);
            });
          } catch (err) {
            console.warn("Failed to delete temp video:", err);
          }
        }

        if (previewUrl && previewUrl.startsWith("blob:")) {
          try {
            URL.revokeObjectURL(previewUrl);
          } catch (err) {
            console.warn("Revoke Blob URL warning:", err);
          }
        }

        setPreviewUrl(null);
        setTempFilename(null);
        setAnswer(null);
        setRecordError("");
        setSeconds(0);
        setRecStatus("idle");
      }

      function handleSubmit() {
        const finalAnswer = {
          previewUrl,
          url: answer?.url || previewUrl,
          filename: tempFilename,
          submitted: true,
          videoNumber: item.videoNumber,
        };
        setAnswer(finalAnswer);
        setRecStatus("submitted");

        if (onAutoNext) {
          onAutoNext();
        }
      }

      return (
        <div className="animate-fade-in" style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Video Question Indicator */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11.5,
                fontWeight: 800,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: "var(--color-brand-light)",
                color: "var(--color-brand-primary)",
                padding: "4px 12px",
                borderRadius: 999,
              }}
            >
              <Film size={13} /> Video Question {item.videoNumber || 1} of {item.totalVideos || 5}
            </span>
          </div>

          <ScenarioCard text={item.prompt} />

          {/* Video Viewport */}
          <div
            style={{
              width: "100%",
              maxWidth: 480,
              aspectRatio: "16/9",
              maxHeight: 270,
              margin: "12px auto 0 auto",
              background: "#0B1220",
              borderRadius: 14,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 25px rgba(15,23,42,0.16)",
            }}
          >
            {previewUrl ? (
              <video
                key={previewUrl}
                src={previewUrl}
                controls
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: stream ? "block" : "none" }}
              />
            )}

            {!stream && !previewUrl && (
              <div style={{ color: "#B8C1D1", textAlign: "center", fontSize: 13, padding: 16 }}>
                <Video size={28} style={{ marginBottom: 8 }} />
                <div style={{ marginBottom: 10 }}>Camera stream disconnected or not active.</div>
                {onRequestMedia && (
                  <button
                    type="button"
                    onClick={onRequestMedia}
                    className="btn-primary"
                    style={{ padding: "8px 16px", fontSize: 12.5, gap: 6 }}
                  >
                    <RefreshCw size={13} /> Re-connect Camera & Microphone
                  </button>
                )}
              </div>
            )}

            {recStatus === "recording" && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(0,0,0,0.75)",
                  padding: "5px 12px",
                  borderRadius: 999,
                  backdropFilter: "blur(4px)",
                }}
              >
                <Circle size={9} fill="#FF4D5A" color="#FF4D5A" className="animate-pulse-slow" />
                <span style={{ color: "#ffffff", fontSize: 12, fontFamily: "monospace", fontWeight: 700 }}>
                  {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")} / 03:00
                </span>
              </div>
            )}

            {savingFile && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "rgba(0,0,0,0.75)",
                  color: "#ffffff",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  backdropFilter: "blur(4px)",
                }}
              >
                Saving file…
              </div>
            )}
          </div>

          {/* Recording Controls: Start / Stop / Re-record / Submit */}
          <div style={{ display: "flex", gap: 12, marginTop: 14, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            {recStatus === "idle" && stream && (
              <button onClick={startRecording} className="btn-primary" style={{ padding: "10px 20px", fontSize: 13.5 }}>
                <Circle size={14} fill="#ffffff" /> Start Recording ({item.videoNumber} of {item.totalVideos})
              </button>
            )}

            {!stream && !previewUrl && (
              <button onClick={onRequestMedia} className="btn-primary" style={{ padding: "10px 20px", fontSize: 13.5, gap: 6 }}>
                <RefreshCw size={15} /> Re-connect Camera & Microphone
              </button>
            )}

            {recStatus === "recording" && (
              <button onClick={stopRecording} className="btn-danger" style={{ padding: "10px 20px", fontSize: 13.5 }}>
                <Square size={14} fill="#ffffff" /> Stop Recording
              </button>
            )}

            {recStatus === "done" && (
              <div style={{ display: "flex", gap: 12, width: "100%", justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={handleReRecord} className="btn-secondary" style={{ padding: "10px 18px", fontSize: 13.5 }}>
                  <RotateCcw size={15} /> Re-record
                </button>
                <button onClick={handleSubmit} className="btn-primary" style={{ padding: "10px 22px", fontSize: 13.5 }}>
                  <Check size={15} /> Submit Video {item.videoNumber} <ArrowRight size={15} />
                </button>
              </div>
            )}

            {recStatus === "submitted" && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-success)", fontSize: 13.5, fontWeight: 700, background:
  "var(--color-success-bg)", padding: "8px 14px", borderRadius: 8 }}>
                  <Check size={16} /> Video response {item.videoNumber} of {item.totalVideos} submitted
                </span>
                <button onClick={handleReRecord} className="btn-secondary" style={{ padding: "7px 12px", fontSize: 12.5 }}>
                  <RotateCcw size={13} /> Re-record
                </button>
              </div>
            )}
          </div>

          {recordError && (
            <div style={{ marginTop: 10, color: "var(--color-danger)", background: "var(--color-danger-bg)", border: "1px solid #F5C2C0", borderRadius: 8,
  padding: "8px 12px", fontSize: 12.5, textAlign: "center" }}>
              {recordError}
            </div>
          )}
        </div>
      );
    }
