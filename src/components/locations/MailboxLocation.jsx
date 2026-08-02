import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send } from "lucide-react";
import PixelDialog from "../pixel/PixelDialog";
import PixelButton from "../pixel/PixelButton";
import PixelWindow from "../pixel/PixelWindow";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { sprites } from "../../world/spriteManifest";
import { personal } from "../../data/portfolio";

const GREETING =
  "Thanks for stopping by! I'm open to internships, full-time roles, and meaningful collaborations — let's connect.";

const STAGES = ["mailbox_closed", "mailbox_opening", "mailbox_open"];

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function MailboxLocation({ titleId, firstVisit }) {
  const playReveal = firstVisit && !reduceMotion;
  const [stageIndex, setStageIndex] = useState(playReveal ? 0 : 2);
  const [dialogueActive, setDialogueActive] = useState(!playReveal);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const revealed = stageIndex === 2;

  useEffect(() => {
    if (!playReveal) return;
    const t1 = setTimeout(() => setStageIndex(1), 450);
    const t2 = setTimeout(() => setStageIndex(2), 950);
    const t3 = setTimeout(() => setDialogueActive(true), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [playReveal]);

  const art = sprites.single[STAGES[stageIndex]];

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <div className="location-heading">
        <span className="location-heading__label">Contact</span>
        <h2 id={titleId} className="location-heading__title">
          Mailbox
        </h2>
        <p className="location-heading__subtitle">Open to internships, full-time roles, and meaningful collaborations</p>
      </div>

      <div className="location-reveal">
        <motion.img
          key={stageIndex}
          src={art.src}
          alt=""
          aria-hidden="true"
          className="location-reveal__art"
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex w-full flex-col items-center gap-6"
          >
            <PixelDialog speaker="Tanisha" text={GREETING} active={dialogueActive} className="w-full max-w-lg" />

            <div className="flex flex-wrap items-center justify-center gap-3">
              <PixelButton href={`mailto:${personal.email}`} icon={Mail}>
                Email
              </PixelButton>
              <PixelButton href={personal.github} external icon={GitHubIcon}>
                GitHub
              </PixelButton>
              <PixelButton href={personal.linkedin} external icon={LinkedInIcon}>
                LinkedIn
              </PixelButton>
            </div>

            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {showForm ? "Hide the letter form" : "Prefer to send a letter instead?"}
            </button>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-lg overflow-hidden"
                >
                  <PixelWindow title="message.txt" bodyClassName="!p-6">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="mb-name" className="mb-2 block text-sm font-medium text-muted">
                          Name
                        </label>
                        <input
                          id="mb-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full rounded-xl border border-muted/20 bg-bg/40 px-4 py-3 text-text outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="mb-email" className="mb-2 block text-sm font-medium text-muted">
                          Email
                        </label>
                        <input
                          id="mb-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full rounded-xl border border-muted/20 bg-bg/40 px-4 py-3 text-text outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                          placeholder="you@email.com"
                        />
                      </div>

                      <div className="mb-6">
                        <label htmlFor="mb-message" className="mb-2 block text-sm font-medium text-muted">
                          Message
                        </label>
                        <textarea
                          id="mb-message"
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full resize-none rounded-xl border border-muted/20 bg-bg/40 px-4 py-3 text-text outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                          placeholder="Tell me about your opportunity..."
                        />
                      </div>

                      <PixelButton type="submit" icon={Send} className="w-full">
                        {submitted ? "Opening mail client..." : "Send Message"}
                      </PixelButton>
                    </form>
                  </PixelWindow>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </>
  );
}
