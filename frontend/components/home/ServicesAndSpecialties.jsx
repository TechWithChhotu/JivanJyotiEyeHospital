import React, { useState } from "react";

function ServicesAndSpecialties() {
  const [startIndex, setStartIndex] = useState(0);

  const specialties = [
    {
      id: 1,
      title: "PRK Surgery",
      description:
        "What is Photorefractive Keratectomy? Photorefractive keratectomy is a type of advanced laser vision correction to reshape cornea surfaces...",
      linkText: "PRK Laser Surgery Guide",
      image:
        "https://asgeyehospital.com/wp-content/uploads/2025/11/PRKSurgery.webp",
    },
    {
      id: 2,
      title: "Cataract (मोतियों का आपरेशन)",
      description:
        "What do you understand by Cataract? A cataract is an eye condition characterized by the clouding of the eye's natural crystalline lens layout...",
      linkText: "Cataract Surgery Details",
      image:
        "https://asgeyehospital.com/wp-content/uploads/2025/09/Cataract.webp",
    },
    {
      id: 3,
      title: "LASIK Surgery",
      description:
        "What is LASIK Surgery? LASIK (Laser-Assisted In Situ Keratomileusis) or advanced laser eye treatment is a highly safe out-patient procedure...",
      linkText: "LASIK Surgery Options",
      image:
        "https://asgeyehospital.com/wp-content/uploads/2026/01/Lasik-1.webp",
    },
    {
      id: 4,
      title: "Glaucoma",
      description:
        "Glaucoma: A Silent Thief of Sight. Glaucoma is an eye condition that directly damages the optic nerve, often linked to increased pressure...",
      linkText: "Glaucoma Treatment Guide",
      image:
        "https://asgeyehospital.com/wp-content/uploads/2025/11/Glaucoma.webp",
    },
    {
      id: 5,
      title: "Diabetic Retinopathy",
      description:
        "What Do You Understand by Diabetic Retinopathy? Diabetic retinopathy is an eye disease caused by diabetes affecting retinal blood vessels...",
      linkText: "Manage Diabetic Vision",
      image:
        "https://asgeyehospital.com/wp-content/uploads/2025/11/DiabeticRetinopathy.webp",
    },
    {
      id: 6,
      title: "Cornea",
      description:
        "Cornea and Associated Diseases. The cornea is the transparent front part of the eye that covers the iris, pupil, and anterior chamber...",
      linkText: "Cornea Treatment Details",
      image:
        "https://asgeyehospital.com/wp-content/uploads/2025/11/Cornea.webp",
    },
  ];

  // Carousel slider navigations logic
  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? specialties.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= specialties.length - 3 ? 0 : prev + 1));
  };

  return (
    <section
      id="services"
      className="bg-[#F8FAFC] py-20 px-4 sm:px-6 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* 🏷️ Top Header Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
            <span>🏥</span> Services & Specialties
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Every Angle of Vision. <br />
            <span className="text-[#006EB7]">Every Kind of Care.</span>
          </h2>
        </div>

        {/* 🗂️ Interactive Responsive Slider Shell */}
        <div className="relative w-full">
          {/* Mobile Layout: Scrollable container | Desktop Layout: Pure multi-card slider window */}
          <div className="flex md:grid md:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 scrollbar-none snap-x">
            {specialties.slice(startIndex, startIndex + 3).map((item) => (
              <div
                key={item.id}
                className="min-w-[85vw] sm:min-w-[40vw] md:min-w-0 bg-white rounded-[24px] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full snap-center"
              >
                {/* 📸 Card Top Image Structure */}
                <div className="h-48 w-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/10" />
                </div>

                {/* 🔄 Relative Content Box */}
                <div className="relative px-6 pb-8 pt-10 flex-1 flex flex-col justify-between">
                  {/* Floating Round Action Icon Badge */}
                  <div className="absolute -top-7 left-6 w-14 h-14 bg-[#006EB7] border-[4px] border-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>

                  {/* Typography Block */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-extrabold text-slate-800 tracking-tight group-hover:text-[#006EB7] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Link Guide */}
                  <div className="pt-6">
                    <a
                      href="#book-appointment"
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 uppercase tracking-wider hover:text-blue-700 transition-colors group/link"
                    >
                      {item.linkText}
                      <span className="transform group-hover/link:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ↔️ Premium Carousel Control Buttons */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={handlePrev}
            className="w-11 h-11 bg-white border border-slate-200 hover:border-blue-600 rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-blue-600 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-xs font-bold">◀</span>
          </button>
          <button
            onClick={handleNext}
            className="w-11 h-11 bg-white border border-slate-200 hover:border-blue-600 rounded-full flex items-center justify-center shadow-md text-slate-600 hover:text-blue-600 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-xs font-bold">▶</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ServicesAndSpecialties;
