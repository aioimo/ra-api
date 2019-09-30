const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

const router = express.Router();

router.post('/register', async (req, res) => {
  // Validate the Data before we create a User
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, email, password } = req.body;

  // Checking if user is already in the database
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).send('Email already exists');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send({ user: `${savedUser.id} created` });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  // Validate the Data before we attempt to login
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { email, password } = req.body;

  // Checking if user is already in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Email is wrong');
  }

  // Comparing the passwords
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(400).send('Password is wrong');
  }

  //Create and assign a token

  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
