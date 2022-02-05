const router = require("express").Router();
const User = require("../models/User");
var CRyptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let authHeaderToken = req.headers.token;
  // console.log("req.headers", req.headers);
  if (authHeaderToken) {
    authHeaderToken = authHeaderToken.split(" ")[1];
    jwt.verify(authHeaderToken, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: "Token INvalid ! !" });

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "You are not verified !" });
  }
};

const verifyAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized to do that !!");
    }
  });
};

const verifyAuthorizationAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized to do that !!");
    }
  });
};

module.exports = {
  verifyAuthorization,
  verifyAuthorizationAndAdmin,
  verifyToken,
};
