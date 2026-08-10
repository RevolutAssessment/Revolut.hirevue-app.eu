import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useAssessmentState } from "./hooks/useAssessmentState.js";

import { Header } from "./components/common/Header.jsx";
import { ProgressBar } from "./components/common/ProgressBar.jsx";
import { PipThumbnail } from "./components/common/PipThumbnail.jsx";

import { DataProcessingStep } from "./components/steps/DataProcessingStep.jsx";
import { DisclaimerStep } from "./components/steps/DisclaimerStep.jsx";
import { AIConsentStep } from "./components/steps/AIConsentStep.jsx";
import { PermissionStep } from "./components/steps/PermissionStep.jsx";
import { VideoSetupStep } from "./components/steps/VideoSetupStep.jsx";
import { MonitoringConsentStep } from "./components/steps/MonitoringConsentStep.jsx";

import { SectionIntroStep } from "./components/steps/SectionIntroStep.jsx";
import { SJTStep } from "./components/steps/SJTStep.jsx";
import { PairedPageStep } from "./components/steps/PairedPageStep.jsx";
import { ScaleListStep } from "./components/steps/ScaleListStep.jsx";
import { ListeningStep } from "./components/steps/ListeningStep.jsx";
import { VideoStep } from "./components/steps/VideoStep.jsx";
import { FeedbackStep } from "./components/steps/FeedbackStep.jsx";
import { DashboardStep } from "./components/steps/DashboardStep.jsx";
import { LogoutStep } from "./components/steps/LogoutStep.jsx";
import { CompleteStep } from "./components/steps/CompleteStep.jsx";

import { FinishLaterModal } from "./components/modals/FinishLaterModal.jsx";

export default function SituationalAssessment() {
  const {
    steps,
    TOTAL,
    idx,
    currentStep: step,
    submitted,
    answers,
    setAnswer,
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
    goNext,
    goBack,
  } = useAssessmentState();

  const [showFinishLaterModal, setShowFinishLaterModal] = useState(false);
  const [viewOverride, setViewOverride] = useState(null); // null | "dashboard" | "logout"

  // Section progress calculations
  const sectionSteps = step ? steps.filter((s) => s.section === step.section) : [];
  const sectionIndex = step ? sectionSteps.findIndex((s) => s.key === step.key) + 1 : 0;
  const showSectionProgress = !submitted && step && !viewOverride && !["dataProcessing", "disclaimer", "aiConsent", "permission", "videoSetup", "monitoring", "sectionIntro", "intro"].includes(step.type);
  const showThumbnail = stream && step && !viewOverride && !["dataProcessing", "disclaimer", "aiConsent", "permission", "videoSetup", "monitoring", "video", "sectionIntro", "intro"].includes(step.type);

  const isFirstStep = idx === 0;

  if (!lockChecked) {
    return (
      <div className="main-wrapper" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--color-text-muted)", fontSize: 15, fontWeight: 500 }}>
          Initializing assessment environment…
        </p>
      </div>
    );
  }

  if (alreadyCompleted) {
    return (
      <div style={{ padding: "28px 16px" }}>
        <div className="main-wrapper">
          <Header onOpenDashboard={() => setViewOverride("dashboard")} onLogout={() => setViewOverride("logout")} />
          <div className="assessment-card">
            <DashboardStep submitted={true} onContinue={() => setViewOverride(null)} />
          </div>
        </div>
      </div>
    );
  }

  if (isExpired && !alreadyCompleted) {
    return (
      <div style={{ padding: "28px 16px" }}>
        <div className="main-wrapper">
          <div className="assessment-card" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: 22, color: "var(--color-danger)", marginBottom: 12, fontWeight: 800, fontFamily: "var(--font-heading)" }}>
              This Assessment Link Has Expired
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--color-text-body)", lineHeight: 1.6, maxWidth: 460, margin: "0 auto" }}>
              This invitation link was valid for 72 hours and is no longer active. Please contact your recruiting representative to request a new assessment link.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "28px clamp(16px, 4vw, 56px)", minHeight: "100vh" }}>
      <div className="main-wrapper">
        <Header
          currentSection={step?.section}
          sectionIndex={sectionIndex}
          sectionTotal={sectionSteps.length}
          showProgress={showSectionProgress}
          onOpenDashboard={() => setViewOverride("dashboard")}
          onLogout={() => setViewOverride("logout")}
        />

        {showSectionProgress && (
          <ProgressBar current={idx + 1} total={TOTAL} />
        )}

        {showThumbnail && <PipThumbnail stream={stream} />}

        <div className="assessment-card">
          {viewOverride === "logout" ? (
            <LogoutStep />
          ) : viewOverride === "dashboard" ? (
            <DashboardStep submitted={submitted} onContinue={() => setViewOverride(null)} />
          ) : (
            <>
              {submitted && <CompleteStep />}
              {!submitted && (!step || step.type === "dataProcessing" || step.type === "intro") && <DataProcessingStep key={step?.key || "dp"} />}
              {!submitted && step?.type === "disclaimer" && <DisclaimerStep key={step.key} />}
              {!submitted && step?.type === "aiConsent" && <AIConsentStep key={step.key} consent={aiConsent} setConsent={setAiConsent} onNext={goNext} />}
              {!submitted && step?.type === "permission" && <PermissionStep key={step.key} stream={stream} streamStatus={streamStatus} onRequest={requestMedia} onNext={goNext} />}
              {!submitted && step?.type === "videoSetup" && <VideoSetupStep key={step.key} stream={stream} />}
              {!submitted && step?.type === "monitoring" && <MonitoringConsentStep key={step.key} agreed={monitoringAgreed} setAgreed={setMonitoringAgreed} stream={stream} />}

              {!submitted && step?.type === "sectionIntro" && <SectionIntroStep key={step.key} data={step.data} count={step.count} />}
              {!submitted && step?.type === "sjt" && <SJTStep key={step.key} item={step.data} answer={answers[step.key]} setAnswer={setAnswer} />}
              {!submitted && step?.type === "pairedPage" && <PairedPageStep key={step.key} items={step.data} answer={answers[step.key]} setAnswer={setAnswer} />}
              {!submitted && step?.type === "scale" && <ScaleListStep key={step.key} item={step.data} answer={answers[step.key]} setAnswer={setAnswer} />}
              {!submitted && step?.type === "listening" && <ListeningStep key={step.key} item={step.data} answer={answers[step.key]} setAnswer={setAnswer} />}
              {!submitted && step?.type === "video" && (
                <VideoStep
                  key={step.key}
                  item={step.data}
                  answer={answers[step.key]}
                  setAnswer={setAnswer}
                  stream={stream}
                  streamStatus={streamStatus}
                  onAutoNext={goNext}
                />
              )}
              {!submitted && step?.type === "feedback" && <FeedbackStep key={step.key} answer={answers[step.key]} setAnswer={setAnswer} onSkip={goNext} onSubmit={goNext} />}

              {/* Navigation Controls matching reference video */}
              {!submitted && step?.type !== "feedback" && (
                <div
                  className="nav-controls"
                  style={{
                    display: "flex",
                    justify: "space-between",
                    alignItems: "center",
                    marginTop: 32,
                    paddingTop: 18,
                    borderTop: "1px solid var(--color-border-subtle)",
                  }}
                >
                  {isFirstStep ? (
                    <button
                      type="button"
                      onClick={() => setShowFinishLaterModal(true)}
                      className="btn-text-link"
                      style={{ color: "#64748B" }}
                    >
                      Finish Later
                    </button>
                  ) : (
                    <button onClick={goBack} className="btn-secondary" style={{ padding: "9px 16px", fontSize: 13.5 }}>
                      <ChevronLeft size={16} /> Back
                    </button>
                  )}

                  {step?.type === "monitoring" ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!monitoringAgreed}
                      className="btn-primary"
                      style={{
                        marginLeft: "auto",
                        opacity: monitoringAgreed ? 1 : 0.4,
                        cursor: monitoringAgreed ? "pointer" : "not-allowed",
                        pointerEvents: monitoringAgreed ? "auto" : "none",
                      }}
                    >
                      Agree & Continue <ChevronRight size={16} />
                    </button>
                  ) : step?.type === "permission" ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!stream}
                      className="btn-primary"
                      style={{
                        marginLeft: "auto",
                        opacity: stream ? 1 : 0.4,
                        cursor: stream ? "pointer" : "not-allowed",
                        pointerEvents: stream ? "auto" : "none",
                      }}
                    >
                      Continue <ChevronRight size={16} />
                    </button>
                  ) : step?.type === "aiConsent" ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={aiConsent !== true}
                      className="btn-primary"
                      style={{
                        marginLeft: "auto",
                        opacity: aiConsent === true ? 1 : 0.4,
                        cursor: aiConsent === true ? "pointer" : "not-allowed",
                        pointerEvents: aiConsent === true ? "auto" : "none",
                      }}
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button onClick={goNext} className="btn-primary" style={{ marginLeft: "auto" }}>
                      {step?.type === "sectionIntro"
                        ? (step?.data?.buttonText || "Let's Begin")
                        : idx === TOTAL - 1
                        ? "Submit Assessment"
                        : "Next"}{" "}
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <FinishLaterModal
        isOpen={showFinishLaterModal}
        onClose={() => setShowFinishLaterModal(false)}
        onSaveAndExit={() => {
          setShowFinishLaterModal(false);
          alert("Your assessment progress has been saved. You may close this window and resume later.");
        }}
      />
    </div>
  );
}
