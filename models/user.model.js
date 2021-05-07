const mongoose = require('mongoose');
const validator = require('../node_modules/validator');
const phoneValidator = require('../node_modules/libphonenumber-js');
const { ObjectID } = require('bson');

const userSchema = mongoose.Schema({    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error ('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        lowecase: true,
        validate(value) {
            if(!value.length > 5)
            throw new Error('Must enter full name');        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate (input) {
            const phoneNumber = phoneValidator.parsePhoneNumber(input, 'IL');
            if(!phoneNumber.isValid()) {
                throw new Error ('Invalid phone number');
            }
        }
    },
    adress: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: false
    }, 
    isAdmin: {
        type: Boolean,
        default: false,
        required: false
    }, 
    orders: [{
        type: Array,
        required: false,
        default: [],
        order : {
            type: ObjectID,
            required: true
        }
    }]
})

const userModel  = mongoose.model('Users',userSchema);

module.exports= userModel;