"use client";

import { useState } from "react";
import VerticalStackSlider from "@/components/home/VerticalStackSlider";
const WEBSITE_TABS = ["Slide Images"]; // add General, Permissions, Notifications later

export default function WebsitePage() {
  const [activeTab, setActiveTab] = useState("Slide Images");

  return (
    <div>
      <nav className="border-b border-border mb-6">
        <ul className="flex space-x-6 text-sm font-medium">
          {WEBSITE_TABS.map((tab) => (
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
        {activeTab === "Slide Images" && <VerticalStackSlider />}
        {/* Add more Website sub-pages here */}
      </div>
    </div>
  );
}
