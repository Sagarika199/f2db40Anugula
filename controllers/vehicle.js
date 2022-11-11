var vehicle = require('../models/vehicle'); 
 
// List of all vehicle 
exports.vehicle_list = async function(req, res) { 
    try{ 
        thevehicle = await vehicle.find(); 
        res.send(thevehicle); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
 
// VIEWS 
// Handle a show all view 
exports.vehicle_view_all_Page = async function(req, res) { 
    try{ 
        thevehicle = await vehicle.find(); 
        res.render('vehicle', { title: 'vehicle Search Results', results: thevehicle }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// Handle vehicle create on POST. 
exports.vehicle_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new vehicle(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"VehicleName":"Activa", "VehicleType":"Scooty", "VehicleCost":"100000"} 
    document.VehicleName = req.body.VehicleName;    
    document.VehicleType = req.body.VehicleType;
    document.VehicleCost = req.body.VehicleCost;  
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// for a specific vehicle. 
exports.vehicle_detail = function(req, res) { 
    res.send('NOT IMPLEMENTED: vehicle detail: ' + req.params.id); 
}; 
 

// Handle vehicle delete form on DELETE. 
exports.vehicle_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: vehicle delete DELETE ' + req.params.id); 
}; 
 
// Handle vehicle update form on PUT. 
exports.vehicle_update_put = function(req, res) { 
    res.send('NOT IMPLEMENTED: vehicle update PUT' + req.params.id); 
}; 


// for a specific vehicle. 
exports.vehicle_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await vehicle.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 

//Handle vehicle update form on PUT. 
exports.vehicle_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await vehicle.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.VehicleName) toUpdate.VehicleName = req.body.VehicleName; 
        if(req.body.VehicleType) toUpdate.VehicleType = req.body.VehicleType; 
        if(req.body.VehicleCost) toUpdate.VehicleCost = req.body.VehicleCost; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
}; 