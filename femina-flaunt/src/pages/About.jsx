import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, WordReveal, StaggerGroup, StaggerItem } from "../components/anim.jsx";
import PageHero from "../components/PageHero.jsx";
import { useContactLinks } from "../contacts.jsx";

const TRAINING = ["Dubai", "Bangkok", "Malaysia", "India"];

const WHY = [
  ["International Perspective", "Training and background associated with Dubai, Bangkok, Malaysia and India."],
  ["Professional Expertise", "A professional, considered approach to beauty and grooming."],
  ["Premium Products", "Quality product choices across every service."],
  ["Modern Treatments", "Contemporary treatments, described honestly."],
  ["Hygiene & Safety", "An uncompromising standard of cleanliness and client safety."],
  ["Personalized Experience", "Every visit shaped around the individual client."],
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Our Story"
        lede="Internationally trained expertise, rooted in Gulshan-2."
      />

      <section className="section">
        <div className="wrap split">
          <div>
            <Reveal><span className="eyebrow">Born in Gulshan. Inspired by the World.</span></Reveal>
            <Reveal delay={0.1}>
              <p className="lede" style={{ marginTop: "var(--space-1)" }}>
                Femina Flaunt By Sabina was founded by Sabina Akhtar Luna with a clear aim — to bring an international standard of beauty, skincare and bridal artistry to Dhaka, in a space that feels premium, calm and uncompromisingly hygienic.
              </p>
            </Reveal>
            <motion.div
              className="training"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.28 } } }}
            >
              {TRAINING.map((loc) => (
                <motion.span
                  key={loc}
                  className="loc gold"
                  variants={{ hidden: { opacity: 0, y: 16, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } } }}
                >
                  {loc}
                </motion.span>
              ))}
              <motion.span
                className="final"
                variants={{ hidden: { opacity: 0, letterSpacing: "0.6em" }, show: { opacity: 1, letterSpacing: "0.16em", transition: { duration: 0.9, delay: 0.4 } } }}
              >
                Dhaka
              </motion.span>
            </motion.div>
          </div>
          <div className="frame">
            <Reveal y={40}>
              <img
                src="/images/salon-ambience.jpg"
                alt="Hair styling in progress at the salon"
                loading="lazy"
                decoding="async"
                onError={(e) => e.currentTarget.remove()}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap split">
          <div className="frame">
            <Reveal y={40}><div className="ph tall">Founder portrait — coming soon</div></Reveal>
          </div>
          <div>
            <Reveal><span className="eyebrow">The Founder</span></Reveal>
            <WordReveal className="h2" text="Sabina Akhtar Luna" />
            <Reveal delay={0.1}>
              <p className="lede">
                Sabina trained across Dubai, Bangkok, Malaysia and India, and brings that international perspective to every service here. Her philosophy is simple — genuine expertise, premium products, modern treatments, attentive care and absolute hygiene, for every client.
              </p>
              <ul className="check-list" style={{ marginTop: "var(--space-2)" }}>
                <li>Internationally trained across four beauty hubs</li>
                <li>Founder-led quality standards, personal attention</li>
                <li>Hygiene and client safety held above all</li>
              </ul>
              <p className="form-note" style={{ marginTop: "var(--space-2)" }}>
                Full biography, credentials and certifications will be published only after owner approval.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <Reveal><span className="eyebrow">Why Femina Flaunt</span></Reveal>
            <WordReveal className="h2" text="What sets us apart." />
          </div>
          <StaggerGroup className="why-grid">
            {WHY.map(([t, b]) => (
              <StaggerItem key={t} className="why-item">
                <h3>{t}</h3>
                <p>{b}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CtaBand
        title="Experience it yourself."
        lede="Request an appointment and our team will confirm your preferred date and time."
      />
    </>
  );
}

export function CtaBand({ title, lede, cta = "Book an Appointment", prefill = "prefillDefault" }) {
  const links = useContactLinks();
  return (
    <section className="section section-dark cta-band">
      <div className="wrap">
        <WordReveal className="h2" text={title} />
        <Reveal delay={0.1}>
          <p className="lede">{lede}</p>
          <div className="hero-cta" style={{ justifyContent: "center" }}>
            <Link className="btn btn-light" to="/booking"><span>{cta}</span></Link>
            <a className="btn btn-outline-light" href={links.wa(prefill)} target="_blank" rel="noopener noreferrer"><span>Chat on WhatsApp</span></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


