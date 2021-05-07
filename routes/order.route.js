const { default: validator } = require('validator');
const orderController = require('../controllers/order.controller');
const express = require('../node_modules/express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.send("in order routes");
});

router.get('/allOrders', (req, res)=> {
    orderController.getAllOrders(req, res);
});

router.post('/createOrder/:id', (req, res)=> {
    orderController.createOrder(req, res);
});

router.delete('/deleteOrder/:userId/:orderId', (req, res)=> {
    orderController.deleteOrder(req, res);
});


module.exports = router;