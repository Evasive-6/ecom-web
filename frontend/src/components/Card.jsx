import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = ({ product, isEdit, isDelete,updateProducts }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleEdit = () => {
    navigate('/edit', { state: product });
  };

  const handleDelete = async () => {
    try {
      let res = await axios.delete(`http://localhost:3000/api/products/${product._id}`, {
        headers: { Authorization: "Bearer " + token }
      });
      let res2 = await axios.delete(`http://localhost:3000/api/cart/delete/${product._id}`, {
        headers: { Authorization: "Bearer " + token }
      });
      console.log("Response 1", res.data.message)
      console.log("Response 2", res2.data.message)
      updateProducts()
      alert(res.data.message);
    } catch (error) {
      console.log("Client Error", error.response)
      if(error.response.data.description.includes("jwt")){
        alert("Token Expired Login To Continue")
        navigate('/login')
      } 
    }
  };

  const handleShowInfo = () => {
    if (!isDelete && !isEdit) {
      navigate(`/product/${product._id}`, { state: product });
    }
  };

  const handleCart = async (e) => {
    e.stopPropagation();
    try {
      let res = await axios.post(`http://localhost:3000/api/cart/add`, {
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.images[0],
        quantity: 1,
        description: product.description,
        stock: product.stock
      }, {
        headers: { Authorization: "Bearer " + token }
      });
      console.log(res.data);
      alert("Item Added to Cart");
    } catch (error) {
      console.log("Client Error", error.response)
      if(error.response.data.description.includes("jwt")){
        alert("Token Expired Login To Continue")
        navigate('/login')
      } 
    }
  };

  return (
    <StyledCard onClick={handleShowInfo}>
      <img src={`http://localhost:3000/uploads/${product.images[0]}`} alt="Product" className="cover" />
      <h1 className="title">{product.name}</h1>
      <p className="desc">{product.description}</p>
      <p className="price">$ {product.price}</p>
      <p className="category">{product.category}</p>
      <div className="buttons">
        {!isEdit && <button onClick={handleCart} className="primary btn">Add to Cart</button>}
        {isEdit && <button onClick={handleEdit} className="primary btn">Edit</button>}
        {isDelete && <button onClick={handleDelete} className="primary btn del">Delete</button>}
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  position: relative;
  width: 320px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #667eea, #764ba2);
  text-align: left;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 25px auto;
  border: none;
  color: #f0f0f0;

  .category {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .cover {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  }

  .title {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 20px 20px 10px 20px;
    color: #fff;
  }

  .desc {
    font-size: 1rem;
    color: #e0e0e0;
    margin: 0 20px 15px 20px;
    line-height: 1.4;
    min-height: 60px;
  }

  .price {
    font-size: 1.4rem;
    font-weight: 700;
    color: #ffd700;
    margin: 0 20px 20px 20px;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    gap: 15px;
    padding: 0 20px 20px 20px;
  }

  .primary.btn {
    background-color: #ff6f61;
    color: #fff;
    border: none;
    padding: 12px 25px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(255, 111, 97, 0.5);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      background-color: #ff3b2e;
      box-shadow: 0 6px 12px rgba(255, 59, 46, 0.7);
    }
  }

  .primary.btn.del {
    background-color: #444;
    color: #ff6f61;
    border: 2px solid #ff6f61;
    padding: 12px 25px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: none;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: #ff6f61;
      color: #fff;
      border-color: transparent;
      box-shadow: 0 4px 8px rgba(255, 111, 97, 0.5);
    }
  }
`;

export default Card;
