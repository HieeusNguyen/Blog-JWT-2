const express = require("express");
const router = express.Router();
const bikeController = require("../app/controllers/BikeController");
const { checkAdmin } = require("../middlewares/UserMiddlewares");

router.get("/bike", bikeController.show);
router.get("/create",checkAdmin, bikeController.create);
router.post("/store",checkAdmin, bikeController.store);
router.get("/all-product",checkAdmin, bikeController.all_product);
router.get("/:id/edit", checkAdmin, bikeController.edit);
router.put("/update/:id",checkAdmin, bikeController.update)
router.delete("/delete/:id",checkAdmin, bikeController.delete)
router.get("/:slug", bikeController.detail)

module.exports = router;
