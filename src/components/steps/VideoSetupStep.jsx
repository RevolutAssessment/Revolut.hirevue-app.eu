import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Camera, Mic } from "lucide-react";

export function VideoSetupStep({ stream }) {
  const videoRef = useRef(null);
  const [hideSelf, setHideSelf] = useState(false);
  const [devices, setDevices] = useState({ cams: [], mics: [] });
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedMic, setSelectedMic] = useState("");

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.play().catch((err) => {
        console.warn("Video playback error in VideoSetupStep:", err);
      });
    }
  }, [stream]);

  useEffect(() => {
    async function getDevices() {
      try {
        if (navigator.mediaDevices?.enumerateDevices) {
          const list = await navigator.mediaDevices.enumerateDevices();
          const cams = list.filter((d) => d.kind === "videoinput");
          const mics = list.filter((d) => d.kind === "audioinput");
          setDevices({ cams, mics });

          if (cams.length > 0) setSelectedCamera(cams[0].label || "HP TrueVision HD Camera (04f2:b6f1)");
          if (mics.length > 0) setSelectedMic(mics[0].label || "Microphone Array (Intel® Smart Sound Technology for Digital Microphones)");
        }
      } catch (err) {
        console.warn("Failed to enumerate media devices:", err);
      }
    }
    getDevices();
  }, []);

  return (
    <div className="animate-fade-in" style={{ width: "100%", maxWidth: 840, margin: "0 auto", position: "relative" }}>
      {/* Top Not Recording Badge */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
        <span
          style={{
            background: "#1E293B",
            color: "#94A3B8",
            fontSize: 11.5,
            fontWeight: 800,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "4px 14px",
            borderRadius: 999,
          }}
        >
          Not Recording
        </span>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-brand-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
        Video set up
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text-main)", marginBottom: 24, fontFamily: "var(--font-heading)" }}>
        Set up your video before continuing.
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32, alignItems: "start" }}>
        {/* Device Configuration Dropdowns */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: "var(--color-text-main)", marginBottom: 8 }}>
              <Camera size={16} /> Camera
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #CBD5E1",
                borderRadius: 8,
                padding: "11px 14px",
                fontSize: 14,
                color: "#1E293B",
                background: "#ffffff",
                cursor: "pointer",
              }}
            >
              {devices.cams.length > 0 ? (
                devices.cams.map((c, i) => (
                  <option key={i} value={c.label || `Camera ${i + 1}`}>
                    {c.label || `HP TrueVision HD Camera (${i + 1})`}
                  </option>
                ))
              ) : (
                <option value="default">HP TrueVision HD Camera (04f2:b6f1)</option>
              )}
            </select>
          </div>

          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: "var(--color-text-main)", marginBottom: 8 }}>
              <Mic size={16} /> Microphone
            </label>
            <select
              value={selectedMic}
              onChange={(e) => setSelectedMic(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #CBD5E1",
                borderRadius: 8,
                padding: "11px 14px",
                fontSize: 14,
                color: "#1E293B",
                background: "#ffffff",
                cursor: "pointer",
              }}
            >
              {devices.mics.length > 0 ? (
                devices.mics.map((m, i) => (
                  <option key={i} value={m.label || `Microphone ${i + 1}`}>
                    {m.label || `Microphone Array (Intel® Smart Sound Technology for Digital Microphones)`}
                  </option>
                ))
              ) : (
                <option value="default">Microphone Array (Intel® Smart Sound Technology for Digital Microphones)</option>
              )}
            </select>
          </div>

          <div style={{ marginTop: 6 }}>
            <button
              onClick={() => alert("Practice recording mode: speak for 5 seconds to test your mic and camera.")}
              className="btn-text-link"
              style={{ fontSize: 14, fontWeight: 700 }}
            >
              Practice Recording
            </button>
          </div>
        </div>

        {/* Camera Preview Thumbnail with Hide toggle */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "4/3",
              background: "#0F172A",
              borderRadius: 14,
              overflow: "hidden",
              position: "relative",
              border: "1px solid #334155",
              boxShadow: "0 10px 25px rgba(15,23,42,0.2)",
            }}
          >
            {stream && !hideSelf ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", fontSize: 13 }}>
                {hideSelf ? "Preview Hidden" : "Camera Initializing…"}
              </div>
            )}

            <button
              onClick={() => setHideSelf((h) => !h)}
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                background: "rgba(15, 23, 42, 0.8)",
                color: "#ffffff",
                border: "none",
                borderRadius: 6,
                padding: "5px 10px",
                fontSize: 11.5,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
                backdropFilter: "blur(4px)",
              }}
            >
              {hideSelf ? <Eye size={13} /> : <EyeOff size={13} />}
              {hideSelf ? "Show for me" : "Hide for me"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
