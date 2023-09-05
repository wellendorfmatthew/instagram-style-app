const mongoose = require('mongoose');
const Login = require('../models/Login');
const bcrypt = require('bcrypt'); // Will be used to encrypt password
const validator = require('validator');

const loginUser = async = (req, res) => {
    res.json({mssg: 'login user'});
}

const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exists = await Login.findOne({ email }); // This refers to the schema

        if (exists) {
            throw Error("Email already exists");
        }
        // SALT is used to add extra characters to a password for extra security and if 2 users have the same password then chances are they'll have different characters at the end
        const salt = await bcrypt.genSalt(10); // Use await since it takes time to generate the characters
        const hash = await bcrypt.hash(password, salt);
            
        const user = await Login.create({ email, password: hash });
        res.status(200).json({email, user});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    res.json({mssg: 'signup user'});
}

module.exports = {
    loginUser,
    signupUser
}