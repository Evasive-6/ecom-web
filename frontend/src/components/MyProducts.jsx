import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './Card';
import Navbar from './Navbar';
import styled from 'styled-components';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const token = sessionStorage.getItem("token");

  const fetch = async () => {
    try {
      console.log("Using token:", token);

      let res = await axios.get(`http://localhost:3000/api/products/my-products`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Response data:", res.data);

      console.log(res.data);
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products. Please check your authorization token.");
    }
  };

  const updateProducts = async () => {
    await fetch()
  }
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <Title>My Products</Title>
        <MyProductContainer>
          {products && products.map(product => (
            <Card key={product._id} product={product} isEdit={true} isDelete={true} updateProducts={updateProducts}/>
          ))}
        </MyProductContainer>
      </Container>
    </div>
  );
};

export default MyProducts;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const MyProductContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;