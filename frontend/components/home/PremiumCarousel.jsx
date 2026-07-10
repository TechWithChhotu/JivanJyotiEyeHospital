import React, { useState, useEffect } from "react";

function PremiumCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Sheikhpura's Most Trusted Name in Eye Care",
      subtitle:
        "Comprehensive treatments for Cataract (मोतियाबिंद), Computerized Eye Testing & Laser Phaco Surgery across Bihar.",
      buttonText: "Schedule a Consultation",
      link: "#services",
      // Desktop background
      bgDesktop:
        "https://i.pinimg.com/736x/5d/fd/28/5dfd28f7f28fcec720d51b58cd5112c9.jpg",
      // Mobile background (Optimized vertical look)
      bgMobile:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&h=800&q=80",
    },
    {
      id: 2,
      title: "Stitchless Laser Cataract Operation",
      subtitle:
        "Experience world-class diagnostic tools, premium global foldable lens implants, and experienced Ex-IGIMS surgeon teams.",
      buttonText: "Track Your Token Live",
      link: "#track-widget",
      bgDesktop:
        "https://tse2.mm.bing.net/th/id/OIP.OTuZXdzXv_pQVGtA_m-jtQHaDx?r=0&cb=thfvnextfalcon4&rs=1&pid=ImgDetMain&o=7&rm=3",
      bgMobile:
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&h=800&q=80",
    },
    {
      id: 3,
      title: "Advanced Computerized Eye Testing",
      subtitle:
        "Highly accurate digital refractometers to identify subtle biological vision disorders for patients in Nawada, Lakhisarai & Sheikhpura.",
      buttonText: "Explore Technologies",
      link: "#why-us",
      bgDesktop:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80",
      bgMobile:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&h=800&q=80",
    },
  ];

  // Auto-play control loop (Every 5 seconds slide will switch seamlessly)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[65vh] sm:h-[75vh] bg-[#0B1329] overflow-hidden select-none">
      {/* Slides Inner Wrapper */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* 📸 Dynamic Background Layer (Responsive Images logic) */}
            <div className="absolute inset-0 w-full h-full">
              {/* Desktop View Image Asset */}
              <img
                src={slide.bgDesktop}
                alt={slide.title}
                className="hidden sm:block w-full h-full object-cover object-center"
              />
              {/* Mobile View Image Asset */}
              <img
                src={slide.bgMobile}
                alt={slide.title}
                className="block sm:hidden w-full h-full object-cover object-center"
              />
              {/* Premium dark gradient overlay to make typography pop perfectly */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent" />
            </div>

            {/* 📋 Content Box (ASG Style Alignment) */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-left z-20">
              <div className="max-w-2xl space-y-4 sm:space-y-6 transform transition-transform duration-700 translate-y-0">
                {/* SEO Friendly Premium Badges */}
                <span className="inline-flex items-center gap-1.5 bg-blue-600/90 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md shadow-md shadow-blue-600/20">
                  ✦ Clinical Excellence Hub
                </span>

                {/* Animated Heading */}
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-md">
                  {slide.title}
                </h2>

                {/* Animated Description */}
                <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed font-medium max-w-xl drop-shadow">
                  {slide.subtitle}
                </p>

                {/* Premium Action CTA Button */}
                <div className="pt-2">
                  <a
                    href={slide.link}
                    className="inline-flex items-center gap-3 bg-[#006EB7] hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                  >
                    {slide.buttonText}
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* 🔘 Slick-Style Navigation Dots Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "w-8 h-2.5 bg-blue-500 shadow-md shadow-blue-500/40"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default PremiumCarousel;
