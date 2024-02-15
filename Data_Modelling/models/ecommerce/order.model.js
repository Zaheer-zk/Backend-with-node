import mongoose from 'mongoose';

const orderItemsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [orderItemsSchema],
    },
    address: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['PENDING', 'CANCELED', 'DELIVERED'],
      required: true,
      default: 'PENDING',
    },
  },
  { timestamp: true }
);

export const Order = mongoose.model('Order', orderSchema);
