const router = require("express").Router();
const User = require("../models/User");
var CRyptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

console.log("process.env.STRIPE_KEY", process.env.STRIPE_KEY);
router.post("/payment", (req, res) => {
  // console.log(req.headers);
  console.log("req.body.tokenId", req.body.tokenId);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    },
    (err, result) => {
      if (err) {
        console.log("err --> ", err);
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

module.exports = router;
