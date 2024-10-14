const router = require("express").Router();

const controller = require("./users.controller");

const authorization = require("../Middleware/Authorization");
// get all users
router.get("/", controller.getusers);

// get user by id
router.get("/:id", controller.getUserbyId);

// register user
router.post("/register", controller.RegisterUser);

// Login user
router.post("/login", controller.LoginUser);
// update user
router.put("/:id", authorization.verifytoken, controller.updateUser);

module.exports = router;
