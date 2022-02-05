import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Anouncement from "../components/Anouncement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { pulicRequest } from "../requestMethod";
import { addProducts } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 40px;
  ${mobile({ padding: "0 10px" })}
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "50vh" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Description = styled.p`
  margin: 20px 5px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  cursor: pointer;
  margin: 0 4px;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 7px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #eee;
  }
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Product = () => {
  const location = useLocation();
  // console.log("use location !", location);
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState({});
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  console.log("size", size);
  console.log("color", color);
  console.log("quantity", quantity);

  useEffect(() => {
    console.log("id: ", id);

    const getProduct = async () => {
      const result = await pulicRequest.get(`/products/find/${id}`);
      console.log("product --", result);
      setProduct(result.data);
    };

    getProduct();
    console.log("product --", product);
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") quantity > 1 && setQuantity(quantity - 1);
    else setQuantity(quantity + 1);
  };

  const handleSubmit = () => {
    // update cart !
    // via axios !
    // but we will use redux !!
    dispatch(
      // addProducts({ product, quantity, price: product.price * quantity })
      addProducts({ ...product, quantity, color, size })
    );
  };

  return (
    <Container>
      <Navbar />
      <Anouncement />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title> {product.title} </Title>
          <Description>{product.desc}</Description>
          <Price>${product.price} </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((color_) => (
                <FilterColor
                  color={color_}
                  key={color_}
                  onClick={() => setColor(color_)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}> {s} </FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} />
              <Amount>{quantity} </Amount>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleSubmit}>Add to Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
