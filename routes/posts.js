const express = require("express");

const router = express.Router();

const postController = require("../controllers/post.controller");

router.get("/", postController.all);
router.post("/", postController.create);

module.exports = router;
