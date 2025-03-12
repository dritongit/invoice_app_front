import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext, Contact } from "../context/AppContext";

interface ContactSearchProps {
  onSelect: (contact: Contact) => void;
}

const ContactSearch: React.FC<ContactSearchProps> = ({ onSelect }) => {
  const appContext = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setShowResults(false);
      return;
    }

    // ✅ Prevent multiple API calls by using debounce
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      appContext?.searchContacts(query);
      setShowResults(true);
    }, 500); // API call only after 500ms of inactivity

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query, appContext?.searchContacts]);

  // ✅ Hide when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!appContext) {
    return <p>Loading...</p>;
  }

  return (
    <div ref={searchRef} className="contact-search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search contacts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.trim() && setShowResults(true)}
      />
      {showResults && appContext?.searchResults.length > 0 && (
        <ul className="search-results">
          {appContext?.searchResults.map((contact) => (
            <li
              key={contact.contact_id}
              onClick={() => {
                onSelect(contact); // ✅ Select the contact
                setQuery(""); // ✅ Clear input field
                setShowResults(false); // ✅ Hide the list after selection
              }}
            >
              {contact.name} - {contact.email1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactSearch;
