import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, FileText, Layers, Lock, Sparkles, User, X } from "lucide-react";
import { playClick } from "@/lib/sound";
import { toast } from "sonner";

interface ClientPortalModalProps {
  open: boolean;
  onClose: () => void;
  onOpenProjectModal?: () => void;
}

export default function ClientPortalModal({
  open,
  onClose,
  onOpenProjectModal,
}: ClientPortalModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "preview">("preview");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Magic sign-in link dispatched to your work email.");
      onClose();
    }, 900);
  };

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div
        className="contact-modal client-portal-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "680px" }}
      >
        <div className="contact-modal-head">
          <div>
            <div className="section-marker">[ CLIENT WORKSPACE ]</div>
            <h2>
              Quiet Studio
              <br />
              <em>client portal.</em>
            </h2>
          </div>
          <button
            className="contact-close-btn"
            onClick={() => {
              playClick();
              onClose();
            }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="portal-tab-bar" style={{ display: "flex", gap: "10px", margin: "16px 0 24px", borderBottom: "1px solid var(--line)", paddingBottom: "12px" }}>
          <button
            type="button"
            className={`outline-button ${activeTab === "preview" ? "active" : ""}`}
            style={{
              padding: "6px 14px",
              fontSize: "11px",
              background: activeTab === "preview" ? "var(--foreground)" : "transparent",
              color: activeTab === "preview" ? "var(--background)" : "var(--muted-ink)",
              borderColor: "var(--line)",
            }}
            onClick={() => {
              playClick();
              setActiveTab("preview");
            }}
          >
            Workspace Preview
          </button>
          <button
            type="button"
            className={`outline-button ${activeTab === "login" ? "active" : ""}`}
            style={{
              padding: "6px 14px",
              fontSize: "11px",
              background: activeTab === "login" ? "var(--foreground)" : "transparent",
              color: activeTab === "login" ? "var(--background)" : "var(--muted-ink)",
              borderColor: "var(--line)",
            }}
            onClick={() => {
              playClick();
              setActiveTab("login");
            }}
          >
            Sign In to Account
          </button>
        </div>

        {activeTab === "preview" ? (
          <div className="portal-preview-content" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <p style={{ fontSize: "13px", color: "var(--muted-ink)", lineHeight: 1.6, margin: 0 }}>
              The Quiet Studio client application is where active clients submit briefs, track deliverables through production, review revisions, and access their persistent brand assets.
            </p>

            {/* Workflow Pipeline */}
            <div
              style={{
                background: "var(--background)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  font: "600 10px 'DM Mono', monospace",
                  color: "var(--orange)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "12px",
                }}
              >
                DELIVERABLE WORKFLOW PIPELINE
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                  gap: "8px",
                  fontSize: "11px",
                }}
              >
                {[
                  { step: "01", name: "New Request", status: "Brief submitted" },
                  { step: "02", name: "In Production", status: "AI + Human craft" },
                  { step: "03", name: "Human Review", status: "Lead art direction" },
                  { step: "04", name: "Client Review", status: "Refinements" },
                  { step: "05", name: "Approved", status: "Production ready" },
                ].map((item, i) => (
                  <div
                    key={item.step}
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      background: i === 1 ? "rgba(255, 90, 31, 0.08)" : "transparent",
                      borderColor: i === 1 ? "var(--orange)" : "var(--line)",
                    }}
                  >
                    <span style={{ font: "600 9px 'DM Mono', monospace", color: "var(--muted-ink)" }}>
                      {item.step}
                    </span>
                    <div style={{ fontWeight: 600, color: "var(--foreground)", marginTop: "2px" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: "10px", color: "var(--muted-ink)", marginTop: "2px" }}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Mock Tasks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ font: "600 10px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase" }}>
                Active Deliverables Snapshot
              </div>
              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "var(--card)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "13px" }}>Brand Identity Refresh &amp; Logo Suite</div>
                  <div style={{ fontSize: "11px", color: "var(--muted-ink)" }}>Identity · Brand Guidelines · SVG Assets</div>
                </div>
                <span
                  style={{
                    font: "600 9px 'DM Mono', monospace",
                    background: "rgba(255, 90, 31, 0.15)",
                    color: "var(--orange)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  In Production
                </span>
              </div>

              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "var(--card)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "13px" }}>Series A Investor Presentation (18 Slides)</div>
                  <div style={{ fontSize: "11px", color: "var(--muted-ink)" }}>Design Studio · Pitch Deck</div>
                </div>
                <span
                  style={{
                    font: "600 9px 'DM Mono', monospace",
                    background: "rgba(34, 197, 94, 0.15)",
                    color: "#22c55e",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  Client Review
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  playClick();
                  onClose();
                  onOpenProjectModal?.();
                }}
              >
                <span>Start a Project to Get Portal Access</span>
                <ArrowRight size={13} />
              </button>
              <button
                type="button"
                className="outline-button"
                onClick={() => setActiveTab("login")}
              >
                Existing Client Sign In
              </button>
            </div>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleLogin}>
            <p className="contact-sub">
              Access your brand workspace, ongoing deliverables, and revision threads.
            </p>

            <div className="contact-field">
              <label>Work Email</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="contact-field">
              <label>Password or Access Token</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="contact-form-foot" style={{ marginTop: "14px" }}>
              <span className="contact-target-label">
                <Lock size={12} /> Secure encrypted client session
              </span>
              <button className="primary-button" type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Sign In to Workspace"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
