import mongoose from 'mongoose';

const hospitalHourSchema = new mongoose.Schema({});

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    available_time: {
      type: String,
      enum: ['AM', 'PM'],
    },
    experience_years: {
      type: Number,
      required: true,
      default: 0,
    },
    qualification: {
      type: String,
      required: true,
    },
    worksInHospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    numberOfHours: {
      type: hospitalHourSchema,
      required: true,
    },
  },
  { timestamp: true }
);

export const Doctor = mongoose.Model('Doctor', doctorSchema);
