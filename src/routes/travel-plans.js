const express = require('express');
const travelPlannerController = require('../controllers/travelPlannerController');
const routes = express();


routes.post('/', travelPlannerController.createTravelPlan);
routes.get('/', travelPlannerController.getAllTravelPlans);
routes.get('/:id', travelPlannerController.getTravelPlansById);
routes.put('/:id', travelPlannerController.updateTravelPlan);
routes.delete('/:id', travelPlannerController.deleteTravelPlan);


module.exports = routes;