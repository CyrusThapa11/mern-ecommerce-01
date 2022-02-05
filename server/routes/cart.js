const Cart = require("../models/Cart");
var CRyptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const {
  verifyAuthorization,
  verifyAuthorizationAndAdmin,
} = require("./verify");

// CREATE !!
router.post("/", verifyAuthorization, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    console.log("error6", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// update !!
router.put("/:id", verifyAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    console.log("error7", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// delete product
router.delete("/:id", verifyAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Cart has been deleted !!" });
  } catch (err) {
    console.log("error8", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// get products
router.get("/find/:userId", verifyAuthorization, async (req, res) => {
  try {
    const cart_ = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(cart_);
  } catch (err) {
    console.log("error9", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// get all carts !
router.get("/", verifyAuthorizationAndAdmin, async (req, res) => {
  try {
    let carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    console.log("error10", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

module.exports = router;
