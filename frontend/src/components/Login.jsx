import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {email, password});
            console.log(res.data.user);
            sessionStorage.setItem("token", res.data.token)
            alert('User Login successfully!');
            navigate('/')
        } catch (error) {
            console.error(error);
            alert('An error occurred while submitting the form.');
        }
    };

    return (
        <div>
            <Navbar />
            <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Title>Login</Title>
                <Label>Email:</Label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    required
                />
                <Label>Password:</Label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter You Password"
                    required
                />
                <Button type="submit">Submit</Button>
            </Form>
        </FormContainer>
        </div>
    );
};
const FormContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 100vh;
background-color: var(--background-color);
padding: 20px;
color: var(--font-color);
`;

const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
max-width: 400px;
background: var(--secondary-color);
border-radius: 8px;
padding: 20px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
border: 1px solid var(--font-color);
`;

const Input = styled.input`
margin-bottom: 15px;
padding: 10px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 5px;
outline: none;
&:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(1, 117, 38, 0.363);
}
`;

const Label = styled.label`
margin-bottom: 5px;
font-weight: bold;
color: #333;
`;

const Button = styled.button`
padding: 10px 15px;
font-size: 16px;
color: white;
background-color: var(--primary-color);
border: none;
border-radius: 5px;
cursor: pointer;
&:hover {
    background-color: #578e7ecf;
}
&:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
`;

const Title = styled.h1`
margin-bottom: 20px;
text-align: center;
color: #333;
`;

const ErrorMessage = styled.p`
color: red;
font-size: 14px;
margin: -10px 0 10px;
`;

export default Login;
