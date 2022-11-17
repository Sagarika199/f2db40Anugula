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
 

// Handle cereal delete on DELETE.

exports.vehicle_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await vehicle.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
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

// Handle a show one view with id specified by query
exports.vehicle_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await vehicle.findById(req.query.id)
        res.render('vehicledetail',
            { title: 'Vehicle Detail', toShow: result});
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a vehicle.
// No body, no in path parameter, no query.
// Does not need to be async
exports.vehicle_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('vehiclecreate', { title: 'Vehicle Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a vehicle.
// query provides the id
exports.vehicle_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await vehicle.findById(req.query.id)
        res.render('vehicleupdate', { title: 'Vehicle Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.vehicle_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await vehicle.findById(req.query.id)
        res.render('vehicledelete', {
            title: 'Vehicle Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
