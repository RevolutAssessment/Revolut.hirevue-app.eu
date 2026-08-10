import { useState, useEffect } from "react";
import { buildAssessmentSteps } from "../data/assessmentConfig.js";

const LINK_LIFETIME_MS = 72 * 60 * 60 * 1000; // 72 hours
const STORAGE_KEY_PREFIX = "situational_assessment_progress_";

function cleanupAllVideoBlobs(answersMap) {
  if (!answersMap) return;
  Object.keys(answersMap).forEach((key) => {
    const val = answersMap[key];
    if (val && typeof val === "object" && val.url && typeof val.url === "string" && val.url.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(val.url);
      } catch (err) {
        console.warn("Blob revoke warning:", err);
      }
    }
  });
}

function getInitialState(candidateToken, TOTAL, resetRequested) {
  if (resetRequested) {
    try {
      localStorage.removeItem(STORAGE_KEY_PREFIX + (candidateToken || "default"));
    } catch (err) {
      console.warn("Failed to clear state on reset:", err);
    }
    return { answers: {}, idx: 0, monitoringAgreed: false, aiConsent: null };
  }

  const storageKey = STORAGE_KEY_PREFIX + (candidateToken || "default");
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        answers: parsed.answers || {},
        idx: (typeof parsed.idx === "number" && parsed.idx >= 0 && parsed.idx < TOTAL) ? parsed.idx : 0,
        monitoringAgreed: Boolean(parsed.monitoringAgreed),
        aiConsent: typeof parsed.aiConsent === "boolean" ? parsed.aiConsent : null,
      };
    }
  } catch (err) {
    console.warn("Failed to load saved state:", err);
  }
  return { answers: {}, idx: 0, monitoringAgreed: false, aiConsent: null };
}

export function useAssessmentState() {
  const steps = buildAssessmentSteps();
  const TOTAL = steps.length;

  const candidateToken = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("token")
    : null;

  const issuedAt = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("t")
    : null;

  const resetRequested = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("reset") === "true"
    : false;

  const [isExpired, setIsExpired] = useState(() => Boolean(issuedAt && Date.now() - Number(issuedAt) > LINK_LIFETIME_MS));
  const [initial] = useState(() => getInitialState(candidateToken, TOTAL, resetRequested));

  const [idx, setIdx] = useState(initial.idx);
  const [answers, setAnswers] = useState(initial.answers);
  const [stream, setStream] = useState(null);
  const [streamStatus, setStreamStatus] = useState("idle"); // idle | requesting | granted | denied
  const [monitoringAgreed, setMonitoringAgreed] = useState(initial.monitoringAgreed);
  const [aiConsent, setAiConsent] = useState(initial.aiConsent);
  const [lockChecked, setLockChecked] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState(null);

  // Save progress locally on state changes
  useEffect(() => {
    if (idx >= TOTAL) return; // Don't persist temporary video blobs once completed
    const storageKey = STORAGE_KEY_PREFIX + (candidateToken || "default");
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ idx, answers, monitoringAgreed, aiConsent, updatedAt: new Date().toISOString() })
      );
    } catch (err) {
      console.warn("Failed to save progress to localStorage:", err);
    }
  }, [idx, answers, monitoringAgreed, aiConsent, candidateToken, TOTAL]);

  // Server Token Verification on load
  useEffect(() => {
    (async () => {
      try {
        const url = candidateToken
          ? `/api/verify-token?token=${encodeURIComponent(candidateToken)}`
          : "/api/verify-token";
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data.valid === false) {
            setIsExpired(true);
          } else if (data.status === "completed") {
            setAlreadyCompleted(true);
            setCandidateInfo(data.candidate);
          } else if (data.candidate) {
            setCandidateInfo(data.candidate);
          }
        }
      } catch (err) {
        console.warn("Token verification fallback to local state:", err);
      } finally {
        setLockChecked(true);
      }
    })();
  }, [candidateToken]);

  // Submit assessment and lock token permanently on server upon completion
  const submitted = idx >= TOTAL;
  useEffect(() => {
    if (submitted) {
      cleanupAllVideoBlobs(answers);
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      const storageKey = STORAGE_KEY_PREFIX + (candidateToken || "default");
      try {
        localStorage.removeItem(storageKey);
      } catch (err) {
        console.warn("Failed to remove progress key:", err);
      }

      // Permanent Lock API call to Express Server
      try {
        fetch("/api/submit-assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: candidateToken, answers }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Server submission lock response:", data);
            setAlreadyCompleted(true);
          })
          .catch((err) => {
            console.warn("Submission lock warning:", err);
          });
      } catch (err) {
        console.warn("Submission lock error:", err);
      }

      // Cleanup video files
      try {
        fetch("/api/cleanup-all-videos", { method: "POST" }).catch((err) => {
          console.warn("Cleanup videos warning:", err);
        });
      } catch (err) {
        console.warn("Cleanup videos error:", err);
      }
    }
  }, [submitted, candidateToken, answers, stream]);

  // Cleanup media tracks and video blobs on unmount
  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      cleanupAllVideoBlobs(answers);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestMedia() {
    setStreamStatus("requesting");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      setStreamStatus("granted");
    } catch (err) {
      console.warn("Media access denied:", err);
      setStreamStatus("denied");
    }
  }

  const currentStep = !submitted ? steps[idx] : null;

  function updateCurrentAnswer(val) {
    if (!currentStep) return;
    setAnswers((a) => ({ ...a, [currentStep.key]: val }));
  }

  function goNext() {
    setIdx((i) => Math.min(TOTAL, i + 1));
  }

  function goBack() {
    setIdx((i) => Math.max(0, i - 1));
  }

  return {
    steps,
    TOTAL,
    idx,
    setIdx,
    currentStep,
    submitted,
    answers,
    setAnswer: updateCurrentAnswer,
    stream,
    streamStatus,
    requestMedia,
    monitoringAgreed,
    setMonitoringAgreed,
    aiConsent,
    setAiConsent,
    lockChecked,
    alreadyCompleted,
    isExpired,
    candidateInfo,
    goNext,
    goBack,
  };
}
