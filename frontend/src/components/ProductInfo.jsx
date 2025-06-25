import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from './Navbar';
import axios from 'axios';

const ProductInfo = () => {
  const location = useLocation();
  const product = location.state;
  const [quantity, setQuantity] = useState(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    const handleCart = async (e) => {
      e.stopPropagation()
      try {
        let res = await axios.post(`http://localhost:3000/api/cart/add`, {
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.images[0],
          quantity: quantity,
          description: product.description,
        }, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token")
          }
        })
        console.log(res.data)
        alert("Item Added to Cart")
      } catch (error) {
        console.log(error.message)
      }
    }

  return (
    <div>
      <Navbar />
      <Container>
        <h2>{product.name}</h2>
        {product.images.length === 1 ? (
          <ImageWrapper>
            <img src={`http://localhost:3000/uploads/${product.images[0]}`} alt={`Product`} />
          </ImageWrapper>
        ) : (
          <Slider {...settings}>
            {[...new Set(product.images)].map((img, index) => (
              <ImageWrapper key={index}>
                <img src={`http://localhost:3000/uploads/${img}`} alt={`Product ${index + 1}`} />
              </ImageWrapper>
            ))}
          </Slider>
        )}

        <Description>{product.description}</Description>
        <Details>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Tags:</strong> {product.tags}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
        </Details>
        <QuantityWrapper>
          <label htmlFor="quantity">Quantity:</label>
          <div className="box">
          
          <button onClick={() => setQuantity(prev => {
            if (prev > 1){
              return prev - 1
            }
            return prev
          })}>-</button>
          <h1>{quantity}</h1>
          <button onClick={() => setQuantity(prev => {
            if (prev >= product.stock){
                alert("Out Of Stock")
                return prev
            }   
            return prev + 1
        })}>+</button>
          </div>
        </QuantityWrapper>
        <Button onClick={handleCart}>Add to Cart</Button>
      </Container>
    </div>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
  text-align: center;
`;

const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const Description = styled.p`
  margin: 20px 0;
  font-size: 16px;
  color: #333;
`;

const Details = styled.div`
  text-align: left;
  p {
    margin: 10px 0;
    font-size: 16px;
    color: #555;
  }
`;

const QuantityWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  label {
    margin-right: 10px;
    font-size: 1.5rem;
  
  }
  .box{
    display: flex;
    justify-content: center;

    gap: 10px;
    /* background-color: var(--primary-color); */
    button{
      background-color: var(--accent-color);
      color: #000451;
      border: none;
      font-size: 2rem;
      font-weight: 500;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      margin: 0 5px;
      border-radius: 50%;
      border: 1px solid black;
    }
    
  }
`;



const Button = styled.button`
  padding: 10px 20px;
  background: var(--primary-color);
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #29e66e;
  }
`;

export default ProductInfo;