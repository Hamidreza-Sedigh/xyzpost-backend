const Event = require('../models/Event');
const jwt =      require('jsonwebtoken');
const Order = require('../models/Order');
const Trip =  require('../models/Trip');

module.exports = {
    getEventById(req,res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if (err) {
                res.sendStatus(401);
            } else {
                const { eventId } = req.params;
                try {
                    const events = await Event.findById(eventId)

                    if(events){
                        return res.json({ authData, events })
                    }    
                } catch (error) {
                    return res.status(400).json({ message: 'EventId does not exist'});
                }
            }
            
        });
    },
    
    getAllEvents(req,res){
        // req.io
        // req.connectUsers[]
        console.log("here:dashboard/getAllEvents")
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                res.sendStatus(401);
            } else {
                const { sport } = req.params;
                const query = sport ? {sport} : {}
                try {
                    const events = await Event.find(query)
                    if(events){
                        return res.json({authData, events})
                    }
                } catch (error) {
                    return res.status(400).json({ message: 'we font have any event yet'});
                }
            }
        });
        
    },

    getEventsByUserId(req,res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if (err) {
                
            } else {
                //console.log("routes working!@#",req);
                const { user_id } = req.headers;
                console.log("user_id", user_id);
                
                try {
                    const events = await Event.find({user: authData.user._id})
                    if(events){
                        return res.json({authData, events})
                    }    
                } catch (error) {
                    return res.status(400).json({ message: `we dont have any event by this userId  ${user_id}`});
                }
            }
            
        });
    },

    getAllOrders(req,res){
        console.log("routes works fine!! getAllOrders");
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                res.sendStatus(401);
            } else {
                const query = {};
                try {
                    const orders = await Order.find(query)
                    console.log("test in controller:", orders);
                    if(orders){
                        return res.json({authData, orders})
                    }    
                } catch (error) {
                    return res.status(400).json({ message: 'we dont have any order yet'});
                }
            }
        });
    },

    getAllTrips(req,res){
        console.log("routes works fine!! getAllTrips");
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                res.sendStatus(401);
            } else {
                const query = {};
                try {
                    const trips = await Trip.find(query)
                    console.log("test in controller:", trips);
                    if(trips){
                        return res.json({authData, trips})
                    }    
                } catch (error) {
                    return res.status(400).json({ message: 'we dont have any trips yet'});
                }
            }
        });
    }
}