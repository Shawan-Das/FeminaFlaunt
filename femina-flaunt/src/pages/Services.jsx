import { Reveal, WordReveal, StaggerGroup, StaggerItem } from "../components/anim.jsx";
import PageHero from "../components/PageHero.jsx";
import { CtaBand } from "./About.jsx";
import { useContactLinks } from "../contacts.jsx";

const SERVICES = [
  { name: "Hair", desc: "Hair styling, hair treatments, hair care and occasion styling." },
  { name: "Skin", desc: "Facial services, skin treatments, advanced skincare and professional consultation." },
  { name: "Makeup", desc: "Occasion makeup, event makeup, bridal makeup and editorial artistry." },
  { name: "Grooming", desc: "Refined everyday grooming services, professionally delivered." },
  { name: "Wellness", desc: "Wellness-oriented treatments, thoughtfully selected for a premium experience." },
  { name: "Body Contouring", desc: "Modern body-contouring services. Every treatment begins with a consultation; no outcome claims without professional documentation." },
];

export default function Services() {
  const links = useContactLinks();
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Explore Your Experience"
        lede="Premium hair, skin, makeup, grooming, wellness and body-contouring services — delivered with expert care in Gulshan-2."
      />

      <section className="section">
        <div className="wrap section-rel">
          <span className="section-no" aria-hidden="true">✦</span>
          <StaggerGroup className="svc-list">
            {SERVICES.map((s, i) => (
              <StaggerItem key={s.name}>
                <div className="svc-row">
                  <div>
                    <div className="svc-idx">{String(i + 1).padStart(2, "0")}</div>
                    <h3>{s.name}</h3>
                  </div>
                  <p>{s.desc}</p>
                  <span className="arrow gold">✦</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.1}>
            <p className="form-note" style={{ marginTop: "var(--space-3)" }}>
              Detailed service pages, durations and pricing are added once confirmed by the business.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap split">
          <div>
            <Reveal><span className="eyebrow" style={{ color: "var(--champagne)" }}>Signature Treatments</span></Reveal>
            <WordReveal className="h2" text="Advanced care, responsibly presented." />
            <Reveal delay={0.12}>
              <p className="lede">
                Selected advanced treatments — including bridal artistry and premium skin and wellness services — are available at Femina Flaunt. Treatments with medical considerations always begin with a professional consultation, and every service is described neutrally and honestly.
              </p>
              <div className="hero-cta">
                <a className="btn btn-outline-light" href={links.wa("prefillDefault")} target="_blank" rel="noopener noreferrer"><span>Ask About a Treatment</span></a>
              </div>
            </Reveal>
          </div>
          <div className="frame">
            <Reveal y={40}>
              <img
                src="/images/treatment-1.jpg"
                alt="Signature treatment at Femina Flaunt By Sabina"
                loading="lazy"
                onError={(e) => e.currentTarget.remove()}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure where to begin?"
        lede="Message our team on WhatsApp and we will guide you to the right treatment."
      />
    </>
  );
}
