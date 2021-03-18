// Load the 'students' controller
const students = require('../../app/controllers/students.server.controller');
const courses = require('../../app/controllers/courses.server.controller');
// var express = require('express');
// var router = express.Router();

// Define the routes module method
module.exports = function(app) {
    app.get('/students', students.requiresLogin, students.list);
    app.post('/student', students.create);

    // Set up the 'signin' routes 
	app.post('/signin', students.authenticate);

    app.put('/register/:studentId', students.requiresLogin, courses.register);
    app.put('/drop/:studentId', students.requiresLogin, courses.dropCourse);

    app.get('/student/:studentId', students.requiresLogin, students.read);

    app.param('studentId', students.studentByID);

    // app.route('/read_student')
    //    .get(student.showReadStudentPage);

    // // Set up the 'logout' route
	// app.get('/logout', student.logout);
};