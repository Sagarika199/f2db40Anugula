const mongoose = require("mongoose") 
const vehicleSchema = mongoose.Schema({ 
VehicleName: {type:String,minlength:3}, 
VehicleType: {type:String}, 
VehicleCost:{type:Number,min:20000,max:1000000}  
}) 
 
module.exports = mongoose.model("vehicle", 
vehicleSchema)