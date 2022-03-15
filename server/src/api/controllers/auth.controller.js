const ErrorResponse = require('../utils/errorResponse');
const { registerUser, loginUser } = require('../services/authProvider');


exports.register = async (req, res, next) => {
    const  user = req.body;

    if(!emailValidator.validate(user.email))
    return next(new ErrorResponse("Invalid Email-Id", 401));

    if(user.password !== user.confirmPassword)
    return next(new ErrorResponse("Passwords doesn't match", 402));


    let userDetails = {
        Name: `${user.firstName} ${user.lastName}`,
        emailId: user.email,
        ...user
    }

    try {
        const { newUser, token } = await registerUser(userDetails, next);

        res.status(201).json({ success: true, newUser, token});
    } catch (error) {
        return next(error);
    }
}

exports.login = async (req, res, next) => {
    const { emailIdOrUsername, password } = req.body;

    if(!emailIdOrUsername || !password)
    return next(new ErrorResponse("Please provide an emailId/username an password", 400))

    try {
        const { user, token, company } = await loginUser(emailIdOrUsername, password, next);

        res.status(200).json({ success: true, user, token, company});

    } catch (error) {
        return next(error);
    }
}



