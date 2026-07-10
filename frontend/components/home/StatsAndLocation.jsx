import React, { useState } from "react";
import HospitalMap from "../HospitalMap";

function StatsAndLocation() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  // Local areas dropdown data for JJEH target regions
  const locationsData = {
    Sheikhpura: ["Sheikhpura Town", "Barbigha", "Chewara", "Ariari"],
    Lakhisarai: ["Lakhisarai Town", "Barahiya", "Ramgarh Chowk"],
    Nawada: ["Nawada Town", "Warisaliganj", "Rajauli"],
    Jamui: ["Jamui Town", "Sikandra", "Jhajha"],
  };

  const stats = [
    { number: "15+", label: "Years of Excellence" },
    { number: "50K+", label: "Happy Patients Covered" },
    { number: "10+", label: "Expert Eye Specialists" },
    { number: "100%", label: "Safe & Precise Surgeries" },
  ];

  return (
    <section className="bg-white py-16 px-6 relative overflow-hidden font-sans">
      {/* 📊 1. Premium Stats Cards Layer */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-blue-50/60 to-blue-50/10 border border-blue-100/50 rounded-2xl p-6 sm:p-8 text-left relative overflow-hidden group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
          >
            {/* Background absolute large number watermark like ASG layout */}
            <span className="absolute right-4 bottom-[-10px] text-7xl sm:text-8xl font-black text-blue-600/5 select-none transition-transform duration-500 group-hover:scale-110">
              {idx + 1}
            </span>
            <h3 className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight mb-2 [text-shadow:0_2px_4px_rgba(0,110,183,0.1)]">
              {stat.number}
            </h3>
            <p className="text-slate-600 font-bold text-xs sm:text-sm uppercase tracking-wider leading-snug max-w-[150px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* 📍 2. Core Location & Header Text Section */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-10">
        {/* Cute Location Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
          <span className="text-sm">🌐</span> Our Network Reach
        </div>

        {/* Dynamic Catchy Title */}
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Vision for All. <br />
          <span className="text-[#006EB7]">Not Just for Some.</span>
        </h2>

        {/* Description text */}
        <p className="text-slate-500 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          Jeevan Jyoti Eye Hospital is consistently expanding its care
          footprint, delivering premium affordable digital eye care services
          across Sheikhpura, Lakhisarai, and surrounding districts.
        </p>
      </div>
      <HospitalMap />
    </section>
  );
}

export default StatsAndLocation;
