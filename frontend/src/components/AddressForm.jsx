import {useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from 'axios';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {

  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipcode, setZipcode] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        let res = await axios.post('http://localhost:3000/api/auth/add/address', {city, address1, address2, zipcode}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        console.log(res.data)
    } catch (error) {
      console.log("Client Error", error.response)
      if(error.response.data.description.includes("jwt")){
        alert("Token Expired Login To Continue")
        navigate('/login')
      } 
    }
  }

  return (
    <div>
      <Navbar />
      <Container>
        <h2>Add Address</h2>
        <form onSubmit={handleSubmit}>
          <Input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
          <Input value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Address 1" required />
          <Input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Address 2" required />
          <Input type="number" value={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder="Zip Code" />
          <Button type="submit">Add</Button>
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

export default AddressForm;