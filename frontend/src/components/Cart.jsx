import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartCard from './CartCard';
import Navbar from './Navbar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Order from './Order';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/cart', {
        headers: { Authorization: "Bearer " + token }
      });
      console.log(res.data);
      setCart(res.data.cart);
    } catch (error) {
      console.log("Client Error", error.response)
      if(error.response.data.description.includes("jwt")){
        alert("Token Expired Login To Continue")
        navigate('/login')
      } 
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const updateCart = async () => {
    await fetchCart();
  };

  const placeOrder = async () => {
    alert("Order placed successfully!");
    navigate('/select-address', {
      state: cart
    })
  };

  return (
    <div>
      <Navbar />
      <CartContainer>
        {cart && cart.products && cart.products.length > 0 ? (
          <div>
            <TotalAmount>Total: ${cart.total.toFixed(2)}</TotalAmount>
            {cart.products.map((product, index) => (
              <CartCard key={index} product={product} updateCart={updateCart} />
            ))}
            <Button onClick={placeOrder}>Place Order</Button>
          </div>
        ) : (
          <h2>Your cart is empty</h2>
        )}
      </CartContainer>
    </div>
  );
};

export default Cart;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const TotalAmount = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: var(--font-color);
  border: 1px solid black;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 0; 
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #06c44c; 
  }
`;