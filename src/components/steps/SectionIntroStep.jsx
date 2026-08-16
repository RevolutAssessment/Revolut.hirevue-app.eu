  import { useState } from "react";
    import { IMAGE_MAP } from "../../assets/images.js";
    import { Video, CheckCircle2, RefreshCw, Maximize2, X } from "lucide-react";

    export function SectionIntroStep({ data, stream, onRequestMedia }) {
      const [showHdModal, setShowHdModal] = useState(false);

      if (!data) return null;

      const imageSrc = IMAGE_MAP[data.image] || IMAGE_MAP["IMG_TOPMEETING"];
      const isNotice = data.mainTitle === "Notice";

      return (
        <>
          <div
            className="animate-fade-in"
            style={{
              display: "flex",
              gap: 0,
              margin: "-24px -24px",
              borderRadius: 16,
              overflow: "hidden",
              flexWrap: "wrap",
              minHeight: 460,
              background: "#ffffff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div
              onClick={() => setShowHdModal(true)}
              style={{
                flex: "1 1 380px",
                minHeight: 400,
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",
                background: "#0F172A",
              }}
              title="Click to view image in Full Screen HD"
            >
              <img
                src={imageSrc}
                alt={data.mainTitle || data.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.3s ease",
                }}
                className="hd-cover-img"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  background: "rgba(15, 23, 42, 0.85)",
                  color: "#ffffff",
                  padding: "6px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Maximize2 size={13} /> Click for Full Screen HD Preview
              </div>
            </div>

            <div style={{ flex: "1 1 400px", padding: "36px 44px", display: "flex", flexDirection: "column", justifyContent: "center", background:
  "#ffffff" }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", marginBottom: isNotice ? 16 : 12, fontFamily: "var(--font-heading)" }}>
                {data.mainTitle || data.title}
              </h1>

              {data.subheading && (
                <p style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.5, marginBottom: 14 }}>
                  {data.subheading}
                </p>
              )}

              {data.instructionsHeading && !isNotice && (
                <div style={{ fontSize: 11.5, fontWeight: 800, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                  {data.instructionsHeading}
                </div>
              )}

              {data.instructions && data.instructions.length > 0 && (
                <ul style={{ listStyleType: "disc", paddingLeft: 20, marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  {data.instructions.map((item, idx) => (
                    <li key={idx} style={{ fontSize: 14, color: "#334155", lineHeight: 1.55 }}>
                      {item.includes("Next") ? (
                        <>
                          Once you select <strong>Next</strong>, you won't be able to go back
                        </>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {isNotice && (
                <div style={{ marginBottom: 18, marginTop: 4 }}>
                  {stream ? (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", color:
  "#166534", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
                      <CheckCircle2 size={18} color="#16A34A" /> Camera & Microphone Active & Ready
                    </div>
                  ) : (
                    <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#991B1B", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                        <Video size={18} /> Camera Access Required for Video Questions
                      </div>
                      <p style={{ fontSize: 12.5, color: "#7F1D1D", marginBottom: 10, lineHeight: 1.4 }}>
                        Camera access is currently not active. Please click below to grant camera and microphone permission.
                      </p>
                      {onRequestMedia && (
                        <button
                          type="button"
                          onClick={onRequestMedia}
                          className="btn-primary"
                          style={{ padding: "8px 16px", fontSize: 12.5, gap: 6 }}
                        >
                          <RefreshCw size={13} /> Allow Camera Permission Now
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {!isNotice && data.sectionTitle && (
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10, fontFamily: "var(--font-heading)" }}>
                  {data.sectionTitle}
                </h2>
              )}

              {data.body && data.body.map((p, idx) => (
                <p key={idx} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.6, marginBottom: 12 }}>
                  {p}
                </p>
              ))}

              {data.meta && (
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#64748B", marginTop: 12 }}>
                  {data.meta}
                </div>
              )}
            </div>
          </div>

          {showHdModal && (
            <div
              onClick={() => setShowHdModal(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                background: "rgba(15, 23, 42, 0.92)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                backdropFilter: "blur(8px)",
              }}
            >
              <button
                type="button"
                onClick={() => setShowHdModal(false)}
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  color: "#ffffff",
                  padding: 10,
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={24} />
              </button>

              <div style={{ maxWidth: "90vw", maxHeight: "85vh", position: "relative" }} onClick={(e) => e.stopPropagation()}>
                <img
                  src={imageSrc}
                  alt="HD Full Screen Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "85vh",
                    borderRadius: 12,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                    display: "block",
                    objectFit: "contain",
                  }}
                />
                <div style={{ color: "#ffffff", textAlign: "center", marginTop: 14, fontSize: 14, fontWeight: 700 }}>
                  {data.mainTitle || data.title} — Full Screen HD Image
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
