// import React, { useState } from "react";
// import axios from "axios";

// function ReceptionDashboard() {
//   const [phone, setPhone] = useState("");
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [isOldPatient, setIsOldPatient] = useState(false);
//   const [patientId, setPatientId] = useState(null);
//   const [allocatedToken, setAllocatedToken] = useState(null);

//   // पुराने मरीज को खोजना
//   const handleSearch = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/patients/search/${phone}`,
//       );
//       setName(res.data.name);
//       setAge(res.data.age);
//       setPatientId(res.data._id);
//       setIsOldPatient(true);
//       alert("पुराना रिकॉर्ड मिल गया है!");
//     } catch (err) {
//       setIsOldPatient(false);
//       setPatientId(null);
//       setName("");
//       setAge("");
//       alert("नया मरीज है, कृपया विवरण भरें।");
//     }
//   };

//   // टोकन बुक करना
//   const handleBooking = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/patients/book-token",
//         {
//           name,
//           age,
//           phone,
//           isOldPatient,
//           patientId,
//           doctorName: "Main Doctor", // बैकएंड के लिए एक डिफॉल्ट नाम भेज रहे हैं क्योंकि डॉक्टर एक ही है
//         },
//       );
//       setAllocatedToken(res.data.tokenNumber);

//       // फॉर्म को पूरी तरह क्लियर करें
//       setPhone("");
//       setName("");
//       setAge("");
//       setIsOldPatient(false);
//       setPatientId(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 py-10 px-4">
//       <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
//         <div className="bg-blue-900 px-6 py-4 text-white">
//           <h2 className="text-xl font-bold">
//             📋 रिसेप्शन काउंटर (बुकिंग पैनल)
//           </h2>
//           <p className="text-sm text-blue-200">जीवन ज्योति आँख अस्पताल</p>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* सर्च पुराना मरीज */}
//           <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               मरीज की खोज (मोबाइल नंबर):
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="9876543210"
//               />
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition"
//               >
//                 खोजें
//               </button>
//             </div>
//           </div>

//           {/* बुकिंग फॉर्म */}
//           <form onSubmit={handleBooking} className="space-y-4">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-1">
//                 मरीज का नाम
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
//                 required
//                 disabled={isOldPatient}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-1">
//                 उम्र
//               </label>
//               <input
//                 type="number"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
//                 required
//                 disabled={isOldPatient}
//               />
//             </div>

//             <button
//               type="submit"
//               className={`w-full text-white font-bold py-3 px-4 rounded-md transition shadow ${
//                 isOldPatient
//                   ? "bg-amber-600 hover:bg-amber-700"
//                   : "bg-emerald-600 hover:bg-emerald-700"
//               }`}
//             >
//               {isOldPatient
//                 ? "🔄 टोकन नंबर लगाएं (Generate Token)"
//                 : "➕ नया मरीज दर्ज करें और टोकन लगाएं"}
//             </button>
//           </form>

//           {/* लाइव पर्ची अलर्ट */}
//           {allocatedToken && (
//             <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-5 text-center mt-6 animate-pulse">
//               <span className="text-emerald-800 text-sm font-bold tracking-wider uppercase">
//                 पर्ची जनरेट हुई
//               </span>
//               <h1 className="text-5xl font-black text-emerald-700 my-2">
//                 # {allocatedToken}
//               </h1>
//               <p className="text-xs text-slate-500 mt-2">
//                 मरीज को डॉक्टर केबिन के बाहर कतार में प्रतीक्षा करने को कहें
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReceptionDashboard;

import React, { useState } from "react";
import axios from "axios";

function ReceptionDashboard() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isOldPatient, setIsOldPatient] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [allocatedToken, setAllocatedToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // ऑटोमैटिक सर्च फ़ंक्शन जो 10 अंक होने पर कॉल होगा
  const autoSearch = async (phoneNumber) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/patients/search/${phoneNumber}`,
      );
      setName(res.data.name);
      setAge(res.data.age);
      setPatientId(res.data._id);
      setIsOldPatient(true);
    } catch (err) {
      // अगर 404 (मरीज नहीं मिला) या कोई एरर आता है, तो इसे नया मरीज मानें
      setIsOldPatient(false);
      setPatientId(null);
      setName("");
      setAge("");
    } finally {
      setLoading(false);
    }
  };

  // इनपुट चेंज हैंडलर
  const handlePhoneChange = (e) => {
    const inputVal = e.target.value.replace(/\D/g, ""); // सिर्फ नंबर्स को एलाउ करने के लिए

    // अधिकतम 10 अंक ही टाइप करने दें
    if (inputVal.length <= 10) {
      setPhone(inputVal);

      // ⚡ जैसे ही पूरे 10 अंक होंगे, आटोमैटिक सर्च ट्रिगर हो जाएगा
      if (inputVal.length === 10) {
        autoSearch(inputVal);
      } else {
        // अगर यूजर नंबर कम करता है (Backspace दबाता है), तो फॉर्म रीसेट कर दें
        setIsOldPatient(false);
        setPatientId(null);
        setName("");
        setAge("");
      }
    }
  };

  // टोकन बुक करना
  const handleBooking = async (e) => {
    e.preventDefault();

    // Chhoti si client side validation safety check
    if (!name.trim() || !age || !phone) {
      alert("कृपया नाम, उम्र और मोबाइल नंबर सही से भरें।");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/patients/book-token",
        {
          name: name.trim(),
          age: Number(age),
          phone: phone,
          isOldPatient,
          patientId,
          doctorName: "Main Doctor",
        },
      );
      console.log("res===> ", res.data);

      setAllocatedToken(res.data.tokenNumber);

      // फॉर्म को पूरी तरह क्लियर करें
      setPhone("");
      setName("");
      setAge("");
      setIsOldPatient(false);
      setPatientId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-25 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
        <div className="bg-blue-900 px-6 py-4 text-white">
          <h2 className="text-xl font-bold">
            📋 रिसेप्शन काउंटर (बुकिंग पैनल)
          </h2>
          <p className="text-sm text-blue-200">जीवन ज्योति आँख अस्पताल</p>
        </div>

        <div className="p-6 space-y-6">
          {/* ऑटो-सर्च मोबाइल नंबर इनपुट */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              मरीज का मोबाइल नंबर दर्ज करें:
            </label>
            <div className="relative">
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition text-lg tracking-wider ${
                  isOldPatient
                    ? "border-amber-400 focus:ring-amber-500 bg-amber-50/30"
                    : "border-slate-300 focus:ring-blue-500"
                }`}
                placeholder="9876543210"
              />

              {/* लाइव स्टेटस इंडिकेटर (यूजर को बताने के लिए कि रिकॉर्ड मिल गया है या नहीं) */}
              {phone.length === 10 && (
                <div className="absolute right-3 top-3 text-sm font-bold">
                  {loading ? (
                    <span className="text-slate-400 animate-pulse">
                      खोज रहे हैं...
                    </span>
                  ) : isOldPatient ? (
                    <span className="text-amber-600 bg-amber-100 px-2 py-0.5 rounded text-xs">
                      舊 रिकॉर्ड मिला ✅
                    </span>
                  ) : (
                    <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                      ✨ नया मरीज
                    </span>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              * 10 अंकों का नंबर पूरा होते ही पुराना डेटा अपने आप लोड हो जाएगा।
            </p>
          </div>

          {/* बुकिंग फॉर्म */}
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                मरीज का नाम
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-600 font-medium"
                required
                disabled={isOldPatient} // पुराने मरीज के लिए लॉक रहेगा
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                उम्र
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-600 font-medium"
                required
                disabled={isOldPatient} // पुराने मरीज के लिए लॉक रहेगा
              />
            </div>

            <button
              type="submit"
              disabled={phone.length < 10 || loading}
              className={`w-full text-white font-bold py-3 px-4 rounded-md transition shadow dynamic-submit-btn ${
                phone.length < 10
                  ? "bg-slate-300 cursor-not-allowed"
                  : isOldPatient
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isOldPatient
                ? "🔄 पुराना रिकॉर्ड: टोकन जनरेट करें"
                : "➕ नया मरीज: दर्ज करें और टोकन लगाएं"}
            </button>
          </form>

          {/* लाइव पर्ची अलर्ट */}
          {allocatedToken && (
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-5 text-center mt-6 animate-pulse">
              <span className="text-emerald-800 text-sm font-bold tracking-wider uppercase">
                पर्ची जनरेट हुई
              </span>
              <h1 className="text-5xl font-black text-emerald-700 my-2">
                # {allocatedToken}
              </h1>
              <p className="text-xs text-slate-500 mt-2">
                मरीज को डॉक्टर केबिन के बाहर कतार में प्रतीक्षा करने को कहें
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReceptionDashboard;
