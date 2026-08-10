import { useState, useRef } from "react";
import { AUDIO_MAP } from "../../assets/audio.js";
import { Play, Pause, RotateCcw, Check, X } from "lucide-react";

export function ListeningStep({ item, answer, setAnswer }) {
  const audioRef = useRef(null);
  const audioSrc = item.audioUrl || AUDIO_MAP[item.audioKey] || AUDIO_MAP["audio_call"];

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  const currentMatch = answer?.match || {};

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch((err) => {
        console.warn("Audio play failed:", err);
        setAudioError(true);
      });
    }
  }

  function handleRestart() {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().then(() => setPlaying(true)).catch((err) => {
      console.warn("Audio restart failed:", err);
    });
  }

  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  function handleLoadedMetadata() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }

  function handleAudioEnded() {
    setPlaying(false);
  }

  function handleSeek(e) {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  }

  function setFieldMatch(fieldKey, isMatch) {
    // Isolated update for only the clicked field key
    const updated = { ...currentMatch, [fieldKey]: isMatch };
    setAnswer({ ...answer, match: updated });
  }

  function formatTime(secs) {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  const remaining = Math.max(0, duration - currentTime);

  return (
    <div className="animate-fade-in" style={{ maxWidth: 780, margin: "0 auto" }}>
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        onError={() => setAudioError(true)}
      />

      {/* Top Scrubber Player Bar */}
      <div
        style={{
          background: "#F1F5F9",
          borderRadius: 14,
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 20,
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <button
          type="button"
          onClick={togglePlay}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "var(--color-brand-primary)",
            color: "#ffffff",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "transform 0.15s ease",
          }}
          title={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={18} fill="#ffffff" /> : <Play size={18} fill="#ffffff" style={{ marginLeft: 2 }} />}
        </button>

        <button
          type="button"
          onClick={handleRestart}
          style={{
            background: "transparent",
            border: "none",
            color: "#64748B",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 6,
            borderRadius: 6,
            flexShrink: 0,
          }}
          title="Restart audio"
        >
          <RotateCcw size={18} />
        </button>

        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          style={{
            flex: 1,
            accentColor: "var(--color-brand-primary)",
            cursor: "pointer",
            height: 6,
            borderRadius: 3,
          }}
        />

        <span style={{ fontSize: 13, fontWeight: 700, color: "#475467", fontFamily: "monospace", minWidth: 46, textAlign: "right" }}>
          -{formatTime(remaining)}
        </span>
      </div>

      {audioError && (
        <div style={{ marginBottom: 16, color: "var(--color-danger)", background: "var(--color-danger-bg)", border: "1px solid #F5C2C0", borderRadius: 8, padding: "8px 12px", fontSize: 13, textAlign: "center" }}>
          Audio file could not be loaded. Please ensure sound is enabled on your device.
        </div>
      )}

      {/* Main Reference Card: VERIFY INFORMATION */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #E2E8F0",
          borderRadius: 14,
          padding: "20px 24px",
          boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
        }}
      >
        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
          VERIFY INFORMATION
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {item.fields.map((field) => {
            const fieldKey = field.id || field.label;
            const status = currentMatch[fieldKey]; // true (match), false (error), undefined
            return (
              <div
                key={fieldKey}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 14,
                  borderBottom: "1px solid #F1F5F9",
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>
                    {field.label}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1E293B", overflowWrap: "anywhere" }}>
                    {field.value}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, marginLeft: "auto", flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => setFieldMatch(fieldKey, true)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      border: "none",
                      background: status === true ? "#1B4FD6" : "#E2E8F0",
                      color: status === true ? "#ffffff" : "#64748B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    title="Match (Correct)"
                  >
                    <Check size={18} strokeWidth={3} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setFieldMatch(fieldKey, false)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      border: "none",
                      background: status === false ? "#1B4FD6" : "#E2E8F0",
                      color: status === false ? "#ffffff" : "#64748B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    title="Error (Incorrect)"
                  >
                    <X size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
