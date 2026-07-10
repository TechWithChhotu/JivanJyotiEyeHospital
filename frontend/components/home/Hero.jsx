import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [tokenInput, setTokenInput] = useState("");
  const navigate = useNavigate();

  // 🖼️ Provided Image Links Array
  const listofimagelink = [
    "https://tse4.mm.bing.net/th/id/OIP.NOCxC3NkVeD2cy3tqzZK3gHaE8?r=0&cb=thfvnextfalcon4&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse1.mm.bing.net/th/id/OIP.z3qyDCHV1jatPNAl9wssEwHaDF?r=0&cb=thfvnextfalcon4&pid=ImgDet&w=474&h=197&rs=1&o=7&rm=3",
    "https://tse1.mm.bing.net/th/id/OIP.DtoQKGYu_YkXSDik-663iAHaE8?r=0&cb=thfvnextfalcon4&pid=ImgDet&w=474&h=316&rs=1&o=7&rm=3",
    "https://img.freepik.com/premium-photo/photo-medical-eye-examination-equipment_1055425-17867.jpg",
  ];

  // 🔄 Current Active Image Index State
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // Smooth Automatic Infinite Rotation Layer (Every 4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIdx((prevIdx) => (prevIdx + 1) % listofimagelink.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [listofimagelink.length]);

  return (
    <div className="relative bg-gradient-to-b from-blue-50/30 via-white to-transparent pt-12 pb-20 overflow-hidden">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 right-[-10%] w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-[15%] w-72 h-72 bg-indigo-300/10 blur-[100px] rounded-full pointer-events-none" />

      {/* ⚡ Hero Section Content Container */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
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

        {/* 💎 Right Block: Premium Infinite Image Showcase Panel */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto flex items-center justify-center">
          <div className="w-full aspect-[4/3] bg-gradient-to-br from-white/80 to-slate-50/50 backdrop-blur-md p-4 rounded-[32px] border border-slate-200/60 shadow-2xl shadow-slate-200/50 relative group overflow-hidden">
            {/* Subtle Abstract Decorative Ring inside the box */}
            <div className="absolute inset-4 rounded-[24px] border border-dashed border-slate-200/60 pointer-events-none z-10" />

            {/* Infinite Ultra-Smooth Crossfade Slider Layer */}
            <div className="w-full h-full relative rounded-[22px] overflow-hidden bg-white">
              {listofimagelink.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Hospital Diagnostic Infrastructure ${idx + 1}`}
                  // 💡 Yahan humne smooth blending ke liye duration aur timing function ko fully custom kiya hai
                  className={`absolute inset-0 w-full h-full object-cover transform transition-opacity duration-[2000ms] ease-in-out ${
                    idx === currentImgIdx
                      ? "opacity-100 z-20 scale-100"
                      : "opacity-0 z-10 scale-105 pointer-events-none"
                  }`}
                  style={{
                    // Hard transitions ko soft karne ke liye hardware acceleration fallback
                    willChange: "opacity, transform",
                  }}
                />
              ))}

              {/* Hospital Premium Glass Highlight (Vignette overlay background ke sath blend karne ke liye) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent z-25 pointer-events-none" />
            </div>

            {/* Micro Dot Slide Indicator Array */}
            <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
              {listofimagelink.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-700 ease-in-out ${
                    idx === currentImgIdx
                      ? "w-6 bg-blue-600 shadow-sm shadow-blue-600/50"
                      : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
