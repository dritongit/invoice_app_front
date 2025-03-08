import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "../utils/axiosInstance";

interface Invoice {
  id?: number;
  client: string;
  amount: number;
  status: string;
}

interface Contact {
  contact_id?: string;
  name: string;
  alternative: string;
  email1: string;
  isOffline?: boolean;
}

interface Article {
  article_id?: string;
  name: string;
  unit_price: string;
}

interface AppContextType {
  invoices: Invoice[];
  contacts: Contact[];
  articles: Article[];
  fetchInvoices: () => void;
  fetchContacts: () => void;
  fetchArticles: () => void;
  addInvoice: (invoice: Omit<Invoice, "id">) => void;
  addContact: (contact: Omit<Contact, "contact_id">) => void;
  addArticle: (article: Omit<Article, "id">) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("/invoices");
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get("/contacts");
      setContacts([...response.data, ...getOfflineContacts()]);
    } catch (error) {
      console.error("Error fetching contacts", error);
      setContacts(getOfflineContacts());
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles", error);
    }
  };

  const addInvoice = async (invoice: Omit<Invoice, "id">) => {
    await axios.post("/invoice_add", invoice);
    fetchInvoices();
  };

  const addContact = async (contact: Omit<Contact, "contact_id">) => {
    if (navigator.onLine) {
      await axios.post("/contacts", contact);
      fetchContacts();
    } else {
      saveOfflineContact(contact);
      setContacts((prev) => [contact, ...prev]);
    }
  };

  const addArticle = async (article: Omit<Article, "id">) => {
    await axios.post("/article_add", article);
    fetchArticles();
  };

  const saveOfflineContact = (contact: Contact) => {
    const offlineContacts = getOfflineContacts();
    offlineContacts.push(contact);
    localStorage.setItem("offlineContacts", JSON.stringify(offlineContacts));
  };

  const getOfflineContacts = (): Contact[] => {
    return JSON.parse(localStorage.getItem("offlineContacts") || "[]");
  };

  const syncOfflineContacts = async () => {
    const offlineContacts = getOfflineContacts();
    if (offlineContacts.length === 0) return;
    for (const contact of offlineContacts) {
      try {
        await addContact(contact); //  Send each contact to backend
      } catch (error) {
      }
    }
  
    // ✅ Clear offline contacts after successful sync
    localStorage.removeItem("offlineContacts");
    fetchContacts(); // ✅ Refresh the contact list
  };
  

  useEffect(() => {
    fetchInvoices();
    fetchContacts();
    fetchArticles();

    window.addEventListener("online", syncOfflineContacts);
    return () => {
      window.removeEventListener("online", fetchContacts);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        invoices,
        contacts,
        articles,
        fetchInvoices,
        fetchContacts,
        fetchArticles,
        addInvoice,
        addContact,
        addArticle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
