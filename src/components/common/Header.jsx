 import { useState, useRef, useEffect } from "react";
    import { RevolutLogo } from "./RevolutLogo.jsx";
    import { User, HelpCircle, ExternalLink } from "lucide-react";

    export function Header({ sectionIndex, sectionTotal, showProgress, onOpenDashboard, onLogout }) {
      const [menuOpen, setMenuOpen] = useState(false);
      const menuRef = useRef(null);

      const HELP_URL = "https://revolut.hirevue-app.eu/router/help";
      const HIREVUE_PRIVACY_URL = "https://www.hirevue.com/legal/privacy";

      useEffect(() => {
        function handleClickOutside(e) {
          if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
          }
        }
        document.addEventListener("pointerdown", handleClickOutside);
        return () => document.removeEventListener("pointerdown", handleClickOutside);
      }, []);

      return (
        <header style={{ marginBottom: 20, width: "100%" }}>
          {/* Top Bar: Left Revolut Logo | Far Right CANDIDATE ACCESS */}
          <div
            style={{
              display: "flex",
              justify: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Far Left: Revolut Logo */}
            <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <RevolutLogo width={130} height={30} />
            </div>

            {/* Far Right Corner: Candidate Access Profile Dropdown & Help */}
            <div style={{ marginLeft: "auto", position: "relative", flexShrink: 0 }} ref={menuRef}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#475467",
                    letterSpacing: "0.04em",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    padding: "4px 6px",
                    borderRadius: 6,
                  }}
                >
                  <span>CANDIDATE ACCESS</span>
                  <User size={17} color="#475467" />
                </button>

                <a
                  href={HELP_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#64748B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                  title="HireVue Help Center"
                >
                  <HelpCircle size={19} />
                </a>
              </div>

              {/* Profile Dropdown Menu */}
              {menuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    zIndex: 9999,
                    width: 170,
                    background: "#ffffff",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    padding: "6px 0",
                  }}
                >
                  <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => {
                      setMenuOpen(false);
                      if (onOpenDashboard) onOpenDashboard();
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 16px",
                      fontSize: 13,
                      color: "#1E293B",
                      fontWeight: 600,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    My Dashboard
                  </button>

                  <a
                    href={HIREVUE_PRIVACY_URL}
                    target="_blank"
                    rel="noreferrer"
                    onPointerDown={(e) => e.stopPropagation()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 16px",
                      fontSize: 13,
                      color: "#1E293B",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span>Privacy Policy</span>
                    <ExternalLink size={13} color="#94A3B8" />
                  </a>

                  <div style={{ height: 1, background: "#F1F5F9", margin: "4px 0" }} />

                  <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => {
                      setMenuOpen(false);
                      if (onLogout) onLogout();
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 16px",
                      fontSize: 13,
                      color: "#DC2626",
                      fontWeight: 600,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Question Counter Pill Only (Underneath CANDIDATE ACCESS) */}
          {showProgress && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8, width: "100%" }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                  background: "#ffffff",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--color-border-subtle)",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
                }}
              >
                Question <strong style={{ color: "var(--color-brand-primary)" }}>{sectionIndex}</strong> of {sectionTotal}
              </div>
            </div>
          )}
        </header>
      );
    }
