import { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from 'axios';
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const EditProduct = () => {
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const categories = ["Electronics", "Fashion", "Books", "Home Appliances"];

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  useEffect(() => {
    if (location.state) {
      setName(location.state.name);
      setDescription(location.state.description);
      setPrice(location.state.price);
      setStock(location.state.stock);
      setCategory(location.state.category);
      setTags(location.state.tags);

      if (Array.isArray(location.state.images)) {
        setImages(location.state.images);
      }
    }
  }, [location.state]);

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
      let res = await axios.put('http://localhost:3000/api/products/'+location.state._id, formData, {
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
      console.error("Error updating product: ", error);
      alert("Failed to update product");
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <h2>Edit Product</h2>
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
            <input type="file" id="upload" multiple onChange={handleImagesChange} hidden />
          </FileUpload>
          <ImagePreview>
            {images.map((img, index) => (
              <img key={index} src={`http://localhost:3000/uploads/${img}`} alt="Existing Product" />
            ))}
            {images.map((img, index) => (
              img instanceof File ? <img key={index} src={URL.createObjectURL(img)} alt="Preview" /> : null
            ))}
          </ImagePreview>
          <Button type="submit">Update</Button>
        </form>
      </Container>
    </div>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FileUpload = styled.div`
  margin: 10px 0;
  label {
    cursor: pointer;
    display: inline-block;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #578e7e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #467968;
  }
`;

export default EditProduct;