const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/", userController.all);
router.get("/:userId", userController.get);
router.put("/:userId", userController.update);
router.delete("/:userId", userController.delete);
router.post("/", userController.create);

module.exports = router;
