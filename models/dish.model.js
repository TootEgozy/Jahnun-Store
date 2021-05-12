const mongoose = require('mongoose');
const validator = require('../node_modules/validator');
const { ObjectId } = require('bson');

const dishSchema = mongoose.Schema({    
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    stock: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        default: [],
        image: {
            type: String,
            required: true
        }
    },
    icon: {
        type: Object,
        required: false,
        default: {}
    },
    isActive: {
        type: Boolean,
        default: true
    }     
})

const dishModel = mongoose.model('Dishes', dishSchema);

module.exports = dishModel;