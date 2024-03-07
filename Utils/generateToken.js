const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "hjdfhjk@#$", { expiresIn: "30d" });
};

module.exports = generateToken;