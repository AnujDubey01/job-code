const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
   try {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Access token missing"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     if(!decoded){
    //         return res.status(401).send({
    //         success: false,
    //         message: "Invalid access token"
    //     });
    // }
   
    req.user = {
        id: decoded.userId,
        role: decoded.role
    }
    next();
   } catch (error) {
    return res.status(500).send({
        success: false,
        message: error.message
    })
   }
}

module.exports = authenticate;