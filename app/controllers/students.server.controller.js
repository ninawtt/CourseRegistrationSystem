const mongoose = require('mongoose');
const Student = mongoose.model("Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

// Create a new error handling controller method
const getErrorMessage = function (err) {
  // Define the error message variable
  var message = "";

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = "Username already exists";
        break;
      // If a general error occurs set the message error
      default:
        message = "Something went wrong";
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Return the message error
  return message;
};

// Create a new student
exports.create = function (req, res, next) {
  // Create a new instance of the 'Student' Mongoose model
  var student = new Student(req.body); //get data from React form
  console.log("body: " + req.body.studentNumber);

  // Use the 'Student' instance's 'save' method to save a new student document
  student.save(function (err) {
    if (err) {
      // Call the next middleware with an error message
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Use the 'response' object to send a JSON response
      res.status(200).json(student);
    }
  });
};

// Return all students
exports.list = function (req, res, next) {
  // Use the 'Student' static 'find' method to retrieve the list of students
  Student.find({}, (err, students) => {
    if (err) {
      // Call the next middleware with an error message
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Use the 'response' object to send a JSON response
      res.status(200).json(students);
    }
  });
};

exports.requiresLogin = function (req, res, next) {
  // Obtain the session token from the requests cookies,
  // which come with every request
  const token = req.cookies.token;
  console.log(token);
  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.send({ screen: "auth" }).end();
  }
  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey);
    console.log("in requiresLogin - payload:", payload);
    req.id = payload.id;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }
  // student is authenticated
  // call next function in line
  next();
};

// authenticates a student
exports.authenticate = function(req, res, next) {
	// Get credentials from request
	console.log(req.body);
	const studentNumber = req.body.auth.studentNumber;
	const password  = req.body.auth.password;
	console.log(studentNumber);
	console.log(password);
	//find the user with given username using static method findOne
	Student.findOne({studentNumber: studentNumber}, (err, student) => {
			if (err) {
				return next(err);
			} else {
			console.log(student);
			//compare passwords	
			if(bcrypt.compareSync(password, student.password)) {
				// Create a new token with the user id in the payload
        // and which expires 300 seconds after issue
				const token = jwt.sign({ id: student._id, studentNumber: student.studentNumber }, jwtKey, 
					{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
				console.log('token:', token);
				// set the cookie as the token string, with a similar max age as the token
				// here, the max age is in milliseconds
				res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
				res.status(200).send({ screen: student.studentNumber });
				//
				//res.json({status:"success", message: "user found!!!", data:{user:
				//user, token:token}});
				
				req.student = student;
				//call the next middleware
				next()
			} else {
				res.json({status:"error", message: "Invalid studentNumber/password!!!",
				data:null});
			}
			
		}
		
	});
};

// 'studentByStudentNumber' controller method to find a student by its studentNumber
exports.studentByStudentNumber = function (req, res, next, studentNumber) {
	// Use the 'Student' static 'findOne' method to retrieve a specific student
	Student.findOne({
    studentNumber: studentNumber
	}, (err, student) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.student' property
      req.student = student;
      console.log(student);
			// Call the next middleware
			next();
		}
	});
};

exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.status(200).json(req.student);
};

exports.coursesList = function (req, res) {
  Student.findOne({ _id: req.student._id })
         .populate('courses')
         .exec(function(err, student) {
            if (err) {
              return res.status(400).send({
                message: getErrorMessage(err)
              });
            } else {
              console.log(student);
              res.status(200).json(student.courses);
            }
		      });
};