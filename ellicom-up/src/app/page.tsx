"use client";

import Head from "next/head";
import Navbar from "@/components/home/Navbar";
import TagAndSlider from "@/components/home/TagAndSlider";
import ImageDisplay from "@/components/home/ImageDisplay";
import SendJobButton from "@/components/SendJobButton";
import ServiceGrid from "@/components/home/ServiceGrid";
import TextilePrintingSVG from "@/components/home/TextilePrinting/TextilePrnting";
import DTFsvg from "@/components/home/DtfPrinting/DTFPrinting";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import DigitalPrintingImage from "@/components/home/DigitalPrinting/DigitalPrintingImages";
import DTFImageDisplay from "@/components/home/DtfPrinting/DTFImageDisplay";

export default function Home() {
  const bannerImages = [
    { src: "/largeformat-640.webp", width: 640 },
    { src: "/largeformat-1024.webp", width: 1024 },
    { src: "/largeformat-1440.webp", width: 1440 },
  ];

  const clothImages = [
    { src: "/cloth-640.webp", width: 640 },
    { src: "/cloth-1024.webp", width: 1024 },
    { src: "/cloth-1440.webp", width: 1440 },
  ];

  const dtfCollections = ["/dtf-1040.webp", "/dtf-1-1040.webp"];
  const [dtfIndex, setDtfIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDtfIndex((prev) =>
        prev === dtfCollections.length - 1 ? 0 : prev + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const materials = [
    "SAV",
    "Flex Banner",
    "Blockout Flex",
    "Mesh Banner",
    "One Way Vision Vinyl",
    "Transparent Film",
    "Backlit Film",
    "Poster Paper",
    "Photo Paper",
    "Canvas",
    "Polyester Fabric",
    "Textile Banner",
    "Foam Board",
    "Acrylic",
    "Aluminum Composite Panel",
    "Correx",
    "Magnetic Sheet",
    "Window Cling",
    "Wall Paper",
    "Floor Graphics Vinyl",
    "Reflective Vinyl",
    "Glow in the Dark Vinyl",
    "Heat Transfer Vinyl",
    "Lightbox Fabric",
    "Outdoor Heavy-Duty Flex",
    "Polypropylene Film",
    "PVC Sheets",
  ];

  const [materialIndex, setMaterialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMaterialIndex((prev) => (prev + 1) % materials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>
          Ellicom Multimedia | Large Format, Textile, DTF & Sticker Printing
          Services
        </title>
        <meta
          name="description"
          content="Ellicom Multimedia offers professional Large Format, Textile, DTF, Digital, and Sticker Printing services. Serving businesses, schools, fashion designers, and individuals both locally and remotely."
        />
        <meta
          name="keywords"
          content="Printing, Large Format, Textile Printing, DTF Printing, Digital Printing, Sticker Printing, Custom Apparel, Banners, Posters, Promotional Items, Vinyl Stickers"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Ellicom Multimedia | Printing Services"
        />
        <meta
          property="og:description"
          content="High-quality Large Format, Textile, DTF, Digital, and Sticker Printing for businesses, schools, and individuals."
        />
        <meta property="og:image" content="/og-image.webp" />
        <meta property="og:url" content="https://www.ellicom.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ellicom Multimedia | Printing Services"
        />
        <meta
          name="twitter:description"
          content="High-quality Large Format, Textile, DTF, Digital, and Sticker Printing for businesses, schools, and individuals."
        />
        <meta name="twitter:image" content="/og-image.webp" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Structured Data for Physical + Remote operations */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Ellicom Multimedia",
              image: "https://www.ellicom.com/og-image.webp",
              url: "https://www.ellicom.com",
              telephone: "+233XXXXXXXXX",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Your Street Address",
                addressLocality: "City",
                addressRegion: "Region",
                postalCode: "PostalCode",
                addressCountry: "GH",
              },
              sameAs: [
                "https://www.facebook.com/ellicom",
                "https://www.instagram.com/ellicom",
                "https://twitter.com/ellicom",
              ],
              priceRange: "$$",
              openingHours: "Mo,Tu,We,Th,Fr 08:00-18:00",
              description:
                "Ellicom Multimedia offers high-quality Large Format, Textile, DTF, Digital, and Sticker Printing services for businesses, schools, fashion designers, and individuals. We operate both from our physical location and remotely to serve clients worldwide.",
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Large Format Printing",
                    description:
                      "Banners, posters, mesh banners, backlit film, window cling, floor graphics, and aluminum composite panels.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Textile Printing",
                    description:
                      "Custom apparel including t-shirts, hoodies, uniforms, choir robes, tote bags, canvas prints, and sportswear.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "DTF Printing",
                    description:
                      "Direct-to-Film printing for t-shirts, hoodies, small batch apparel, and custom designs.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Sticker Printing",
                    description:
                      "Vinyl stickers, die-cut labels, promotional stickers, and custom shapes for indoor and outdoor use.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Digital Printing",
                    description:
                      "Flyers, brochures, posters, promotional cards, and business stationery.",
                  },
                },
              ],
              branchOf: {
                "@type": "Organization",
                name: "Ellicom Multimedia",
                url: "https://www.ellicom.com",
                logo: "https://www.ellicom.com/og-image.webp",
              },
              areaServed: {
                "@type": "Country",
                name: "Ghana",
              },
              additionalType: "https://schema.org/RemoteBusiness",
            }),
          }}
        />
      </Head>

      <Navbar />

      <main className="relative z-10 flex flex-col gap-12 min-h-screen p-8 dark:bg-opacity-60 text-sea dark:text-textPrimary transition-colors">
        {/* Section 1: Tag & Slider + SameDay */}
        <TagAndSlider />

        {/* Section 2: Content below SameDay */}
        <div className="-mt-20 flex flex-col items-center gap-4 text-center">
          <motion.h1
            className="font-bold text-5xl"
            animate={{ color: ["#e5e5e5", "#ffd700", "#e5e5e5"] }} // textPrimary -> gold -> textPrimary
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            Large Format Printing
          </motion.h1>

          {/* Rotating materials below */}
          <div className="relative h-20 mt-2 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={materials[materialIndex]}
                className="inline-block  bg-sea rounded-md px-4 py-4"
                initial={{ width: 0, opacity: 0, scale: 0.8 }}
                animate={{ width: "auto", opacity: 1, scale: 1 }}
                exit={{ width: 0, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.p
                  className="text-ground text-3xl font-bold whitespace-nowrap"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {materials[materialIndex]}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            className="text-gold text-2xl font-bold"
            animate={{ opacity: [1, 0, 1] }} // fade out and back in
            transition={{
              duration: 1, // 1 second for one blink cycle
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            Available Now
          </motion.p>
        </div>

        {/* TEXTILE PRINTING*/}
        <ImageDisplay
          images={bannerImages}
          alt="Large Format Printing Banner"
        />
        <div className="flex justify-center -mt-20 mb-16">
          <SendJobButton
            label="Send Print / Designs Now"
            onClick={() => alert("Send Print / Designs Now clicked")}
          />
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-center 
                max-w-6xl mx-auto px-4 gap-8 md:gap-12 lg:gap-16"
        >
          {/* Text Section */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-2xl text-center md:text-left">
              <TextilePrintingSVG />

              <p className="mt-4 text-lg text-textSecondary">
                Our{" "}
                <span className="text-head font-bold">Textile Printing</span>{" "}
                service brings your designs to life on a wide variety of
                fabrics. Whether it’s soft cotton for t-shirts, durable
                polyester for sportswear, elegant silk for fashion pieces, or
                sturdy canvas for banners and tote bags, we ensure vibrant,
                long-lasting prints. We also work with blends, linen, jersey,
                and microfiber, giving you the flexibility to create uniforms,
                branded apparel, promotional items, or custom fashion pieces
                with unmatched quality and color accuracy.
              </p>

              <p className="mt-2 text-lg text-textSecondary">
                We serve schools looking for uniforms and branded wear, churches
                in need of choir robes or event banners, businesses requiring
                staff shirts and promotional textiles, as well as fashion
                designers and individuals seeking unique, customized prints for
                personal use.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-xl">
              <ImageDisplay images={clothImages} alt="Cloth Banner" />
            </div>
          </div>
        </div>

        {/* DTF SECTION  */}
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 gap-8 md:gap-12 lg:gap-16">
          {/* Image Section (Left) */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-xl bg-high rounded-md p-4">
              <DTFImageDisplay images={dtfCollections} alt="DTF Banner" />
            </div>
          </div>

          {/* SVG + Text Section (Right) */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-2xl text-center md:text-left">
              <DTFsvg />

              <p className="mt-4 text-lg text-textSecondary">
                Our <span className="text-head font-bold">DTF Printing</span>{" "}
                service ensures high-quality, vibrant prints on various
                textiles. Perfect for t-shirts, hoodies, and other apparel, we
                deliver long-lasting designs with precise color accuracy and
                flexibility for small or bulk orders.
              </p>

              <p className="mt-2 text-lg text-textSecondary">
                We serve schools, businesses, fashion designers, and individuals
                seeking custom apparel with unique designs that stand out.
              </p>
            </div>
          </div>
        </div>

        {/* DIGITAL PRINTING */}
        <div className="bg-sea hover:bg-gold w-full">
          <div className="mx-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
            <DigitalPrintingImage />
          </div>
        </div>

        <div className="">
          <ServiceGrid />
        </div>
      </main>
    </>
  );
}
