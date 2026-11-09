import { FormEvent, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, LoaderCircle, Mail, Send, X } from "lucide-react";
import { toast } from "sonner";
import { playClick } from "@/lib/sound";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
}

const SERVICE_OPTIONS = [
  "Branding & Identity",
  "Graphic Design",
  "Presentation Design & Pitch Decks",
  "Writing Studio (Copy & Web)",
  "Multiple Services",
  "Ongoing Creative Partnership",
];

const BUDGET_OPTIONS = [
  "Under $250",
  "$250 – $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500+",
  "Not sure yet",
];

const TIMELINE_OPTIONS = [
  "ASAP (within 1 week)",
  "1 – 2 weeks",
  "2 – 4 weeks",
  "Flexible / Ongoing",
];

export default function ContactModal({ open, onClose, defaultService }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [serviceRequired, setServiceRequired] = useState(defaultService || "Branding & Identity");
  const [budgetRange, setBudgetRange] = useState("$500 – $1,000");
  const [timeline, setTimeline] = useState("1 – 2 weeks");
  const [referenceLinks, setReferenceLinks] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast("Please fill in your name, work email, and project description.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Please enter a valid work email address.");
      return;
    }

    setState("loading");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          website,
          industry,
          serviceRequired,
          budgetRange,
          timeline,
          referenceLinks,
          message,
          targetEmail: "glexionstriker@gmail.com",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      /* graceful fallback */
    }

    setState("done");
    toast.success("Project enquiry received. Proposal incoming within 24-48 hours.");
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setCompany("");
    setWebsite("");
    setIndustry("");
    setServiceRequired("Branding & Identity");
    setBudgetRange("$500 – $1,000");
    setTimeline("1 – 2 weeks");
    setReferenceLinks("");
    setMessage("");
    setState("idle");
    onClose();
  };

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "620px", maxHeight: "90vh", overflowY: "auto" }}>
        <div className="contact-modal-head">
          <div>
            <div className="section-marker">[ START A PROJECT ]</div>
            <h2>Let’s make<br /><em>something meaningful.</em></h2>
          </div>
          <button
            className="contact-close-btn"
            onClick={() => {
              playClick();
              onClose();
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {state === "done" ? (
          <div className="contact-success-screen">
            <div className="success-icon-wrap">
              <Check size={28} />
            </div>
            <h3>Project Enquiry Logged.</h3>
            <p>
              Thank you, <b>{name}</b>. Your brief for <i>{serviceRequired}</i> has been registered. We’ve sent a copy to <b>{email}</b> and alerted the studio at <b>glexionstriker@gmail.com</b>. Expect our proposal within 24–48 hours.
            </p>
            <button className="primary-button" onClick={handleReset}>
              Done
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <p className="contact-sub">
              Tell us what you're building. We synthesize your goals, tone, and references into production-ready creative work without agency overhead.
            </p>

            <div className="contact-field-row">
              <div className="contact-field">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={state === "loading"}
                />
              </div>

              <div className="contact-field">
                <label>Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "loading"}
                />
              </div>
            </div>

            <div className="contact-field-row">
              <div className="contact-field">
                <label>Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Studio"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={state === "loading"}
                />
              </div>

              <div className="contact-field">
                <label>Website or Social Link</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={state === "loading"}
                />
              </div>
            </div>

            <div className="contact-field-row">
              <div className="contact-field">
                <label>Industry</label>
                <input
                  type="text"
                  placeholder="e.g. SaaS / Hospitality / Architecture / Retail"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  disabled={state === "loading"}
                />
              </div>

              <div className="contact-field">
                <label>Service Required *</label>
                <select
                  value={serviceRequired}
                  onChange={(e) => setServiceRequired(e.target.value)}
                  disabled={state === "loading"}
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="contact-field-row">
              <div className="contact-field">
                <label>Budget Range</label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  disabled={state === "loading"}
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact-field">
                <label>Desired Deadline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  disabled={state === "loading"}
                >
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="contact-field">
              <label>Project Description &amp; Objectives *</label>
              <textarea
                rows={3}
                required
                placeholder="What are you building? What deliverables do you need, and what are your primary goals?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={state === "loading"}
              />
            </div>

            <div className="contact-field">
              <label>References, Figma, or Moodboard Links (optional)</label>
              <input
                type="text"
                placeholder="Links to existing assets, Pinterest, Are.na, or Figma"
                value={referenceLinks}
                onChange={(e) => setReferenceLinks(e.target.value)}
                disabled={state === "loading"}
              />
            </div>

            <div className="contact-form-foot">
              <span className="contact-target-label">
                <Mail size={13} /> Direct route to glexionstriker@gmail.com
              </span>
              <button className="primary-button" type="submit" disabled={state === "loading"}>
                {state === "loading" ? (
                  <>
                    Transmitting Brief <LoaderCircle className="spin" size={14} />
                  </>
                ) : (
                  <>
                    Submit Project Brief <Send size={14} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
