const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = mongoose.model('Student');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function (req, res) {
    // Create a new instance of the 'Course' Mongoose model
    const course = new Course(req.body); //get data from React form
    console.log(req.body);

    course.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Use the 'response' object to send a JSON response
            res.status(200).json(course);
        }
    });
};

// Return all courses
exports.list = function (req, res, next) {
    // Use the 'Course' static 'find' method to retrieve the list of courses
    Course.find({}, (err, courses) => {
      if (err) {
        // Call the next middleware with an error message
        return res.status(400).send({
            message: getErrorMessage(err)
        });
      } else {
        // Use the 'response' object to send a JSON response
        res.status(200).json(courses);
      }
    });
};