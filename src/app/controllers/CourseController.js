const { mongooseToObject } = require("../../util/mongoose");
const Course = require("../models/Course");
class CourseController {
    // GET /search
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render("courses/show", { course: mongooseToObject(course) })
            )
            .catch(next);
    }

    // GET /create
    create(req, res, next) {
        res.render("courses/create");
    }

    // POST /store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hq720.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect("/"))
            .catch(next);
    }

    //PUT courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render("courses/edit", { course: mongooseToObject(course) })
            )
            .catch(next);
    }

    //UPDATE courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }
}

module.exports = new CourseController();
