import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import SocialLinks from "../ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="relative mt-4 px-4 pb-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="flex flex-col items-center py-10 md:py-12">
          <SocialLinks size="md" className="mb-8" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-1.5 text-center text-xs text-muted/70 md:text-sm"
          >
            <span>© 2026 Tanisha Joshi.</span>
            <span className="inline-flex items-center gap-1">
              Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex text-primary/80"
              >
                <Heart className="h-3.5 w-3.5 fill-primary/40" />
              </motion.span>
              by Tanisha.
            </span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
