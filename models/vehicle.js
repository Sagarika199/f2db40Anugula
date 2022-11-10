const mongoose = require("mongoose") 
const vehicleSchema = mongoose.Schema({ 
VehicleName: String, 
VehicleType: String, 
VehicleCost: Number 
}) 
 
module.exports = mongoose.model("vehicle", 
vehicleSchema)