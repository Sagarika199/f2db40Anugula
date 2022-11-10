var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var vehicle = require("./models/vehicle");	
require('dotenv').config(); 	
const connectionString =  	
process.env.MONGO_CON 	
mongoose = require('mongoose'); 	
mongoose.connect(connectionString,  	
{useNewUrlParser: true, 	
useUnifiedTopology: true});	
//Get the default connection 	
var db = mongoose.connection; 	
 	
//Bind connection to error event  	
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 	
db.once("open", function(){ 	
  console.log("Connection to DB succeeded")}); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vehicleRouter = require('./routes/vehicle');
var gridbuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehicle', vehicleRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// We can seed the collection if needed on server start 	
async function recreateDB(){ 	
  // Delete everything 	
  await vehicle.deleteMany(); 	
 	
  let instance1 = new vehicle({"VehicleName":"Volkswagen","VehicleType":"Car","VehicleCost":100000}); 	
  instance1.save( function(err,doc) { 	
      if(err) return console.error(err); 	
      console.log("First vehicle data saved") 	
  }); 	
 	
let instance2 = new vehicle({"VehicleName":"BMW","VehicleType":"Bus","VehicleCost":500000}); 	
instance2.save( function(err,doc) { 	
      if(err) return console.error(err); 	
      console.log("Second vehicle data saved") 	
  }); 	
  let instance3 = new vehicle({"VehicleName":"Volvo","VehicleType":"Truck","VehicleCost":600000}); 	
instance3.save( function(err,doc) { 	
      if(err) return console.error(err); 	
      console.log("Third vehicle data saved") 	
  }); 	
}

let reseed = true; 	
if (reseed) { recreateDB();} 

module.exports = app;
