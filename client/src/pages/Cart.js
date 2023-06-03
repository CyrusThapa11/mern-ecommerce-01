import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Anouncement from "../components/Anouncement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
// import { userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KEY =
  "pk_test_51KGSWDSJRNTdMmeHNM76PpVCB1CHeTT6yI21oTGPw6HK52ghw81a41a6641wQONtLfXFaHeTR5qnBJCOR2NE98ep00sFpRh9S9";
// styles :

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "5px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: "5px" })}
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column",
  })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  ${mobile({
    display: "none",
  })}
`;

const TopTexts = styled.div``;

const Info = styled.div`
  flex: 3;

  ${mobile({
    display: "flex",
    flexDirection: "column",
  })}
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({
    flexDirection: "column",
  })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({
    // flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  ${mobile({ padding: "5px" })}
`;

const Image = styled.img`
  width: 250px;
`;

const PriceDetail = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductName = styled.span``;

const ProductSize = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductId = styled.span``;

const ProductAmountContainer = styled.div`
  display: flex;

  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({
    margin: "5px 20px",
  })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({
    marginBottom: "20px",
  })}
`;

const Hr = styled.hr`
  background-color: #eee;
  height: 1px;
  border: none;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  /* border: 1px solid black; */
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 10px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};

  font-size: ${(props) => props.type === "total" && "25"}px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: 600;
`;

const Cart = () => {
  const cartt = useSelector((state) => state.cartttt);
  const userr = useSelector((state) => state.user);
  console.log("cartt", cartt);
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
    console.log("token", token);
  };
  console.log("stripeToken", stripeToken);
  console.log(KEY);
  const navigate = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        // const res = await userRequest.post("/checkout/payment", );

        const res = await axios.post(
          "http://localhost:5000/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 3000,
          },
          {
            headers: {
              Authorization:
                "Bearer sk_test_51KGSWDSJRNTdMmeH5oWwfRUfWDvUvk8VENkrKxdIslIVuhOKr27sAyCHZUqsoDIF87OCNJ00mqiZCdO6XK3Cu6CR00k7SX8m57",
            },
          }
        );
      } catch (err) {
        console.log("error is", err);
      }
      navigate("/success");
    };

    stripeToken && makeRequest();
  }, [stripeToken, cartt.total]);

  return (
    <Container>
      <Navbar />
      <Anouncement />

      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopButton>Continue Shopping</TopButton>

          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">Checkout Now</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartt.products.map((product_) => {
              return (
                <Product>
                  <ProductDetail>
                    <Image src={product_.img} />

                    <Details>
                      <ProductName>
                        <b>Product:</b>
                        {product_.title}
                      </ProductName>
                      <ProductId>
                        <b>Id:</b>
                        {product_._id}
                      </ProductId>
                      <ProductColor color={product_.color} />
                      <ProductSize>
                        <b>Size:</b> {product_.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <AddIcon />
                      <ProductAmount>{product_.quantity} </ProductAmount>
                      <RemoveIcon />
                    </ProductAmountContainer>
                    <ProductPrice>
                      ${product_.price * product_.quantity}{" "}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              );
            })}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>OrderSummary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cartt.total} </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$-5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cartt.total} </SummaryItemPrice>
            </SummaryItem>
            {userr && userr.currentUser && userr.currentUser.accessToken ? (
              <>
                <StripeCheckout
                  name="Vinsmoke Shop"
                  image="https://i.pinimg.com/originals/29/12/d5/2912d5015c57774cedf4d82bb03372d7.jpg"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cartt.total}`}
                  amount={cartt.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button>Checkout Now</Button>
                </StripeCheckout>
              </>
            ) : (
              <Button
                style={{
                  backgroundColor: "#EA5455",
                  fontWeight: "bold",
                  pointerEvents: "none",
                }}
              >
                You must be loggedIn
              </Button>
            )}
          </Summary>
        </Bottom>
      </Wrapper>

      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Cart;
