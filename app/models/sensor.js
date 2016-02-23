var mongoose = require('mongoose');

module.exports = mongoose.model('Sensor', {
	stemp: 	{ type: Number },
	sph:{ type: Number },
	sconduc:{ type: Number},
	sdureza:{ type: Number }

});