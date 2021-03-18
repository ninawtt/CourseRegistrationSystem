// Load the 'students' controller
const students = require('../../app/controllers/students.server.controller');
// var express = require('express');
// var router = express.Router();

// Define the routes module method
module.exports = function(app) {
    app.get('/students', students.requiresLogin, students.list);
    app.post('/', students.create);

    // Set up the 'signin' routes 
	app.post('/signin', students.authenticate);

    // app.route('/read_student')
    //    .get(student.showReadStudentPage);

    // // Set up the 'logout' route
	// app.get('/logout', student.logout);
};