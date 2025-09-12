"use client";

import React from "react";
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
  icon?: React.ReactNode; // made optional
}

// If icon is missing, we'll show a default icon (FaGem)
const defaultIcon = <FaGem />;

const services: Service[] = [
  {
    title: "Printing",
    description: "High-quality printing services in all sizes.",
    icon: <FaPrint />,
  },
  {
    title: "Design",
    description: "Professional design for your projects.",
    icon: <FaPaintBrush />,
  },
  {
    title: "Scanning",
    description: "Accurate and fast document scanning.",
    icon: <FaFileUpload />,
  },
  {
    title: "Binding",
    description: "Durable binding solutions for your work.",
    icon: <FaBook />,
  },
  {
    title: "Lamination",
    description: "Protect your documents with lamination.",
    icon: <FaStickyNote />,
  },
  {
    title: "Industrial Lamination",
    description: "Heavy-duty lamination for large projects and materials.",
    icon: <FaStickyNote />,
  },
  {
    title: "Photocopying",
    description: "Quick and precise photocopying services.",
    icon: <FaPrint />,
  },
  {
    title: "Large Format Printing",
    description: "Banners, posters, and other large-scale prints.",
    icon: <FaPrint />,
  },
  {
    title: "Typography & Typing",
    description: "Professional typing and document formatting services.",
    icon: <FaLaptopCode />,
  },
  {
    title: "Custom Projects",
    description:
      "Tailored solutions to meet your unique printing and design needs.",
    icon: <FaGem />,
  },
  {
    title: "Graphic Design",
    description: "Logos, brochures, and complete brand identity design.",
    icon: <FaPaintBrush />,
  },
  {
    title: "Digital Printing",
    description: "Fast digital printing for short and medium runs.",
    icon: <FaPrint />,
  },
  {
    title: "Offset Printing",
    description:
      "High-volume, consistent quality printing for professional projects.",
    icon: <FaPrint />,
  },
  {
    title: "Photo Printing",
    description: "High-resolution photo prints and enlargements.",
    icon: <FaPhotoVideo />,
  },
  {
    title: "Print and Cut",
    description:
      "Precision cutting and printing for stickers, decals, and custom shapes.",
    icon: <FaCut />,
  },
  {
    title: "Textile Printing",
    description:
      "Printing directly onto fabrics for custom apparel and merchandise.",
    icon: <FaTshirt />,
  },
  {
    title: "DTF Printing",
    description:
      "Direct-to-Film printing for vibrant, durable designs on textiles.",
    icon: <FaTshirt />,
  },
  {
    title: "Screen Printing",
    description:
      "Traditional screen printing for textiles and promotional items.",
    icon: <FaTshirt />,
  },
  {
    title: "Heat Transfer Printing",
    description:
      "Transfer your designs onto textiles using heat for lasting prints.",
    icon: <FaTshirt />,
  },
  {
    title: "Document Management",
    description: "Organize, store, and manage documents efficiently.",
  },
  {
    title: "Consultation",
    description:
      "Expert advice on printing, finishing, and branding solutions.",
  },
  {
    title: "Artwork Reproduction",
    description: "Accurate reproductions of artwork, logos, and designs.",
  },
  {
    title: "Promotional Materials",
    description: "Flyers, business cards, and marketing collateral.",
  },
  {
    title: "Packaging Design",
    description: "Custom packaging solutions for products.",
  },
  {
    title: "Vehicle Wraps",
    description: "Eye-catching branding on cars, vans, and other vehicles.",
    icon: <FaCar />,
  },
  {
    title: "Outdoor Advertising",
    description:
      "Billboards, banners, and other outdoor promotional materials.",
  },
  {
    title: "Picture Coverage",
    description: "Professional photography for events and projects.",
    icon: <FaPhotoVideo />,
  },
  {
    title: "Video Coverage",
    description:
      "High-quality videography for ceremonies, corporate events, and marketing.",
    icon: <FaPhotoVideo />,
  },
  {
    title: "Car Branding",
    description: "Custom wraps, decals, and graphics for vehicles.",
    icon: <FaCar />,
  },
  {
    title: "Social Media Content",
    description: "Graphics and visuals for online campaigns and engagement.",
  },
  {
    title: "Event Signage",
    description: "Banners, standees, and signage for events and exhibitions.",
  },
  {
    title: "Flyer & Poster Distribution",
    description: "Efficient distribution of marketing materials.",
  },
  {
    title: "Signboards & Banners",
    description: "Indoor and outdoor signage solutions.",
  },
  {
    title: "Merchandise Printing",
    description: "Custom T-shirts, mugs, and branded items.",
    icon: <FaTshirt />,
  },
  {
    title: "Brochure & Catalog Printing",
    description: "Professional print materials for products and services.",
  },
  {
    title: "Branding Consultation",
    description: "Tailored advice to boost your brand visibility.",
  },
  {
    title: "Digital Marketing Graphics",
    description: "Eye-catching visuals for online campaigns and ads.",
  },
  {
    title: "Corporate Gifts & Printing",
    description: "Custom-branded gifts for businesses.",
    icon: <FaGem />,
  },
  {
    title: "Photography for Products",
    description: "Professional product photos for catalogs or online stores.",
    icon: <FaPhotoVideo />,
  },
  {
    title: "Event Documentation",
    description: "Complete coverage of corporate and private events.",
    icon: <FaPhotoVideo />,
  },
  {
    title: "Custom Stickers & Decals",
    description: "Personalized stickers for branding or personal use.",
    icon: <FaCut />,
  },
  {
    title: "Infographics & Charts",
    description:
      "Design clear, professional infographics for reports or presentations.",
  },
  {
    title: "E-signage & LED Displays",
    description: "Digital displays for advertising and announcements.",
  },
  {
    title: "Creative Copywriting",
    description: "Engaging copy to complement visuals and campaigns.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 bg-ground ">
      <h2 className="text-4xl font-bold text-center mb-12 text-textPrimary text-high">
        Our Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="border-container hover:bg-gold border-2 bg-neonSea rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4 text-center items-center"
          >
            <div className="text-4xl text-ground">
              {service.icon || defaultIcon}
            </div>
            <h3 className="text-xl text-ground font-bold text-textPrimary">
              {service.title}
            </h3>
            <p className="text-textSecondary text-ground font-semibold">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
