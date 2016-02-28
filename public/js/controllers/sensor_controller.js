angular.module("FinalApp")
    .controller("SensorController", function($scope,Socket,Sensors,Riot){

        $scope.formData = {};
        $scope.loading = true;
        $scope.sensor = {};

        Socket.on('data_arduino', function (data) {
            $scope.chart1.series[0].data.push(parseFloat(data.dato1));
            $scope.sensor.stemp = parseFloat(data.dato1);
            $scope.chart2.series[0].data.push(parseFloat(data.dato2));
            $scope.sensor.sheartrate = parseFloat(data.dato2);

            Riot.addData($scope.sensor.stemp, $scope.sensor.sheartrate)
                .success(function (data) {
                    console.log('Exito!!!');
                })
                .error(function (err) {
                    console.log('Error!!! '+err);
                });

            /*$scope.chart3.series[0].data.push(parseFloat(data.dato3));
            $scope.sensor.sconduct = parseFloat(data.dato3);
            $scope.chart4.series[0].data.push(parseFloat(data.dato4));
            $scope.sensor.sdureza = parseFloat(data.dato4);*/
        });

        $scope.DataPrueba = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.text != undefined) {

                //$scope.loading = true;
                var dataArray = $scope.formData.text.split(',');

                $scope.sensor.stemp = parseFloat(dataArray[0]);
                $scope.sensor.sheartrate = parseFloat(dataArray[1]);
                /*$scope.sensor.sconduct = parseFloat(dataArray[2]);
                $scope.sensor.sdureza = parseFloat(dataArray[3]);*/


                Sensors.create($scope.sensor)

                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        //$scope.loading = false;
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        //$scope.todos = data; // assign our new list of todos
                        //$location.path("/");
                        console.log("save data prueba success : "+data);
                    })
                    .error(function(err){

                    })

                Riot.addData($scope.sensor.stemp, $scope.sensor.sheartrate)
                    .success(function (data) {
                        console.log('Exito!!!');
                    })
                    .error(function (err) {
                        console.log('Error!!! '+err);
                    });
            }
        };

        $scope.addTempPoint = function (stemp) {
            $scope.chart1.series[0].data.push(parseFloat(stemp));
            var seriesArray = $scope.chart1.series;
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
        };

        $scope.addHeartRatePoint = function (sheartrate) {
            $scope.chart2.series[0].data.push(sheartrate);
            //debugger;
            //var seriesArray = $scope.chart1.series
            //var rndIdx = Math.floor(Math.random() * seriesArray.length);
            //var rndIdx = 3.0;
            //seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
        };

        $scope.addSeries = function () {
            var rnd = []
            for (var i = 0; i < 10; i++) {
                rnd.push(Math.floor(Math.random() * 20) + 1)
            }
            $scope.chart1.series.push({
                data: rnd
            })
            $scope.chart2.series.push({
                data: rnd
            })
            /*$scope.chart3.series.push({
                data: rnd
            })
            $scope.chart4.series.push({
                data: rnd
            })*/
        };

        $scope.removeRandomSeries = function () {
            var seriesArray = $scope.chart1.series
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray.splice(rndIdx, 1)

            var seriesArray2 = $scope.chart2.series
            var rndIdx2 = Math.floor(Math.random() * seriesArray2.length);
            seriesArray2.splice(rndIdx2, 1)

            /*var seriesArray3 = $scope.chart3.series
            var rndIdx3 = Math.floor(Math.random() * seriesArray3.length);
            seriesArray3.splice(rndIdx3, 1)

            var seriesArray4 = $scope.chart4.series
            var rndIdx4 = Math.floor(Math.random() * seriesArray4.length);
            seriesArray4.splice(rndIdx4, 1)*/
        };

        $scope.options = {
            type: 'line'
        };

        $scope.swapChartType = function () {
            if (this.chart1.options.chart.type === 'line') {
                this.chart1.options.chart.type = 'bar'
            } else {
                this.chart1.options.chart.type = 'line'
            }

            if (this.chart2.options.chart.type === 'line') {
                this.chart2.options.chart.type = 'bar'
            } else {
                this.chart2.options.chart.type = 'line'
            }
        };

        $scope.chart1 = {
            options: {
                chart: {
                    type: 'line'
                }
            },
            series: [{
                data: [10, 15, 12, 8, 7]
            }],
            title: {
                text: 'Temperature'
            },
            loading: false
        };

        $scope.chart2 = {
            options: {
                chart: {
                    type: 'line'
                }
            },
            series: [{
                data: [7, 4, 2, 3, 1]
            }],
            title: {
                text: 'Heart Rate'
            },
            loading: false
        };
    })