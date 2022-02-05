const User = require("../models/User");
var CRyptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const {
  verifyAuthorization,
  verifyAuthorizationAndAdmin,
} = require("./verify");

// UPDATE !!
router.put("/:id", verifyAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CRyptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("error0", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// delete user
router.delete("/:id", verifyAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User deleted !!" });
  } catch (err) {
    console.log("error1", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// get user
router.get("/find/:id", verifyAuthorizationAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log("error2", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});
// get all users
router.get("/", verifyAuthorizationAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(3)
      : await User.find();

    // const { password, ...others } = users._doc;
    res.status(200).json(users);
  } catch (err) {
    console.log("error3", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// get user STATS
router.get("/stats", verifyAuthorizationAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const query = req.query.new;

  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    // console.log("data->", data);
    res.status(200).json(data);
  } catch (err) {
    console.log("error4", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

module.exports = router;
