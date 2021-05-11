const jwt = require('../node_modules/jsonwebtoken');
const userModel = require('../models/user.model');

const auth = async(req, res, next)=> {
    try {

        //get the token from the request header.
        const token = req.header('Authorization').replace('Bearer ', '');

        //get the data from the token (user _id)
        const decoded = jwt.verify(token, 'jahnunandeggandschug');

        //get the user with that _id: make sure that there's a matching token in it's tokens array.
        const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user) throw new Error(); //trigger catch

        //set the user as a parameter on request:
        req.user = user;
        req.token = token;
        
        next();
    }
    catch(e) {
        res.status(401).send('please authenticate.');
    }
}

module.exports = auth;