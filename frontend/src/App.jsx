import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReceptionDashboard from "./pages/ReceptionDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import PatientView from "./pages/PatientView.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "../components/Navbar.jsx";
import SelfBookingKiosk from "./pages/SelfBookingKiosk.jsx";
import Prescription from "./pages/Prescription.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100 font-sans antialiased text-slate-900">
        {/* Modern Responsive Navigation Header */}
        <Navbar />

        {/* Application Main Content Routing */}
        <main className="animate-fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<SelfBookingKiosk />} />
            <Route path="/t2" element={<Prescription />} />

            {/* 1. Receptionist Screen (Default Route) */}
            <Route path="/reception" element={<ReceptionDashboard />} />

            {/* 2. Doctor Consultation Control Panel */}
            <Route path="/doctor" element={<DoctorDashboard />} />

            {/* 3. Real-time Patient Tracker Screen 
                मरीज QR कोड स्कैन करके सीधे इस URL पर आएगा (जैसे: /patient/Dr. S. Kumar/5) */}
            <Route path="/patient/:myTokenNumber" element={<PatientView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
