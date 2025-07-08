const router = require("express").Router();
// pulls login and createUser from /controllers/users
const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
