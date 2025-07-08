const router = require("express").Router();
//pulls login and createUser from /controllers/users
const { login, createUser, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", getCurrentUser);
router.patch("/me", getCurrentUser);

module.exports = router;
