const express = require("express");
const router = express.Router();
const newsControllers = require("../app/controllers/NewsControllers");
// newsControllers.index;

router.get("/auth", newsControllers.auth);
router.get("/:slug", newsControllers.show);
router.get("/", newsControllers.index);

module.exports = router;
