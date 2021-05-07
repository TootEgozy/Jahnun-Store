const express = require('../node_modules/express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
router.get('/', (req, res)=> {
    res.send("in user routes");
});

router.get('/allUsers', (req, res)=> {
    usersController.getAllUsers(req, res);
});

router.get('/:id', (req, res)=> {
    usersController.getUserById(req, res);
});

router.post('/createUser', (req, res)=> {
    usersController.createUser(req, res);
});

router.post('/editUser/:id', (req, res)=> {
    usersController.editUser(req, res);
});

router.delete('/Admin/deleteUser/:id', (req, res)=> {
    usersController.deleteUser(req, res);
});

module.exports = router;