import React, { useState, useEffect } from "react";
import axios from "axios";
import OpdCaseSheetSlip from "./Prescription";

function ReceptionDashboard() {
  // 🔐 Security & Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [counterId, setCounterId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // 📝 Patient & Booking Flow States
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("M");
  const [address, setAddress] = useState("");
  const [isOldPatient, setIsOldPatient] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [allocatedToken, setAllocatedToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientPrintDetails, setPatientPrintDetails] = useState(null);

  // 🛡️ Security Credentials Configuration
  const VALID_COUNTER_ID = "JJEH_Reception_1";
  const VALID_PASSWORD = "JJEH@Reception2026";

  // Check storage session on component initial mount
  useEffect(() => {
    const session = localStorage.getItem("jjeh_reception_session");
    if (session === "authorized") {
      setIsAuthenticated(true);
    }
  }, []);

  // 🔑 Submit Handler for Reception Login Barrier
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (counterId === VALID_COUNTER_ID && password === VALID_PASSWORD) {
      localStorage.setItem("jjeh_reception_session", "authorized");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("❌ Invalid Counter ID or Password. Try Again.");
      setPassword("");
    }
  };

  // 🚪 Secure Session Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("jjeh_reception_session");
    setIsAuthenticated(false);
    setCounterId("");
    setPassword("");
  };

  // ऑटोमैटिक सर्च फ़ंक्शन जो 10 अंक होने पर कॉल होगा
  const autoSearch = async (phoneNumber) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/patients/search/${phoneNumber}`,
      );
      setName(res.data.name);
      setAge(res.data.age);
      setGender(res.data.gender || "M");
      setAddress(res.data.address || "");
      setPatientId(res.data._id);
      setIsOldPatient(true);
    } catch (err) {
      setIsOldPatient(false);
      setPatientId(null);
      setName("");
      setAge("");
      setGender("M");
      setAddress("");
    } finally {
      setLoading(false);
    }
  };

  // इनपुट चेंज हैंडलर
  const handlePhoneChange = (e) => {
    const inputVal = e.target.value.replace(/\D/g, "");

    if (inputVal.length <= 10) {
      setPhone(inputVal);

      if (inputVal.length === 10) {
        autoSearch(inputVal);
      } else {
        setIsOldPatient(false);
        setPatientId(null);
        setName("");
        setAge("");
        setGender("M");
        setAddress("");
      }
    }
  };

  // टोकन बुक करना
  const handleBooking = async (e) => {
    e.preventDefault();

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
          gender: gender,
          address: address.trim(),
          isOldPatient,
          patientId,
          doctorName: "Main Doctor",
        },
      );

      const serverToken = res.data.tokenNumber;
      setAllocatedToken(serverToken);

      setPatientPrintDetails({
        tokenNumber: serverToken,
        name: name.trim(),
        age: age,
        phone: phone,
        address: address.trim() || "Sheikhpura, Bihar",
        gender: gender,
      });

      // फॉर्म को पूरी तरह क्लियर करें
      setPhone("");
      setName("");
      setAge("");
      setGender("M");
      setAddress("");
      setIsOldPatient(false);
      setPatientId(null);
    } catch (err) {
      console.error(err);
      alert("टोकन जनरेट करने में समस्या आई। कृपया सर्वर चेक करें।");
    }
  };

  // 🛑 Barrier Layer 1: Render Professional Security Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-2 mb-6">
            <span className="text-4xl">🔒</span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Reception Counter Login
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Enter counter credentials to access the JJEH Booking Dashboard.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Input 1: Counter ID */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                Counter ID / Username
              </label>
              <input
                type="text"
                required
                value={counterId}
                onChange={(e) => setCounterId(e.target.value)}
                placeholder="e.g. JJEH_Reception_1"
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:outline-none rounded-xl px-4 py-3.5 text-sm font-bold text-white transition-all"
              />
            </div>

            {/* Input 2: Password */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                Secure Access Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:outline-none rounded-xl px-4 py-3.5 text-sm font-bold text-white tracking-widest transition-all"
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-500 font-bold bg-rose-950/20 border border-rose-900/30 px-3 py-2 rounded-lg text-center">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-black text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-600/10"
            >
              Verify & Unlock Counter ⚡
            </button>
          </form>

          <div className="text-center pt-6 text-[10px] text-slate-500 font-medium">
            Protected Session Protocol • JJEH Sheikhpura
          </div>
        </div>
      </div>
    );
  }

  // ✅ Barrier Layer 2: Secure Reception Dashboard Shell
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 print:p-0 print:bg-white font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden print:hidden">
        {/* Header with Secure Logout Action */}
        <div className="bg-blue-900 px-6 py-4 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">
              📋 रिसेप्शन काउंटर (बुकिंग पैनल)
            </h2>
            <p className="text-sm text-blue-200">जीवन ज्योति आँख अस्पताल</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-950/60 hover:bg-rose-900 hover:text-rose-200 border border-blue-800/80 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer text-blue-100"
          >
            Logout Counter 🚪
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* ऑटो-सर्च मोबाइल नंबर इनपुट */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              मरीज का mobile नंबर दर्ज करें:
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

              {phone.length === 10 && (
                <div className="absolute right-3 top-3 text-sm font-bold">
                  {loading ? (
                    <span className="text-slate-400 animate-pulse">
                      खोज रहे हैं...
                    </span>
                  ) : isOldPatient ? (
                    <span className="text-amber-600 bg-amber-100 px-2 py-0.5 rounded text-xs">
                      पुराना रिकॉर्ड मिला ✅
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
                disabled={isOldPatient}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                  disabled={isOldPatient}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  लिंग (Gender)
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-600 font-medium bg-white"
                  disabled={isOldPatient}
                >
                  <option value="M">Male (पुरुष)</option>
                  <option value="F">Female (महिला)</option>
                  <option value="O">Other (अन्य)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                पता (Address)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="जैसे: जमालपुर, शेखपुरा"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-600 font-medium"
                disabled={isOldPatient}
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

          {/* ⚡ लाइव पर्ची अलर्ट और प्रिंट एक्शन सेगमेंट */}
          {allocatedToken && (
            <div className="mt-6 space-y-4">
              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-5 text-center animate-pulse">
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

              {/* 🖨️ Action Button Trigger */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setTimeout(() => {
                      window.print();
                    }, 300);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-lg py-4 px-6 rounded-xl shadow-lg shadow-emerald-700/20 transition transform duration-150 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🖨️</span> PRINT OPD CASE SHEET (पर्ची प्रिंट करें)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 📄 Hidden Master Print Target Layer */}
      {allocatedToken && patientPrintDetails && (
        <div className="hidden print:block">
          <OpdCaseSheetSlip generatedToken={patientPrintDetails} />
        </div>
      )}
    </div>
  );
}

export default ReceptionDashboard;
