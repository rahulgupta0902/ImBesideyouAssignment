const {v4 : uuidv4} = require('uuid');
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

exports.registerUser = async (user, next) => {
    try {
        console.log(user);
        let oldUser = await User.findOne({ emailId: user.emailId });

        if(oldUser)
        return next(new ErrorResponse("Email Id already in use.", 400));

        const newUser = await User.create(user);
        console.log(newUser);

        const token = newUser.getSignedToken();

        return { newUser, token };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.loginUser = async ( emailIdOrUsername, password, next ) => {
    try {
        const user = await User.findOne({ $or: [ { emailId: emailIdOrUsername } ] }).select("+password");

        if(!user) return next(new ErrorResponse("Invalid Credentials", 401));

        const check = await user.matchPasswords(password);

        if(!check) return next(new ErrorResponse("Invalid Credentials", 404));        

        const token = user.getSignedToken();

        return { user, token };
    }catch (error) {
        throw error;
    }
}

