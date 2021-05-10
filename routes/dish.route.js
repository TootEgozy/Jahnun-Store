const dishController = require('../controllers/dish.controller');
const express = require('../node_modules/express');
const router = express.Router();
const multer = require('../node_modules/multer');

//create a more complex storage for the file.
//cb = callback
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'image_uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

//restarting multer + defining a folder for the images to be saved in
const upload = multer({storage: storage});


router.get('/', (req, res)=> {
    res.send("in dish routes");
})

router.get('/allDishes', (req, res)=> {
    dishController.getAllDishes(req, res);
});

//using upload adds "file" to request object 
router.post('/createDish', upload.single('productImage'), (req, res)=> {
    dishController.createDish(req, res);
});

router.post('/editDish/:id', (req, res)=> {
    dishController.editDish(req, res);
});

router.post('/updateImage/:id', upload.single('productImage'), (req, res)=> {
    dishController.updateDishImage(req, res);
});

router.delete('/deleteDish/:id', (req, res)=> {
    dishController.deleteDish(req, res);
});


module.exports = router;