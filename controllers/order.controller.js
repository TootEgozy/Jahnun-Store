const { ObjectID } = require('bson');
const dishModel = require('../models/dish.model');
const orderModel = require('../models/order.model');
const { update } = require('../models/user.model');
const userModel = require('../models/user.model');

const getAllOrders = async(req, res) =>{
    try {
        const orders = await orderModel.find({});
        return res.send(orders);
    }
    catch (e) {

        return res.status(401).json(e);
    }
} 

//When I'm creating a new order I need:
//The user's id, the cash, the adress & the dishes.
//Dishes is an array of objects, with {id:, amount: } keys.

//After successfully creating the order, I will fetch its ID and
//push into the user's orders array.

// newOrder JSON:
// {
//     "cash": 8,
//     "adress": "hoohooo12 pardes hanna",
//     "dishes": [{"id": "60980e73aa37796f10423030" , "amount": 7}, {"id": "60980ffc74701d6fb06eff30", "amount": 2}]
// }

const createOrder = async(req, res) => {
    try {
        const user = req.user;

        const {cash, adress} = req.body;

        const newOrder = {
            cash: cash,
            adress: adress,
            userId: req.user._id,
            dishes: []
        };

        for(let i = 0; i<req.body.dishes.length; i++) {

            let dish = req.body.dishes[i];

            if(dish.id && dish.amount) {

                const searchedDish = await dishModel.findById(dish.id);

                const dishObj = {
                    id: searchedDish._id, 
                    amount: dish.amount
                }

                newOrder.dishes.push(dishObj);  
            }  
        }

        const order = await new orderModel(newOrder);

        await order.save();

        await user.orders.push(order._id);

        await user.save();
   
        return res.send(order);
    }
    catch(e) {

        return res.status(400).send({"error": e});
    }
}

const deleteOrder = async(req, res)=> {
    try {
        const user = req.user;

        const order = await orderModel.findByIdAndDelete(req.body.id);
        
        if(!order) throw new Error();

        for(let i = 0; i<user.orders.length; i++) {

           // const order = user.orders[i][0].toString();

           const orderId = user.orders[i][0].toString();
            
            if(orderId === req.body.id) {

                user.orders.splice(i, 1);
            }
        }
        await user.save();
 
        res.send();
    }
    catch(e) {
        return res.status(400).send('Deleting order failed');
    }
}

const editOrder = async(req, res)=>{

    const updates = Object.keys(req.body);

    const indexId = updates.indexOf("id");

    updates.splice(indexId, 1);

    const allowedUpdates = ["isCompeleted", "adress"];

    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(401).send('illegal updates');
    }

    try {
        const order = await orderModel.findById(req.body.id);

        if(!order) {
            return res.status(404).send('order not found');
        }

        updates.forEach((update)=> {
            if(update!== "id") {
                order[update] = req.body[update];
            }
        });

        await order.save();

        return res.send(order);
    }
    catch(e) {
        return res.status(401).send(e);
    }
}

// order: {
//     type: Array,
//     default: [],
//     item: {
//         type: Object,
//         id: {
//             type: ObjectId,
//             required: true
//         },
//         amount: {
//             type: Number,
//             required: true
//         }
//     }
// },

// const addDish = async(req, res)=> {
//     try {
//         const order = await orderModel.findById(req.body.id);

//         const dish = await dishModel.findById(req.body.dishId);

//         const item = {
//             _id: dish._id,
//             amount: req.body.amount
//         }

//         console.log(order);

//         //check if the order already have that dish, if so, add the amount to the dish amount.
//         //if not, concat the dish to the order array.

//         const existDish = order.order.find((dish)=> {
//             console.log(dish._id, item._id);
//             console.log(dish._id == item._id);
//             return dish._id == item._id
//         });
        
//         console.log(typeof(existDish));

//         order.order = order.order.concat([item]);
//         await order.save();
        
//         return res.send(order);
//     }
//     catch(e) {
//         return res.status(404).send(e);
//     }
// }

// const removeDish = async(req, res)=> {
//     try {
//         const order = await orderModel.findById(req.body.id);

//         const dish = await dishModel.findById(req.body.dishId);
//     }
//     catch(e) {
//         res.status(404).send();
//     }
// }

module.exports = {
    createOrder: createOrder,
    getAllOrders: getAllOrders,
    deleteOrder: deleteOrder,
    editOrder: editOrder,
}
