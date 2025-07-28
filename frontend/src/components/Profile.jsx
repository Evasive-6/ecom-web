import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const fetchUserProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get('https://ecom-web-jnzv.onrender.com/api/auth', {
        headers: { Authorization: "Bearer " + token },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token")
    alert("Logged Out Successfully !!")
    navigate('/login')
  }
  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!user) {
    navigate('/login');
  }
  if(user){
    console.log(user)
  }
  return (
    <div>
      {user && (

    <div>
      <Navbar />
      <ProfileWrapper>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <ProfileContainer>
        <ProfileImage src={`https://ecom-web-jnzv.onrender.com/uploads/${user.avatar.url}`} alt={user.name} />
        <ProfileDetails>
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {user.addresses ? (
            <div>
              <p><strong>Address:</strong> <br />
              {user.addresses.length > 0 && (
                <p>
                  { user.addresses[0].address1}, {user.addresses[0].address2} <br />
                  {user.addresses[0].city} - {user.addresses[0].zipCode}
                </p>
              )}

           </p>
            </div>
          ): (
            <div>
              <p><strong>Address:</strong> <br />
              <p>No Address Found</p>
              </p>
            </div>
          )}
          <Link to={'/add/address'}><button className='primary-btn'>Add Address</button></Link>
          
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

        </ProfileDetails>
      </ProfileContainer>
    </ProfileWrapper>
    </div>
      )}
   
    </div>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #00d084, #00a86b);
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: #1e1e2f;
  width: 60%;
  max-width: 800px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 208, 132, 0.6);
  color: #e0f7f1;
  border: 1px solid #00a86b;
`;

const ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 30px;
  padding: 5px;
  border: 2px solid #00d084;
  box-shadow: 0 0 15px #00d084;
`;

const LogoutButton = styled.button`
  background-color: #ff6f61;
  border-radius: 8px;
  color: white;
  border: none;
  padding: 14px 24px;
  position: absolute;
  right: 50px;
  top: 100px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 6px 15px rgba(255, 111, 97, 0.6);

  &:hover {
    background-color: #ff3b2e;
    box-shadow: 0 8px 20px rgba(255, 59, 46, 0.8);
  }
`;

const ProfileDetails = styled.div`
  text-align: left;
  width: 100%;
  padding: 10px;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    font-weight: 700;
    text-shadow: 0 0 10px #00d084;
  }
  p {
    font-size: 1.1rem;
    color: #a0a0a0;
    margin-bottom: 12px;
  }
  .primary-btn{
    background-color: #00d084;
    color: #1e1e2f;
    border: none;
    padding: 12px 20px;
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
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #a0a0a0;
`;

export default Profile;
