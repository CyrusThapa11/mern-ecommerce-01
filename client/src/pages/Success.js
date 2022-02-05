import React from "react";
import { useLocation } from "react-router-dom";

const Success = ({ data }) => {
  const location = useLocation();
  console.log("location", location);
  return (
    <div>
      <h2>success</h2>
    </div>
  );
};

export default Success;
