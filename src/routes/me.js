const express = require("express");
const router = express.Router();
const meControllers = require("../app/controllers/MeController");

router.get("/stored/courses", meControllers.storedCourse);

module.exports = router;
