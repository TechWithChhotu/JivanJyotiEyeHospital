// import React, { useState } from "react";
// import axios from "axios";
// import OpdCaseSheetSlip from "./Prescription";

// function SelfBookingKiosk() {
//   const [step, setStep] = useState(1); // 1: Form, 2: Token Slip
//   const [formData, setFormData] = useState({ name: "", age: "", phone: "" });
//   const [generatedToken, setGeneratedToken] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // 💳 Razorpay Web Gateway Flow Handler
//   const handlePaymentAndBook = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log("Sending Data to Backend:", formData);
//     try {
//       // 1. Backend se Razorpay Order ID generate karwayein

//       // 1. Explicitly saare fields bhejien taaki backend ko body khali na mile
//       const orderRes = await axios.post(
//         "http://localhost:5000/api/queue/kiosk-order",
//         {
//           name: formData.name,
//           age: parseInt(formData.age), // Number me convert kar lein
//           phone: formData.phone,
//           amount: 300,
//         },
//       );
//       if (!orderRes.data.success) {
//         alert("Payment gateway down. Contact counter.");
//         setLoading(false);
//         return;
//       }

//       const { orderId, amount } = orderRes.data;

//       // 2. Razorpay Standard Checkout Configuration Options
//       const options = {
//         key: "rzp_test_Lje30DWDl2xWSJ", // 👈 Yahan bina kisi galti ke apni direct string API key daalein
//         amount: amount, // Jo backend se aaya hai (paise me)
//         currency: "INR",
//         name: "Jivan Jyoti Eye Hospital",
//         description: "OPD Consultation Token Fee",
//         order_id: orderId, // 👈 Isko strict double check karein ki backend se id hi aa rahi hai
//         handler: async function (response) {
//           try {
//             const verifyRes = await axios.post(
//               "http://localhost:5000/api/queue/book-kiosk-verify",
//               {
//                 name: formData.name,
//                 age: formData.age,
//                 phone: formData.phone,
//                 razorpayOrderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id,
//               },
//             );

//             if (verifyRes.data.success) {
//               setGeneratedToken(verifyRes.data);
//               setStep(2);
//             }
//           } catch (err) {
//             alert(
//               "Payment verified at bank but token logging failed. Please show SMS to counter.",
//             );
//           }
//         },
//         prefill: {
//           name: formData.name,
//           contact: formData.phone,
//         },
//         theme: {
//           color: "#2563eb",
//         },
//         modal: {
//           ondismiss: function () {
//             setLoading(false); // Agar patient window close kare to load state reset ho jaye
//           },
//         },
//       };

//       // 3. Open Razorpay Gateway Popup/UPI Intent Layer
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Kiosk Transaction Initiating Error:", error);
//       alert("Network Connection issue. Please retry.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans print:bg-white print:text-black">
//       {/* 📝 STEP 1: Form Fill Area */}
//       {step === 1 && (
//         <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
//           <div className="text-center">
//             <h2 className="text-2xl font-black text-white">
//               Jivan Jyoti Eye Hospital
//             </h2>
//             <p className="text-xs text-blue-500 font-bold uppercase mt-1">
//               Self Service Registration Kiosk
//             </p>
//           </div>

//           <form onSubmit={handlePaymentAndBook} className="space-y-4">
//             <div>
//               <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
//                 Patient Full Name (मरीज का नाम)
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:outline-none rounded-xl px-4 py-3 text-sm font-bold text-white"
//                 placeholder="Mareejan ka naam"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
//                   Age (उम्र)
//                 </label>
//                 <input
//                   type="number"
//                   required
//                   value={formData.age}
//                   onChange={(e) =>
//                     setFormData({ ...formData, age: e.target.value })
//                   }
//                   className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:outline-none rounded-xl px-4 py-3 text-sm font-bold text-white"
//                   placeholder="Age"
//                 />
//               </div>
//               <div>
//                 <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
//                   Phone (मोबाइल)
//                 </label>
//                 <input
//                   type="tel"
//                   required
//                   pattern="[0-9]{10}"
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phone: e.target.value })
//                   }
//                   className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:outline-none rounded-xl px-4 py-3 text-sm font-bold text-white"
//                   placeholder="10 Digits"
//                 />
//               </div>
//             </div>

//             <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
//               <span className="text-xs text-slate-400 font-bold uppercase">
//                 Consultation Fee
//               </span>
//               <span className="text-xl font-black text-emerald-400">
//                 ₹300.00
//               </span>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-wider py-4 rounded-xl transition cursor-pointer"
//             >
//               {loading
//                 ? "Processing Order..."
//                 : "Pay via UPI & Generate Token ⚡"}
//             </button>
//           </form>
//         </div>
//       )}
//       {/* 2. Step 2 par hamara naya OpdCaseSheetSlip component call hoga */}
//       {step === 2 && generatedToken && (
//         <OpdCaseSheetSlip
//           generatedToken={generatedToken}
//           setStep={setStep}
//           setGeneratedToken={setGeneratedToken}
//         />
//       )}

//       {/* 🖨️ STEP 3: Thermal Print Preview (Only visible after verified payment) */}
//       {step === 3 && generatedToken && (
//         <div className="flex flex-col items-center space-y-6 print:w-full">
//           <div className="w-[80mm] bg-white text-black p-4 border border-dashed border-slate-400 rounded-lg shadow-md font-mono text-xs space-y-4 print:border-none print:shadow-none print:p-0">
//             <div className="text-center space-y-1 border-b border-dashed border-black pb-3">
//               <h1 className="text-base font-bold tracking-tight">
//                 JIVAN JYOTI EYE HOSPITAL
//               </h1>
//               <p className="text-[9px]">Jamalpur Road, Satbighi, Sheikhpura</p>
//               <p className="text-[9px]">Helpline: +91 9709753293</p>
//             </div>

//             <div className="text-center py-2 bg-slate-100 rounded print:bg-transparent">
//               <span className="text-[10px] font-bold block uppercase tracking-wide">
//                 OPD TOKEN NUMBER
//               </span>
//               <span className="text-4xl font-black block tracking-tighter my-1">
//                 #{generatedToken.tokenNumber}
//               </span>
//               <p className="text-[9px] text-slate-500">
//                 Outside cabin queue me wait karein
//               </p>
//             </div>

//             <div className="space-y-1 border-b border-dashed border-black pb-3 text-[10px]">
//               <div className="flex justify-between">
//                 <span>Patient Name:</span>
//                 <span className="font-bold uppercase">
//                   {generatedToken.name}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Age:</span>
//                 <span className="font-bold">{generatedToken.age} Yrs</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Mobile:</span>
//                 <span className="font-bold">{generatedToken.phone}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Date:</span>
//                 <span className="font-bold">
//                   {new Date().toLocaleDateString("en-IN")}
//                 </span>
//               </div>
//             </div>

//             <div className="space-y-0.5 text-[9px] border-b border-dashed border-black pb-3">
//               <div className="flex justify-between font-bold">
//                 <span>Registration Fee:</span>
//                 <span>₹300.00</span>
//               </div>
//               <div className="flex justify-between text-emerald-700 print:text-black">
//                 <span>Payment Status:</span>
//                 <span className="font-bold">RAZORPAY VERIFIED</span>
//               </div>
//             </div>

//             <div className="text-center pt-1">
//               <p className="text-[8px] uppercase font-bold tracking-wider">
//                 Thank You • Get Well Soon
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-3 w-full max-w-[80mm] print:hidden">
//             <button
//               onClick={() => window.print()}
//               className="flex-1 bg-emerald-600 hover:bg-emerald-500 font-bold text-xs uppercase py-3 rounded-xl transition cursor-pointer text-center"
//             >
//               Print Slip 🖨️
//             </button>
//             <button
//               onClick={() => {
//                 setStep(1);
//                 setGeneratedToken(null);
//               }}
//               className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 font-bold text-xs uppercase py-3 rounded-xl transition cursor-pointer text-center"
//             >
//               Done 🔄
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SelfBookingKiosk;

import React, { useState, useEffect } from "react";
import axios from "axios";
import OpdCaseSheetSlip from "./Prescription";

// 📍 Hospital Location Coordinates (Jivan Jyoti Eye Hospital, Sheikhpura)
// Note: In coordinates ko aap Google Maps se apne exact gate/cabin ke mutabik thoda adjust kar sakte hain.
const HOSPITAL_LAT = 25.1432;
const HOSPITAL_LON = 85.8645;
const ALLOWED_RADIUS_METERS = 50000; // Strict 50-meter barrier

function SelfBookingKiosk() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    gender: "M",
    address: "",
  });
  const [generatedToken, setGeneratedToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🌍 Location States
  const [isWithinRadius, setIsWithinRadius] = useState(false);
  const [locationError, setLocationError] = useState(
    "Fetching your location... Ensure GPS is turned ON.",
  );
  const [checkingLocation, setCheckingLocation] = useState(true);

  // 📐 Haversine Formula: Do coordinates ke beech exact meters calculate karne ke liye
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  // 📡 Real-time GPS Tracking Tracker
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError(
        "Your browser/device doesn't support GPS location verification.",
      );
      setCheckingLocation(false);
      return;
    }

    // Patient ki live location lock karne ke liye watchPosition use kiya hai
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        const distance = calculateDistance(
          userLat,
          userLon,
          HOSPITAL_LAT,
          HOSPITAL_LON,
        );

        console.log(
          `User Distance from Hospital: ${distance.toFixed(2)} meters`,
        );

        if (distance <= ALLOWED_RADIUS_METERS) {
          setIsWithinRadius(true);
          setLocationError(null);
        } else {
          setIsWithinRadius(false);
          setLocationError(
            `Aap Hospital se ${distance.toFixed(0)}m door hain. Token booking sirf hospital ke 50m radius ke andar allowed hai.`,
          );
        }
        setCheckingLocation(false);
      },
      (error) => {
        setCheckingLocation(false);
        setIsWithinRadius(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              "Kiosk requires GPS permission. Please allow location sharing access.",
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError(
              "GPS signal weak. Move to an open area inside the hospital.",
            );
            break;
          case error.TIMEOUT:
            setLocationError(
              "Location request timed out. Please refresh and retry.",
            );
            break;
          default:
            setLocationError(
              "Location verify nahi ho paayi. Settings check karein.",
            );
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }, // Standard mobile high-accuracy profile
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 💳 Razorpay Flow Handler
  const handlePaymentAndBook = async (e) => {
    e.preventDefault();
    if (!isWithinRadius) {
      alert("Booking Blocked! Aap hospital campus ke bahar hain.");
      return;
    }
    setLoading(true);

    try {
      const orderRes = await axios.post(
        "http://localhost:5000/api/queue/kiosk-order",
        {
          name: formData.name,
          age: parseInt(formData.age),
          phone: formData.phone,
          gender: formData.gender,
          address: formData.address.trim(),
          amount: 300,
        },
      );
      if (!orderRes.data.success) {
        alert("Payment gateway down. Contact counter.");
        setLoading(false);
        return;
      }

      const { orderId, amount } = orderRes.data;

      const options = {
        key: "rzp_test_Lje30DWDl2xWSJ",
        amount: amount,
        currency: "INR",
        name: "Jivan Jyoti Eye Hospital",
        description: "OPD Consultation Token Fee",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/api/queue/book-kiosk-verify",
              {
                name: formData.name,
                age: formData.age,
                phone: formData.phone,
                gender: formData.gender,
                address: formData.address.trim(),
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
              },
            );

            if (verifyRes.data.success) {
              setGeneratedToken({
                ...verifyRes.data,
                gender: verifyRes.data.gender || formData.gender,
                address: verifyRes.data.address || formData.address.trim(),
              });
              setStep(2);
            }
          } catch (err) {
            alert(
              "Payment verified at bank but token logging failed. Please show SMS to counter.",
            );
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Kiosk Transaction Initiating Error:", error);
      alert("Network Connection issue. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans print:bg-white print:text-black">
      {step === 1 && (
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-white">
              Jivan Jyoti Eye Hospital
            </h2>
            <p className="text-xs text-blue-500 font-bold uppercase mt-1">
              Self Service Registration Kiosk
            </p>
          </div>

          {/* 📡 Geofencing Boundary Warning Banner */}
          {locationError ? (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-xl text-xs font-semibold leading-relaxed">
              ⚠️ {locationError}
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs font-bold text-center">
              ✅ Location Verified: Inside Hospital Premises (Allowed)
            </div>
          )}

          <form onSubmit={handlePaymentAndBook} className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                Patient Full Name (मरीज का नाम)
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:outline-none rounded-xl px-4 py-3 text-sm font-bold text-white"
                placeholder="Mareejan ka naam"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                  Age (उम्र)
                </label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:outline-none rounded-xl px-4 py-3 text-sm font-bold text-white"
                  placeholder="Age"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                  Gender (लिंग)
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:outline-none rounded-xl px-4 py-3 text-sm font-bold text-white cursor-pointer"
                >
                  <option value="M">Male (पुरुष)</option>
                  <option value="F">Female (महिला)</option>
                  <option value="O">Other (अन्य)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                Phone (मोबाइल)
              </label>
              <input
                type="text"
                required
                maxLength={10}
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, phone: val });
                }}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:outline-none rounded-xl px-4 py-3 text-sm font-bold text-white font-mono tracking-wider"
                placeholder="10 Digits"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                Address (पता)
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 focus:outline-none rounded-xl px-4 py-3 text-sm font-bold text-white"
                placeholder="जैसे: जमालपुर, शेखपुरा"
              />
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
              <span className="text-xs text-slate-400 font-bold uppercase">
                Consultation Fee
              </span>
              <span className="text-xl font-black text-emerald-400">
                ₹300.00
              </span>
            </div>

            {/* Submit button dynamically checks both form states and distance verification status */}
            <button
              type="submit"
              disabled={
                loading ||
                checkingLocation ||
                !isWithinRadius ||
                formData.phone.length !== 10
              }
              className={`w-full text-white font-black text-sm uppercase tracking-wider py-4 rounded-xl transition ${
                loading ||
                checkingLocation ||
                !isWithinRadius ||
                formData.phone.length !== 10
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 cursor-pointer"
              }`}
            >
              {checkingLocation
                ? "Verifying GPS..."
                : loading
                  ? "Processing Order..."
                  : "Pay via UPI & Generate Token ⚡"}
            </button>
          </form>
        </div>
      )}

      {step === 2 && generatedToken && (
        <OpdCaseSheetSlip
          generatedToken={generatedToken}
          setStep={setStep}
          setGeneratedToken={setGeneratedToken}
        />
      )}
    </div>
  );
}

export default SelfBookingKiosk;
