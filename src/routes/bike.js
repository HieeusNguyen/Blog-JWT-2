const express = require("express");
const router = express.Router();
const bikeController = require("../app/controllers/BikeController");

router.get("/bike", bikeController.show);
router.get("/create", bikeController.create);
router.post("/store", bikeController.store);
router.get("/:slug", bikeController.detail)

module.exports = router;
