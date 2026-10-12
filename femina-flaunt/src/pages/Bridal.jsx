import { Reveal, WordReveal, StaggerGroup, StaggerItem } from "../components/anim.jsx";
import PageHero from "../components/PageHero.jsx";
import { CtaBand } from "./About.jsx";
import { useContactLinks } from "../contacts.jsx";

const STEPS = [
  ["1 · Consultation", "Share your event dates, looks and preferences — in person or over WhatsApp."],
  ["2 · Preparation", "Pre-bridal skin and hair treatments are scheduled in the weeks before your day."],
  ["3 · Trial & Planning", "Trial and look planning are arranged as agreed during consultation."],
  ["4 · Your Day", "Bridal makeup and styling delivered on time, calmly and flawlessly."],
];

export default function Bridal() {
  const links = useContactLinks();
  return (
    <>
      <PageHero
        eyebrow="Bridal"
        title="Your Day. Your Beauty. Perfected."
        lede="Thoughtfully designed bridal beauty — makeup, hair, skin preparation and packages, planned around your wedding timeline."
      >
        <div className="hero-cta">
          <a className="btn btn-whatsapp" href={links.wa("prefillBridal")} target="_blank" rel="noopener noreferrer" style={{ background: "transparent", borderColor: "rgba(255,255,255,.5)", color: "#fff" }}>
            <span>WhatsApp Bridal Team</span>
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap split">
          <div>
            <Reveal><span className="eyebrow">Bridal Philosophy</span></Reveal>
            <WordReveal className="h2" text="Beauty for the biggest day." />
            <Reveal delay={0.1}>
              <p className="lede">
                Your bridal journey at Femina Flaunt is planned like a production — a consultation to understand your events, your looks and your timeline, then preparation, trials where appropriate, and flawless execution on the day itself.
              </p>
              <ul className="check-list" style={{ marginTop: "var(--space-2)" }}>
                <li>Bridal makeup — signature and premium looks</li>
                <li>Pre-bridal treatments — skin and hair preparation</li>
                <li>Bridal hair styling</li>
                <li>Package details, pricing and trial policy confirmed on booking</li>
              </ul>
              <p className="form-note" style={{ marginTop: "var(--space-2)" }}>
                Package details, pricing and trial policy are published once confirmed by the business.
              </p>
            </Reveal>
          </div>
          <div className="frame">
            <Reveal y={40}>
              <img
                src="/images/spa-detail.jpg"
                alt="Pre-bridal spa and skin preparation"
                loading="lazy"
                decoding="async"
                onError={(e) => e.currentTarget.remove()}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <Reveal><span className="eyebrow">The Journey</span></Reveal>
            <WordReveal className="h2" text="How a bridal booking works." />
          </div>
          <StaggerGroup className="why-grid">
            {STEPS.map(([t, b]) => (
              <StaggerItem key={t} className="why-item">
                <h3>{t}</h3>
                <p>{b}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CtaBand
        title="Planning a wedding?"
        lede="Tell us your date — the earlier we begin, the more prepared your skin and hair will be."
        cta="Book a Bridal Consultation"
        prefill="prefillBridal"
      />
    </>
  );
}
