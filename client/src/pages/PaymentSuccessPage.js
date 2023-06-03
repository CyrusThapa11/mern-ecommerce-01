import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccessPage = () => {
  return (
    <div
      style={{
        backgroundColor: "#D0F5BE",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img style={{ width: "40vw" }} src="/payment.jpg" alt="" />
      <button
        style={{
          backgroundColor: "#B0DAFF",
          padding: "1rem 2rem",
          borderRadius: "7px",
          outline: "none",

          border: "2px solid black",
          fontWeight: "bold",
          margin: "10px",
          cursor: "pointer",
        }}
      >
        <Link to="/">GO TO HOME</Link>
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
