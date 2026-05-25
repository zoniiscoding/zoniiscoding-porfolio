import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { personal } from "../../data/portfolio";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Contact"
          title="Let's Connect"
          subtitle="Open to internships, full-time roles, and meaningful collaborations"
        />

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass mx-auto max-w-xl rounded-2xl p-6 md:p-8"
        >
          <p className="mb-6 text-center text-sm text-muted">
            Fill out the form below and your email client will open with your
            message ready to send.
          </p>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-muted"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-muted/20 bg-bg/80 px-4 py-3 text-text outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              placeholder="Your name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-muted"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-muted/20 bg-bg/80 px-4 py-3 text-text outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              placeholder="you@email.com"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-muted"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-xl border border-muted/20 bg-bg/80 px-4 py-3 text-text outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              placeholder="Tell me about your opportunity..."
            />
          </div>

          <Button type="submit" icon={Send} className="w-full">
            {submitted ? "Opening mail client..." : "Send Message"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
