//File: routes/sensors.js
module.exports = function(app) {

  var Sensor = require('../models/sensor.js');

  //GET - Return all sensors in the DB
  findAllSensors = function(req, res) {
  	Sensor.find(function(err, sensors) {
  		if(!err) {
        console.log('GET /sensors')
  			res.send(sensors);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a User with specified ID
  findById = function(req, res) {
  	Sensor.findById(req.params.id, function(err, sensor) {
  		if(!err) {
        console.log('GET /sensor/' + req.params.id);
  			res.send(sensor);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Sensor in the DB
  addSensor = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var sensor = new Sensor({
  		stemp:    req.body.stemp,
      sph:      req.body.sph,
      sconduc: 	req.body.sconduc,
  		sdureza:  req.body.sdureza
  	});

  	sensor.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(sensor);
  };

  //PUT - Update a register already exists
  updateSensor = function(req, res) {
  	Sensor.findById(req.params.id, function(err, sensor) {
  		sensor.stemp = req.body.stemp;
      sensor.sph = req.body.sph;
      sensor.sconduc = req.body.sconduc;
      sensor.sdureza = req.body.sdureza;

  		sensor.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(sensor);
  		});
  	});
  }

  //DELETE - Delete a Sensor with specified ID
  deleteSensor = function(req, res) {
  	Sensor.findById(req.params.id, function(err, sensor) {
  		sensor.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/sensors', findAllSensors);
  app.get('/sensor/:id', findById);
  app.post('/sensor', addSensor);
  app.put('/sensor/:id', updateSensor);
  app.delete('/sensor/:id', deleteSensor);

}