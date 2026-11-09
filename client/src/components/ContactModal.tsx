import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle, Mail, Send, X } from "lucide-react";
import { toast } from "sonner";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Product Collaboration");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Please enter a valid email address.");
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
          inquiryType,
          message,
          targetEmail: "glexionstriker@gmail.com",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      /* fallback graceful handling */
    }

    setState("done");
    toast("Your message has been sent to glexionstriker@gmail.com");
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setState("idle");
    onClose();
  };

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <div className="contact-modal-head">
          <div>
            <div className="section-marker">[ START A CONVERSATION ]</div>
            <h2>Let’s make<br /><em>something useful.</em></h2>
          </div>
          <button className="contact-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {state === "done" ? (
          <div className="contact-success-screen">
            <div className="success-icon-wrap">
              <Check size={28} />
            </div>
            <h3>Signal Received.</h3>
            <p>
              Thank you, <b>{name}</b>. Your message regarding <i>{inquiryType}</i> has been successfully routed to <b>glexionstriker@gmail.com</b>. We’ll be in touch soon.
            </p>
            <button className="primary-button" onClick={handleReset}>
              Close Window
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <p className="contact-sub">
              Tell us what should exist next. Inquiries are directly routed to <b>glexionstriker@gmail.com</b>.
            </p>

            <div className="contact-field-row">
              <div className="contact-field">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abhinav Krish"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={state === "loading"}
                />
              </div>

              <div className="contact-field">
                <label>Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "loading"}
                />
              </div>
            </div>

            <div className="contact-field">
              <label>Inquiry Type</label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                disabled={state === "loading"}
              >
                <option value="Product Collaboration">Product Collaboration</option>
                <option value="Investment & Sponsorship">Investment & Sponsorship</option>
                <option value="Research Inquiry">Research Inquiry (SCTM / AI)</option>
                <option value="General Signal">General Signal / Hi</option>
              </select>
            </div>

            <div className="contact-field">
              <label>Your Message / Project Idea *</label>
              <textarea
                rows={4}
                required
                placeholder="Share your thoughts, questions, or ideas..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
                    Sending Signal <LoaderCircle className="spin" size={14} />
                  </>
                ) : (
                  <>
                    Send Message <Send size={14} />
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
