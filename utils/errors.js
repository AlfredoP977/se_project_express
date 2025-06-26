const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const DEFAULT = 500;
const CONFLICT = 409;

function SOME_ERROR_CODE(err, res) {
  if (err.statusCode === NOT_FOUND) {
    return res.status(NOT_FOUND).send({ message: "ItemIDNotFound" });
  }
  if (err.name === "ValidationError") {
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
  if (err.name === 11000) {
    return res.status(CONFLICT).send({ message: err.message });
  }
  return res.status(DEFAULT).send({ message: err.message });
}
module.exports = { SOME_ERROR_CODE, BAD_REQUEST, NOT_FOUND, DEFAULT };
