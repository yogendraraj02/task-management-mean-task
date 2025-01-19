const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'inProgress', 'completed'], // Allowed values
            message: '{VALUE} is not a valid task status', // Custom error message
        },
        default: 'pending',
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema);