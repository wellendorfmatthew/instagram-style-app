// Set up login/signin database schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Will be used to encrypt password
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup
loginSchema.statics.signup = async function (email, password) { // Can't use an arrow function since the this keywork won't work
    const exists = await this.findOne({ email }); // This refers to the schema

    if (exists) {
        throw Error("Email already exists");
    }

    // SALT is used to add extra characters to a password for extra security and if 2 users have the same password then chances are they'll have different characters at the end
    const salt = await bcrypt.genSalt(10); // Use await since it takes time to generate the characters
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
}

const Login = mongoose.model('Login', loginSchema);
module.exports = Login;