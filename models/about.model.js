const mongoose = require('mongoose');
const { ObjectId } = require('bson');

const aboutSchema = mongoose.Schema({    
    intro: {
        type: String
    },
    product: {
        type: String
    },
    policy: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    details: {
        type: String
    }
})

const aboutModel = mongoose.model('about', aboutSchema);

module.exports = aboutModel;