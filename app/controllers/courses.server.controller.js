const mongoose = require("mongoose");
const Course = mongoose.model("Course");
const Student = mongoose.model("Student");

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}

exports.create = function (req, res) {
  // Create a new instance of the 'Course' Mongoose model
  const course = new Course(req.body); //get data from React form
  console.log(req.body);

  course.save(function (err) {
    if (err) {
      // Call the next middleware with an error message
      return res.status(400).send({
        message: getErrorMessage(err),
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
        message: getErrorMessage(err),
      });
    } else {
      // Use the 'response' object to send a JSON response
      res.status(200).json(courses);
    }
  });
};

exports.register = function (req, res, next) {
  console.log("in register:", req.body);

  const courses = req.body.courses;

  // TODO: is it necessary to convert strings to ObjectId?
  // var coursesObjectIds = [];
  // courses.forEach((course) => {
  //   coursesObjectIds.push(mongoose.Types.ObjectId(course));
  // });

  // console.log("coursesObjectIds: ", coursesObjectIds);

  const student = req.student;
  student.courses = courses;

  console.log("student: ", student);
  Student.findByIdAndUpdate(
    { _id: student._id },
    student,
    { new: true },
    function (err, updatedStudent) {
      // use {new: true} to return updated doc
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      }
      res.status(200).json(updatedStudent);
    }
  );
};

exports.updateCourse = async function (req, res, next) {
    console.log("in updateCourse:", req.body);
    console.log("param", req.params.courseCode);

    const newCourseId = req.body.newCourseId;
    console.log("newCourseId:", newCourseId);
    const student = req.student;
    const courses = student.courses;
    console.log("courseIds:", courses);
    var courseToBeReplaced = "";

    courses.forEach(async (cid) => {
        // const course = courseByID(req, res, next, c);
        const foundCourse = await Course.findOne(
          {
            _id: cid,
          }
        ).exec();
        console.log("inCourse.findOne", foundCourse);
        if (foundCourse.courseCode == req.params.courseCode) {
          console.log("foundCourse.courseCode", foundCourse.courseCode);
          courseToBeReplaced = foundCourse._id;
          console.log(courseToBeReplaced);
          const index = courses.indexOf(courseToBeReplaced);
          console.log(index);
          if (index > -1) {
            courses.splice(index, 1);
          }
      
          courses.push(newCourseId);
          student.courses = courses;
      
          console.log("student: ", student);
          Student.findByIdAndUpdate(
              { _id: student._id },
              student,
              { new: true },
              function (err, updatedStudent) {
              // use {new: true} to return updated doc
              if (err) {
                  return res.status(400).send({
                  message: getErrorMessage(err),
                  });
              }
              res.status(200).json(updatedStudent);
              }
          );
        }
    });
}

exports.dropCourse = function (req, res, next) {
  console.log("in dropCourse:", req.body);

  const courseToBeDropped = req.body.course;
  console.log("courseToBeDropped", courseToBeDropped);
  const courses = req.student.courses;
  console.log("original courses", courses);

  const index = courses.indexOf(courseToBeDropped);
  console.log(index);
  if (index > -1) {
    courses.splice(index, 1);
  }

  console.log("courses: ", courses);

  const student = req.student;
  student.courses = courses;

  console.log("student: ", student);
  Student.findByIdAndUpdate(
    { _id: student._id },
    student,
    { new: true },
    function (err, updatedStudent) {
      // use {new: true} to return updated doc
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      }
      res.status(200).json(updatedStudent);
    }
  );
};

exports.courseByID = function (req, res, next, id) {
  Course.findOne(
    {
      _id: id,
    },
    (err, course) => {
      if (err) {
        // Call the next middleware with an error message
        return next(err);
      } else {
        // Set the 'req.course' property
        req.course = course;
        console.log(course);
        // Call the next middleware
        next();
      }
    }
  );
};

exports.coursesByCode = function (req, res, next) {
  Course.find({courseCode: req.params.courseCode,}, (err, courses) => {
    if (err) {
      // Call the next middleware with an error message
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      // Use the 'response' object to send a JSON response
      res.status(200).json(courses);
    }
  });
};

exports.studentsList = function (req, res) {
  Student.find({ courses: req.course._id }, (err, students) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      console.log('studentsList: ', students);
      res.status(200).json({students, course: req.course});
    }
  });
};
