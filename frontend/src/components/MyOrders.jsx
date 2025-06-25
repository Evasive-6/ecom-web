import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);


  const fetchOrders = async () => {
    try {
      let res = await axios.get("http://localhost:3000/api/order", {
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
      let res = await axios.get(`http://localhost:3000/api/order/cancel/${id}`, {
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
                    <img src={`http://localhost:3000/uploads/${product.imageUrl}`} alt="" />
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
  padding: 20px;
`;

export const OrderCard = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ProductItem = styled.li`
  background: #f8f8f8;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 20px;
  img{
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;
const DeleteButton = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
  &:hover {
    background: #c0392b;
  }
`;
