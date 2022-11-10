var express = require('express'); 
var router = express.Router(); 
 
// Require controller modules. 
var api_controller = require('../controllers/api'); 
var vehicle_controller = require('../controllers/vehicle'); 
 
/// API ROUTE /// 
 
// GET resources base. 
router.get('/', api_controller.api); 
 
/// COSTUME ROUTES /// 
 
// POST request for creating a television.  
router.post('/vehicle', vehicle_controller.vehicle_create_post); 
 
// DELETE request to delete television. 
router.delete('/vehicle/:id', vehicle_controller.vehicle_delete); 
 
// PUT request to update television. 
router.put('/vehicle/:id', vehicle_controller.vehicle_update_put); 
 
// GET request for one television. 
router.get('/vehicle/:id', vehicle_controller.vehicle_detail); 
 
// GET request for list of all television items. 
router.get('/vehicle', vehicle_controller.vehicle_list); 
 
module.exports = router;