import { motion } from "framer-motion";
import { WordReveal, Reveal } from "./anim.jsx";

export default function PageHero({ eyebrow, title, lede, children }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow}
        </motion.span>
        <WordReveal as="h1" className="display" delay={0.15} text={title} />
        {lede && (
          <Reveal delay={0.35}>
            <p className="lede">{lede}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.45}>{children}</Reveal>}
      </div>
    </section>
  );
}
