const { mutipleMongooseToObject } = require("../../util/mongoose");
const User = require("../models/User");
class NewsControllers {
    index(req, res) {
        // [GET] / news
        res.render("news");
    }

    auth(req, res, next){
        User.find({})
            .then((user) =>
                res.json(user)
            )
            .catch(next);
    }

    // GET / news/:slug
    show(req, res) {
        res.send("NEW DETAIL!");
    }
}

module.exports = new NewsControllers();
