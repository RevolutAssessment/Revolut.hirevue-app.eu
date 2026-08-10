import { sjtItems } from "./sjtData.js";
import { listeningItems } from "./listeningData.js";
import { scaleItems, employmentItems } from "./scaleData.js";
import { pairedItems } from "./pairedData.js";
import { videoItems } from "./videoData.js";
import { sectionIntros } from "./introData.js";

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function buildAssessmentSteps() {
  const sjtGroup = sjtItems.map((q) => ({ type: "sjt", data: q, key: "sjt-" + q.id, section: "Situational Judgment" }));
  const listeningGroup = listeningItems.map((l) => ({ type: "listening", data: l, key: l.id, section: "Listening Test" }));
  const scaleGroup = [...employmentItems, ...scaleItems].map((s) => ({ type: "scale", data: s, key: s.id, section: "Self-Attitude & Awareness" }));
  const pairedGroup = chunk(pairedItems, 6).map((c, i) => ({ type: "pairedPage", data: c, key: "pairedpage-" + i, section: "Self-Attitude & Awareness" }));

  const sectionIntroStep = (key, kind, count) => ({
    type: "sectionIntro",
    data: sectionIntros[kind],
    count,
    key: "intro-" + key,
    section: kind === "video" ? "Video Assessment" : "Introduction",
  });

  const videoGroup = videoItems.map((v, idx) => ({
    type: "video",
    data: { ...v, videoNumber: idx + 1, totalVideos: videoItems.length },
    key: v.id,
    section: "Video Assessment",
  }));

  const onboardingSteps = [
    { type: "dataProcessing", key: "dataProcessing", section: "Introduction" },
    { type: "disclaimer", key: "disclaimer", section: "Introduction" },
    { type: "aiConsent", key: "aiConsent", section: "Introduction" },
    { type: "permission", key: "permission", section: "Introduction" },
    { type: "videoSetup", key: "videoSetup", section: "Introduction" },
    { type: "monitoring", key: "monitoring", section: "Introduction" },
  ];

  const assessmentSteps = [
    sectionIntroStep("sjt", "sjt", sjtGroup.length),
    ...sjtGroup,
    sectionIntroStep("listening", "listening", listeningGroup.length),
    ...listeningGroup,
    sectionIntroStep("scale", "scale", scaleGroup.length),
    ...scaleGroup,
    sectionIntroStep("paired", "paired", pairedItems.length),
    ...pairedGroup,
    sectionIntroStep("video", "video", videoGroup.length),
    ...videoGroup,
    { type: "feedback", key: "feedback", section: "Feedback" },
  ];

  return [...onboardingSteps, ...assessmentSteps];
}
