import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "../utils/axiosInstance";

interface Invoice {
  invoice_id: string;
  name: string;
  alternative: string;
  total_unit_price: number;
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
  currentPage: number,
  totalPages: number,
  fetchInvoices: () => void;
  fetchContacts: () => void;
  fetchArticles: () => void;
  addInvoice: (invoice: Omit<Invoice, "invoice_id">) => void;
  addContact: (contact: Omit<Contact, "contact_id">) => void;
  addArticle: (article: Omit<Article, "id">) => void;
  setCurrentPage: (page: number) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Records per page

  const fetchInvoices = async (page = 1) => {
    try {
      const response = await axios.get(`/invoices?page=${page}&limit=${limit}`);
      setInvoices(response.data.data);
      setTotalPages(Math.ceil(response.data.total / limit));

      // const response = await axios.get("/invoices");
      setInvoices(response.data.data);
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

  const addInvoice = async (invoice: Omit<Invoice, "invoice_id">) => {
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
    fetchInvoices(currentPage);
    fetchContacts();
    fetchArticles();

    window.addEventListener("online", syncOfflineContacts);
    return () => {
      window.removeEventListener("online", fetchContacts);
    };
  }, [currentPage]);

  return (
    <AppContext.Provider
      value={{
        invoices,
        contacts,
        articles,
        currentPage, 
        totalPages, 
        setCurrentPage,
        fetchInvoices,
        fetchContacts,
        fetchArticles,
        addInvoice,
        addContact,
        addArticle
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
