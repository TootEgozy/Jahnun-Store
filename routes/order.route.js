const { default: validator } = require('validator');
const orderController = require('../controllers/order.controller');
const express = require('../node_modules/express');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const router = express.Router();

// router.get('/', (req, res)=> {
//     res.send("in order routes");
// });

router.get('/allOrders', auth, adminOnly, (req, res)=> {
    orderController.getAllOrders(req, res);
});

router.post('/createOrder', auth, (req, res)=> {
    orderController.createOrder(req, res);
});

// router.post('/addDish', auth, (req, res)=> {
//     orderController.addDish(req, res);
// })

router.delete('/deleteOrder', auth, (req, res)=> {
    orderController.deleteOrder(req, res);
});


module.exports = router;