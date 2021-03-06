module.exports = function(app) {

	var Sensor;
	var findAllSensors;
	var findById;
	var addSensor;
	var updateSensor;
	var deleteSensor;

	Sensor = require('../models/sensor.js');

  	//GET - Return all sensors in the DB
	findAllSensors = function(req, res) {
		//debugger;
		Sensor.find(function(err, sensors) {
			if(!err) {
				console.log('GET /sensors');
				//console.log(sensors);
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

		var sensor = new Sensor({
			stemp:    req.body.stemp,
			sheartrate:      req.body.sheartrate
	  	});

		sensor.save(function(err) {
			if(!err) {
				app.io.broadcast('data_arduino', {
					dato1: req.body.stemp,
					dato2: req.body.sheartrate
				});
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
			sensor.sheartrate = req.body.sheartrate;


			sensor.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(sensor);
			});
		});
	};

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
	};

	//Link routes and functions
	app.get('/sensors', findAllSensors);
	app.get('/sensor/:id', findById);
	app.post('/sensor', addSensor);
	app.put('/sensor/:id', updateSensor);
	app.delete('/sensor/:id', deleteSensor);
};