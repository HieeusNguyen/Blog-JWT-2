const { mutipleMongooseToObject } = require("../../util/mongoose");
const Invoice = require("../models/Invoice");
class InvoiceController {
    // GET /me/stored/courses
    show(req, res, next){
        Invoice.find()
        .then((invoice) => res.render("manager/showInvoice", {invoice: mutipleMongooseToObject(invoice)}))
        .catch(next)
    }

    async getDailyRevenue(req, res, next) {
        try {
          const result = await Invoice.aggregate([
            {
                $match: {
                  status: 'Completed'
                }
            },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalRevenue: { $sum: "$totalAmount" }
              }
            },
            {
              $sort: { _id: 1 }
            }
          ]);
      
          res.render('manager/statistics', { dailyRevenue: result })
        } catch (err) {
          console.error(err);
        }
      }

    invoiceCompleted(req, res, next){
        Invoice.findOneAndUpdate({_id: req.params.id}, {status: 'Completed'})
            .then(() => res.redirect("/"))
            .catch(next)
    }

    invoiceFailed(req, res, next){
        Invoice.findOneAndUpdate({_id: req.params.id}, {status: 'Failed'})
            .then(() => res.redirect("/"))
            .catch(next)
    }
}

module.exports = new InvoiceController();
