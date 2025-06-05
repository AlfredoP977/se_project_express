function SOME_ERROR_CODE(err, res) {
  console.error(err);

  console.log("name of Error:", err.name);
  0;
  if (err.statusCode === 404) {
    return res.status(404).send({ message: "ItemIDNotFound" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === "ItemIDNotFound") {
    return res.status(404).send({ message: err.message });
  }
  return res.status(500).send({ message: err.message });
}
module.exports = { SOME_ERROR_CODE };
