const mongoose = require('mongoose');
const validator = require('../node_modules/validator');
const phoneValidator = require('../node_modules/libphonenumber-js');
const { ObjectID } = require('bson');
const bcrypt = require('../node_modules/bcryptjs');
const jwt = require('../node_modules/jsonwebtoken');

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
    address: {
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
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//A method to send out a user profile without the password and the tokens array.
userSchema.methods.getPublicProfile = function() {
    
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    
    return userObject;
}

//Static method that looks up the user by email and confirms the login by comparing the password to the hashed password. Returns the user.
//Static methods are used on the user schema.
userSchema.statics.findByCredentials = async(email, password)=> {
    
    const user = await userModel.findOne({ email });

    if(!user) throw new Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) throw new Error('Unable to login');

    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    //Create a new jwt for the user, use a stringified id for the encoding and choose a 'secret' string for the decoding.
    const token = jwt.sign({_id: user._id.toString()}, 'jahnunandeggandschug');

    user.tokens = user.tokens.concat({ token });
    
    await user.save();
    
    return token;

};

//Method to hash the user password.
//Methods are used on the user instances.
userSchema.pre('save', async function (next) {
    const user = this;
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const userModel  = mongoose.model('Users',userSchema);

module.exports= userModel;