import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useContacts, useContactLinks } from "../contacts.jsx";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Header ---------------- */
function Header({ overHero }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <header
      className={`site-header ${overHero ? "over-hero" : ""} ${solid ? "solid" : ""} ${open ? "menu-open" : ""}`}
    >
      <div className="header-inner">
        <Link className="logo" to="/" onClick={() => setOpen(false)}>
          Femina Flaunt <small>By Sabina</small>
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mainNav"
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="mainNav" className={`main-nav ${open ? "open" : ""}`} aria-label="Main">
          <NavLink to="/" className={navClass} end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/about" className={navClass} onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/services" className={navClass} onClick={() => setOpen(false)}>Services</NavLink>
          <NavLink to="/bridal" className={navClass} onClick={() => setOpen(false)}>Bridal</NavLink>
          <NavLink to="/gallery" className={navClass} onClick={() => setOpen(false)}>Gallery</NavLink>
          <NavLink to="/contact" className={navClass} onClick={() => setOpen(false)}>Contact</NavLink>
          <Link className="btn btn-outline-light booking-mobile" to="/booking" onClick={() => setOpen(false)}>
            <span>Book Appointment</span>
          </Link>
          <Link className="btn btn-outline-light nav-cta" to="/booking">
            <span>Book Appointment</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Floating WhatsApp ---------------- */
function WhatsAppFloat() {
  const links = useContactLinks();
  if (!links.wa) return null;
  return (
    <motion.a
      className="wa-float"
      href={links.wa()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      aria-label="Chat on WhatsApp"
    >
      <span>Chat on WhatsApp</span>
    </motion.a>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const c = useContacts();
  const links = useContactLinks();
  if (!c.contacts) return null;
  const contacts = c.contacts;
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h4>Femina Flaunt By Sabina</h4>
            <p style={{ maxWidth: "26ch", opacity: 0.8 }}>{links.address}</p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/bridal">Bridal</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={links.tel}>{links.telLabel}</a>
            <a href={links.wa()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            {contacts.social.instagram && (
              <a href={contacts.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            )}
            {contacts.social.facebook && (
              <a href={contacts.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            )}
            <p style={{ opacity: 0.8 }}>{links.hoursShort}</p>
          </div>
          <div>
            <h4>Book</h4>
            <Link className="btn btn-outline-light" to="/booking" style={{ display: "inline-block" }}>
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
        <div className="footer-mark" aria-hidden="true">Femina Flaunt</div>
        <div className="footer-bottom">
          <span>© {year} Femina Flaunt By Sabina. All rights reserved.</span>
          <span>
            <Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Scroll to top on route change ---------------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* ---------------- Root layout with page transitions ---------------- */
export default function Context() {
  const { error } = useContacts();

  /* Every route begins with a dark hero section, so the header always starts
     in "over dark hero" mode and switches to its ivory solid state on scroll. */
  return (
    <>
      <ScrollToTop />
      <Header overHero />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFloat />
      {error && (
        <div style={{ padding: "0.5rem 1rem", background: "#4a2019", color: "#fff", fontSize: "0.8rem" }}>
          contacts.json failed to load — serve the app over HTTP and check public/contacts.json.
        </div>
      )}
    </>
  );
}
