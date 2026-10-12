import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* Fade/rise reveal when scrolled into view */
export function Reveal({ children, delay = 0, y = 26, once = true, className, ...rest }) {
  const reduce = useReducedMotion();
  return ( // eslint-disable-line react-hooks/purity
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Staggered group + items for lists/cards */
export const staggerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
export function StaggerGroup({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

/* Word-by-word masked reveal for display headlines */
export function WordReveal({ text, className, as = "h2", delay = 0 }) {
  const words = String(text).split(" ");
  const Tag = as;
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            /* room for descenders (y, g, p) + italic overshoot inside the mask */
            paddingBottom: "0.14em",
            marginBottom: "-0.14em",
          }}
          variants={{
            hidden: { y: "112%" },
            show: { y: 0, transition: { duration: 0.85, ease: EASE } },
          }}
        >
          <span style={{ display: "inline-block" }}>{w}&nbsp;</span>
        </motion.span>
      ))}
    </Tag>
  );
}

/* Scroll-linked parallax (used inside the hero for image drift) */
export function ParallaxHero({ children, className }) {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const y = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 130]);
  const opacity = useTransform(scrollY, [0, 700], [1, reduce ? 1 : 0.35]);
  return (
    <motion.div className={className} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

/* Count-up number once visible */
export function CountUp({ to, duration = 1.4, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Number((to * eased).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick); // re-render-driven; no render-phase call
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, decimals, reduce]);

  return <span ref={ref}>{val}</span>;
}
