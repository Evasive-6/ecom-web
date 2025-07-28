import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);


  const fetchOrders = async () => {
    try {
      let res = await axios.get("/api/order", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      console.log(res.data)
      setOrders(res.data.orders);
    } catch (error) {
      console.log("Error fetching orders:", error.message);
    }
  };

  const cancelOrder = async (id) => {
    try {
      let res = await axios.get(`/api/order/cancel/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      console.log(res.data)
      fetchOrders()
    } catch (error) {
      console.log("Error fetching orders:", error.message);
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div>
      <Navbar />
      <OrdersContainer>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
            <p>
              <strong>Address:</strong> {order.address.address1},{" "}
              {order.address.city} - {order.address.zipCode}
            </p>
            <p>
              <strong>Total:</strong> ${order.total}
            </p>
            <h4>Products:</h4>
            <ProductList>
              {order.products ? (
                order.products.map((product) => (
                  <ProductItem key={product._id}>
                    <img src={`https://ecom-web-jnzv.onrender.com/uploads/${product.imageUrl}`} alt="" />
                    {product.name} - ${product.price} x {product.quantity}
                  </ProductItem>
                ))
              ) : (
                <p>Loading products...</p>
              )}
            </ProductList>
            {!order.canceled ? (
                <DeleteButton onClick={() => cancelOrder(order._id)}>Cancel Order</DeleteButton>
            ): (
                <p>Status: Cancelled</p>
            )}
          </OrderCard>
        ))
      )}
    </OrdersContainer>
    </div>
  );
};

export default MyOrders;


export const OrdersContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #00d084, #00a86b);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

export const OrderCard = styled.div`
  background: #1e1e2f;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 208, 132, 0.6);
  color: #e0f7f1;
  border: 1px solid #00a86b;
`;

export const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ProductItem = styled.li`
  background: #2a2a3d;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #e0f7f1;
  box-shadow: 0 4px 15px rgba(0, 208, 132, 0.3);

  img{
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #00d084;
  }
`;
const DeleteButton = styled.button`
  background: #ff6f61;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 15px rgba(255, 111, 97, 0.6);

  &:hover {
    background: #ff3b2e;
    box-shadow: 0 8px 20px rgba(255, 59, 46, 0.8);
  }
`;
