import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

const SelectAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state || {};
  console.log("CArt",cart)
  const getAddresses = async () => {
    try {
      let res = await axios.get('http://localhost:3000/api/auth/addresses', {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") }
      });
      setAddresses(res.data.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error.message);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }

    try {
      console.log("products", cart.products)
      const token = sessionStorage.getItem("token");
      const orderResponse = await axios.post(
        'http://localhost:3000/api/order/place',
        { products: cart.products, total:cart.total, address: selectedAddress },
        { headers: { Authorization: "Bearer " + token } }
      );  

      console.log("Order confirmed:", orderResponse.data);
      navigate('/order-confirmation', { state: { order: orderResponse.data.order } });
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <AddressContainer>
        <h2>Select Delivery Address</h2>
        {addresses.map((address, index) => (
          <AddressCard
            key={index}
            onClick={() => handleSelectAddress(address)}
            selected={selectedAddress === address}
          >
            <p>{address.address1}, {address.address2}</p>
            <p>{address.city} - {address.zipCode}</p>
          </AddressCard>
        ))}
        <Button  onClick={handleConfirmOrder} className="primary btn">Confirm Order</Button  >
      </AddressContainer>
    </div>
  );
};

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
`
const AddressCard = styled.div`
  background-color: ${props => props.selected ? '#d3f9d8' : '#fff'};
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  text-align: left;
`;

export default SelectAddress;
