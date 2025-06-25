import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Card from './Card'


const CardContainer = () => {
  const [products, setProducts] = useState([])
  const token = sessionStorage.getItem("token")
  const navigate = useNavigate()

  const fetch = async () =>{
    try {
      let res = await axios.get('http://localhost:3000/api/products', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      setProducts(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.log("Client Error", error.response)
      if(error.response.data.description.includes("jwt")){
        alert("Token Expired Login To Continue")
        navigate('/login')
      } 
    }

  }


  useEffect(() =>{
    fetch()
  }, [])
  
  return (
    <StyledCardContainer>
      {products && products.map(product => (
        <Card key={product._id} product={product} isEdit={false} isDelete={false} />
      ))}

    </StyledCardContainer>
  )
}

export default CardContainer

const StyledCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`