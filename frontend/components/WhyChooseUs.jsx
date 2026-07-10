import React, { useState } from "react";

function WhyChooseUs() {
  // Current Active Tab tracking (0 = Modern Instruments, 1 = Trusted Diagnostics, 2 = Expert Support)
  const [activeTab, setActiveTab] = useState(0);

  const tabsContent = [
    {
      title: "Modern Instruments, Smarter Care",
      description:
        "Equipped with state-of-the-art diagnostic and surgical tools, we ensure accurate biological evaluation and advanced treatment for every complex eye scenario.",
      image:
        "https://images.pexels.com/photos/5752232/pexels-photo-5752232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tabLabel: "Modern Instruments",
      icon: "⚙️",
      // Active state button matching styles
      activeBg: "bg-[#E1F0FA] text-[#006EB7] border-blue-200",
    },
    {
      title: "Trusted Diagnostics",
      description:
        "From routine biological vision exams to advanced computer screenings, our clinical specialists use precise diagnostic workflows to ensure accurate insights for your eye health.",
      image:
        "https://images.pexels.com/photos/5752232/pexels-photo-5752232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tabLabel: "Trusted Diagnostics",
      icon: "❤️",
      activeBg: "bg-emerald-600 text-white border-emerald-700",
    },
    {
      title: "Expert Support",
      description:
        "From your very first OPD token consultation to post-treatment vision recovery checkups, our experienced medical care specialists are right there with you at every step.",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.dQe2PitRuqZ1s9BzU061kAHaC7?r=0&cb=thfvnextfalcon4&rs=1&pid=ImgDetMain&o=7&rm=3",
      tabLabel: "Expert Support",
      icon: "👤",
      activeBg: "bg-[#F9E9D2] text-[#D97706] border-amber-200",
    },
  ];

  return (
    <section id="why-us" className="bg-white py-20 px-4 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* 🎯 Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-[#006EB7] tracking-tight">
            Why Choose Jeevan Jyoti Eye Hospital
          </h2>
        </div>

        {/* 🎚️ Interactive Action Tabs Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tabsContent.map((tab, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full flex items-center justify-center gap-3 px-6 py-5 rounded-[20px] border font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? tab.activeBg + " shadow-md"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {/* Simulated Icon Circle from Screenshot Layout */}
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm ${
                    isSelected
                      ? "bg-white/90 text-slate-800"
                      : "bg-white text-slate-400"
                  }`}
                >
                  {tab.icon}
                </span>
                {tab.tabLabel}
              </button>
            );
          })}
        </div>

        {/* 🖼️ Large Active Display Dynamic Window Banner */}
        <div className="relative w-full h-[450px] sm:h-[500px] rounded-[32px] overflow-hidden shadow-2xl shadow-slate-300/80 transition-all duration-500 border border-slate-100">
          {/* Dynamic Interactive Background Image */}
          <img
            src={tabsContent[activeTab].image}
            alt={tabsContent[activeTab].title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-100"
          />

          {/* Premium Modern Linear Gradient Dark Masking Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent" />

          {/* Core Content Box Layer Overriding Image View */}
          <div className="absolute inset-0 flex flex-col justify-center items-start text-left p-8 sm:p-16 max-w-2xl space-y-4 z-10">
            {/* Main Feature Highlight Title */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {tabsContent[activeTab].title}
            </h3>

            {/* Feature Meta Description */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
              {tabsContent[activeTab].description}
            </p>

            {/* Quick Consultation Trigger Shortcut Button */}
            <div className="pt-2">
              <a
                href="#book-appointment"
                className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl backdrop-blur-md transition-all active:scale-95"
              >
                Learn More Details ⚡
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
