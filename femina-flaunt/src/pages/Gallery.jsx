import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "../components/anim.jsx";
import PageHero from "../components/PageHero.jsx";

/* Real salon photography from the owner's Facebook page, plus clearly-labelled
   ambience shots from StockSnap (CC0). `w`/`h` reserve layout space (no CLS). */
const ITEMS = [
  { src: "/images/gallery-1.jpg", cat: "Bridal", alt: "Traditional bridal makeup look", w: 720, h: 1280 },
  { src: "/images/gallery-2.jpg", cat: "Hair", alt: "Hair styling and transformation", w: 600, h: 800 },
  { src: "/images/gallery-3.jpg", cat: "Skin", alt: "Advanced skin treatment", w: 1290, h: 2294 },
  { src: "/images/gallery-4.jpg", cat: "Makeup", alt: "Soft glam makeup look", w: 600, h: 712 },
  { src: "/images/gallery-5.jpg", cat: "Detail", alt: "Nail art detail", w: 480, h: 854 },
  { src: "/images/gallery-6.jpg", cat: "Nails", alt: "Bridal nail art", w: 600, h: 800 },
  { src: "/images/gallery-7.jpg", cat: "Treatments", alt: "Non-surgical contouring treatment", w: 600, h: 800 },
  { src: "/images/gallery-8.jpg", cat: "Events", alt: "Grand opening celebration at the salon", w: 937, h: 600 },
  { src: "/images/gallery-9.jpg", cat: "Detail", alt: "Hair styling in progress", w: 960, h: 1440 },
  { src: "/images/gallery-10.jpg", cat: "Wellness", alt: "Spa and wellness essentials", w: 960, h: 1438 },
];

export default function Gallery() {
  const [view, setView] = useState("masonry");
  const [lightbox, setLightbox] = useState(null); // index into ITEMS

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The Lookbook."
        lede="Bridal, hair, skin, makeup and salon imagery. Photography slots are ready for the owner's approved images."
      />

      <section className="section">
        <div className="wrap">
          <div className="view-toggle" role="tablist" aria-label="Gallery view">
            <button className={view === "masonry" ? "on" : ""} onClick={() => setView("masonry")}>Masonry</button>
            <button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")}>Grid</button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              className={view === "masonry" ? "gal-grid" : "gal-swap"}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {ITEMS.map((item, i) => (
                <Reveal key={item.src} delay={Math.min(i * 0.06, 0.3)}>
                  <figure
                    className="gal-item"
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${item.alt}`}
                    onClick={() => setLightbox(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightbox(i);
                      }
                    }}
                  >
                    <img src={item.src} alt={item.alt} loading="lazy" decoding="async"
                      width={item.w} height={item.h}
                      onError={(e) => (e.currentTarget.style.opacity = "0.25")} />
                    <figcaption className="gal-cap">
                      <span>{item.cat}</span>
                      <span className="plus">+</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="form-note" style={{ marginTop: "var(--space-3)" }}>
            Salon work photography is sourced from the official Femina Flaunt By Sabina Facebook page; ambience shots are CC0 (StockSnap) — see <code>CREDITS.md</code>. Replace any file in <code>public/images/</code> with full-resolution owner originals whenever supplied (categories: Bridal, Hair, Skin, Makeup, Nails, Detail, Treatments, Events, Wellness).
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
          >
            <motion.img
              key={ITEMS[lightbox].src}
              src={ITEMS[lightbox].src}
              alt={ITEMS[lightbox].alt}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <button className="lb-btn lb-close" onClick={() => setLightbox(null)}>Close ✕</button>
            <button
              className="lb-btn lb-prev"
              aria-label="Previous image"
              onClick={() => setLightbox((i) => (i - 1 + ITEMS.length) % ITEMS.length)}
            >
              ← Prev
            </button>
            <button
              className="lb-btn lb-next"
              aria-label="Next image"
              onClick={() => setLightbox((i) => (i + 1) % ITEMS.length)}
            >
              Next →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
