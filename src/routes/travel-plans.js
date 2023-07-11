const express = require('express');
const travelPlannerController = require('../controllers/travelPlannerController');
const routes = express();


routes.post('/travel_plans', travelPlannerController.createTravelPlan);
routes.get('/travel_plans', travelPlannerController.getAllTravelPlans);
routes.get('/travel_plans/:id', travelPlannerController.getTravelPlansById);
routes.put('/travel_plans/:id', travelPlannerController.updateTravelPlan);
routes.delete('/travel_plans/:id', travelPlannerController.deleteTravelPlan);


module.exports = routes;