  import { IMAGE_MAP } from "../../assets/images.js";
    import { Video, CheckCircle2, RefreshCw } from "lucide-react";

    export function SectionIntroStep({ data, stream, onRequestMedia }) {
      if (!data) return null;

      const imageSrc = IMAGE_MAP[data.image] || IMAGE_MAP["IMG_TOPMEETING"];
      const isNotice = data.mainTitle === "Notice";

      return (
        <div
          className="animate-fade-in"
          style={{
            display: "flex",
            margin: "-32px -32px",
            borderRadius: 16,
            overflow: "hidden",
            minHeight: 520,
            background: "#ffffff",
            flexWrap: "wrap",
          }}
        >
          {/* Left 60% Width: Full HD Large Cover Image (1:1 Match to Target Screenshots) */}
          <div
            style={{
              flex: "1 1 58%",
              minWidth: 340,
              minHeight: 480,
              position: "relative",
              background: "#0F172A",
            }}
          >
            <img
              src={imageSrc}
              alt={data.mainTitle || data.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Right 42% Width: Section Title, Instructions & Body */}
          <div
            style={{
              flex: "1 1 38%",
              minWidth: 300,
              padding: "48px 44px 36px 44px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "#ffffff",
            }}
          >
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: isNotice ? 16 : 14,
                fontFamily: "var(--font-heading)",
                lineHeight: 1.2,
              }}
            >
              {data.mainTitle || data.title}
            </h1>

            {data.subheading && (
              <p style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.55, marginBottom: 16 }}>
                {data.subheading}
              </p>
            )}

            {data.instructionsHeading && !isNotice && (
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                {data.instructionsHeading}
              </div>
            )}

            {data.instructions && data.instructions.length > 0 && (
              <ul style={{ listStyleType: "disc", paddingLeft: 20, marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
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
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534", padding:
  "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
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
              <p key={idx} style={{ fontSize: 14, color: "#334155", lineHeight: 1.65, marginBottom: 14 }}>
                {p}
              </p>
            ))}

            {data.meta && (
              <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", marginTop: 14 }}>
                {data.meta}
              </div>
            )}
          </div>
        </div>
      );
    }
