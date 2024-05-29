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

    all_product(req,res, next){
        Bike.find()
            .then((bike) =>
                res.render("manager/showBike", { bike: mutipleMongooseToObject(bike) })
            )
            .catch(next);
    }

    edit(req,res,next){
        Bike.findById(req.params.id)
            .then((bike) =>
                res.render("manager/updateBike", { bike: mongooseToObject(bike) })
            )
            .catch(next);
    }

    update(req, res, next){
        Bike.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/collection/all-product"))
                .catch(next);
    }

    delete(req, res, next){
        Bike.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }
}

module.exports = new BikeController();
