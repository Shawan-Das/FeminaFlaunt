import { createContext, useContext, useEffect, useState } from "react";

/* Contacts context — all business/contact details come from
   public/contacts.json so they can be managed without code changes.   */

const ContactsContext = createContext(null);

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(import.meta.env.BASE_URL + "contacts.json")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then((data) => alive && setContacts(data))
      .catch((e) => alive && setError(e));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ContactsContext.Provider value={{ contacts, error }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactsContext);
}

/* Convenience hook returning safe link helpers — always returns the full
   shape (with neutral fallbacks) so components never crash while
   contacts.json is still loading. */
const FALLBACK = {
  tel: "#",
  telLabel: "",
  wa: () => "#",
  directions: "#",
  review: "",
  instagram: "",
  facebook: "",
  address: "",
  addressShort: "",
  hours: "",
  hoursShort: "",
  rating: "5.0",
  reviews: "",
};

export function useContactLinks() {
  const { contacts } = useContacts();
  if (!contacts) return FALLBACK;
  return {
    tel: "tel:" + contacts.phone.tel,
    telLabel: contacts.phone.display,
    wa: (key = "prefillDefault") =>
      "https://wa.me/" +
      contacts.whatsapp.number +
      "?text=" +
      encodeURIComponent(contacts.whatsapp[key] || contacts.whatsapp.prefillDefault),
    directions: contacts.links.directionsUrl,
    review: contacts.links.reviewUrl,
    instagram: contacts.social.instagram,
    facebook: contacts.social.facebook,
    address: contacts.address.lines.join(", "),
    addressShort: contacts.address.short,
    hours: contacts.hours.days + ", " + contacts.hours.time,
    hoursShort: contacts.hours.short,
    rating: contacts.google.rating,
    reviews: contacts.google.reviewCount,
  };
}
