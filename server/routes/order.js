const Order = require("../models/Order");
var CRyptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const {
  verifyAuthorization,
  verifyAuthorizationAndAdmin,
} = require("./verify");

// CREATE !!
router.post("/", verifyAuthorization, async (req, res) => {
  // console.log('req.body --- ' ,req.body );
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log("error6", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// update !!
router.put("/:id", verifyAuthorizationAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log("error7", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// delete product
router.delete("/:id", verifyAuthorizationAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Order has been deleted !!" });
  } catch (err) {
    console.log("error8", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// get products
router.get("/find/:userId", verifyAuthorization, async (req, res) => {
  try {
    const Order_ = await Order.find({ userId: req.params.userId });

    res.status(200).json(Order_);
  } catch (err) {
    console.log("error9", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// get all carts !
router.get("/", verifyAuthorizationAndAdmin, async (req, res) => {
  try {
    let Orders = await Order.find();
    res.status(200).json(Orders);
  } catch (err) {
    console.log("error10", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// get monthly income / stats:

router.get("/stats", verifyAuthorizationAndAdmin, async (req, res) => {
  const productId = req.query.pid;

  const date = new Date();
  const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevmonth = new Date(date.setMonth(lastmonth.getMonth() - 4));

  console.log("lastmonth", lastmonth);
  console.log("prevmonth", prevmonth);

  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: prevmonth } },
        ...(productId && {
          products: { $elemeMatch: { productId: productId } },
        }),
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    console.log("income-", income);
    res.status(200).json(income);
  } catch (err) {
    console.log("error7");
    res.status(500).json(err);
  }
});

module.exports = router;
