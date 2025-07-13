import * as React from "react";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import "@fontsource/montserrat"; // Import Montserrat font

// Industry data array
const industries = [
  {
    id: 1,
    title: "Metals & Foundry",
    description:
      "Robust packaging solutions engineered to withstand extreme conditions. Supporting the heavy-duty demands of the metals and foundry industry with strength and precision.",
    image: "/hero/Serve/4.png",
  },
  {
    id: 2,
    title: "Automotive & Engineering",
    description:
      "Secure packaging that safeguards delicate automotive and engineering parts. Ensures damage-free shipping and supports efficient logistics.",
    image: "/hero/Serve/5.png",
  },
  {
    id: 3,
    title: "Food & Beverage",
    description:
      "Hygienic and reliable packaging that maintains freshness and safety. Eco-friendly options to enhance product appeal and shelf life.",
    image: "/hero/Serve/6.png",
  },
  {
    id: 4,
    title: "Agriculture & Tea Export",
    description:
      "Packaging that preserves quality and aroma, protecting against moisture and contamination. Compliant with global export standards for freshness.",
    image: "/hero/Serve/1.png",
  },
  {
    id: 5,
    title: "Export & Logistics",
    description:
      "Robust packaging optimized for international shipping. Protects products with cushioning and smart design for timely delivery.",
    image: "/hero/Serve/2.png",
  },
  {
    id: 6,
    title: "Defense & Aerospace",
    description:
      "High-strength packaging for sensitive components. Provides protection from impact and environmental hazards, meeting strict industry standards.",
    image: "/hero/Serve/3.png",
  },
];

// ========================================
// REUSABLE INDUSTRY CARD COMPONENT
// ========================================
// Props:
// - title: Card title text
// - description: Card description text
// - image: Image source URL
// - isHovered: Boolean to show hover effects
// - onMouseEnter/onMouseLeave: Hover event handlers
// - onTouchStart/onTouchEnd: Touch event handlers for mobile
function IndustryCard({ 
  title, 
  description, 
  image, 
  isHovered, 
  onMouseEnter, 
  onMouseLeave,
  onTouchStart,
  onTouchEnd 
}) {
  return (
    <div
      className={`relative shrink-0 rounded-2xl sm:rounded-3xl border-2 border-black border-solid 
      h-[300px] w-[320px] 
      sm:h-[300px] sm:w-[340px] 
      md:h-[320px] md:w-[360px] 
      lg:h-[340px] lg:w-[380px] 
      xl:h-[359px] xl:w-[400px] 
      2xl:h-[380px] 2xl:w-[420px]
      max-w-full
      transition-all duration-300 ease-in-out
      ${isHovered ? "scale-105 z-30" : "shadow-md z-10"}
      cursor-pointer select-none
      will-change-transform
      overflow-visible
      `}
      style={{ background: "linear-gradient(to top right, white, #F6DFAA)", zIndex: isHovered ? 30 : 10, overflow: 'visible' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Card title header */}
      <div className="absolute left-1/2 top-2 sm:top-2.5 transform -translate-x-1/2 px-3 sm:px-4 lg:px-5 py-0 
      text-sm sm:text-base md:text-lg lg:text-xl 
      text-center text-white bg-black 
      rounded-t-xl sm:rounded-t-2xl rounded-b-none sm:rounded-b-none
      h-[50px] sm:h-[60px] md:h-[65px] lg:h-[70px] xl:h-[73px] 
      w-[calc(100%_-_16px)] sm:w-[calc(100%_-_20px)] lg:w-[calc(100%_-_24px)]
      flex items-center justify-center">
        {title}
      </div>

      {/* Gradient border wrapper for description box */}
      <div
        className="box-border absolute shrink-0 
        h-[220px] sm:h-[210px] md:h-[220px] lg:h-[240px] xl:h-[258px] 2xl:h-[280px]
        left-[8px] sm:left-[9px] 
        top-[65px] sm:top-[75px] md:top-[80px] lg:top-[85px] xl:top-[88px] 
        w-[calc(100%_-_16px)] sm:w-[calc(100%_-_18px)] 
        rounded-b-xl sm:rounded-b-2xl rounded-t-none sm:rounded-t-none p-[1.5px] overflow-visible"
        style={{
          background: "linear-gradient(to bottom, transparent, black)",
          overflow: "visible"
        }}
      >
        {/* Inner description box */}
        <div
          className="h-full w-full rounded-xl sm:rounded-2xl px-3 sm:px-4 pt-5 sm:pt-6 lg:pt-7 pb-0 bg-white overflow-visible"
          style={{ background: "linear-gradient(to top right, white, #F6DFAA)", overflow: "visible" }}
        >
          <div
            className="mb-6 sm:mb-8 lg:mb-10 
            text-[15px] sm:text-sm md:text-base lg:text-xl 
            text-center text-black w-full font-normal leading-normal"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {description}
          </div>
          
          {/* Circular icon positioned at bottom center */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
          h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] md:h-[75px] md:w-[75px] lg:h-[80px] lg:w-[80px] xl:h-[88px] xl:w-[88px]">
            <img
              src={image}
              alt=""
              className="absolute top-0.5 left-0.5 shrink-0 aspect-[1/1] 
              h-[56px] w-[56px] sm:h-[66px] sm:w-[66px] md:h-[71px] md:w-[71px] lg:h-[76px] lg:w-[76px] xl:h-[83px] xl:w-[83px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
// ==============================
// Continuous Carousel Component
// ==============================
function ContinuousCarousel({
  data,
  CardComponent,
  speed = 4,
  direction = "left",
  pauseOnHover = true,
}) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const marqueeSpeed = direction === "left" ? speed : -speed;

  return (
    <div className="relative w-full overflow-visible select-none" style={{overflow: 'visible'}}>
      <Marquee
        gradient={false}
        speed={Math.abs(marqueeSpeed)}
        direction={direction}
        pauseOnHover={pauseOnHover}
        pauseOnClick={true}
        style={{ width: "100%", overflow: 'visible' }}
        className="gap-5"
      >
        {data.map((item, i) => (
          <div key={`${item.id}-${i}`} className="mx-2" style={{overflow: 'visible'}}>
            <CardComponent
              {...item}
              isHovered={hoveredCard === i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onTouchStart={() => setHoveredCard(i)}
              onTouchEnd={() => setHoveredCard(null)}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// ==============================
// Main Serve Component
// ==============================
export default function Serve() {
  return (
    <div
      className="relative w-full max-w-[95%] sm:max-w-[100%] mx-auto py-8 sm:py-12 lg:pb-14 lg:pt-6 px-4 sm:px-6"
      style={{ fontFamily: "'Krona One', sans-serif" }}
    >
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-black mb-8 sm:mb-8 lg:mb-12 font-normal">
        Industries We Serve
      </div>

      <ContinuousCarousel
        data={industries}
        CardComponent={IndustryCard}
        speed={90}
        direction="left"
        pauseOnHover={true}
        enableDrag={true}
      />
    </div>
  );
}