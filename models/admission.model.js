const mongoose = require("mongoose")

const admissionSchema = new mongoose.Schema(
  {
    // --- Section A: Child/Ward Information ---
    surname: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    firstName: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    sex: { type: String, enum: ["Male", "Female"], required: true },
    nationality: { type: String, required: true, trim: true },
    stateOfOrigin: { type: String, required: true, trim: true },
    bloodGroup: { type: String, trim: true }, // often unknown for young kids — left optional
    ailment: { type: String, trim: true },
    onMedication: { type: String, trim: true }, // free text, e.g. "Yes — Panadol" or "No"
    criesOften: { type: Boolean, default: false },
    criesOftenReason: { type: String, trim: true }, // only relevant if criesOften is true

    childPhoto: { type: String, required: true }, // Cloudinary URL
    childPhotoPublicId: { type: String, required: true },

    // --- Section B: Parent/Guardian Information ---
    parentName: { type: String, required: true, trim: true },
    homeAddress: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    occupation: { type: String, required: true, trim: true },
    officeAddress: { type: String, trim: true },
    officePhone: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },

    parentPhoto: { type: String, required: true },
    parentPhotoPublicId: { type: String, required: true },

    // --- Item 8: Authorized pickup person ---
    assigneeName: { type: String, required: true, trim: true },
    assigneePhoto: { type: String, required: true },
    assigneePhotoPublicId: { type: String, required: true },

    // --- Emergency Contact ---
    emergencyName: { type: String, required: true, trim: true },
    emergencyRelationship: { type: String, required: true, trim: true },
    emergencyOccupation: { type: String, trim: true },
    emergencyAddress: { type: String, required: true, trim: true },
    emergencyPhone: { type: String, required: true, trim: true },

    // --- Certification (replaces physical signature) ---
    signedName: { type: String, required: true, trim: true },
    certifiedAccurate: { type: Boolean, required: true },

    // --- Office Use Only — admin sets these LATER, never on the public form ---
    status: { type: String, enum: ["pending", "admitted", "rejected"], default: "pending" },
    admissionNo: { type: String, trim: true },
    decisionDate: { type: Date },
    designation: { type: String, trim: true }, // staff member who processed it
  },
  { timestamps: true }
)

module.exports = mongoose.model("admission", admissionSchema)