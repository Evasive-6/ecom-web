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
                <ProductItem key={index}><img className='image' src={`https://ecom-web-jnzv.onrender.com/uploads/${item.imageUrl}`} alt={item.name}  /> {item.name} - ${item.price}</ProductItem>
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
  background: linear-gradient(135deg, #00d084, #00a86b);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
`;

const Card = styled.div`
  background: #1e1e2f;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 208, 132, 0.6);
  width: 100%;
  max-width: 600px;
  margin-top: 5vh;
  color: #e0f7f1;
  border: 1px solid #00a86b;
`;

const Button = styled.button`
  background-color: #00d084;
  color: #1e1e2f;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  margin: 20px 0;
  font-weight: 700;
  box-shadow: 0 6px 15px rgba(0, 208, 132, 0.6);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #00a86b;
    box-shadow: 0 8px 20px rgba(0, 168, 107, 0.8);
  }
`;

const Header = styled.h2`
  color: #00d084;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0 0 10px #00d084;
`;

const Info = styled.p`
  font-size: 1.1rem;
  color: #a0a0a0;
  margin: 5px 0;
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
  color: #e0f7f1;
  font-weight: 700;
  text-shadow: 0 0 8px #00d084;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  background: #2a2a3d;
  margin: 5px 0;
  padding: 15px;
  border-radius: 12px;
  color: #e0f7f1;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0, 208, 132, 0.3);

  .image{
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #00d084;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #a0a0a0;
  margin-top: 20px;
`;

export default Order;
