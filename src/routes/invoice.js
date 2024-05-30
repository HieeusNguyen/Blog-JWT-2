const express = require("express");
const router = express.Router();
const invoiceControllers = require("../app/controllers/InvoiceController");
const { checkAdmin } = require("../middlewares/UserMiddlewares");

router.get("/show",checkAdmin, invoiceControllers.show);
router.get("/statistics",checkAdmin, invoiceControllers.getDailyRevenue);
router.get("/update-completed/:id", invoiceControllers.invoiceCompleted);
router.get("/update-failed/:id", invoiceControllers.invoiceFailed);

module.exports = router;