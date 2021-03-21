const students = require('../../app/controllers/students.server.controller');
const courses = require('../../app/controllers/courses.server.controller');
// var express = require('express');
// var router = express.Router();

// Define the routes module method
module.exports = function(app) {
	app.post('/signin', students.authenticate);
    app.get('/signout', students.signout);
    app.get('/read_cookie', students.isSignedIn);
    
    app.post('/student', students.create);
    app.get('/students', students.requiresLogin, students.list);

    app.get('/student/:studentNumber', students.requiresLogin, students.read);
    app.get('/student/:studentNumber/courses', students.requiresLogin, students.coursesList);

    app.put('/register/:studentNumber', students.requiresLogin, courses.register);
    app.put('/update/:studentNumber/:courseCode', students.requiresLogin, courses.updateCourse);
    app.put('/drop/:studentNumber', students.requiresLogin, courses.dropCourse);

    app.param('studentNumber', students.studentByStudentNumber);
};