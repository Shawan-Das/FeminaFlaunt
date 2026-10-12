import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";

function LegalBody({ updated, children }) {
  return (
    <section className="section">
      <div className="wrap prose">
        <p><em>{updated}</em></p>
        {children}
      </div>
    </section>
  );
}

export function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lede="DRAFT — to be reviewed and approved by the business before launch." />
      <LegalBody updated="Last updated: October 2026. Draft prepared from project requirements — requires owner approval before launch.">
        <h2>What we collect</h2>
        <p>When you submit an appointment request, we collect what you provide: name, phone number, WhatsApp number, email (optional), preferred date and time, selected service, and any notes.</p>
        <h2>Why we collect it</h2>
        <p>Only to contact you and confirm your appointment request, plus aggregated, non-identifying data to understand service interest.</p>
        <h2>Storage &amp; access</h2>
        <p>Booking requests are handled by the salon team; access is limited to staff who need it. Storage and retention details will be documented before launch.</p>
        <h2>Retention</h2>
        <p>Kept only as long as needed to manage appointments and as required for business records.</p>
        <h2>Your choices</h2>
        <p>Request updates or deletion via the <Link to="/contact">Contact page</Link>.</p>
        <h2>Cookies &amp; analytics</h2>
        <p>Analytics usage and cookie disclosure will be finalized and disclosed before launch.</p>
      </LegalBody>
    </>
  );
}

export function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" lede="DRAFT — to be reviewed and approved by the business before launch." />
      <LegalBody updated="Last updated: October 2026. Draft prepared from project requirements — requires owner approval before launch.">
        <h2>Booking requests</h2>
        <p>Submitting a request through this website is a request, not a confirmed booking. Appointments are confirmed only when our team contacts you.</p>
        <h2>Confirmations &amp; changes</h2>
        <p>We will contact you to confirm or rearrange appointments; punctuality expectations are communicated at confirmation.</p>
        <h2>Cancellation policy</h2>
        <p>The salon's cancellation and no-show policy will be published once confirmed.</p>
        <h2>Offer terms</h2>
        <p>Offers on this site are subject to stated dates, eligibility and terms; expired offers are removed.</p>
        <h2>Service information</h2>
        <p>Service descriptions are informational; advanced treatments follow an in-person consultation.</p>
      </LegalBody>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Looks like this beauty appointment took a wrong turn."
        lede="The page you are looking for doesn't exist — but your next appointment can."
      >
        <div className="hero-cta">
          <Link className="btn btn-light" to="/"><span>Return Home</span></Link>
          <Link className="btn btn-outline-light" to="/booking"><span>Book an Appointment</span></Link>
        </div>
      </PageHero>
    </>
  );
}
