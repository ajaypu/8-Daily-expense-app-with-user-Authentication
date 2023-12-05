const User = require("../models/user");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

function isStringValid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (
      isStringValid(name) ||
      isStringValid(email) ||
      isStringValid(password)
    ) {
      return res
        .status(400)
        .json({ err: "Bad paramaters. Something is missing" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      await User.create({
        name,
        email,
        password: hash,
      });
      res.status(201).json({ message: "Successfully created new user" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findAll({ where: { email: email } });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          throw new Error("Something went wrong");
        }
        if (result === true) {
          res
            .status(200)
            .json({ success: true, message: "User Logged in Successfully" });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Password is incorrect" });
        }
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }
  } catch (err) {
    res.status(404).json({ message: err, success: false });
  }
};
