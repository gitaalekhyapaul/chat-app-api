const User = require("../models/users");
const brcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        throw new Error("Username already exists.");
      }
      return brcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          username: username,
          password: hashedPassword,
          chats: [],
        });
        return user.save();
      });
    })
    .then((result) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(406).json({
        success: false,
        err: `${err.message}`,
      });
    });
};

exports.loginUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        throw new Error("Username or Password Wrong.");
      }
      return brcrypt
        .compare(password, user.password)
        .then((result) => {
          if (!result) {
            throw new Error("Username or Password Wrong.");
          }
          return jwt.sign({ username: username }, process.env.SECRET_KEY, {
            expiresIn: "1h",
            issuer: "gitaalekhyapaul",
          });
        })
        .then((userJwt) => {
          res.status(200).json({
            success: true,
            authToken: userJwt,
          });
        });
    })
    .catch((err) => {
      if (err.message === "Username or Password Wrong.") {
        res.status(403).json({
          success: false,
          err: `${err.message}`,
        });
      } else {
        console.log(err);
        res.status(500).json({
          success: false,
          err: "Server Error. Please try again.",
        });
      }
    });
};
