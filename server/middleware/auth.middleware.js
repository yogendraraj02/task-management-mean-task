const jwt = require('jsonwebtoken')
require('dotenv').config();
const cookieParser = require('cookie-parser');
const User = require('../models/user.model.js')
const errorHandler = require('../utils/error.js')

exports.verifyToken =(req, res, next) => {
    const token = req.headers['authorization']
    if (!token) return next(errorHandler(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        req.user = user;
        next();
    });


}

exports.checkCRUDAccessForOthers = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { userId } = req.query;
        if (!userId) {
            return next();
        }
        const loggedInUserData = await User.findById({ _id:id });
        const userDetails = await User.findById({ _id:userId });
        if (!userDetails) {
            return res.status(404).send({ status : false,message: 'User not found' });
        }
        if (loggedInUserData.role === 'employee' && userId!=id) {
            return res.status(403).send({ status : false,message: 'Unathorized access' });
        }
        if (loggedInUserData.role === 'manager') {
            if (userDetails.managerId.toString() !== id) {
                return res.status(403).send({ status : false,message: 'Unathorized access' });
            }
        } else if (loggedInUserData.role === 'teamLead') {
            if(userDetails.role=="manager"){
                return res.status(403).send({ status : false,message: 'Unathorized access' });
            }
            console.log(userDetails?.teamLeadId.toString(), id)
            if (userDetails?.teamLeadId.toString()  != id) {
                return res.status(403).send({ status : false,message: 'Unathorized access' });
            }
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


