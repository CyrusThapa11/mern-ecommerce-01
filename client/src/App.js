import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { Link, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

function App() {
  let user = true;
  let state = useSelector((state) => state);
  console.log("state is :", state);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:category" element={<ProductList />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/success" element={<PaymentSuccessPage />} />

        <Route exact path="/register" element={<Register />} />
        {/* <Route exact path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
