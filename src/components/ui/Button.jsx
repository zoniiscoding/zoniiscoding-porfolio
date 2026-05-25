import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40",
  outline:
    "border border-muted/30 bg-transparent text-text hover:border-primary/50 hover:bg-primary/10",
  ghost: "bg-card/60 text-text hover:bg-card border border-muted/20",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  icon: Icon,
  external = false,
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300";

  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
