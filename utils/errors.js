const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const DEFAULT = 500;
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const FORBiDDEN = 403;

function SOME_ERROR_CODE(err, res) {
  if (err.statusCode === FORBiDDEN) {
    return res.status(FORBiDDEN).send({ message: "DeletedAnotherUserItem" });
  }
  if (err.statusCode === NOT_FOUND) {
    return res.status(NOT_FOUND).send({ message: "ItemIDNotFound" });
  }
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err === "Missing required fields") {
    return res.status(BAD_REQUEST).send({ message: "Missing required fields" });
  }
  if (err === "missing email or password") {
    return res
      .status(BAD_REQUEST)
      .send({ message: "missing email or password" });
  }
  if (err.name === "Missing required fields") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err.name === "ItemIDNotFound") {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err.statusCode === CONFLICT) {
    return res.status(CONFLICT).send({ message: "Email already exists" });
  }
  if (err.name === "ReferenceError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }

  return res.status(DEFAULT).send({ message: err.message });
}
module.exports = {
  SOME_ERROR_CODE,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  UNAUTHORIZED,
  FORBiDDEN,
};
