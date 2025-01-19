const User = require('../models/user.model.js')
require('dotenv').config();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/error.js')
const JWT_SECRET = process.env.JWT_SECRET


exports.signup = async (req, res, next) => {
  const { username, email, password, role, managerId, teamLeadId } = req.body;
  if (!username || !email || !password || !role) {
    return next(errorHandler(400, "Missing Fields"));
  }
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ status: false, message: "User exists with this email" });
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, role, managerId, teamLeadId });
  try {
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
    newUser.access_token = token
    res.status(201).send({
      status: true,
      message: "User created succesfully!",
      data: {
        ...newUser.toObject(),
        access_token: token
      },
    })
  } catch (error) {
    console.log(`error..`);
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(errorHandler(400, "Missing Fields"));
    }
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(400).json({ status: false, message: "User not found" });
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return res.status(400).json({ status: false, message: "wrong credentials" })
    const token = jwt.sign({ id: validUser._id }, JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    rest.access_token = token
    const expiryDate = new Date(Date.now() + 60000); // 10 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .send({
        status: true,
        message: "Login Success!",
        data: rest
      })
  } catch (error) {
    next(error);
  }
};


