const User = require("../model/user");
const Post = require("../model/post");

const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already Exists" });

    user = await User.create({
      name,
      email,
      password,
    });

    // if user regsiter successfully then it will automatically logged in
    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(201)
      .cookie("token", token, options)
      .json({ success: true, user, token });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

//=================================== Login User ==========================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not Exists" });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json({ success: true, user, token });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

//================================== User LogOut ==================================

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ success: true, message: "Logged Out successfully" });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

//================= My  Profile Details ==========================

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};
