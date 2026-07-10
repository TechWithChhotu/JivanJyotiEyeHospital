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
    if (tokenInput.trim()) {
      navigate(`/patient/${tokenInput.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      {/* 🌐 Header & Banner Segment */}
      <Hero />

      {/* ⚡ NEW: Interactive Patient Action Hub */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action 1: Self Service Registration Kiosk Link */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md">
                ⚡ Inside Hospital Premises Only
              </span>
              <h4 className="text-xl font-black tracking-tight text-white">
                Self-Service Token Registration <br />
                <span className="text-blue-400 font-bold text-sm font-sans">
                  (स्वयं रजिस्ट्रेशन काउंटर)
                </span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Skip the reception queue! Register your profile, verify hospital
                location layout, pay via UPI, and instantly generate your live
                OPD token sheet.
              </p>
            </div>
            <div className="pt-6">
              {/* Note: Change "/kiosk" to matching route if it runs on "/register" or "/test" */}
              <button
                onClick={() => navigate("/patient")}
                className="w-full sm:w-auto bg-[#006EB7] hover:bg-blue-600 text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🎟️</span> Start Self-Registration (टोकन लगाएं)
              </button>
            </div>
          </div>

          {/* Action 2: Live Queue Tracking Input Screen */}
          <div className="bg-white text-slate-800 rounded-3xl p-8 border border-slate-200/60 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md">
                ● Live Queue Tracking
              </span>
              <h4 className="text-xl font-black tracking-tight text-slate-900">
                Track Live Token Status <br />
                <span className="text-emerald-600 font-bold text-sm font-sans">
                  (मरीज की लाइव स्थिति देखें)
                </span>
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Already have an OPD Case Slip? Enter your unique digital token
                number below to see how many patients are ahead of your cabin
                turn.
              </p>
            </div>

            <form
              onSubmit={handleTrackQueue}
              className="pt-6 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Enter Token Number (e.g. 15)"
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none rounded-xl px-4 py-3 text-sm font-bold transition-all text-slate-900 shadow-inner"
              />
              <button
                type="submit"
                disabled={!tokenInput.trim()}
                className={`text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm ${
                  tokenInput.trim()
                    ? "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>🔍</span> Track Live Status
              </button>
            </form>
          </div>
        </div>
      </section>

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
