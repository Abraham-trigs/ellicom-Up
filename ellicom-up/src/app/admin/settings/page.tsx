"use client";

import { useState } from "react";
import WebsitePage from "./website/page";

const MAIN_TABS = ["Website"]; // add more later

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Website");

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-gray-900 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - Settings</h1>

      <nav className="border-b border-border mb-6">
        <ul className="flex space-x-6 text-sm font-medium">
          {MAIN_TABS.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                type="button"
                className={`pb-2 ${
                  activeTab === tab
                    ? "border-b-2 border-gold text-gold"
                    : "text-inactive hover:text-gold"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        {activeTab === "Website" && <WebsitePage />}
        {/* Add more top-level tab pages here */}
      </div>
    </div>
  );
}
