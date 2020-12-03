const express = require('express');
const multer = require('multer');
const verifyToken = require('./config/verifyToken');

const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashboardController = require('./controllers/DashboardController');
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');
const uploadConfig = require('./config/upload');
const OrderController =require('./controllers/OrderController');
const TripController =require('./controllers/TripController');

const routes = express.Router();
const upload = multer(uploadConfig)


routes.get('/status', (req, res)=>{
    res.send({ status : 200})
});

//TODO: add todo extension VSCODE

//login
routes.post('/login', LoginController.store);
//User
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

//Registration
routes.post('/registration/:eventId', verifyToken, RegistrationController.create);
routes.get('/registration', verifyToken, RegistrationController.getMyRegistrations);
routes.get('/registration/:registration_id', RegistrationController.getRegistration)
routes.post('/registration/:registration_id/approvals', verifyToken, ApprovalController.approval);
routes.post('/registration/:registration_id/rejections', verifyToken, RejectionController.rejection);

//Dashboard:
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents)
routes.get('/dashboard-orders', verifyToken, DashboardController.getAllOrders)
routes.get('/dashboard-trips', verifyToken, DashboardController.getAllTrips)
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents)
routes.get('/user/events', verifyToken, DashboardController.getEventsByUserId)
routes.get('/event/:eventId',verifyToken, DashboardController.getEventById)

//Events:
routes.post('/event', verifyToken, upload.single("thumbnail"), EventController.createEvent)
routes.delete('/event/:eventId', verifyToken, EventController.delete)

//Order solve this later
// 1:
routes.post('/order', verifyToken, upload.single("thumbnail"), OrderController.createOrder);
// 2:
//routes.post('/order', verifyToken, OrderController.createOrder);

//routes.delete('/order/:orderId', verifyToken, OrderController.delete)


//Trip
routes.post('/trip', verifyToken, upload.single("thumbnail"), TripController.createTrip);
//routes.delete('/trip/:orderId', verifyToken, TripController.delete)

module.exports = routes;