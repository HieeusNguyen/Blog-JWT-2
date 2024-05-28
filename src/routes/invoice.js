const express = require("express");
const router = express.Router();
const invoiceControllers = require("../app/controllers/InvoiceController");

router.get("/show", invoiceControllers.show);

module.exports = router;