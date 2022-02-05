import React, { useState } from "react";
import styled from "styled-components";
import Anouncement from "../components/Anouncement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { mobile, tablet } from "../responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })};
  //next
  /* ${tablet({ width: "60%" })} */
`;

const FilteredText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  // console.log("use location !", location);
  const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  // console.log("filters", filters);

  return (
    <Container>
      {/* <h2>ProductList</h2> */}
      <Navbar />
      <Anouncement />

      <Title>{category} </Title>

      <InnerContainer>
        <Filter>
          <FilteredText>Filter Products</FilteredText>{" "}
          <Select onChange={handleFilters} name="color">
            <Option selected disabled>
              {" "}
              Color
            </Option>
            <Option value="black">Black</Option>
            <Option value="white">White</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select onChange={handleFilters} name="size">
            <Option selected disabled>
              {" "}
              Size
            </Option>
            <Option value="XS">XS</Option>
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilteredText>Sort Products</FilteredText>{" "}
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest"> Newest</Option>
            <Option value="asc">Price (low to high)</Option>
            <Option value="dsc">Price (high to low)</Option>
          </Select>
        </Filter>
      </InnerContainer>

      <Products cat={category} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;
