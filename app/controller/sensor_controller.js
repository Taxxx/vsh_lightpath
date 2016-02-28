module.exports = function(app,arduino_server) {

    arduino_server.on("message", function(msg, rinfo) { //every time new data arrives do this:)

        var arduinoArray = msg.toString().split(',');

        app.io.broadcast('data_arduino', {
            dato1: arduinoArray[0],
            dato2: arduinoArray[1],
            dato3: arduinoArray[2],
            dato4: arduinoArray[3]
        });
    });
}