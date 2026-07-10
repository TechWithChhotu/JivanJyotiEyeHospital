import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1329] text-slate-400 font-sans text-xs">
      {/* 🔷 Top Main Footer Block */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {/* Column 1: Brand Profile */}
        <div className="space-y-4">
          <h4 className="text-white font-black text-base tracking-tight flex items-center gap-2">
            <span className="text-[#006EB7]">👁️</span> Jeevan Jyoti Eye Hospital
          </h4>
          <p className="leading-relaxed text-[11px] text-slate-400 font-medium">
            Providing precision-driven ophthalmic care, advanced microsurgeries,
            and modern diagnostic tools for complete healthcare security across
            Bihar.
          </p>
          <div className="pt-2 flex gap-3">
            {/* Social Media Micro Badges if any */}
            <span className="w-7 h-7 rounded-full bg-slate-800/60 hover:bg-[#006EB7] transition-colors flex items-center justify-center cursor-pointer text-white">
              🌐
            </span>
            <span className="w-7 h-7 rounded-full bg-slate-800/60 hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer text-white">
              f
            </span>
          </div>
        </div>

        {/* Column 2: Quick Navigation Links */}
        <div className="space-y-3">
          <h5 className="text-white font-extrabold text-xs uppercase tracking-widest border-b border-slate-800 pb-1.5">
            Quick Navigation
          </h5>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#services"
                className="hover:text-white hover:underline transition-all flex items-center gap-1"
              >
                ↳ Our Specialties
              </a>
            </li>
            <li>
              <a
                href="#why-us"
                className="hover:text-white hover:underline transition-all flex items-center gap-1"
              >
                ↳ Why Choose Us
              </a>
            </li>
            <li>
              <a
                href="#track-widget"
                className="hover:text-white hover:underline transition-all flex items-center gap-1"
              >
                ↳ Live Token Tracker
              </a>
            </li>
            <li>
              <a
                href="#book-appointment"
                className="hover:text-white hover:underline transition-all flex items-center gap-1"
              >
                ↳ Book Appointment
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Core Network Reach */}
        <div className="space-y-3">
          <h5 className="text-white font-extrabold text-xs uppercase tracking-widest border-b border-slate-800 pb-1.5">
            📍 Main Center
          </h5>
          <div className="space-y-2 leading-relaxed">
            <p className="font-medium text-slate-300">
              Jamalpur Road, Satbighi,
              <br />
              Sheikhpura, Bihar - 811105
            </p>
            <p className="text-[#006EB7] font-black text-sm pt-1">
              Helpline:{" "}
              <a href="tel:+919709753293" className="hover:underline">
                +91 9709753293
              </a>
            </p>
          </div>
        </div>

        {/* Column 4: Timings Window */}
        <div className="space-y-3">
          <h5 className="text-white font-extrabold text-xs uppercase tracking-widest border-b border-slate-800 pb-1.5">
            ⏰ OPD Schedule
          </h5>
          <div className="space-y-1.5 font-medium">
            <div className="flex justify-between border-b border-slate-800/40 pb-1">
              <span>Mon - Fri:</span>
              <span className="text-slate-200">9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/40 pb-1">
              <span>Saturday:</span>
              <span className="text-slate-200">1:00 PM - 5:00 PM</span>
            </div>
            <div className="flex justify-between text-rose-400 pt-0.5">
              <span>Sunday:</span>
              <span className="font-bold uppercase tracking-wider text-[10px] bg-rose-950/40 px-2 py-0.5 rounded">
                Closed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 💳 🔏 Bottom Copyright & Credits Strip Bar */}
      <div className="border-t border-slate-800/80 bg-[#070D1C] py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-500">
          <div>
            © {currentYear}{" "}
            <span className="text-slate-400">Jeevan Jyoti Eye Hospital</span>.
            All Rights Reserved.
          </div>

          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <a
              href="https://techsolex.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006EB7] hover:text-blue-400 font-bold transition-colors hover:underline"
            >
              TechSolex
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
