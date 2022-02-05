import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import CategoriesItem from "./CategoriesItem";

import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <Container>
      {/* <h2>Container</h2> */}
      {categories.map((item) => (
        <CategoriesItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
