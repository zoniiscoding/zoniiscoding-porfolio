import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";
import { personal } from "../../data/portfolio";

const links = [
  {
    icon: GitHubIcon,
    href: personal.github,
    label: "GitHub",
    external: true,
  },
  {
    icon: LinkedInIcon,
    href: personal.linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    icon: Mail,
    href: `mailto:${personal.email}`,
    label: "Email",
    external: false,
  },
];

export default function SocialLinks({ size = "md", className = "" }) {
  const sizes = {
    sm: "h-11 w-11 [&_svg]:h-4 [&_svg]:w-4",
    md: "h-14 w-14 [&_svg]:h-5 [&_svg]:w-5",
    lg: "h-16 w-16 [&_svg]:h-6 [&_svg]:w-6",
  };

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {links.map(({ icon: Icon, href, label, external }, i) => (
        <motion.a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -4, scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className={`glass group flex ${sizes[size]} items-center justify-center rounded-2xl border border-muted/15 text-muted shadow-lg transition-colors duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-primary/20`}
        >
          <Icon className="transition-transform duration-300 group-hover:scale-110" />
        </motion.a>
      ))}
    </div>
  );
}
