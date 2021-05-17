const mongoose = require('mongoose');
const validator = require('../node_modules/validator');
const { ObjectId } = require('bson');

const date = new Date();
const now = date.toLocaleString();


const orderSchema = mongoose.Schema({    
    cash: {
        type: String,
        required: true,
        validate(input) {
            if(!validator.isDecimal(input)) {
                throw new Error('Cash must be a number');
            }
            if(input <= 0) {
                throw new Error('Cash must be larger then 0');
            }
        }
    },
    dishes: {
        type: Array,
        required: true,
        validate(arr) {
            if(arr.length < 1) throw new Error('Cannot create an empty order');
        },
        item: {
            type: Object,
            id: {
                type: ObjectId,
                required: true
            },
            amount: {
                type: Number,
                required: true,
                min: 1
            }
        }
    },
    date: {
        type: String,
        required: false,
        default: now
    },
    userId: {
        type: ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isCompeleted: {
        type: Boolean,
        default: false
    }    
   
})

const orderModel = mongoose.model('Orders',orderSchema);

module.exports = orderModel;