import express from "express";
import Patient from "../models/Patient.js";
import Queue from "../models/Queue.js";

const router = express.Router();

// 1. पुराने मरीज को फोन नंबर से सर्च करना
router.get("/search/:phone", async (req, res) => {
  try {
    const patient = await Patient.findOne({ phone: req.params.phone });
    if (!patient) return res.status(404).json({ message: "मरीज नहीं मिला" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. नया/पुराना मरीज के लिए कतार (टोकन) बुक करना
router.post("/book-token", async (req, res) => {
  const { name, age, phone, doctorName, isOldPatient, patientId } = req.body;

  try {
    let currentPatientId = patientId;

    // अगर मरीज नया है तो उसे सेव करें
    if (!isOldPatient || !currentPatientId) {
      const newPatient = new Patient({ name, age, phone });
      await newPatient.save();
      currentPatientId = newPatient._id;
    }

    // आज की तारीख का Start और End समय (Date Object query ke liye)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // आज के दिन उस डॉक्टर का आखिरी टोकन नंबर निकालें
    const lastQueueItem = await Queue.findOne({
      doctorName: doctorName || "Main Doctor",
      date: { $gte: startOfToday, $lte: endOfToday },
    }).sort({ tokenNumber: -1 });

    const nextTokenNumber = lastQueueItem ? lastQueueItem.tokenNumber + 1 : 1;

    // Naya Queue Item create karein
    const newQueueEntry = new Queue({
      patientId: currentPatientId,
      doctorName: doctorName || "Main Doctor",
      tokenNumber: nextTokenNumber,
      bookedBy: "reception", // Required in your schema
      paymentMode: "Cash", // Required in your schema (Defaulting to Cash for reception)
      paymentStatus: "completed",
      status: "waiting", // 👈 Lowercase 'waiting' ya 'pending' bhejien (Jo aapke Enum me shamil hai)
      date: new Date(),
    });

    await newQueueEntry.save();

    res.status(201).json({ success: true, tokenNumber: nextTokenNumber });
  } catch (err) {
    console.error("Booking Error backend:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
