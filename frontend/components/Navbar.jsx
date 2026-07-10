import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [tokenInput, setTokenInput] = useState("");
  const navigate = useNavigate();

  const handleTrackQueue = (e) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      navigate(`/patient/${tokenInput.trim()}`);
    }
  };

  return (
    <div className=" bg-[#F8FAFC] font-sans antialiased text-slate-800">
      {/* 🌐 SEO Optimized Global Fixed Header Container */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-md bg-white">
        {/* 1. Top Utility Info Bar */}
        <div className="bg-[#0F172A] text-slate-400 text-[11px] font-medium py-2 px-6 hidden sm:flex justify-between items-center border-b border-slate-800/60">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="text-blue-500">📞</span> Helpline: +91 9709753293
            </span>
            <span className="flex items-center gap-1">
              <span>⏰</span> Mon - Fri: 9 AM - 5 PM | Sat: 1 PM - 5 PM (Sunday
              Closed)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-slate-400">
              📍 Jamalpur Road, Satbighi, Sheikhpura, Bihar
            </span>
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
              ISO Certified
            </span>
          </div>
        </div>

        {/* 2. Main High-End Navigation Bar (Glassmorphism & Fixed Layout) */}
        <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            {/* Branding with SEO Title */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <span className="text-2xl text-white">👁️</span>
              </div>
              <div>
                <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                  Jeevan Jyoti Eye Hospital
                </h1>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                  Best Eye Care Hospital in Sheikhpura, Bihar
                </p>
              </div>
            </div>

            {/* Anchors */}
            <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
              <a
                href="#services"
                className="hover:text-blue-600 transition-all"
              >
                Specialties
              </a>
              <a href="#why-us" className="hover:text-blue-600 transition-all">
                Advanced Technology
              </a>
              <a href="#doctors" className="hover:text-blue-600 transition-all">
                Expert Surgeons
              </a>
            </div>

            {/* Realtime Live Queue Tracker Signal Badge */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-extrabold text-slate-500 tracking-wider uppercase">
                Live Queue Active
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* 🚀 Spacer: Prevents content from hiding underneath the fixed header */}
      <div className="h-20 sm:h-28"></div>
    </div>
  );
}

export default Home;
