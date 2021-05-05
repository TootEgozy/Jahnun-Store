const express = require('express');
const router = express.Router();
const path = require("path");

router.use('api/user', require('./user.route'));
router.use('api/dish', require('./dish.route'));
router.use('api/order', require('./order.route'));

// router.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../jahnun-client/public", "index.html"));
// });


module.exports = router;