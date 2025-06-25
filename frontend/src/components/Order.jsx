import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import axios from 'axios';

const Order = () => {
  const location = useLocation();
  const orderData = location.state?.order;

  const navigate = useNavigate();
  const [products, setProducts] = useState(orderData.products || []);


  if (!orderData) {
    return (
      <div>
        <Navbar />
        <Container>
          <Card>
            <Header>Order Not Found</Header>
            <Message>No order details available.</Message>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Card>
          <Header>Order Confirmation</Header>
          <Info>
            <strong>Order ID:</strong> {orderData._id}
          </Info>
          <Info>
            <strong>Date:</strong> {new Date(orderData.createdAt).toLocaleDateString()}
          </Info>

          <SectionTitle>Delivery Address</SectionTitle>
          <Info>{orderData.address?.address1}</Info>
          {orderData.address?.address2 && <Info>{orderData.address.address2}</Info>}
          <Info>
            {orderData.address?.city} - {orderData.address?.zipCode}
          </Info>

          <SectionTitle>Order Details</SectionTitle>
          <Info>
            <strong>Total Amount:</strong> ${orderData.total}
          </Info>

          <SectionTitle>Products:</SectionTitle>
          <ProductList>
            {products.length > 0 ? (
              products.map((item, index) => (
                <ProductItem key={index}><img className='image' src={`http://localhost:3000/uploads/${item.imageUrl}`} alt={item.name}  /> {item.name} - ${item.price}</ProductItem>
              ))
            ) : (
              <Message>No products found in this order.</Message>
            )}
          </ProductList>

          <Button onClick={() => navigate('/payment', {state: {orderData: orderData}})}>Confirm</Button>
        </Card>
      </Container>
    </div>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  padding: 20px;
`;

const Card = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-top: 5vh;
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

const Header = styled.h2`
  color: var(--primary-color, #2ecc71);
  margin-bottom: 20px;
  text-align: center;
`;

const Info = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
  color: #333;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  background: #f9f9f9;
  margin: 5px 0;
  padding: 10px;
  border-radius: 6px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  .image{
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-top: 20px;
`;

export default Order;
