const express = require('../node_modules/express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.get('/', (req, res)=> {
    res.send("in user routes");
});

router.get('/me', auth, async(req, res)=>{
    res.send(req.user);
})

router.get('/allUsers', auth, adminOnly, (req, res)=> {
    usersController.getAllUsers(req, res);
});

// router.get('/:id', (req, res)=> {
//     usersController.getUserById(req, res);
// });

router.post('/createUser', (req, res)=> {
    usersController.createUser(req, res);
});

router.post('/editUser', auth, (req, res)=> {
    usersController.editUser(req, res);
});

router.delete('/Admin/deleteUser', auth, adminOnly, (req, res)=> {
    usersController.deleteUser(req, res);
});

router.post('/login', (req, res)=> {
    usersController.userLogin(req, res);
})

router.post('/logout', auth, (req, res)=> {
    usersController.userLogOut(req, res);
});

router.post('/logoutAll', auth, (req, res)=> {
    usersController.userLogOutAll(req, res);
})

module.exports = router;