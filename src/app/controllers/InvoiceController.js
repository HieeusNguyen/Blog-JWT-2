const { mutipleMongooseToObject } = require("../../util/mongoose");
const Invoice = require("../models/Invoice");
class InvoiceController {
    // GET /me/stored/courses
    show(req, res, next){
        Invoice.save()
        .then((invoice) => res.json(invoice))
        .catch(next)
    }
}

module.exports = new InvoiceController();
