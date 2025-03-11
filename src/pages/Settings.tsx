import React, {useState, useRef, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import './../styles/Tabs.css';

const Settings = () => {
    // Move useRef calls outside the conditional block
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const [activeTab, setActiveTab] = useState("tab1");

    const authContext = useContext(AuthContext);
    if (!authContext) return null;
    const { userSettings } = authContext;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!nameRef.current || !emailRef.current || !phoneRef.current) return;
  
      const newSettings = {
        name: nameRef.current.value,
        alternative: emailRef.current.value,
        email1: phoneRef.current.value,
      };
    };

  return (
    <div>
      <h2>Settings</h2>
      <div className="tab-content active" id="products">

      </div>
      <div className="tabs-container">
      {/* Tab Buttons */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => setActiveTab("tab1")}
          >
            Tab 1
          </button>
          <button
            className={`tab-btn ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => setActiveTab("tab2")}
          >
            Tab 2
          </button>
          <button
            className={`tab-btn ${activeTab === "tab3" ? "active" : ""}`}
            onClick={() => setActiveTab("tab3")}
          >
            Tab 3
          </button>
        </div>
        <div className="tab-contents">
          <div className={`tab-content ${activeTab === "tab1" ? "active" : ""}`} id="tab1">
            <h3>Content for Tab 1</h3>
            <p>This is Tab 1 content.</p>
            <form onSubmit={handleSubmit}>
              <input type="text" ref={nameRef} placeholder="Name" required />
              <input type="email" ref={emailRef} placeholder="alternative" required />
              <input type="text" ref={phoneRef} placeholder="email1" required />
              <p>{userSettings?.settings_tax_rate || "Not Set"}</p>
              <button type="submit">Save Contact</button>
              {/* <button type="button" className="close-btn" onClick={onClose}> */}
                Close
              {/* </button> */}
            </form>
          </div>
          <div className={`tab-content ${activeTab === "tab2" ? "active" : ""}`} id="tab2">
            <h3>Content for Tab 2</h3>
            <p>This is Tab 2 content.</p>
          </div>
          <div className={`tab-content ${activeTab === "tab3" ? "active" : ""}`} id="tab3">
            <h3>Content for Tab 3</h3>
            <p>This is Tab 3 content.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;