const dishModel = require('../models/dish.model');
const userModel = require('../models/user.model');
const { editUser } = require('./users.controller');
const fs = require('fs');

const getAllDishes = async(req, res) =>{
    try {
        const dishes = await dishModel.find({});
        return res.send(dishes);
    }
    catch (e) {
        console.log(e);
        return res.status(400).json(e);
    }
} 

const createDish = async(req, res) => {
    try {
        const {price, name, stock, icon, isActive} = req.body;
        const image = req.file;

        const dish = new dishModel({
            price: price,
            name: name,
            stock: stock,
            images: [image],
            icon: icon,
            isActive: isActive
        });
    
        await dish.save();

        return res.send(dish);
    }
    catch(e) {
        return res.status(400).send({"Error": e});
    }
   
}

const deleteDish = async(req, res)=> {
    try{

        //find and delete the dish, then delete the images and icon files.

        const dish = await dishModel.findByIdAndDelete(req.body.id);
        if (!dish) {
            return res.status(404).send('Could not find dish');
        }

        const dishImages = dish.images;

        const fileNames = [];

        dishImages.forEach((img)=> {
            fileNames.push(img.filename);
        });

        fileNames.forEach((path)=> {

            fs.rm(`./image_uploads/${path}`, { recursive:true }, (err) => {
                if(err){

                    console.log(err.message);

                    return;
                }
                console.log("File deleted successfully " +path);
            })
        });

        if(dish.icon.filename) {
            
            fs.rm(`./image_uploads/${dish.icon.filename}`, { recursive:true }, (err) => {
                if(err){

                    console.log(err.message);

                    return;
                }
                console.log("File deleted successfully " +path);
            })
        }
        return res.send(dish);
    }
    catch(e) {
        return res.status(400).send(e);
    }
}

const editDish = async(req, res)=> {
    
    const updates = Object.keys(req.body);
    const allowedUpdates = ["price", "name", "stock", "icon", "isActive"];
    
    const indexId = updates.indexOf("id");

    updates.splice(indexId, 1);

    const isValidOperation = updates.every((update)=> {
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation) {
        return res.status(400).send('Illegal updates');
    }

    const bodyWithoutId = JSON.parse(JSON.stringify(req.body));
    delete bodyWithoutId.id;

    console.log(bodyWithoutId);


    try {
        const dish = await dishModel.findByIdAndUpdate(req.body.id, bodyWithoutId, {new: true, runValidators: true});

        if(!dish) {
            return res.status(404).send('Dish not found');
        }
        return res.send(dish);
        
    }
    catch(e) {
        return res.status(400).send(e);
    }
}

const addDishImages = async(req, res)=> {
    try {
        const images = req.files;
        console.log("req.files");
        console.log(images);

        if(images) {

            const dish = await dishModel.findById(req.body.id);

            dish.images = dish.images.concat(images);

            return res.send(dish);
        }
        return res.status(400).send('Missing image input'); 
    }
    catch(e) {
        return res.status(400).send({"Error": e});
    }
}

const clearAllImages = async(req, res)=> {
    try {
        const dish = await dishModel.findById(req.body.id);

        if(dish) {
            const fileNames = [];

            dish.images.forEach((file)=> {
                fileNames.push(file.filename);
            });

            fileNames.forEach((filename)=> {

                fs.rm(`./image_uploads/${filename}`, { recursive:true }, (err) => {

                    if(err){
    
                        console.log(err.message);
    
                        return;
                    }
                    console.log("File deleted successfully " +filename);
                });
            });
            
            dish.images = [];
            await dish.save();

            return res.send(dish);
        }
        return res.status(404).send('Dish not found');
    }
    catch(e) {
        return res.status(400).send(e);
    }
}

module.exports = {
    createDish: createDish,
    getAllDishes: getAllDishes,
    editDish: editDish,
    deleteDish: deleteDish,
    addDishImages: addDishImages,
    clearAllImages: clearAllImages,
}
