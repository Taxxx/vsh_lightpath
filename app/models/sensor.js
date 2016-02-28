var mongoose = require('mongoose');

module.exports = mongoose.model('Sensor', {
	stemp: 	{ type: Number },
	sheartrate:{ type: Number }
	/*,sconduct:{ type: Number},
	sdureza:{ type: Number }*/

});