const express = require("express");
const router = express.Router();

const userController = require("../controller/users");

//@define routes
router.get("/users/:id", userController.list);
router.post("/", userController.add);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

module.exports = router;
