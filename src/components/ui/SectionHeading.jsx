import { motion } from "framer-motion";

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center md:mb-12"
    >
      <span className="mb-3 inline-block font-mono text-sm font-medium tracking-widest text-primary uppercase">
        {label}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
