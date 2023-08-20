const jwt = require('jsonwebtoken');


exports.isAuthenticated = (req, res, next) => {
    const {token} = req.headers;

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Not authorized to access this resource."
        });
    }

    const decodedData = jwt.verify(token, 'ABCDEFGHIJK');
    console.log(decodedData);
    req.user = decodedData;
    next();
}

exports.isTeacher = (req, res, next) => {
    const role = req.user.role;
    console.log(role);
    if(role !== 'teacher'){
        return res.status(401).json({
            success: false,
            message: "You are not allowed to access this resource."
        })
    }

    next();
}