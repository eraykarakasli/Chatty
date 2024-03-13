const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400); // Burada 'resizeBy' yerine 'res' kullanılmalı
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Önce kullanıcıyı oluştur
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // Ardından kullanıcı için bir token üret
  if (user) {
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token, // Token'ı yanıt olarak gönder
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    if (user.role === "admin" || "supporter") {
      res.json({
        role: user.role,
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token,
      });
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token,
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// /api/user?search=mahmut
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, category, status, role } = req.body; // 'role' alanını da ekleyin

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Eğer kullanıcının yetkisini kontrol etmek istiyorsanız,
  // bu kısmı ayarlayabilirsiniz. Örneğin, sadece adminler güncelleme yapabilsin.
  // if (req.user.role !== 'admin') {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { category, status, role }, // 'role' alanını güncelleme için ekle
    { new: true }
  );

  res.json(updatedUser);
});

module.exports = { registerUser, authUser, allUsers, updateUser };
