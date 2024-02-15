import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pin_code: {
      type: Number,
      required: true,
    },
    specializedIn: [{ type: String, required: true }],
  },
  { timestamp: true }
);

export const Hospital = mongoose.Model('Hospital', hospitalSchema);
