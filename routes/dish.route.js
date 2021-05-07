const dishController = require('../controllers/dish.controller');
const express = require('../node_modules/express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.send("in dish routes");
})

router.get('/allDishes', (req, res)=> {
    dishController.getAllDishes(req, res);
});

router.post('/createDish', (req, res)=> {
    dishController.createDish(req, res);
});

router.post('/editDish', (req, res)=> {
    dishController.editDish(req, res);
});

router.delete('/deleteDish/:id', (req, res)=> {
    dishController.deleteDish(req, res);
});


module.exports = router;