// requiring packages :
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/stripe");
const cors = require("cors");

// utils:

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/checkout", paymentRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("error1 - is -> ", err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server at http://localhost:${PORT}/`);
});
