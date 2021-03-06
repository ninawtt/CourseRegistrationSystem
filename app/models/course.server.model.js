// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define a new CourseSchema
const CourseSchema = new Schema({
    courseCode: String,
    courseName: String,
    section: String,
    semester: String
});

mongoose.model('Course', CourseSchema);