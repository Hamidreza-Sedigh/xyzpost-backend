const Order = require('../models/Order');
const User =  require('../models/User');
const jwt =      require('jsonwebtoken');
//const { delete } = require('../routes');

module.exports = {
    createOrder(req, res){
        console.log("test at first", req.body);
        jwt.verify(req.token, 'secret', async(err, authData) => {
            console.log("test1");
            if (err) {
                console.log("test2",err);
                res.status(401);
            } else {
                console.log("|||test3",req.body);
                console.log("|||test4:", req.headers);
                const {departure, destination, minDate, maxDate, weight, size, description } = req.body;
                

                console.log(authData);
                const user = await User.findById(authData.user._id)

                if(!user){
                    console.log("WRONG USER ID !!!");
                    return res.status(400).json({ message: 'User does not exist'})
                }

                console.log("!!!test5");
                const order = await Order.create({
                    departure,
                    destination,
                    minDate,
                    maxDate,
                    weight: parseFloat(weight) ,
                    size: parseFloat(size),
                    description,
                    user: authData.user._id
                })
                console.log("order has been created!!")
                return res.json(order);
            }
            
        });

    },
    async delete(req, res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if (err) {
                res.status(401);
            } else {
                const { orderId } = req.params;
                console.log("OrdCont:delete routes works fine!", req.params);
                try {
                    console.log("in try");
                    await Order.findByIdAndDelete(orderId);
                    console.log("delete worked.");
                    return res.status(204).send();
                } catch (error) {
                    return res.status(400).json({ message: 'we font have any order with this ID'});
                }      
                
            }
        }); 
    }
}