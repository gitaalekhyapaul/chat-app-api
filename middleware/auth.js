const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports.verifyUser = (req, res, next) => {
  return new Promise((data) => {
    const authToken = req.headers.authorization.split(" ")[1];
    jwt.verify(
      authToken,
      process.env.SECRET_KEY,
      { issuer: "gitaalekhyapaul" },
      (err, authDetails) => {
        if (err) {
          throw err;
        } else {
          return data(authDetails);
        }
      }
    );
  })
    .then((authDetails) => {
      return User.findOne({ username: authDetails.username });
    })
    .then((user) => {
      if (!user) {
        throw new Error("Username does not exist!");
      } else {
        res.locals.user = user;
        next();
      }
    })
    .catch((err) => {
      if (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError"
      ) {
        res.status(401).json({
          success: false,
          err: `${err.name}`,
        });
      } else if (err.name === "TypeError") {
        res.status(403).json({
          success: false,
          err: "Invaild AuthToken Format",
        });
      } else {
        res.status(401).json({
          success: false,
          err: `${err.message}`,
        });
      }
    });
};
