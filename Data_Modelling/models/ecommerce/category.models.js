import { Schema, Model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

export const Category = Model('Category', categorySchema);
