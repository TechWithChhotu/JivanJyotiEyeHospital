// import mongoose from "mongoose";

// const queueSchema = new mongoose.Schema(
//   {
//     patientId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Patient",
//       required: true,
//     },
//     doctorName: { type: String, required: true }, // e.g., "Dr. S. Kumar", "Dr. V. Kumar"
//     tokenNumber: { type: Number, required: true },
//     date: { type: String, required: true }, // Format: YYYY-MM-DD
//     bookingTime: { type: Date, default: Date.now },
//     entryTime: { type: Date },
//     exitTime: { type: Date },
//     status: {
//       type: String,
//       enum: ["Pending", "In-Consultation", "Completed"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true },
// );

// const Queue = mongoose.model("Queue", queueSchema);
// export default Queue;

import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    tokenNumber: { type: Number, required: true },
    doctorName: { type: String, default: "Main Doctor" },
    feeAmount: { type: Number, default: 300 },

    // 🏢 Booking Source Tracker (Kiosk ya Reception)
    bookedBy: {
      type: String,
      enum: ["kiosk", "reception"],
      required: true,
    },

    // 💵 Payment Mode & Status
    paymentMode: {
      type: String,
      enum: ["Cash", "Razorpay-UPI", "Online"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },

    // 🔄 Queue Status (Ab enum bilkul sahi chalega kyunki duplicate hat gaya hai)
    status: {
      type: String,
      enum: ["pending", "waiting", "completed", "active"],
      default: "waiting",
    },

    // 🔒 Razorpay Tracking
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// Agar model pehle se compiled hai toh use use karega, nahi toh naya banayega (Printers/Kiosk compatibility ke liye best design)
export default mongoose.models.Queue || mongoose.model("Queue", queueSchema);
