const router = require("express").Router();
// pulls login and createUser from /controllers/users
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUpdateUser } = require("../middlewares/validation");

router.get("/me", getCurrentUser);

router.patch("/me", validateUpdateUser, updateUser);

module.exports = router;
