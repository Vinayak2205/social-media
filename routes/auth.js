const express = require("express");

const router = express.Router();

//controllers
const { login, register, currentUser } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", currentUser);

module.exports = router;
