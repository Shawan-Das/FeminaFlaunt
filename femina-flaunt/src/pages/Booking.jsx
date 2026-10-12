import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../components/anim.jsx";
import PageHero from "../components/PageHero.jsx";
import { useContacts, useContactLinks } from "../contacts.jsx";

const FALLBACK_SERVICES = ["Hair", "Skin", "Bridal Makeup", "Makeup", "Grooming", "Wellness", "Body Contouring", "Other"];

export default function Booking() {
  const links = useContactLinks();
  const { contacts } = useContacts();
  const services = [
    ...((contacts && contacts.bookingServices && contacts.bookingServices.services) || FALLBACK_SERVICES.slice(0, -1)),
    "Other",
  ];

  const [status, setStatus] = useState("idle"); // idle | error | success
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const successRef = useRef(null);

  useEffect(() => {
    if (status === "success" && successRef.current) successRef.current.focus();
  }, [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    if (!data.name || data.name.trim().length < 2) return fail("Please enter your full name.");
    if ((data.phone || "").replace(/\D/g, "").length < 9) return fail("Please enter a valid phone number.");
    if (!data.service) return fail("Please select a service.");
    if (!data.date) return fail("Please select your preferred date.");
    if (!data.time) return fail("Please select your preferred time.");
    if (data.company) return failSpam(); // honeypot tripped — silently accept

    // MVP: request-based booking (no backend yet).
    // To go live: POST `data` to a secure endpoint / notification service.
    setSummary(
      `Thank you, ${data.name.trim().split(" ")[0]}. Your ${data.service.toLowerCase().includes("bridal") ? "bridal consultation " : "appointment "}request has been received. Our team will contact you shortly to confirm your preferred date and time.`
    );
    setStatus("success");
  };

  const fail = (msg) => {
    setError(msg);
    setStatus("error");
  };
  const failSpam = () => {
    setSummary("Thank you. Your request has been received.");
    setStatus("success");
  };

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Request an Appointment"
        lede="Tell us what you would like to experience — our team will contact you to confirm your preferred date and time."
      />

      <section className="section">
        <div className="wrap">
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="form"
                className="form-grid"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="field">
                  <label htmlFor="service">What would you like to experience?</label>
                  <select id="service" name="service" required defaultValue="">
                    <option value="" disabled>Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="two-col">
                  <div className="field">
                    <label htmlFor="date">Preferred date</label>
                    <input type="date" id="date" name="date" required min={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="field">
                    <label htmlFor="time">Preferred time</label>
                    <input type="time" id="time" name="time" min="10:00" max="21:00" required />
                  </div>
                </div>

                <div className="two-col">
                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <input type="text" id="name" name="name" autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone number</label>
                    <input type="tel" id="phone" name="phone" autoComplete="tel" placeholder="+880 …" required />
                  </div>
                </div>

                <div className="two-col">
                  <div className="field">
                    <label htmlFor="whatsapp">WhatsApp number <span style={{ opacity: 0.6 }}>(optional)</span></label>
                    <input type="tel" id="whatsapp" name="whatsapp" autoComplete="tel" />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email <span style={{ opacity: 0.6 }}>(optional)</span></label>
                    <input type="email" id="email" name="email" autoComplete="email" />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="notes">Anything we should know? <span style={{ opacity: 0.6 }}>(optional)</span></label>
                  <textarea id="notes" name="notes" rows="3" placeholder="e.g. bridal event date, first visit, preferred treatments…" />
                </div>

                <label className="hp-field" htmlFor="company" aria-hidden="true">
                  Company
                  <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
                </label>

                <motion.button
                  className="btn btn-primary"
                  type="submit"
                  style={{ justifySelf: "start" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Request Appointment</span>
                </motion.button>

                {status === "error" && (
                  <motion.p
                    className="form-error"
                    role="alert"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
                <p className="form-note">
                  Your requested time will be confirmed by our team — this is a booking request, not an instant confirmation. Prefer WhatsApp or a phone call? Use the quick links below.
                </p>
                <div className="two-col" style={{ maxWidth: 420 }}>
                  <a className="btn btn-whatsapp" href={links.wa("prefillBooking")} target="_blank" rel="noopener noreferrer"><span>Chat on WhatsApp</span></a>
                  <a className="btn btn-ghost" href={links.tel}><span>Call Now</span></a>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="form-success"
                tabIndex={-1}
                ref={successRef}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Reveal>
                  <span className="eyebrow gold">Request received</span>
                  <h2 className="h3" style={{ margin: "0.5rem 0" }}>Thank you.</h2>
                  <p className="form-note" style={{ margin: "0 auto var(--space-2)" }}>{summary}</p>
                  <div className="hero-cta" style={{ justifyContent: "center" }}>
                    <a className="btn btn-whatsapp" href={links.wa("prefillBooking")} target="_blank" rel="noopener noreferrer"><span>Chat on WhatsApp</span></a>
                    <a className="btn btn-ghost" href={links.tel}><span>Call Now</span></a>
                  </div>
                </Reveal>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
