const express = require("express");
const router = express.Router();
const bikeController = require("../app/controllers/BikeController");

router.get("/bike", bikeController.show);
router.get("/create", bikeController.create);
router.post("/store", bikeController.store);
router.get("/all-product", bikeController.all_product);
router.get("/:id/edit", bikeController.edit);
router.put("/update/:id", bikeController.update)
router.delete("/delete/:id", bikeController.delete)
router.get("/:slug", bikeController.detail)

module.exports = router;
