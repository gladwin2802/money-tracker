const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moneyTrackerSchema = new Schema({
    type: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value === 0 || value === 1;
            },
            message: 'type must be 0 or 1'
        }
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('MoneyTracker', moneyTrackerSchema, 'record');