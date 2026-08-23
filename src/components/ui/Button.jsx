import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-sans text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-caramel disabled:pointer-events-none disabled:opacity-50";

const sizes = {
  md: "px-6 py-3",
  sm: "px-5 py-2.5 text-[13px]",
};

const variants = {
  primary: "bg-caramel text-espresso hover:bg-cream",
  secondary: "border border-cream/25 text-cream hover:border-cream/60 hover:bg-cream/5",
  ghost: "text-cream/80 hover:text-caramel px-0",
};

/**
 * Site-wide button. Renders a router <Link>, an external <a>, or a
 * native <button>, depending on which props are passed.
 */
const MotionLink = motion.create(Link);

export default function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], variant !== "ghost" ? sizes[size] : "", className);
  const whileTap = { scale: 0.97 };

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight
          size={16}
          strokeWidth={2.25}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  if (to) {
    return (
      <MotionLink to={to} className={classes} whileTap={whileTap} {...props}>
        {content}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} whileTap={whileTap} {...props}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button className={classes} whileTap={whileTap} {...props}>
      {content}
    </motion.button>
  );
}
