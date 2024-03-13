const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const admin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // Token'ı doğrula ve kullanıcı ID'sini al
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // İlgili kullanıcıyı bul
      const user = await User.findById(decoded.id);

      // Kullanıcıyı bul ve admin kontrolü yap
      if (user && user.role === "admin") {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized as admin");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { admin };
