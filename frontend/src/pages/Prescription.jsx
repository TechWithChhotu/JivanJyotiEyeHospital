import React from "react";

function OpdCaseSheetSlip({
  generatedToken,
  setStep = () => {},
  setGeneratedToken = () => {},
}) {
  // Fallbacks safe guarding agar dynamic data check up runtime par null mile
  console.log("generatedToken ==> ", generatedToken);

  const tokenNumber = generatedToken?.tokenNumber || "10";
  const name = generatedToken?.name || "CHHOTU KUMAR";
  const age = generatedToken?.age || "23";
  const phone = generatedToken?.phone || "8920523259";
  const gender = generatedToken?.gender || "Male";
  const address = generatedToken?.address || "Address";

  const date = new Date().toLocaleDateString("en-IN");
  const handleDoneClick = () => {
    // Exact requested URL pe redirect karne ke liye:
    window.location.href = `http://localhost:5173/patient/${tokenNumber}`;
  };
  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 flex flex-col items-center print:bg-white print:py-0 print:px-0">
      {/* 🖨️ Top Interactive Header Controls - Print ke time auto hide ho jayenge */}
      <div className="w-full max-w-[210mm] flex justify-between items-center mb-4 bg-white p-4 shadow-md rounded-xl print:hidden">
        <button
          onClick={handleDoneClick}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg font-bold text-sm transition cursor-pointer"
        >
          Done 🔄
        </button>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-extrabold text-sm tracking-wide transition shadow cursor-pointer"
        >
          Print Proper OPD Slip (A4) 🖨️
        </button>
      </div>

      {/* 📄 Strict A4 Dimensions Pad Layout */}
      <div className="w-full max-w-[210mm] min-h-[297mm] bg-white text-blue-900 p-[10mm] shadow-2xl border border-slate-300 relative print:shadow-none print:border-none print:p-0 print:w-full">
        {/* 👁️ Eye Icons Decoration & Hospital Identity */}
        <div className="text-center relative border-b-2 border-blue-900 pb-2">
          {/* Left Eye Symbol */}
          <div className="absolute left-2 top-2 text-3xl font-serif select-none">
            👁️
          </div>
          {/* Right Eye Symbol */}
          <div className="absolute right-2 top-2 text-3xl font-serif select-none">
            👁️
          </div>

          <h1 className="text-4xl font-black tracking-wide mb-1 font-serif">
            जीवन ज्योति आँख अस्पताल
          </h1>
          <p className="text-sm font-bold text-slate-700 italic mb-1">
            (श्री त्रिवेंडी देव सेवाश्रम राजगीर एवं जीवन ज्योति संस्थान द्वारा
            संचालित)
          </p>
          <p className="text-sm font-black bg-blue-900 text-white inline-block px-4 py-0.5 rounded-full tracking-wider mb-1">
            जमालपुर रोड, सतबिग्ही, शेखपुरा-811105
          </p>
          <div className="text-xs font-bold text-slate-800">
            Mobile : 9709753293
          </div>
        </div>

        {/* 🎫 Kiosk Dynamic Token Info Row */}
        <div className="flex justify-between items-center text-xs font-bold text-slate-700 border-b border-blue-900 py-1.5 px-1 bg-slate-50/80 print:bg-transparent">
          <div>
            <span className="text-blue-900 font-extrabold">रजि० नं०:-</span>{" "}
            <span className="font-mono">JJEH-2026-09842</span>
          </div>
          <div className="bg-blue-900 text-white text-sm px-3 py-0.5 rounded font-black print:bg-blue-900 print:text-white">
            TOKEN: #{tokenNumber}
          </div>
          <div>
            <span className="text-blue-900 font-extrabold">दिनांक:</span> {date}
          </div>
        </div>

        {/* 🧑 Patient Information Bar (Mapped from generatedToken) */}
        <div className="grid grid-cols-12 gap-y-2 border-b-2 border-blue-900 py-2 text-[13px] font-bold text-slate-900">
          <div className="col-span-6 flex">
            <span className="text-blue-900 font-extrabold w-14 shrink-0">
              नाम:-
            </span>
            <span className="border-b border-dashed border-slate-400 w-full uppercase tracking-wide px-1">
              {name}
            </span>
          </div>
          <div className="col-span-3 flex pl-2">
            <span className="text-blue-900 font-extrabold w-10 shrink-0">
              उम्र:-
            </span>
            <span className="border-b border-dashed border-slate-400 w-full px-1">
              {age} वर्ष
            </span>
          </div>
          <div className="col-span-3 flex pl-2">
            <span className="text-blue-900 font-extrabold w-10 shrink-0">
              लिंग:-
            </span>
            <span className="border-b border-dashed border-slate-400 w-full px-1">
              {gender}
            </span>
          </div>

          <div className="col-span-6 flex">
            <span className="text-blue-900 font-extrabold w-14 shrink-0">
              पता:-
            </span>
            <span className="border-b border-dashed border-slate-400 w-full px-1">
              {address}
            </span>
          </div>
          <div className="col-span-6 flex pl-2">
            <span className="text-blue-900 font-extrabold w-16 shrink-0">
              मोबाइल:-
            </span>
            <span className="border-b border-dashed border-slate-400 w-full font-mono px-1">
              {phone}
            </span>
          </div>
        </div>

        {/* 🗂️ Split Content Sheet (Exact Layout Preserved) */}
        <div className="grid grid-cols-12 min-h-[190mm]">
          {/* 🩺 Column 1 (Left 28%): Panel Of Doctors */}
          <div className="col-span-3 border-r-2 border-blue-900 pr-2 pt-3 space-y-5 text-center">
            <div className="pb-1">
              <div className="text-[13px] font-black text-blue-950 underline decoration-blue-900">
                Dr. R. Ranjan
              </div>
              <div className="text-[10px] text-slate-700 font-bold leading-tight mt-0.5 italic">
                (Managing Director)
              </div>
              <div className="text-[9px] text-slate-600 font-semibold leading-none mt-0.5">
                MD (ACU) ICLEP (HYD.)
                <br />
                DOT (FOREC) NOIDA
              </div>
            </div>

            <div className="pb-1">
              <div className="text-[13px] font-black text-blue-950 underline decoration-blue-900">
                Dr. S. Kumar
              </div>
              <div className="text-[10px] text-slate-700 font-bold leading-tight mt-0.5 italic">
                (Eye Surgeon)
              </div>
              <div className="text-[9px] text-slate-600 font-semibold leading-none mt-0.5">
                MS (EYE)
                <br />
                Ex Eye Surgeon, NEH (WB)
              </div>
            </div>

            <div className="pb-1">
              <div className="text-[13px] font-black text-blue-950 underline decoration-blue-900">
                Dr. V. Kumar
              </div>
              <div className="text-[10px] text-slate-700 font-bold leading-tight mt-0.5 italic">
                (Eye Surgeon)
              </div>
              <div className="text-[9px] text-slate-600 font-semibold leading-none mt-0.5">
                DOMS (EyE)
                <br />
                Ex. Eye Surgeon, NJSM (Rajgir)
              </div>
            </div>

            <div>
              <div className="text-[13px] font-black text-blue-950 underline decoration-blue-900">
                Opt. R. Kumar
              </div>
              <div className="text-[10px] text-slate-700 font-bold leading-tight mt-0.5 italic">
                (Contact Lens Specialist)
              </div>
              <div className="text-[9px] text-slate-600 font-semibold leading-none mt-0.5">
                D.O.-IGIMS (Patna)
                <br />
                FCLI (Aligarh)
              </div>
            </div>

            <div className="text-blue-900 text-xs opacity-40 pt-4">★ ★ ★</div>
          </div>

          {/* 📝 Column 2 (Middle 40%): Left Parameters */}
          <div className="col-span-5 border-r border-blue-900 px-3 pt-4 flex flex-col justify-between">
            <div className="space-y-7">
              <div className="text-sm font-black flex items-baseline">
                <span>C/o.&nbsp;&lt;</span>
                <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
              </div>
              <div className="text-sm font-black flex items-baseline">
                <span>H/o.&nbsp;&lt;</span>
                <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
              </div>
              <div className="text-sm font-black">
                <div className="flex items-baseline">
                  <span>VA&nbsp;&lt;</span>
                  <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
                </div>
                <div className="grid grid-cols-2 text-[10px] text-slate-500 pl-8 mt-1 font-bold">
                  <div>RE: ............</div>
                  <div>LE: ............</div>
                </div>
              </div>
              <div className="text-sm font-black flex items-baseline">
                <span>Va c Glass&nbsp;&lt;</span>
                <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
              </div>
              <div className="text-sm font-black flex items-baseline">
                <span>VAcPH&nbsp;&lt;</span>
                <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
              </div>
              <div className="text-sm font-black flex items-baseline">
                <span>U.S.P.&nbsp;&lt;</span>
                <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
              </div>
              <div className="text-sm font-black flex items-baseline">
                <span>I.O.P.&nbsp;&lt;</span>
                <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
              </div>
              <div className="text-sm font-black flex items-baseline">
                <span>O/E&nbsp;&lt;</span>
                <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
              </div>
              <div className="text-sm font-black flex items-baseline">
                <span>SL/E&nbsp;&lt;</span>
                <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
              </div>
              <div className="text-sm font-black flex items-baseline">
                <span>FUNDUS:-</span>
                <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
              </div>
            </div>

            <div className="space-y-5 pb-4 text-xs font-bold text-slate-800">
              <div>
                GMS :{" "}
                <span className="border-b border-slate-300 inline-block w-32"></span>
              </div>
              <div>
                B.P.-{" "}
                <span className="border-b border-slate-300 inline-block w-32"></span>
              </div>
              <div>
                Urine Sugar-{" "}
                <span className="border-b border-slate-300 inline-block w-20"></span>
              </div>
              <div>
                Blood Sugar-{" "}
                <span className="border-b border-slate-300 inline-block w-20"></span>
              </div>
            </div>
          </div>

          {/* 👁️ Column 3 (Right 32%): Right Parameters */}
          <div className="col-span-4 pl-3 pt-4 space-y-10 flex flex-col justify-between">
            <div className="space-y-12">
              <div className="text-sm font-black">
                <div className="flex items-baseline">
                  <span>AR&nbsp;&lt;</span>
                  <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
                </div>
                <div className="border border-slate-200 rounded h-16 mt-2 bg-slate-50/30 print:bg-transparent"></div>
              </div>
              <div className="text-sm font-black">
                <div className="flex items-baseline">
                  <span>Ref&nbsp;&lt;</span>
                  <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
                </div>
                <div className="border border-slate-200 rounded h-20 mt-2 bg-slate-50/30 print:bg-transparent"></div>
              </div>
              <div className="text-sm font-black">
                <div className="flex items-baseline">
                  <span>Adv.&nbsp;&lt;</span>
                  <span className="border-b border-dotted border-slate-300 flex-grow ml-1 h-4"></span>
                </div>
                <div className="border border-slate-200 rounded h-40 mt-2 bg-slate-50/30 print:bg-transparent"></div>
              </div>
            </div>

            <div className="text-right text-[10px] text-slate-500 font-bold tracking-tight pb-4 pr-1">
              * Not valid for medicolegal purpose
            </div>
          </div>
        </div>

        {/* 🗺️ Fixed Bottom Pad Informative Footer */}
        <div className="border-t-2 border-blue-900 pt-2.5 text-center text-[11px] font-black tracking-wide space-y-1">
          <p className="text-blue-950">
            कम्प्यूटर युक्त मशीन से आँख की सम्पूर्ण जाँच एवं बिना टांका का (फेको
            मशीन से) लेंस लगाने की सुविधा उपलब्ध है।
          </p>
          <p className="text-[10px] text-slate-700">
            जाँच सोमवार से शुक्रवार तक सुबह{" "}
            <span className="text-blue-900">9:00 से 5:00</span> बजे तक। शनिवार
            के दिन <span className="text-blue-900">1:00 बजे से 5:00</span> बजे
            तक, रविवार बन्द रहता है।
          </p>
        </div>
      </div>
    </div>
  );
}

export default OpdCaseSheetSlip;
