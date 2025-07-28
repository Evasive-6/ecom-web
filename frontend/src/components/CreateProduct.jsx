import {useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from 'axios';
import Navbar from "./Navbar";

const CreateProduct = () => {

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const token = sessionStorage.getItem("token");
  const categories = ["Electronics", "Fashion", "Books", "Home Appliances"];

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('price', price);
    formData.append('stock', stock);
    images.forEach(image => formData.append('images', image));

    try {
      let res = await axios.post('http://localhost:3000/api/products', formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
          "Authorization": "Bearer " + token
        }
      });
      console.log("Response: ", res.data);

      alert(res.data.message);
      setImages([]);
      setName("");
      setDescription("");
      setCategory("");
      setTags("");
      setPrice("");
      setStock("");
    } catch (error) {
      console.error("Error creating product: ", error);
      alert("Failed to create product");
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows="4" required />
          <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
          <Input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags" />
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
          <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" required />
          <FileUpload>
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} />
            </label>
            <input type="file" id="upload" multiple onChange={handleImagesChange} hidden required />
          </FileUpload>
          <ImagePreview>
            {images.map((img, index) => (
              <img key={index} src={URL.createObjectURL(img)} alt="Preview" />
            ))}
          </ImagePreview>
          <Button type="submit">Create</Button>
        </form>
      </Container>
    </div>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 30px auto;
  padding: 30px;
  background: linear-gradient(135deg, #00d084, #00a86b);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 208, 132, 0.5);
  font-family: 'Poppins', sans-serif;
  color: #e0f7f1;

  h2 {
    text-align: center;
    margin-bottom: 25px;
    font-weight: 700;
    text-shadow: 0 0 8px #00d084;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 12px 0;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 12px #00d084;
    background-color: #e0f7f1;
    color: #1e1e2f;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 15px;
  margin: 12px 0;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 12px #00d084;
    background-color: #e0f7f1;
    color: #1e1e2f;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  margin: 12px 0;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 12px #00d084;
    background-color: #e0f7f1;
    color: #1e1e2f;
  }
`;

const FileUpload = styled.div`
  margin: 12px 0;
  label {
    cursor: pointer;
    display: inline-block;
    color: #00d084;
    transition: color 0.3s ease;
    &:hover {
      color: #00a86b;
    }
  }
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 12px 0;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 2px solid #00d084;
    border-radius: 10px;
    box-shadow: 0 0 10px #00d084;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 6px 15px rgba(255, 111, 97, 0.6);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: #ff3b2e;
    box-shadow: 0 8px 20px rgba(255, 59, 46, 0.8);
  }
`;

export default CreateProduct;