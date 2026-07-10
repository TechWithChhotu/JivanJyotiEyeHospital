// import express from "express";
// import Queue from "../models/Queue.js";

// const router = express.Router();

// // 1. डॉक्टर के 'Next Patient' बटन का लॉजिक (टोकन अपडेट और लाइव सॉकेट ट्रिगर)
// router.post("/next-patient", async (req, res) => {
//   const { doctorName } = req.body;
//   const today = new Date().toISOString().split("T")[0];
//   const io = req.app.get("socketio"); // server.js से io ऑब्जेक्ट गेट करें

//   try {
//     // वर्तमान एक्टिव मरीज को कम्पलीट करें
//     await Queue.findOneAndUpdate(
//       { doctorName, date: today, status: "In-Consultation" },
//       { status: "Completed", exitTime: new Date() },
//     );

//     // अगले वेटिंग मरीज को इन-कंसल्टेशन करें
//     // ... पुराने इम्पोर्ट्स और कोड वैसे ही रहेंगे

//     // अगले Pending मरीज को In-Consultation में बदलें
//     const nextPatient = await Queue.findOneAndUpdate(
//       { doctorName, date: today, status: "Pending" },
//       { status: "In-Consultation", entryTime: new Date() },
//       { returnDocument: "after", sort: { tokenNumber: 1 } }, // ⬅️ यहाँ 'new: true' की जगह 'returnDocument: 'after'' कर दिया
//     ).populate("patientId");

//     // ... बाकी का कोड बिल्कुल सेम रहेगा

//     // सॉकेट के माध्यम से मरीजों के स्क्रीन पर लाइव रिफ्रेश भेजें
//     io.to(doctorName).emit("queue_updated", {
//       currentWaitingToken: nextPatient
//         ? nextPatient.tokenNumber
//         : "कोई मरीज नहीं है",
//     });

//     res.status(200).json({ success: true, currentPatient: nextPatient });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. एवरेज वेटिंग टाइम कैलकुलेशन API
// router.get("/analytics/waiting-time", async (req, res) => {
//   const { doctorName } = req.query;
//   const today = new Date().toISOString().split("T")[0];

//   try {
//     const completedPatients = await Queue.find({
//       doctorName,
//       date: today,
//       status: "Completed",
//       entryTime: { $exists: true },
//       bookingTime: { $exists: true },
//     });

//     if (completedPatients.length === 0) {
//       return res.json({ averageWaitingTimeMinutes: 0 });
//     }

//     let totalWaitTimeMs = 0;
//     completedPatients.forEach((p) => {
//       totalWaitTimeMs += p.entryTime - p.bookingTime;
//     });

//     const avgTimeMinutes = Math.round(
//       totalWaitTimeMs / completedPatients.length / 60000,
//     );
//     res.json({ averageWaitingTimeMinutes: avgTimeMinutes });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
import express from "express";
import Queue from "../models/Queue.js";
import Razorpay from "razorpay";
import dotenv from "dotenv"; // 👈 1. dotenv import karein
dotenv.config(); // 👈 2. dotenv ko initialize karein taaki process.env kaam karne lage
const router = express.Router();

// Baaki aapka niche ka code same rahega...
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
// ==========================================
// 🌟 यह नया राउट यहाँ जोड़ें (मरीज स्क्रीन रिफ्रेश फिक्स)
// ==========================================
// GET: http://localhost:5000/api/queue/current-patient
// GET: http://localhost:5000/api/queue/current-patient
// 1. Current Active Patient status check karne ke liye API
router.get("/current-patient", async (req, res) => {
  const { doctorName } = req.query;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  try {
    // Kebab/Cabin ke andar jo abhi 'active' status me chal rha h use find karein
    const activePatient = await Queue.findOne({
      doctorName: doctorName || "Main Doctor",
      status: "active", // lowercase check
      date: { $gte: startOfToday, $lte: endOfToday },
    }).populate("patientId");

    res.json(activePatient || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Next Patient ko andar bulane ke liye API
router.post("/next-patient", async (req, res) => {
  const { doctorName } = req.query; // ya req.body jo bhi aap pass kar rahe hon

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  try {
    const docName = doctorName || "Main Doctor";

    // Step A: Jo pehle se andar active tha, use 'completed' mark kar dein
    await Queue.updateMany(
      {
        doctorName: docName,
        status: "active",
        date: { $gte: startOfToday, $lte: endOfToday },
      },
      { $set: { status: "completed" } },
    );

    // Step B: Agla patient dhoondhein jiska status 'waiting' ya lowercase 'pending' ho
    // Takki agar database me capital ya lowercase mix ho tab bhi query crack na kare
    const nextPatient = await Queue.findOne({
      doctorName: docName,
      status: { $in: ["waiting", "pending", "Pending"] }, // Flexible safety arrays
      date: { $gte: startOfToday, $lte: endOfToday },
    }).sort({ tokenNumber: 1 }); // Sabse chota token pehle aayega

    if (!nextPatient) {
      return res.json({ message: "No patients waiting", currentPatient: null });
    }

    // Step C: Is naye patient ka status badalkar 'active' kar dein
    nextPatient.status = "active";
    await nextPatient.save();

    // Patient profile ke sath detail populate karke return karein
    const populatedPatient = await Queue.findById(nextPatient._id).populate(
      "patientId",
    );

    res.json({ currentPatient: populatedPatient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. एवरेज वेटिंग टाइम कैलकुलेशन API (आपका पुराना कोड वैसा ही रहेगा)
router.get("/analytics/waiting-time", async (req, res) => {
  const { doctorName } = req.query;
  const today = new Date().toISOString().split("T")[0];

  try {
    const completedPatients = await Queue.find({
      doctorName,
      date: today,
      status: "Completed",
      entryTime: { $exists: true },
      bookingTime: { $exists: true },
    });

    if (completedPatients.length === 0) {
      return res.json({ averageWaitingTimeMinutes: 0 });
    }

    let totalWaitTimeMs = 0;
    completedPatients.forEach((p) => {
      totalWaitTimeMs += p.entryTime - p.bookingTime;
    });

    const avgTimeMinutes = Math.round(
      totalWaitTimeMs / completedPatients.length / 60000,
    );
    res.json({ averageWaitingTimeMinutes: avgTimeMinutes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 📄 backend/routes/queue.routes.js ke top par yeh import karein:

import Patient from "../models/patient.js"; // 👈 Aapki file ka jo bhi exact path aur naam ho (jaise patient.model.js ya Patient.js)

// Agar aap CommonJS (require) use kar rahe hain toh aise likhein:
// const Patient = require("../models/Patient");
// Helper function: Aaj ka agla token number nikalne ke liye
const getNextTokenNumber = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const latestQueueItem = await Queue.findOne({
    createdAt: { $gte: today },
  }).sort({ tokenNumber: -1 });
  return latestQueueItem ? latestQueueItem.tokenNumber + 1 : 1;
};
/* ==========================================
   🖥️ CASE 1: SELF SERVICE KIOSK (PATIENT KHUD SE)
   ========================================== */
router.post("/kiosk-order", async (req, res) => {
  try {
    const { name, age, phone, amount } = req.body;

    // Patient check ya create
    let patient = await Patient.findOne({ phone });
    if (!patient) {
      patient = new Patient({ name, age, phone });
      await patient.save();
    }

    // Razorpay Order Generation
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `kiosk_rcpt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    const nextTokenNumber = await getNextTokenNumber();

    // DB entry: bookedBy='kiosk', paymentMode='Razorpay-UPI', paymentStatus='pending'
    const newQueueEntry = new Queue({
      patientId: patient._id,
      tokenNumber: nextTokenNumber,
      doctorName: "Main Doctor",
      feeAmount: amount,
      bookedBy: "kiosk", // 👈 Patient ne khud kiya
      paymentMode: "Razorpay-UPI", // 👈 Always online for kiosk
      paymentStatus: "pending", // 👈 Verify hone par complete hoga
      razorpayOrderId: order.id,
      status: "waiting",
    });
    await newQueueEntry.save();

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      tokenNumber: nextTokenNumber,
    });
  } catch (error) {
    console.error("Kiosk Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Kiosk Verification: Success hone par status 'completed' set hoga
router.post("/book-kiosk-verify", async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId } = req.body;

    const updatedQueue = await Queue.findOneAndUpdate(
      { razorpayOrderId: razorpayOrderId },
      {
        razorpayPaymentId: razorpayPaymentId,
        paymentStatus: "completed", // 👈 Payment ho gaya!
      },
      { new: true },
    ).populate("patientId");

    return res.status(200).json({
      success: true,
      tokenNumber: updatedQueue.tokenNumber,
      name: updatedQueue.patientId.name,
      phone: updatedQueue.patientId.phone,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Verification failed" });
  }
});

/* ==========================================
   🏢 CASE 2: RECEPTION COUNTER BOOKING (CASH / ONLINE BOTH)
   ========================================== */
router.post("/reception-book", async (req, res) => {
  try {
    const { name, age, phone, paymentMode } = req.body; // paymentMode will be 'Cash' or 'Online'

    // Patient check ya create
    let patient = await Patient.findOne({ phone });
    if (!patient) {
      patient = new Patient({ name, age, phone });
      await patient.save();
    }

    const nextTokenNumber = await getNextTokenNumber();

    // DB entry: bookedBy='reception', paymentStatus='completed' (receptionist ne verify kiya h)
    const newQueueEntry = new Queue({
      patientId: patient._id,
      tokenNumber: nextTokenNumber,
      doctorName: "Main Doctor",
      feeAmount: 300,
      bookedBy: "reception", // 👈 Reception se book hua
      paymentMode: paymentMode, // 👈 'Cash' ya counter pe scan kiya hua 'Online'
      paymentStatus: "completed", // Counter par receptionist ne check kar liya h
      status: "waiting",
    });
    await newQueueEntry.save();

    return res.status(201).json({
      success: true,
      tokenNumber: nextTokenNumber,
      name: patient.name,
    });
  } catch (error) {
    console.error("Reception Booking Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Reception booking failed" });
  }
});
export default router;
