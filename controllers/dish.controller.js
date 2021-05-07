const dishModel = require('../models/dish.model');
const userModel = require('../models/user.model');
const { editUser } = require('./users.controller');

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
        const {price, name, stock, image, icon, isActive} = req.body;

        const dish = new dishModel({
            price: price,
            name: name,
            stock: stock,
            image: image,
            icon: icon,
            isActive: isActive
        });
    
        dish.save((err) = async(err) => {
            if (err) return res.status(400).send("Error: " +err);
        });
    }
    catch(e) {
        return res.send({"error": e});
    }
   
}

const deleteDish = async(req, res)=> {
    try{
        const dish = await dishModel.findByIdAndDelete(req.params.id);
        if (!dish) {
            return res.status(404).send('Could not find dish');
        }
        return res.send(dish);
    }
    catch(e) {
        return res.status(400).send(e);
    }
}

const editDish = async(req, res)=> {
    
    const updates = Object.keys(req.body);
    const allowedUpdates = ["price", "name", "stock", "image", "icon", "isActive"];

    const isValidOperation = updates.every((update)=> {
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation) {
        return res.status(400).send('illegal updates');
    }

    try {
        const dish = await dishModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        if(!dish) {
            return res.status(404).send('dish not found');
        }
        return res.send(dish);
        
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
}
