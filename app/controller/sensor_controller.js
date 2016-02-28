module.exports = function(app,arduino_server) {

    var Sensor = require('../models/sensor.js');

    arduino_server.on("message", function(msg, rinfo) { //every time new data arrives do this:)

        console.log('hola palusa '+msg);
        var arduinoArray = msg.toString().split(',');

        var sensor = new Sensor({
            stemp:         arduinoArray[0],
            sheartrate:    arduinoArray[1]
        });

        sensor.save(function(err) {
            if(!err) {
                app.io.broadcast('data_arduino', {
                    dato1: arduinoArray[0],
                    dato2: arduinoArray[1]
                });
                console.log('Created');
            } else {
                console.log('ERROR: ' + err);
            }
        });


        /*app.io.broadcast('data_arduino', {
            dato1: arduinoArray[0],
            dato2: arduinoArray[1],
            dato3: arduinoArray[2],
            dato4: arduinoArray[3]
        });*/
    });
}