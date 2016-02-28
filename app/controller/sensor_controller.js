module.exports = function(app,arduino_server) {

    app.post('/api/dataprueba', function(req, res) {
        var arduinoArray = req.body.text.toString().split(',');

        //Actualiza Datos
        app.io.broadcast('data_arduino', {
            //val: req.body.val
            dato1: arduinoArray[0],
            dato2: arduinoArray[1],
            dato3: arduinoArray[2],
            dato4: arduinoArray[3]
        });
    });

    arduino_server.on("message", function(msg, rinfo) { //every time new data arrives do this:)

        var arduinoArray = msg.toString().split(',');
        //var sensorID = 'sensordata' + arduinoArray[0];

        app.io.broadcast('data_arduino', {
            //val: req.body.val
            dato1: arduinoArray[0],
            dato2: arduinoArray[1],
            dato3: arduinoArray[2],
            dato4: arduinoArray[3]
        });
    });
}