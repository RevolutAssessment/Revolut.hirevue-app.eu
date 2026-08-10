import { IMAGE_MAP } from "../../assets/images.js";

export function SectionIntroStep({ data }) {
  if (!data) return null;

  const imageSrc = IMAGE_MAP[data.image] || IMAGE_MAP["IMG_TOPMEETING"];
  const isNotice = data.mainTitle === "Notice";

  return (
    <div
      className="animate-fade-in"
      style={{
        display: "flex",
        gap: 0,
        margin: "-24px -24px",
        borderRadius: 16,
        overflow: "hidden",
        flexWrap: "wrap",
        minHeight: 400,
      }}
    >
      {/* Left Side: Full Cover Image */}
      <div style={{ flex: "1 1 340px", minHeight: 360, position: "relative" }}>
        <img
          src={imageSrc}
          alt={data.mainTitle || data.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.0))",
          }}
        />
      </div>

      {/* Right Side: Text Slide */}
      <div style={{ flex: "1 1 380px", padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#ffffff" }}>
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

        {data.practiceLink && (
          <div style={{ marginTop: 4, marginBottom: 16 }}>
            <a
              href="#practice"
              onClick={(e) => {
                e.preventDefault();
                alert("Practice Mode: You can practice recording your camera before proceeding.");
              }}
              style={{
                color: "var(--color-brand-primary)",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {data.practiceLink}
            </a>
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
  );
}
