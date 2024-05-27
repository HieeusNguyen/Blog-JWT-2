const { mutipleMongooseToObject } = require("../../util/mongoose");
const Course = require("../models/Course");
class CourseController {
    // GET /me/stored/courses
    storedCourse(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render("me/stored-courses", {
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
}

module.exports = new CourseController();
