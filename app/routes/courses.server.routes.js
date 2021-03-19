const courses = require("../../app/controllers/courses.server.controller");
const students = require("../../app/controllers/students.server.controller");

module.exports = function (app) {
    app.post('/course', students.requiresLogin, courses.create);
    app.get('/courses', students.requiresLogin, courses.list);
    app.get('/courses/:courseId/students', students.requiresLogin, courses.studentsList);

    app.param('courseId', courses.courseByID);
};
