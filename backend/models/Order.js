const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productId: {
        type: String,
    },
    name:{
        type: String
    },
    price: {
        type: Number
    },
    imageUrl: {
        type: String
    },
    total: {
        type: Number
    },
    stock: {
        type: Number
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products:[productSchema],
  total: {
    type: Number,
    required: true,
  },
  address: {
    city: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    zipCode: { type: Number, required: true }
  },
  canceled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
