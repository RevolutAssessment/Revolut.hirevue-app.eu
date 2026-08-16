
    import { useRef, useEffect, useState } from "react";
    import { Video, GripHorizontal } from "lucide-react";

    export function PipThumbnail({ stream }) {
      const videoRef = useRef(null);
      const containerRef = useRef(null);

      const [position, setPosition] = useState({ x: null, y: null });
      const [isDragging, setIsDragging] = useState(false);
      const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

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

      useEffect(() => {
        if (position.x === null && position.y === null) {
          const defaultX = window.innerWidth - 180;
          const defaultY = window.innerHeight - 135;
          setPosition({ x: Math.max(20, defaultX), y: Math.max(20, defaultY) });
        }
      }, [position.x, position.y]);

      const handlePointerDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        dragRef.current = {
          startX: clientX,
          startY: clientY,
          initialX: position.x || window.innerWidth - 180,
          initialY: position.y || window.innerHeight - 135,
        };
      };

      useEffect(() => {
        const handlePointerMove = (e) => {
          if (!isDragging) return;
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          const clientY = e.touches ? e.touches[0].clientY : e.clientY;

          const deltaX = clientX - dragRef.current.startX;
          const deltaY = clientY - dragRef.current.startY;

          const newX = Math.min(window.innerWidth - 160, Math.max(10, dragRef.current.initialX + deltaX));
          const newY = Math.min(window.innerHeight - 110, Math.max(10, dragRef.current.initialY + deltaY));

          setPosition({ x: newX, y: newY });
        };

        const handlePointerUp = () => {
          if (isDragging) setIsDragging(false);
        };

        if (isDragging) {
          window.addEventListener("mousemove", handlePointerMove);
          window.addEventListener("mouseup", handlePointerUp);
          window.addEventListener("touchmove", handlePointerMove);
          window.addEventListener("touchend", handlePointerUp);
        }

        return () => {
          window.removeEventListener("mousemove", handlePointerMove);
          window.removeEventListener("mouseup", handlePointerUp);
          window.removeEventListener("touchmove", handlePointerMove);
          window.removeEventListener("touchend", handlePointerUp);
        };
      }, [isDragging]);

      if (!stream) return null;

      return (
        <div
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          style={{
            position: "fixed",
            left: position.x !== null ? position.x : "auto",
            top: position.y !== null ? position.y : "auto",
            right: position.x === null ? 20 : "auto",
            bottom: position.y === null ? 20 : "auto",
            width: 155,
            height: 105,
            borderRadius: 14,
            background: "#0F172A",
            overflow: "hidden",
            boxShadow: isDragging ? "0 14px 35px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.25)",
            zIndex: 9999,
            border: isDragging ? "2px solid #2563EB" : "2px solid #ffffff",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            touchAction: "none",
            transition: isDragging ? "none" : "box-shadow 0.2s, border 0.2s",
          }}
          title="Drag camera preview anywhere on screen"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", pointerEvents: "none" }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 22,
              background: "linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              opacity: 0.8,
            }}
          >
            <GripHorizontal size={14} color="#CBD5E1" />
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 6,
              left: 6,
              background: "rgba(0,0,0,0.75)",
              padding: "2px 6px",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: "#ffffff",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.04em",
              backdropFilter: "blur(4px)",
            }}
          >
            <Video size={10} color="#22C55E" />
            REC
          </div>
        </div>
      );
    }
