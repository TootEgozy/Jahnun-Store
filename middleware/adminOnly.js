
// If the user is an admin, let him pass to the route.
// If not, give him an error and block route.
const adminOnly = async(req, res, next)=> {
    try {

        const user = req.user;

        if (user.isAdmin) next();
        
        else throw new Error();
    }
    catch(e) {
        res.status(401).send('Error');
    }
}

module.exports = adminOnly;