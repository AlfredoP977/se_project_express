// pulls jwt from jsonwebtoken libary to verify and decode JWTs
const jwt = require("jsonwebtoken");

// Pulls in your secret key used to verify that the token was signed
const { JWT_SECRET } = require("../utils/config");

const { UnauthorizedError } = require("./errors/IndexErrors");

// errors here are failing
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization Required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Authorization Required"));
  }

  req.user = payload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};
