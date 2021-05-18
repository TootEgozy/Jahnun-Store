const aboutController = require('../controllers/about.controller');
const express = require('../node_modules/express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.post('/createAbout', auth, adminOnly, (req, res)=> {
    aboutController.createAboutModel(req, res);
});

router.get('/getAbout', auth, (req, res)=> {
    aboutController.getAbout(req, res);
})

router.post('/editAbout', auth, adminOnly, (req, res)=> {
    aboutController.editAbout(req, res);
});

router.delete('/deleteAllAbouts', auth, adminOnly, (req, res)=> {
    aboutController.deleteAllAboutModels(req, res);
});

module.exports = router;