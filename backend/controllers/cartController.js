const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, name, price, imageUrl, description,stock, quantity } = req.body;
    if (!name || !price || !quantity || !productId) {
      return res.status(400).json({
        success: false,
        message: "Name, price, quantity and productId are required."
      });
    }
    const productTotal = price * quantity;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [{
          productId,
          name,
          stock,
          price,
          imageUrl,
          description,
          quantity,
          total: productTotal
        }],
        total: productTotal
      });
    } else {
      const productIndex = cart.products.findIndex(prod => prod.productId.toString() === productId.toString());
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
        cart.products[productIndex].total = cart.products[productIndex].price * cart.products[productIndex].quantity;
      } else {
        cart.products.push({
          productId,
          name,
          price,
          stock,
          imageUrl,
          description,
          quantity,
          total: productTotal
        });
      }
      cart.total = cart.products.reduce((acc, item) => acc + item.total, 0);
    }
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Product added to cart successfully!",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      description: error.message
    });
  }
};

const getCartById = async (req,res) => {
  try {
    const userId = req.user._id;
    const cartId = req.params.id
    const cart = await Cart.findOne({ user: userId, _id: cartId });
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty.",
        cart: { products: [], total: 0 }
      });
    }
    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully.",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      description: error.message
    });
  }
}

const getCartItems = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty.",
        cart: { products: [], total: 0 }
      });
    }
    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully.",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      description: error.message
    });
  }
};

const removeFromCart = async (req, res) => {
    try {
      const userId = req.user._id;
      const productId = req.params.id;
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "ProductId is required for removal."
        });
      }
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found."
        });
      }
      cart.products = cart.products.filter(
        product => product._id.toString() !== productId
      );
      cart.total = cart.products.reduce((acc, product) => acc + product.total, 0);
      await cart.save();
      res.status(200).json({
        success: true,
        message: "Product removed from cart successfully.",
        cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        description: error.message
      });
    }
  };
  

const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found."
      });
    }
    cart.products = [];
    cart.total = 0;
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      description: error.message
    });
  }
};



const updateQuantity = async (req, res) => {
  try {
    const user = req.user._id;
    const { quantity, productId } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ user });

    if (!cart) {
      console.log("Cart not found");
      return res.status(404).json({ success: false, message: "Cart not found" });
    }
    
    const product = cart.products.find(item => item._id.toString() == productId.toString());

    if (!product) {
      console.log("Product not found in cart");
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    console.log("Product found:", product);

    product.quantity = quantity;
    product.total = quantity * product.price

    const newTotal = cart.products.reduce((acc, product) => acc + product.total, 0);
    cart.total = newTotal;
    
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      description: error.message
    });
  }
};

  

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  clearCart,
  updateQuantity,
  getCartById
};
