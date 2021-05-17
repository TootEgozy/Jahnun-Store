const userModel = require('../models/user.model');

const getAllUsers = async(req, res) =>{
    try {
        const users = await userModel.find({});

        const filteredUsers = users.map((user)=> {
            return user.getPublicProfile();
        })

        return res.send(filteredUsers);
    }
    catch (e) {
        console.log(e);
        return res.status(400).json(e);
    }
} 

// const getUsersByActiveStatus = async(req, res)=> {
//     try {
//         const users = await userModel.find({isActive : req.params.isActive});
//         return res.send(users);

//     }
//     catch (e) {
//         return res.send(e);
//     }
// }

const createUser = (req, res) => {
    const {email, password, name, address, phoneNumber, orders} = req.body;

    const isAdmin = function() {
        if(name === 'tootad1995' && email === 'tootegozy@gmail.com')
        return true;
        else return false;
    }
    const user = new userModel({
        email: email,
        password: password,
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        orders: orders,
        isAdmin: isAdmin()
    });

    user.save(async(err) => {
        if (err) return res.status(400).send("Error: " +err);

        const token = await user.generateAuthToken();

        const publicUser = user.getPublicProfile();
        return res.send({publicUser, token});
    });
}

const deleteUser = async(req, res)=> {
    try{

        const user = await userModel.findByIdAndDelete(req.body.id);

        if (!user) {

            return res.status(404).send('Could not find user');
        }
        return res.send();
    }
    catch(e) {
 
        return res.status(400).send({'error': e});
    }
}

const editUser = async(req, res)=> {

    const updates = Object.keys(req.body);
    const allowedUpdates = ["email", "password", "address", "phoneNumber", "name", "isActive"];

    const isValidOperation = updates.every((update)=> {
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation) {
        return res.status(400).send('illegal updates');
    }

    try {
        const user = req.user;

        updates.forEach((update)=> user[update] = req.body[update]);
        await user.save();

        if(!user) {
            return res.status(404).send('user not found');
        }
        const publicUser = user.getPublicProfile();
        return res.send(publicUser);
    }
    catch(e) {
        return res.status(400).send(e);
    }
}

const userLogin = async (req, res)=> {
    try {
        const user = await userModel.findByCredentials(req.body.email, req.body.password);

        if(user.tokens.length >= 15) {
            user.tokens = [];
        }

        const token = await user.generateAuthToken();
        
        return res.send({user: user.getPublicProfile(), token});
    }
    catch(e) {
        return res.status(400).send('Unable to login');
    }
}

const userLogOut = async(req, res)=> {
    try {
        req.user.tokens = req.user.tokens.filter((token)=> {
            
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    }
    catch(e) {
        res.status(500).send();        
    }
}

const userLogOutAll = async(req, res)=> {
    try {
        req.user.tokens = [];

        await req.user.save();

        return res.send();
    }
    catch(e){

        res.status(500).send();        
    }
}

module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
   // getUserById: getUserById,
    editUser: editUser,
    deleteUser: deleteUser,
    userLogin: userLogin,
    userLogOut: userLogOut,
    userLogOutAll: userLogOutAll,

}
