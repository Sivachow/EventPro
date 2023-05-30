const jwt = require("jsonwebtoken");
const auth = require('./auth');
const config = require("config");

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');
    if(!token)
        return res.status(401).json({msg : "no Token, cant authorize"});
    //verify

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        if(req.user.id != '64768573d63d5f328cf44113')
            return res.status(401).json({msg:"Not Admin"});
        next();
    } catch (error) {
        res.status(401).json({msg:"Token is not valiid"});
    }
};