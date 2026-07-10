import React, { useState, useEffect } from "react";
import axios from "axios";

function DoctorDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [doctorId, setDoctorId] = useState(""); // 👈 New Doctor ID State
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [currentPatient, setCurrentPatient] = useState(null);
  const [avgWaitTime, setAvgWaitTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const DEFAULT_DOCTOR = "Main Doctor";

  // 🔐 Security Credentials Configuration
  const VALID_DOCTOR_ID = "JJEH_Main_Doc";
  const VALID_PASSWORD = "JJEH@Doctor2026";

  // Check memory session on component initial load
  useEffect(() => {
    const session = localStorage.getItem("jjeh_doctor_session");
    if (session === "authorized") {
      setIsAuthenticated(true);
      fetchCurrentActivePatient();
      fetchCurrentQueueStatus();
    }
  }, []);

  // 🔑 Submit Handler for Login Barrier (Both ID & Password Check)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (doctorId === VALID_DOCTOR_ID && password === VALID_PASSWORD) {
      localStorage.setItem("jjeh_doctor_session", "authorized");
      setIsAuthenticated(true);
      setLoginError("");
      fetchCurrentActivePatient();
      fetchCurrentQueueStatus();
    } else {
      setLoginError("❌ Invalid Doctor ID or Password. Try Again.");
      setPassword(""); // Clear password field on error
    }
  };

  // 🚪 Secure Session Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("jjeh_doctor_session");
    setIsAuthenticated(false);
    setDoctorId("");
    setPassword("");
  };

  // वर्तमान में केबिन के अंदर मौजूद एक्टिव मरीज को लाना

  const fetchCurrentActivePatient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/queue/current-patient?doctorName=${DEFAULT_DOCTOR}`,
      );
      // अगर बैकएंड से कोई वैलिड मरीज (tokenNumber > 0) मिलता है, तो उसे स्टेट में सेट करें
      if (res.data && res.data.tokenNumber > 0) {
        setCurrentPatient(res.data);
      } else {
        setCurrentPatient(null);
      }
    } catch (err) {
      console.error("करंट एक्टिव मरीज लोड करने में त्रुटि:", err);
    }
  };

  // आज की कतार का एवरेज वेटिंग टाइम फेच करना
  const fetchCurrentQueueStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/queue/analytics/waiting-time?doctorName=${DEFAULT_DOCTOR}`,
      );
      setAvgWaitTime(res.data.averageWaitingTimeMinutes);
    } catch (err) {
      console.error("एनालिटिक्स डेटा लोड करने में त्रुटि:", err);
    }
  };

  // अगले मरीज को बुलाने का हैंडलर
  const handleNextPatient = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/queue/next-patient",
        { doctorName: DEFAULT_DOCTOR },
      );

      if (res.data && res.data.currentPatient) {
        setCurrentPatient(res.data.currentPatient);
      } else {
        setCurrentPatient(null);
        alert("कतार में कोई और मरीज प्रतीक्षा नहीं कर रहा है!");
      }

      await fetchCurrentQueueStatus();
    } catch (err) {
      console.error("मरीज बुलाने में समस्या:", err);
      alert("कतार में कोई और मरीज प्रतीक्षा नहीं कर रहा है या सर्वर एरर है!");
      setCurrentPatient(null);
    } finally {
      setLoading(false);
    }
  };

  // 🛑 Barrier Layer 1: Render Professional Double-Input Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-2 mb-6">
            <span className="text-4xl">🔒</span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Doctor Control Access
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Enter your credentials to verify JJEH Main Cabin authorization.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Input 1: Doctor ID */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                Doctor ID / Username
              </label>
              <input
                type="text"
                required
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                placeholder="e.g. JJEH_Main_Doc"
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
              className="w-full bg-[#006EB7] hover:bg-blue-600 active:bg-blue-700 text-white font-black text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-600/10"
            >
              Verify & Unlock Control ⚡
            </button>
          </form>

          <div className="text-center pt-6 text-[10px] text-slate-500 font-medium">
            Protected Session Protocol • JJEH Sheikhpura
          </div>
        </div>
      </div>
    );
  }

  // ✅ Barrier Layer 2: Secure Dashboard Shell
  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
              <span>👨‍⚕️</span> डॉक्टर कंट्रोल पैनल
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              मुख्य केबिन (Main Consultation Room)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-blue-950 border border-blue-800 text-blue-300 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              ● Live Close
            </div>
            <button
              onClick={handleLogout}
              className="bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-700/60 px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer"
            >
              Logout 🚪
            </button>
          </div>
        </div>

        {/* लाइव पेशेंट कार्ड */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 text-center mb-8">
          <p className="text-slate-400 font-medium text-sm tracking-wider uppercase">
            अभी आपके केबिन में हैं
          </p>
          {currentPatient ? (
            <div className="mt-4">
              <h1 className="text-7xl font-black text-blue-500 tracking-tight">
                टोकन #{currentPatient.tokenNumber}
              </h1>
              <p className="text-2xl font-bold mt-4 text-slate-100">
                {currentPatient.patientId?.name || "अज्ञात मरीज"}
              </p>
              <p className="text-md text-slate-400 mt-1">
                {currentPatient.patientId?.age
                  ? `${currentPatient.patientId.age} वर्ष`
                  : ""}
                {currentPatient.patientId?.phone
                  ? ` • मोबाइल: ${currentPatient.patientId.phone}`
                  : ""}
              </p>
            </div>
          ) : (
            <div className="py-6">
              <h1 className="text-4xl font-bold text-slate-600 my-2">
                केबिन खाली है
              </h1>
              <p className="text-xs text-slate-500">
                अगला टोकन बुलाने के लिए नीचे Academic बटन दबाएं
              </p>
            </div>
          )}
        </div>

        {/* नेक्स्ट पेशेंट बटन */}
        <div className="text-center">
          <button
            onClick={handleNextPatient}
            disabled={loading}
            className={`w-full sm:w-auto text-white text-xl font-black px-12 py-5 rounded-xl shadow-lg transition transform active:scale-95 duration-200 cursor-pointer ${
              loading
                ? "bg-slate-700 cursor-not-allowed shadow-none"
                : "bg-red-600 hover:bg-red-700 shadow-red-900/30"
            }`}
          >
            {loading
              ? "🔄 मरीज बुला रहे हैं..."
              : "🟢 NEXT PATIENT (अगला बुलाएं)"}
          </button>
        </div>

        {/* एनालिटिक्स बार */}
        <div className="mt-8 bg-blue-950/40 border border-blue-900/50 rounded-lg p-4 text-center text-sm text-blue-300">
          📊 आज का **Average Waiting Time**:{" "}
          <strong className="text-white text-base mx-1">{avgWaitTime}</strong>{" "}
          मिनट है।
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
