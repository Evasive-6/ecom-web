import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";

const Payment = () => {
  const location = useLocation();
  const orderData = location.state.orderData;
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default is COD

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/pay/checkout",
        { total: orderData.total },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );

      const options = {
        key: "rzp_test_Wy4lqCG4bvu5td",
        amount: data.order.amount,
        currency: "INR",
        name: "Electroop",
        description: "Test Payment",
        order_id: data.order.id,
        handler: async function (response) {
          console.log(response);
          alert("Payment Successful");
          navigate("/my-orders");
        },
        prefill: {
          name: "Admin",
          email: "test@example.com",
          contact: "8248777476",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const handleConfirm = () => {
    if (paymentMethod === "COD") {
      alert("Order confirmed with Cash on Delivery.");
      navigate("/my-orders");
    } else if (paymentMethod === "ONLINE") {
      handlePayment();
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Card>
          <Header>Payment</Header>
          <Info>
            <strong>Order ID:</strong> {orderData._id}
          </Info>
          <Info>
            <strong>Date:</strong>{" "}
            {new Date(orderData.createdAt).toLocaleDateString()}
          </Info>

          <SectionTitle>Delivery Address</SectionTitle>
          <Info>{orderData.address?.address1}</Info>
          {orderData.address?.address2 && (
            <Info>{orderData.address.address2}</Info>
          )}
          <Info>
            {orderData.address?.city} - {orderData.address?.zipCode}
          </Info>

          <SectionTitle>Order Details</SectionTitle>
          <Info>
            <strong>Total Amount:</strong> ${orderData.total}
          </Info>

          <SectionTitle>Products:</SectionTitle>
          <ProductList>
            {orderData.products.length > 0 ? (
              orderData.products.map((item, index) => (
                <ProductItem key={index}>
                  <img
                    className="image"
                    src={`http://localhost:3000/uploads/${item.imageUrl}`}
                    alt={item.name}
                  />{" "}
                  {item.name} - ${item.price}
                </ProductItem>
              ))
            ) : (
              <Message>No products found in this order.</Message>
            )}
          </ProductList>

          <SectionTitle>Select Payment Method</SectionTitle>
          <RadioContainer>
            <RadioLabel>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery (COD)
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={() => setPaymentMethod("ONLINE")}
              />
              Pay with Razorpay
            </RadioLabel>
          </RadioContainer>

          <Button onClick={handleConfirm}>Confirm Payment</Button>
        </Card>
      </Container>
    </div>
  );
};

export default Payment;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  padding: 20px;
`;

const Card = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-top: 5vh;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: var(--font-color);
  border: 1px solid black;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #06c44c;
  }
`;

const Header = styled.h2`
  color: var(--primary-color, #2ecc71);
  margin-bottom: 20px;
  text-align: center;
`;

const Info = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
  color: #333;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  background: #f9f9f9;
  margin: 5px 0;
  padding: 10px;
  border-radius: 6px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  .image {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-top: 20px;
`;

const RadioContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioLabel = styled.label`
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  input {
    margin-right: 8px;
  }
`;
