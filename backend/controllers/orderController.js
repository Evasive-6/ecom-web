const Order = require('../models/Order')


const addOrder = async (req, res) => {
  try {
    const user = req.user._id;
    console.log(req.body)
    const {products,total, address } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "No products in the order" });
    }

    if (!address || !address.city || !address.address1 || !address.zipCode) {
      return res.status(400).json({ success: false, message: "Address is incomplete" });
    }

    const newOrder = new Order({ user, products, total, address });
    await newOrder.save();

    res.status(201).json({ success: true, message: "Order Created Successfully!", order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", description: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const user = req.user._id;
    const orders = await Order.find({user})
    res.status(201).json({ success: true, message: "Order Created Successfully!", orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", description: error.message });
  }
}

const cancelOrder = async (req, res) => {
  try {
    const user = req.user._id
    const id = req.params.id
    const order = await Order.findOne({user,_id:id})
    order.canceled = true
    await order.save()
    res.status(201).json({ success: true, message: "Order Cancelled Successfully!", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", description: error.message });
  }
}
module.exports = { addOrder,getAllOrders ,cancelOrder};


