import React from "react";

function HospitalMap() {
  const locationNetwork = [
    {
      region: "India Network",
      subtext: "Advancing Vision Care Across India",
      badge: "National Standard",
      icon: "🇮🇳",
    },
    {
      region: "Bihar Division",
      subtext:
        "Expanding access to world-class ophthalmic microsurgery networks.",
      badge: "Regional Center",
      icon: "🌾",
    },
    {
      region: "Sheikhpura Hub",
      subtext: "Jamalpur Road, Satbighi, Sheikhpura - 811105",
      badge: "Main Surgical Facility",
      icon: "🏥",
      highlight: true,
    },
  ];

  return (
    <section
      id="location-map"
      className="bg-[#F8FAFC] py-20 px-4 sm:px-6 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* 🏷️ Header Block */}
        <div className="text-center space-y-3 mb-16">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
            📍 Find Our Facility
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Our Location & <span className="text-[#006EB7]">Network Reach</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Easily navigate to our main eye care facility. Providing premium
            diagnostics and care close to you.
          </p>
        </div>

        {/* 🗺️ Two Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Side: 3-Tier Hierarchical Geographical Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              {locationNetwork.map((tier, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all duration-300 relative ${
                    tier.highlight
                      ? "bg-white border-blue-300 shadow-md shadow-blue-100/50"
                      : "bg-white/60 border-slate-200/80"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Circle Badge Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm shrink-0 ${
                        tier.highlight
                          ? "bg-[#E1F0FA] text-[#006EB7]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {tier.icon}
                    </div>

                    {/* Meta Text */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-black text-slate-800 tracking-tight">
                          {tier.region}
                        </h4>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                            tier.highlight
                              ? "bg-blue-100 text-[#006EB7]"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {tier.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {tier.subtext}
                      </p>
                    </div>
                  </div>

                  {/* Subtle Connecting Visual Line Between Steps */}
                  {idx < 2 && (
                    <div className="absolute left-10 top-full h-4 w-0.5 bg-slate-200 -translate-x-1/2 z-0 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>

            {/* Quick Action Button to Open Google Maps App directly */}
            <div className="pt-2">
              <a
                href="https://maps.app.goo.gl/JMjihiCaZE83VV1a6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#006EB7] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
              >
                Open directly in Google Maps 🚀
              </a>
            </div>
          </div>

          {/* Right Side: Professional Iframe Container */}
          <div className="lg:col-span-7 bg-white p-3 rounded-[28px] border border-slate-200/80 shadow-xl shadow-slate-200/50 min-h-[380px] sm:min-h-[450px] flex overflow-hidden">
            <div className="w-full h-full rounded-[20px] overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.871277582475!2d85.83413707517363!3d25.14004237774778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f243f044159a65%3A0x16f598fa5e960119!2sJivan%20Jyoti%20Eye%20Hospital!5e0!3m2!1sen!2sin!4v1783572777626!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Jivan Jyoti Eye Hospital Map Location"
                className="w-full h-full min-h-[360px] lg:min-h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HospitalMap;
