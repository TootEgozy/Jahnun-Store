const userModel = require('../models/user.model');

const getAllUsers = async(req, res) =>{
    try {
        const users = await userModel.find({});
        return res.send(users);
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

const getUserById = async(req, res)=> {
    try {
        const user = await userModel.find({_id: req.params.id}); 
        res.send(user);
    }
    catch(e) {
        return res.status(400).send("Error: could not find user");
    }
}

const createUser = (req, res) => {
    const {email, password, name, adress, phoneNumber, orders} = req.body;

    const user = new userModel({
        email: email,
        password: password,
        name: name,
        adress: adress,
        phoneNumber: phoneNumber,
        orders: orders,
        isAdmin: false
    });

    user.save(async(err) => {
        if (err) return res.status(400).send("Error: " +err);

        const token = await user.generateAuthToken();

        return res.send({user, token});
    });
}

const deleteUser = async(req, res)=> {
    try{
        if(JSON.parse(req.body.isAdmin) === true) {

            const user = await userModel.findByIdAndDelete(req.params.id);

            if (!user) {

                return res.status(404).send('Could not find user');
            }
            return res.send(user);
        }
        return res.status(400).send('unauthorised operation');
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
        const user = await userModel.findById(req.params.id);

        updates.forEach((update)=> user[update] = req.body[update]);
        await user.save();

        if(!user) {
            return res.status(404).send('user not found');
        }
        return res.send(user);
    }
    catch(e) {
        return res.status(400).send(e);
    }
}

const userLogin = async (req, res)=> {
    try {
        const user = await userModel.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();
        return res.send({user, token});
    }
    catch(e) {
        return res.status(400).send('Unable to login');
    }
}
// const addAccountToUser = async(req, res)=> {
//    try {
//     const newAccount = req.body.id;
//     const user = await userModel.find({_id: req.params.id});

//     const accounts = await user[0].accounts;

//     if(!accounts.includes(newAccount)) {
//         const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {$push: {accounts: [newAccount]}});

//         return res.send(updatedUser);
//     }
//     return res.send(`Account ${newAccount} is already attached to user ${req.params.id}`)

//    }
//    catch(e) {
//     return res.status(400).sent(e);
//    }

// }

// const removeAccountFromUser = async(req, res)=> {
//    try {
//     const removedAccount = req.body.id;
//     const user = await userModel.find({_id: req.params.id});
//     console.log(user);

//     // const accounts = await user[0].accounts;

//     // const index = accounts.lastIndexOf(removedAccount);
//     // console.log(index);
//     const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {$pull: {accounts: {$in: [removedAccount]}}});

//     console.log(updatedUser);

//     return res.send(updatedUser);
//    }
//    catch(e) {
//     return res.status(400).sent(e);
//    }

// }

module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    editUser: editUser,
    deleteUser: deleteUser,
    userLogin: userLogin,

}
