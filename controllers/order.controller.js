const orderModel = require('../models/order.model');
const userModel = require('../models/user.model');

const getAllOrders = async(req, res) =>{
    try {
        const orders = await orderModel.find({});
        return res.send(orders);
    }
    catch (e) {
        
        return res.status(400).json(e);
    }
} 

const createOrder = async(req, res) => {
    try {

        const id = req.params.id;

        const user = await userModel.findById(id);

        if(!user) {

            return res.status(404).send('user not found');
        }
        const {cash, adress} = req.body;

        const order = new orderModel({
            cash: cash,
            userId: id,
            adress: adress,
        });
    
        order.save((err) = async(err) => {
            if (err) return res.status(400).send("Error: " +err);

            user.orders.push(order._id);
            await user.save();

            return res.send({"success": user});
        });
    }
    catch(e) {
        return res.send({"error": e});
    }
   
}

const deleteOrder = async(req, res)=> {
    try {
        const user = await userModel.findById(req.params.userId);

        const order = await orderModel.findByIdAndDelete(req.params.orderId);
        
        if(!order || !user) return res.status(404).send('user / order not found');

        for(let i = 0; i<user.orders.length; i++) {

            const order = user.orders[i][0].toString();
            
            if(order === req.params.orderId) {

                user.orders.splice(i, 1);
            }
        }
      await user.save();
 
        res.send(user);
    }
    catch(e) {
        return res.status(400).send('Deleting order failed');
    }
}

module.exports = {
    createOrder: createOrder,
    getAllOrders: getAllOrders,
    deleteOrder: deleteOrder,
}
