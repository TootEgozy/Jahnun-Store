const express = require('../node_modules/express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.send("in user routes");
})

module.exports = router;