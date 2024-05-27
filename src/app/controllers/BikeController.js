const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose");
const Bike = require("../models/Bike");
class BikeController {
    show(req, res,next) {
        // [GET] / bikes
        Bike.find()
            .then((bike) =>
                res.render("bikes/show", { bike: mutipleMongooseToObject(bike) })
            )
            .catch(next);
    }

    // GET /detail
    detail(req, res, next) {
        Bike.findOne({ slug: req.params.slug })
        .then((bike) =>
            res.render("bikes/detail", { bike: mongooseToObject(bike) })
        )
        .catch(next);
    }

    // GET /create
    create(req, res, next) {
        res.render("bikes/create");
    }

    // POST /store
    store(req, res, next) {
        const formData = req.body;
        const bike = new Bike(formData);
        bike
            .save()
            .then(() => res.redirect("/collection/bike"))
            .catch(next);
    }
}

module.exports = new BikeController();
