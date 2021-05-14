const dishController = require('../controllers/dish.controller');
const express = require('../node_modules/express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

const multer = require('../node_modules/multer');

//create a more complex storage for the file.
//cb = callback
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'image_uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

//restarting multer + defining a folder for the images to be saved in
const upload = multer({storage: storage});


// router.get('/', (req, res)=> {
//     res.send("in dish routes");
// })

router.get('/allDishes', auth, (req, res)=> {
    dishController.getAllDishes(req, res);
});

//using upload adds "file" to request object 
router.post('/createDish',auth, adminOnly, upload.single('productImage'), (req, res)=> {
    dishController.createDish(req, res);
});

router.post('/editDish', auth, adminOnly, (req, res)=> {
    dishController.editDish(req, res);
});

router.post('/addImages', auth, adminOnly, upload.array('productImages', 4), (req, res)=> {
    dishController.addDishImages(req, res);
});

router.post('/addIcon', auth, adminOnly, upload.single('productIcon'), (req, res)=> {
    dishController.addDishIcon(req, res);
});

router.post('/editIcon', auth, adminOnly, upload.single('productIcon'), (req, res)=> {
    dishController.editDishIcon(req, res);
});

router.delete('/clearImages', auth, adminOnly, (req, res)=> {
    dishController.clearAllImages(req, res);
});

router.delete('/deleteDish', auth, adminOnly, (req, res)=> {
    dishController.deleteDish(req, res);
});


module.exports = router;