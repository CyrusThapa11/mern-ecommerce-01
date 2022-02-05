import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

// styles
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ filters, sort, cat }) => {
  console.log("filters", filters);
  console.log("sort", sort);
  console.log("cat", cat);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const respo = await axios.get(
          cat
            ? `https://react-server-ecom.herokuapp.com/products?category=${cat}`
            : "https://react-server-ecom.herokuapp.com/products"
        );
        // console.log("respo - ", respo);
        setProducts(respo.data);
      } catch (err) {
        console.log("ERROR1 - ", err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );

    // show all the products which have the category color or size present in their list of categories
    // we will check for all key val pair in the cat variable -> { color: green , size: M }
    console.log("filteredProducts", filteredProducts);
  }, [cat, filters, products]);

  useEffect(() => {
    console.log("sorting...");
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
