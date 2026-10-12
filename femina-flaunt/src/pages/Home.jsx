import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  WordReveal,
  ParallaxHero,
} from "../components/anim.jsx";
import { useContacts, useContactLinks } from "../contacts.jsx";

const SERVICES = [
  { slug: "Hair", desc: "Styling, treatments and occasion-ready finishes." },
  { slug: "Skin", desc: "Facials, advanced skincare and consultations." },
  { slug: "Bridal", desc: "Makeup, packages and pre-bridal preparation." },
  { slug: "Makeup", desc: "Occasion, event and editorial artistry." },
  { slug: "Grooming", desc: "Refined everyday care, professionally delivered." },
  { slug: "Wellness", desc: "Thoughtfully chosen, wellness-oriented treatments." },
  { slug: "Body Contouring", desc: "Modern services, consultation-first approach." },
];

const TRAINING = ["Dubai", "Bangkok", "Malaysia", "India"];

const WHY = [
  ["International Perspective", "Training and background associated with Dubai, Bangkok, Malaysia and India."],
  ["Professional Expertise", "A professional, considered approach to beauty and grooming."],
  ["Premium Products", "Quality product choices across every service."],
  ["Modern Treatments", "Contemporary treatments, described honestly and without promises."],
  ["Hygiene & Safety", "An uncompromising standard of cleanliness and client safety."],
  ["Personalized Experience", "Every visit shaped around the individual client."],
];

export default function Home() {
  const links = useContactLinks();
  const { contacts } = useContacts();
  const ratings = contacts
    ? { rating: contacts.google.rating, count: contacts.google.reviewCount }
    : { rating: "5.0", count: "42" };

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero-media hero-fallback">
          <ParallaxHero className="hero-media-parallax">
            <img
              id="hero-photo"
              src="/images/hero-bridal.jpg"
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              onLoad={(e) => e.currentTarget.closest(".hero-fallback")?.classList.add("has-photo")}
              onError={(e) => e.currentTarget.remove()}
            />
          </ParallaxHero>
        </div>
        <div className="hero-inner wrap">
          <motion.span
            className="eyebrow"
            style={{ color: "var(--champagne)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Luxury · Skin · Wellness · Bridal — Gulshan-2, Dhaka
          </motion.span>
          <WordReveal as="h1" className="display" delay={0.35} text="Where Beauty Meets Expertise" />
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Premium beauty, skin, bridal and wellness experiences in the heart of Gulshan-2.
          </motion.p>
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Link className="btn btn-primary" to="/booking"><span>Book an Appointment</span></Link>
            <Link className="btn btn-outline-light" to="/services"><span>Explore Treatments</span></Link>
            <a className="btn btn-outline-light" href={links.wa("prefillDefault")} target="_blank" rel="noopener noreferrer">
              <span>WhatsApp Us</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---------- Marquee trust strip ---------- */}
      <div className="marquee" aria-label="Trust highlights">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <span key={dup} style={{ display: "inline-flex", gap: "3.5rem" }} aria-hidden={dup === 1}>
              <span className="marquee-item">
                <b className="gold">★★★★★</b> {ratings.rating} rating · {ratings.count} Google reviews <span className="sep">✦</span>
              </span>
              <span className="marquee-item">Open Daily · 10 AM – 9 PM <span className="sep">✦</span></span>
              <span className="marquee-item">Gulshan-2, Dhaka <span className="sep">✦</span></span>
              <span className="marquee-item">Bridal · Skin · Hair · Wellness <span className="sep">✦</span></span>
              <span className="marquee-item">Internationally Trained Expertise <span className="sep">✦</span></span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Signature services ---------- */}
      <section className="section section-rel" id="services">
        <div className="wrap">
          <span className="section-no" aria-hidden="true">01</span>
          <div className="section-head">
            <Reveal><span className="eyebrow">Our Services</span></Reveal>
            <WordReveal className="h2" text="Beauty, Elevated." />
            <Reveal delay={0.15}>
              <p className="lede">
                A considered menu of premium hair, skin, bridal, makeup, grooming and wellness experiences — delivered with expert care.
              </p>
            </Reveal>
          </div>
          <StaggerGroup className="svc-list">
            {SERVICES.map((s, i) => (
              <StaggerItem key={s.slug}>
                <Link
                  className="svc-row"
                  to={s.slug === "Bridal" ? "/bridal" : "/services"}
                >
                  <div>
                    <div className="svc-idx">{String(i + 1).padStart(2, "0")}</div>
                    <h3>{s.slug}</h3>
                  </div>
                  <p>{s.desc}</p>
                  <span className="arrow">→</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------- Brand story / international training ---------- */}
      <section className="section section-dark">
        <div className="wrap split">
          <div>
            <Reveal><span className="eyebrow" style={{ color: "var(--champagne)" }}>Our Story</span></Reveal>
            <WordReveal className="h2" text="Born in Gulshan. Inspired by the World." />
            <Reveal delay={0.1}>
              <p className="lede">
                Founded by Sabina Akhtar Luna, Femina Flaunt By Sabina brings internationally trained beauty expertise to Dhaka — combining modern treatments, premium products and uncompromising hygiene.
              </p>
            </Reveal>
            <motion.div
              className="training"
              aria-label="Training locations"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.28 } } }}
            >
              {TRAINING.map((loc) => (
                <motion.span
                  key={loc}
                  className="loc"
                  variants={{
                    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
                  }}
                >
                  {loc}
                </motion.span>
              ))}
              {["·", "·", "·"].map((d, i) => (
                <motion.span key={i} className="dot" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>{d}</motion.span>
              ))}
              <motion.span
                className="final"
                variants={{
                  hidden: { opacity: 0, letterSpacing: "0.6em" },
                  show: { opacity: 1, letterSpacing: "0.16em", transition: { duration: 0.9, delay: 0.4 } },
                }}
              >
                Dhaka
              </motion.span>
            </motion.div>
            <Reveal delay={0.2}>
              <Link className="btn btn-outline-light" to="/about"><span>Our Story</span></Link>
            </Reveal>
          </div>
          <div className="frame">
            <Reveal delay={0.15} y={40}>
              <img
                src="/images/salon-interior.jpg"
                alt="Luxury salon ambience at Femina Flaunt By Sabina"
                loading="lazy"
                decoding="async"
                onError={(e) => e.currentTarget.remove()}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Founder ---------- */}
      <section className="section">
        <div className="wrap split">
          <div className="frame">
            <Reveal y={40}>
              <div className="ph tall">Founder Portrait — coming soon</div>
            </Reveal>
          </div>
          <div>
            <Reveal><span className="eyebrow">The Founder</span></Reveal>
            <WordReveal className="h2" text="Meet Sabina Akhtar Luna" />
            <Reveal delay={0.12}>
              <p className="lede">
                With training across Dubai, Bangkok, Malaysia and India, Sabina founded Femina Flaunt to bring an international standard of beauty to Dhaka — where every detail, from treatment to hygiene, is held to a premium standard.
              </p>
              <p style={{ marginTop: "var(--space-2)" }}>
                <Link className="btn btn-ghost" to="/about"><span>The People Behind the Experience</span></Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Why Femina Flaunt ---------- */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <Reveal><span className="eyebrow">Why Femina Flaunt</span></Reveal>
            <WordReveal className="h2" text="Chosen for good reason." />
          </div>
          <StaggerGroup className="why-grid">
            {WHY.map(([title, body]) => (
              <StaggerItem key={title} className="why-item">
                <h3>{title}</h3>
                <p>{body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ---------- Bridal feature ---------- */}
      <section className="bridal-feature">
        <div className="hero-media hero-fallback">
          <img
            src="/images/bridal-feature.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            onError={(e) => e.currentTarget.remove()}
          />
        </div>
        <div className="wrap" style={{ position: "relative" }}>
          <Reveal><span className="eyebrow" style={{ color: "var(--champagne)" }}>Bridal</span></Reveal>
          <WordReveal className="display" text="Your Day. Your Beauty. Perfected." />
          <Reveal delay={0.15}>
            <p className="lede" style={{ color: "rgba(255,255,255,.75)", marginTop: "var(--space-2)" }}>
              Bridal makeup, pre-bridal preparation, hair and skin — designed around your wedding timeline.
            </p>
            <div className="hero-cta" style={{ marginTop: "var(--space-2)" }}>
              <Link className="btn btn-light" to="/booking"><span>Book a Bridal Consultation</span></Link>
              <Link className="btn btn-outline-light" to="/bridal"><span>Bridal Experience</span></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <section className="section section-alt" id="reviews">
        <div className="wrap">
          <div className="rating-hero">
            <span className="score gilded">{ratings.rating}</span>
            <span className="stars">★★★★★</span>
            <span className="eyebrow">Google · {ratings.count} reviews</span>
          </div>
          <WordReveal className="h2" text="Loved by our clients." />
          <Reveal delay={0.1}>
            <a
              className="btn btn-ghost"
              href={links.review || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "var(--space-2)" }}
            >
              <span>{links.review ? "Review Us on Google" : "Loved your visit? Review us on Google"}</span>
            </a>
          </Reveal>
          <p className="form-note" style={{ marginTop: "var(--space-2)" }}>
            Approved Google review excerpts will be shown here once the owner supplies them — no fabricated reviews, ever.
          </p>
        </div>
      </section>

      {/* ---------- Location ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <Reveal><span className="eyebrow">Visit Us</span></Reveal>
            <WordReveal className="h2" text="In the heart of Gulshan-2." />
          </div>
          <div className="loc-grid">
            <div>
              <Reveal>
                <dl className="loc-list" style={{ marginTop: 0 }}>
                  <dt>Address</dt><dd>{links.address}</dd>
                  <dt>Phone</dt><dd><a href={links.tel}>{links.telLabel}</a></dd>
                  <dt>Hours</dt><dd>{links.hours}</dd>
                </dl>
                <div className="hero-cta" style={{ marginTop: "var(--space-2)" }}>
                  <a className="btn btn-primary js-directions" href={links.directions} target="_blank" rel="noopener noreferrer"><span>Get Directions</span></a>
                  <Link className="btn btn-ghost" to="/booking"><span>Book an Appointment</span></Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <MapFrame />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="section section-dark cta-band">
        <div className="wrap">
          <WordReveal className="h2" text="Ready for your experience?" />
          <Reveal delay={0.1}>
            <p className="lede">Request an appointment and our team will confirm your preferred date and time.</p>
            <div className="hero-cta" style={{ justifyContent: "center" }}>
              <Link className="btn btn-light" to="/booking"><span>Book an Appointment</span></Link>
              <a className="btn btn-outline-light" href={links.wa("prefillBooking")} target="_blank" rel="noopener noreferrer"><span>Chat on WhatsApp</span></a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* Google Maps embed built from contacts.json (no API key needed) */
export function MapFrame() {
  const { contacts } = useContacts();
  if (!contacts) return <div className="map-frame" />;
  const q = encodeURIComponent(contacts.address.mapsQuery || contacts.address.lines.join(", "));
  return (
    <div className="map-frame">
      <iframe
        title={`Map — Femina Flaunt By Sabina`}
        src={`https://maps.google.com/maps?q=${q}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
