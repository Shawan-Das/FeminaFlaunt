import { Reveal } from "../components/anim.jsx";
import PageHero from "../components/PageHero.jsx";
import { MapFrame } from "./Home.jsx";
import { useContacts, useContactLinks } from "../contacts.jsx";

export default function Contact() {
  const links = useContactLinks();
  const { contacts } = useContacts();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you."
        lede="Call, WhatsApp, or visit us in Gulshan-2 — open every day."
      />

      <section className="section">
        <div className="wrap">
          <div className="loc-grid">
            <div>
              <Reveal>
                <dl className="loc-list" style={{ marginTop: 0 }}>
                  <dt>Address</dt><dd>{links.address}</dd>
                  <dt>Phone</dt><dd><a href={links.tel}>{links.telLabel}</a></dd>
                  <dt>WhatsApp</dt><dd><a href={links.wa()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></dd>
                  {contacts?.social?.instagram && (
                    <>
                      <dt>Instagram</dt>
                      <dd><a href={contacts.social.instagram} target="_blank" rel="noopener noreferrer">Follow us</a></dd>
                    </>
                  )}
                  {contacts?.social?.facebook && (
                    <>
                      <dt>Facebook</dt>
                      <dd><a href={contacts.social.facebook} target="_blank" rel="noopener noreferrer">Follow us</a></dd>
                    </>
                  )}
                  <dt>Hours</dt><dd>{links.hours}</dd>
                </dl>
                <div className="hero-cta" style={{ marginTop: "var(--space-2)" }}>
                  <a className="btn btn-primary" href={links.directions} target="_blank" rel="noopener noreferrer"><span>Get Directions</span></a>
                  <a className="btn btn-whatsapp" href={links.wa()} target="_blank" rel="noopener noreferrer"><span>Chat on WhatsApp</span></a>
                </div>
                <p className="form-note" style={{ marginTop: "var(--space-2)" }}>
                  Note: the exact floor/unit listing is being confirmed with the business before final publication.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <MapFrame />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
