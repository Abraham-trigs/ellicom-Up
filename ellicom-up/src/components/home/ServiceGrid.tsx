"use client";

import React, { useState } from "react";
import {
  FaPrint,
  FaPaintBrush,
  FaFileUpload,
  FaBook,
  FaStickyNote,
  FaPhotoVideo,
  FaCar,
  FaTshirt,
  FaCut,
  FaGem,
  FaLaptopCode,
} from "react-icons/fa";

interface Service {
  title: string;
  description: string;
  icon?: React.ReactNode;
  category: "Design" | "Print" | "Advertise" | "Brand";
}

const defaultIcon = <FaGem />;

const services: Service[] = [
  // ---- DESIGN ----
  {
    title: "Graphic Design",
    description: "Logos, brochures, and brand identity design.",
    icon: <FaPaintBrush />,
    category: "Design",
  },
  {
    title: "Typography & Typing",
    description: "Professional typing and document formatting.",
    icon: <FaLaptopCode />,
    category: "Design",
  },
  {
    title: "Artwork Reproduction",
    description: "Accurate reproductions of artwork, logos, and designs.",
    category: "Design",
  },
  {
    title: "Packaging Design",
    description: "Custom packaging solutions for products.",
    category: "Design",
  },
  {
    title: "Infographics & Charts",
    description: "Professional infographics for reports or presentations.",
    category: "Design",
  },
  {
    title: "Digital Marketing Graphics",
    description: "Eye-catching visuals for online campaigns and ads.",
    category: "Design",
  },
  {
    title: "Creative Copywriting",
    description: "Engaging copy to complement visuals and campaigns.",
    category: "Design",
  },

  // ---- PRINT ----
  {
    title: "Printing",
    description: "High-quality printing services in all sizes.",
    icon: <FaPrint />,
    category: "Print",
  },
  {
    title: "Digital Printing",
    description: "Fast digital printing for short and medium runs.",
    icon: <FaPrint />,
    category: "Print",
  },
  {
    title: "Offset Printing",
    description: "High-volume, consistent quality printing.",
    icon: <FaPrint />,
    category: "Print",
  },
  {
    title: "Large Format Printing",
    description: "Banners, posters, and other large-scale prints.",
    icon: <FaPrint />,
    category: "Print",
  },
  {
    title: "Photo Printing",
    description: "High-resolution photo prints and enlargements.",
    icon: <FaPhotoVideo />,
    category: "Print",
  },
  {
    title: "DTF Printing",
    description: "Direct-to-Film printing for vibrant, durable designs.",
    icon: <FaTshirt />,
    category: "Print",
  },
  {
    title: "Screen Printing",
    description: "Traditional screen printing for textiles.",
    icon: <FaTshirt />,
    category: "Print",
  },
  {
    title: "Heat Transfer Printing",
    description: "Transfer designs onto textiles using heat.",
    icon: <FaTshirt />,
    category: "Print",
  },
  {
    title: "Textile Printing",
    description: "Printing directly onto fabrics for apparel & merchandise.",
    icon: <FaTshirt />,
    category: "Print",
  },
  {
    title: "Photocopying",
    description: "Quick and precise photocopying services.",
    icon: <FaPrint />,
    category: "Print",
  },
  {
    title: "Binding",
    description: "Durable binding solutions for your work.",
    icon: <FaBook />,
    category: "Print",
  },
  {
    title: "Lamination",
    description: "Protect your documents with lamination.",
    icon: <FaStickyNote />,
    category: "Print",
  },
  {
    title: "Industrial Lamination",
    description: "Heavy-duty lamination for large projects.",
    icon: <FaStickyNote />,
    category: "Print",
  },
  {
    title: "Scanning",
    description: "Accurate and fast document scanning.",
    icon: <FaFileUpload />,
    category: "Print",
  },
  {
    title: "Custom Stickers & Decals",
    description: "Personalized stickers for branding or personal use.",
    icon: <FaCut />,
    category: "Print",
  },
  {
    title: "Brochure & Catalog Printing",
    description: "Professional print materials for products & services.",
    category: "Print",
  },

  // ---- ADVERTISE ----
  {
    title: "Outdoor Advertising",
    description: "Billboards, banners, and outdoor promotional materials.",
    category: "Advertise",
  },
  {
    title: "Event Signage",
    description: "Banners, standees, and signage for exhibitions & events.",
    category: "Advertise",
  },
  {
    title: "Signboards & Banners",
    description: "Indoor and outdoor signage solutions.",
    category: "Advertise",
  },
  {
    title: "Flyer & Poster Distribution",
    description: "Efficient distribution of marketing materials.",
    category: "Advertise",
  },
  {
    title: "Social Media Content",
    description: "Graphics and visuals for online campaigns.",
    category: "Advertise",
  },
  {
    title: "E-signage & LED Displays",
    description: "Digital displays for advertising and announcements.",
    category: "Advertise",
  },
  {
    title: "Promotional Materials",
    description: "Flyers, business cards, and marketing collateral.",
    category: "Advertise",
  },

  // ---- BRAND ----
  {
    title: "Car Branding",
    description: "Custom wraps, decals, and graphics for vehicles.",
    icon: <FaCar />,
    category: "Brand",
  },
  {
    title: "Vehicle Wraps",
    description: "Eye-catching branding on cars, vans, and vehicles.",
    icon: <FaCar />,
    category: "Brand",
  },
  {
    title: "Merchandise Printing",
    description: "Custom T-shirts, mugs, and branded items.",
    icon: <FaTshirt />,
    category: "Brand",
  },
  {
    title: "Corporate Gifts & Printing",
    description: "Custom-branded gifts for businesses.",
    icon: <FaGem />,
    category: "Brand",
  },
  {
    title: "Branding Consultation",
    description: "Tailored advice to boost your brand visibility.",
    category: "Brand",
  },
];

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<
    "Design" | "Print" | "Advertise" | "Brand" | "All"
  >("All");

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 bg-ground">
      <h2 className="text-4xl font-bold text-center text-gold mb-8 text-textPrimary">
        Our Services
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["Design", "Print", "Advertise", "Brand", "All"].map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setActiveCategory(
                cat as "Design" | "Print" | "Advertise" | "Brand" | "All"
              )
            }
            className={`px-6 py-2 rounded-full border-2 transition-all font-semibold
              ${
                activeCategory === cat
                  ? "bg-gold text-ground border-gold"
                  : "bg-surface text-textPrimary border-border hover:bg-gold hover:text-ground"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredServices.map((service, idx) => (
          <div
            key={idx}
            className="border-container hover:bg-gold border-2 bg-neonSea rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4 text-center items-center"
          >
            <div className="text-4xl text-ground">
              {service.icon || defaultIcon}
            </div>
            <h3 className="text-xl font-bold text-ground">{service.title}</h3>
            <p className="text-textSecondary text-ground font-semibold">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
