import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const token = sessionStorage.getItem("token")
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <NavbarContainer>
            <div className="responsive">
                <Hamburger onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </Hamburger>
                <Link to={'/'} className='logo'> <h1>Electroop</h1> </Link>
            </div>
            <Links className={isOpen ? 'open' : ''}>
                <Link to={'/'}> <p>Home</p> </Link>
                <Link to={'/create'}> <p>Add Product</p> </Link>
                <Link to={`/my-products`}> <p>My Products</p> </Link>
                <Link to={'/cart'}> <p>Cart</p> </Link>
                <Link to={'/my-orders'}> <p>My Orders</p> </Link>
                {token ? (
                    <Link to={'/profile'} className='profile'><FaUser /></Link>
                ) : <Link to={'/login'}> <p>Login</p> </Link>}
            </Links>
        </NavbarContainer>
    )
}

export default Navbar

const NavbarContainer = styled.div`
    background-color: var(--secondary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid black;
    a {
        text-decoration: none;
        color: #fff;
    }
    .profile{
        background-color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;

    }
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        .responsive {
            display: flex;
            gap: 30px;
            align-items: center;
            width: 100%;
        }
    }
`


const Links = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        width: 100%;
        align-items: center;
        display: none;

        &.open {
            display: flex;
        }
    }
`

const Hamburger = styled.div`
    display: none;
    cursor: pointer;
    font-size: 24px;
    color: #fff;

    @media (max-width: 768px) {
        display: block;
    }
`