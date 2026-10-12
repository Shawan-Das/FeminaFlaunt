/* Femina Flaunt By Sabina — site behaviour
   Contact details are managed entirely through contacts.json            */

(async function () {
  "use strict";

  /* ---------- 1. Contacts (single source of truth) ---------- */
  let CONTACTS = null;
  try {
    const res = await fetch("contacts.json");
    CONTACTS = await res.json();
  } catch (e) {
    console.warn("contacts.json could not be loaded — please serve the site over HTTP (not file://).");
  }

  function fill(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }
  function setHref(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      if (el) el.setAttribute("href", value);
    });
  }

  if (CONTACTS) {
    const c = CONTACTS;

    // Address
    fill(".js-address", c.address.lines.join(", "));
    fill(".js-location-short", c.address.short);
    document.querySelectorAll(".js-address").forEach((el) => (el.textContent = c.address.lines.join(", ")));

    // Phone
    if (c.phone.display) {
      setHref(".js-phone-link", "tel:" + c.phone.tel);
      document.querySelectorAll(".js-phone-link").forEach((el) => (el.textContent = c.phone.display));
    } else {
      document.querySelectorAll(".js-phone-item, .js-phone-container").forEach((el) => (el.hidden = true));
    }

    // Hours
    fill(".js-hours", c.hours.days + ", " + c.hours.time);
    fill(".js-hours-short", c.hours.short);

    // Google rating / reviews
    fill(".js-google-rating", c.google.rating);
    if (c.google.reviewCount) {
      fill(".js-review-count", c.google.reviewCount);
    } else {
      document.querySelectorAll(".js-review-count").forEach((el) => (el.parentElement.hidden = true));
    }
    document.querySelectorAll(".js-rating").forEach((el) => (el.textContent = "★".repeat(Math.round(c.google.rating))));

    // WhatsApp links (prefilled per context)
    document.querySelectorAll("a.js-wa").forEach((a) => {
      const key = a.dataset.prefill || "prefillDefault";
      const msg = encodeURIComponent(c.whatsapp[key] || c.whatsapp.prefillDefault);
      a.href = "https://wa.me/" + c.whatsapp.number + "?text=" + msg;
      a.target = "_blank";
      a.rel = "noopener";
    });

    // Social links
    [
      [".js-instagram", c.social.instagram],
      [".js-facebook", c.social.facebook],
    ].forEach(([sel, url]) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (url) {
          el.setAttribute("href", url);
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      });
    });

    // Directions / review links
    if (c.links.directionsUrl) {
      setHref(".js-directions", c.links.directionsUrl);
    }
    if (c.links.reviewUrl) {
      setHref(".js-review-link", c.links.reviewUrl);
    }

    // Google Map embed (no API key needed — query-address embed)
    document.querySelectorAll(".js-map").forEach((el) => {
      const q = encodeURIComponent(c.address.mapsQuery || c.address.lines.join(", "));
      el.innerHTML =
        '<iframe title="Map — ' +
        c.business.name +
        '" src="https://maps.google.com/maps?q=' +
        q +
        '&output=embed" style="border:0;width:100%;height:100%;min-height:340px" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
    });
  }

  /* ---------- 2. Header: solid on scroll ---------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("solid", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 3. Mobile menu ---------- */
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- 4. Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll(".gal-item").forEach((item) => {
      const open = () => {
        const img = item.querySelector("img");
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
        lightboxClose.focus();
      };
      item.addEventListener("click", open);
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
    const close = () => lightbox.classList.remove("open");
    lightboxClose.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- 5. Scroll reveal (respects reduced motion) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- 6. Year ---------- */
  document.querySelectorAll("#year, .year").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- 7. Booking form (request-based, validated client-side) ---------- */
  const form = document.getElementById("bookingForm");
  if (form) {
    const serviceSelect = document.getElementById("service");
    if (CONTACTS) {
      const list = (CONTACTS.bookingServices && CONTACTS.bookingServices.services) || [];
      list.forEach((s) => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        serviceSelect.appendChild(opt);
      });
      const other = document.createElement("option");
      other.value = "Other";
      other.textContent = "Other";
      serviceSelect.appendChild(other);
    }

    const dateInput = document.getElementById("date");
    if (dateInput) {
      dateInput.min = new Date().toISOString().split("T")[0];
    }

    const errorBox = document.getElementById("formError");
    const successBox = document.getElementById("formSuccess");
    const successSummary = document.getElementById("successSummary");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      errorBox.hidden = true;

      const data = Object.fromEntries(new FormData(form).entries());

      if (!data.name || String(data.name).trim().length < 2) return showErr("Please enter your full name.");
      const digits = String(data.phone || "").replace(/\D/g, "");
      if (digits.length < 9) return showErr("Please enter a valid phone number.");
      if (!data.service) return showErr("Please select a service.");
      if (!data.date) return showErr("Please select your preferred date.");
      if (!data.time) return showErr("Please select your preferred time.");

      // MVP: no backend yet — this is a booking REQUEST.
      // To make it live, post `data` to a secure endpoint, or send it via
      // WhatsApp/email integration. See README for the handoff notes.
      if (successSummary && successBox) {
        successSummary.textContent =
          "Thank you, " + String(data.name).trim().split(" ")[0] + ". Your appointment request has been received. Our team will contact you shortly to confirm your preferred date and time.";
        form.hidden = true;
        successBox.classList.add("show");
        successBox.focus();
      }
    });

    function showErr(msg) {
      errorBox.textContent = msg;
      errorBox.hidden = false;
      errorBox.focus();
    }
  }
})();
