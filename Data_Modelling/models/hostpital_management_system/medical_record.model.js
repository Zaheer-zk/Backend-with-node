import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema(
  {
    numberOftest: {
      type: Number,
      required: true,
    },
    nameOfTests: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamp: true }
);

export const MedicalRecord = mongoose.Model(
  'MedicalRecord',
  medicalRecordSchema
);
