const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ['employee', 'teamLead', 'manager'], // Allowed values
            message: '{VALUE} is not a valid role', // Custom error message
        },
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    teamLeadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    profilePicture: {
        type: String,
        default:
            'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
}, { timestamps: true })


const User = mongoose.model('User', userSchema);

module.exports = User;