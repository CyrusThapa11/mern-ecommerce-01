import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { mobile } from "../responsive";
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 80vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "30vh" })}
`;
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: white;
  color: grey;
  cursor: pointer;
  font-weight: 600;
`;

const CategoriesItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        {" "}
        <Image src={item.img} />
        <Info>
          <Title> {item.title} </Title>
          <Button>Shop now</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoriesItem;
