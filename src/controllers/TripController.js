const Trip = require('../models/Trip');
const User =  require('../models/User');
const jwt =      require('jsonwebtoken');
//const { delete } = require('../routes');

module.exports = {
    createTrip(req, res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            console.log("test1");
            if (err) {
                console.log("test2",err);
                res.status(401);
            } else {
                console.log("|||test3", req.body);
                console.log("|||test4", req.headers);
                const {departure, destination, tripDate, description } = req.body;

                const user = await User.findById(authData.user._id)

                if(!user){
                    console.log("WRONG USER ID !!!");
                    return res.status(400).json({ message: 'User does not exist'})
                }

                const trip = await Trip.create({
                    departure,
                    destination,
                    tripDate,
                    description,
                    user: authData.user._id
                })
                console.log("trip has been created!!")
                return res.json(trip);
            }
            
        });

    },
    async delete(req, res){
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if (err) {
                res.status(401);
            } else {
                const { tripId } = req.params;
                console.log("OrdCont:delete routes works fine!", req.params);
                try {
                    console.log("in try");
                    await Trip.findByIdAndDelete(tripId);
                    console.log("delete worked.");
                    return res.status(204).send();
                } catch (error) {
                    return res.status(400).json({ message: 'we font have any trip with this ID'});
                }      
                
            }
        }); 
    }
}