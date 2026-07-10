import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Hero from "../../components/home/Hero";
import PremiumCarousel from "../../components/home/PremiumCarousel";
import StatsAndLocation from "../../components/home/StatsAndLocation";
import ServicesAndSpecialties from "../../components/home/ServicesAndSpecialties";
import WhyChooseUs from "../../components/WhyChooseUs";
import Footer from "../../components/Footer";

function Home() {
  const [tokenInput, setTokenInput] = useState("");
  const [activeTab, setActiveTab] = useState("instruments");
  const navigate = useNavigate();

  const handleTrackQueue = (e) => {
    e.preventDefault();
    if (tokenInput.trim()) navigate(`/patient/${tokenInput.trim()}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      {/* 🌐 Top Premium Bar */}
      <Hero />
      <PremiumCarousel />
      <StatsAndLocation />

      <ServicesAndSpecialties />
      <WhyChooseUs />
      {/* 🏢 Clinical Infrastructure Tabs */}
      <section
        id="why-us"
        className="bg-white text-slate-800 py-20 border-t border-slate-100 relative overflow-hidden font-sans"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info & Navigation Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                ✦ Why Choose Our Center
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight pt-1">
                Smarter Care Through <br />
                <span className="text-[#006EB7]">Advanced Diagnostics</span>
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                We leverage modern diagnostic systems and premium clinical
                methodologies to provide data-backed eye care solutions.
              </p>
            </div>

            {/* Premium Light Tab Navigation Controls */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setActiveTab("instruments")}
                className={`w-full text-left p-4.5 rounded-2xl border text-xs font-black uppercase tracking-wider transition-all flex justify-between items-center cursor-pointer ${
                  activeTab === "instruments"
                    ? "bg-[#E1F0FA] border-blue-300 text-[#006EB7] shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                    ⚙️
                  </span>
                  Modern Diagnostics
                </span>
                <span className="text-sm">
                  {activeTab === "instruments" ? "✦" : "→"}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("diagnostics")}
                className={`w-full text-left p-4.5 rounded-2xl border text-xs font-black uppercase tracking-wider transition-all flex justify-between items-center cursor-pointer ${
                  activeTab === "diagnostics"
                    ? "bg-[#E1F0FA] border-blue-300 text-[#006EB7] shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                    🔬
                  </span>
                  Trusted Lab Standards
                </span>
                <span className="text-sm">
                  {activeTab === "diagnostics" ? "✦" : "→"}
                </span>
              </button>
            </div>
          </div>

          {/* Right Interactive Dynamic Display Panel */}
          <div className="lg:col-span-7 bg-slate-50 rounded-[28px] border border-slate-200/60 p-8 sm:p-10 min-h-[280px] flex flex-col justify-center space-y-4 shadow-xl shadow-slate-100/50 relative overflow-hidden group">
            {/* Subtle design grid graphic element like premium blocks */}
            <div className="absolute right-0 top-0 text-slate-200/40 font-black text-9xl select-none pointer-events-none translate-x-10 -translate-y-10">
              ✦
            </div>

            {activeTab === "instruments" && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="text-xl font-extrabold text-[#006EB7] tracking-tight">
                  State-of-the-Art Optical Instrumentation
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Our facilities house computer-aided refractometers and premium
                  Phaco emulsification systems that optimize patient safety,
                  reduce processing window, and ensure microscopic structural
                  precision during operations.
                </p>
              </div>
            )}

            {activeTab === "diagnostics" && (
              <div className="space-y-3 animate-fadeIn">
                <h4 className="text-xl font-extrabold text-[#006EB7] tracking-tight">
                  Certified International Lenses & Metrics
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Every data metric, from intraocular pressure mapping to
                  retinal checkups, goes through rigorous verification
                  checklists. We choose only certified foldable implants from
                  global manufacturing hubs to eliminate complications.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 👨‍⚕️ Medical Board */}
      <section
        id="doctors"
        className="bg-white py-20 border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
              Medical Board
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our Senior Surgeons & Consultants
            </h3>
            <p className="text-xs text-slate-400">
              An elite team of eye specialists bringing expertise from renowned
              medical institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Dr. R. Ranjan",
                role: "Managing Director",
                edu: "MD (ACU) ICLEP (Hyd.) | DOT (FOREC) NOIDA",
              },
              {
                name: "Dr. S. Kumar",
                role: "Eye Surgeon (MS)",
                edu: "MS (EYE) | Ex Eye Surgeon, NEH (WB)",
              },
              {
                name: "Dr. V. Kumar",
                role: "Eye Surgeon (DOMS)",
                edu: "DOMS (EYE) | Ex. Eye Surgeon, NJSM (Rajgir)",
              },
              {
                name: "Opt. R. Kumar",
                role: "Lens & Optics Specialist",
                edu: "D.O. - IGIMS (Patna) | FCLI (Aligarh)",
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#F8FAFC] rounded-xl border border-slate-100 hover:border-blue-500/20 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  DR
                </div>
                <h5 className="font-extrabold text-slate-900 text-sm">
                  {doc.name}
                </h5>
                <p className="text-[11px] text-blue-600 font-bold mt-0.5">
                  {doc.role}
                </p>
                <p className="text-[10px] text-slate-400 mt-3 border-t border-slate-200/60 pt-3 leading-relaxed font-medium">
                  {doc.edu}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
