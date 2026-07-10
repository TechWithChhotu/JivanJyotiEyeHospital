// import mongoose from "mongoose";

// const patientSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     age: { type: Number, required: true },
//     phone: { type: String, required: true, unique: true },
//   },
//   { timestamps: true },
// );

// const Patient = mongoose.model("Patient", patientSchema);
// export default Patient;
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

// 👑 Safe Production Pattern: Pehle check karega agar model bana hua hai toh use karega, nahi toh naya banayega
const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
