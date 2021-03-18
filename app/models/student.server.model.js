// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

// Define a new 'StudentSchema'
const StudentSchema = new Schema({
    studentNumber: {
		type: String,
		unique: true,
		required: 'Student Number is required',
		trim: true
	},
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password.length >= 6,
            'Password Should Be Longer'
        ]
    },
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phoneNumber: String,
    email: {
        type: String,
        // Set an email index
        index: true,
        // Validate the email format
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    program: String,
    // using the ref to reference another document
    course: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

// Set the 'fullName' virtual property
StudentSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
StudentSchema.pre('save', function (next) {
	//hash the password before saving it
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// Create an instance method for authenticating user
StudentSchema.methods.authenticate = function(password) {
    console.log(this.password === this.hashPassword(password));
	return this.password === bcrypt.hashSync(password, saltRounds);
};

// Configure the 'StudentSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Student' model out of the 'StudentSchema'
mongoose.model('Student', StudentSchema);