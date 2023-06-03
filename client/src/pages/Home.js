import React from "react";
import Anouncement from "../components/Anouncement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  console.log("user is :", user);
  return (
    <div>
      <Navbar />
      <Anouncement />
      <Slider />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
