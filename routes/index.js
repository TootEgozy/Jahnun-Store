const express = require('express');
const router = express.Router();
const path = require("path");

router.use('/user', require('./user.route'));
router.use('/dish', require('./dish.route'));
router.use('/order', require('./order.route'));

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../jahnun-client/public", "index.html"));
});


module.exports = router;