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

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [productSchema],
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;