const Product = require("../models/Product");
var CRyptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const {
  verifyAuthorization,
  verifyAuthorizationAndAdmin,
} = require("./verify");

// CREATE !!
router.post("/", verifyAuthorizationAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  console.log("newProduct", newProduct);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log("error5", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// update !!
router.put("/:id", verifyAuthorizationAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log("error5", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// delete product
router.delete("/:id", verifyAuthorization, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product has been deleted !!" });
  } catch (err) {
    console.log("error1", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});
// get products
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    console.log("error2", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

// get all products !

router.get("/", async (req, res) => {
  //   console.log("get all pross");
  const queryNew = req.query.new;
  const queryCat = req.query.category;
  console.log("queryNew", queryNew);
  console.log("queryCat", queryCat);

  try {
    let products;

    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(3);
    } else if (queryCat) {
      products = await Product.find({
        categories: {
          $in: [queryCat],
        },
      });
    } else {
      products = await Product.find();
    }

    // const { password, ...others } = users._doc;
    res.status(200).json(products);
  } catch (err) {
    console.log("error3", err);
    res.status(500).json({ error: "Something went wrong !", err });
  }
});

module.exports = router;
