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
    contact: {
        type: Array,
        item: {
            type: Object
        }
    }
})

const aboutModel = mongoose.model('about', aboutSchema);

module.exports = aboutModel;