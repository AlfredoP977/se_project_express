//pulls jwt from jsonwebtoken libary to verify and decode JWTs
const jwt = require("jsonwebtoken");

//Pulls in your secret key used to verify that the token was signed
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("authorization", authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization Required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: "Authorization Required" });
  }

  req.user = payload; // assigning the payload to the request object

  next(); // sending the request to the next middleware
};
