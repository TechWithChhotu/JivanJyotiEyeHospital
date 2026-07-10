import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Hero() {
  const [tokenInput, setTokenInput] = useState("");
  const [activeTab, setActiveTab] = useState("instruments");
  const navigate = useNavigate();

  const handleTrackQueue = (e) => {
    e.preventDefault();
    if (tokenInput.trim()) navigate(`/patient/${tokenInput.trim()}`);
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-50/30 via-white to-transparent pt-12 pb-20">
      {/* ⚡ Hero Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Block: Trust & Vision */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
            <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-widest">
              India's Advanced Vision Network
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            World-Class Technology for <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Flawless & Precise Vision.
            </span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Equipped with elite diagnostic machinery and international foldable
            lens implantation facilities. Experience premium healthcare with
            absolute transparency.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
            <div className="flex items-center gap-3 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
              <span className="text-xl">🖥️</span>
              <div className="text-left">
                <h5 className="text-xs font-bold text-slate-800">
                  Advanced Phaco
                </h5>
                <p className="text-[10px] text-slate-400">
                  Stitchless laser surgery
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
              <span className="text-xl">🔬</span>
              <div className="text-left">
                <h5 className="text-xs font-bold text-slate-800">
                  Computerized Mapping
                </h5>
                <p className="text-[10px] text-slate-400">
                  100% accurate metrics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Block: Minimal Digital Live Queue (Your exact requested cleanup) */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/70 shadow-xl shadow-slate-200/30 p-6 space-y-6">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
                Digital Live Queue Tracking
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Avoid waiting areas. Enter your token number to view live
                status.
              </p>
            </div>

            <form onSubmit={handleTrackQueue} className="space-y-4">
              <div className="relative flex items-center">
                <span className="absolute left-4 font-black text-slate-400 text-base">
                  #
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="Enter Token Number (e.g., 8)"
                  value={tokenInput}
                  // Simple logic: agar incoming value sirf digits h ya khali h, tabhi state update hogi
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9\b]+$/.test(val)) {
                      setTokenInput(val);
                    }
                  }}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md shadow-blue-600/10 transition-colors text-xs font-bold uppercase tracking-wider"
              >
                Track Live Status →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
