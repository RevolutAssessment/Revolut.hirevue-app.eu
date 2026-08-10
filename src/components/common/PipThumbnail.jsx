import { useRef, useEffect } from "react";
import { Video } from "lucide-react";

export function PipThumbnail({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.play().catch((err) => {
        console.warn("Pip video play warning:", err);
      });
    }
  }, [stream]);

  if (!stream) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 140,
        height: 95,
        borderRadius: 12,
        background: "#0F172A",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        zIndex: 900,
        border: "2px solid #ffffff",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }}
      />
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          background: "rgba(0,0,0,0.6)",
          padding: "2px 6px",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: "#ffffff",
          fontSize: 10,
          fontWeight: 600,
        }}
      >
        <Video size={10} color="#22C55E" />
        REC
      </div>
    </div>
  );
}
