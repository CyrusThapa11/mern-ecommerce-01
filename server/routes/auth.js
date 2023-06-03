const router = require("express").Router();
const User = require("../models/User");
var CRyptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER :

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("password", password);
  const newUser = new User({
    username,
    email,
    password: CRyptoJS.AES.encrypt(
      password,
      `${process.env.PASS_SECRET}`
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    return res.status(201).json(savedUser);
  } catch (error) {
    console.log("error2 -- ", error);
    return res.status(500).json({ error });
  }
});

// login :

router.post("/login", async (req, res) => {
  const { username } = req.body;
  const sentPass = req.body.password;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json("Wrong credentials !");

    const hashedPass = CRyptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );
    console.log("hashedPass-->", hashedPass);

    const OriginalPass = hashedPass.toString(CRyptoJS.enc.Utf8);
    console.log("OriginalPass-->", OriginalPass);
    // console.log('password-->', password);

    if (OriginalPass !== sentPass)
      return res.status(401).json("Wrong credentials !");

    // USER OBJ IS PRESENT IN THE _DOC FIELD
    const { password, ...others } = user._doc;
    console.log("user-- ", user);

    // TOKENS :

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    return res.status(200).json({ ...others, accessToken });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
