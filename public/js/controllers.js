angular.module("FinalApp")
	.controller("MainController", function($scope,LxDialogService,LxNotificationService,$resource,PostResource){
		$scope.nombre = "Henrry :D";


		User = $resource("http://jsonplaceholder.typicode.com/users/:id",{id:"@id"});

		$scope.posts = PostResource.query();
		$scope.users = User.query();
		// query() -> GET/posts -> Un arreglo de posts -> isArray: true 
		$scope.removePost = function(post){
			PostResource.delete({id: post.id},function(data){
				//console.log(data);
				//$scope.posts = Post.query(); // :D
			});

			$scope.posts = $scope.posts.filter(function(element){
				return element.id !== post.id;
			});

		}
		
		$scope.opendDialog = function(dialogId)
		{
		    LxDialogService.open(dialogId);
		};

		$scope.closingDialog = function()
		{
		    LxNotificationService.info('Dialog closed!');
		};


	})

	.controller("BdController", function($scope,Sensors){
		$scope.sensors = {};

		//$scope.tfmax = ;
		//$scope.tfmin = ;
		
		// query() -> GET/posts -> Un arreglo de posts -> isArray: true 
		Sensors.get()
			.success(function(data) {
				$scope.sensors = data;
				//$scope.loading = false;
			});
	})

	.controller('QrController', ['$scope', function($scope) {
	    $scope.onSuccess = function(data) {
	        console.log(data);
	    };
	    $scope.onError = function(error) {
	        console.log(error);
	    };
	    $scope.onVideoError = function(error) {
	        console.log(error);
	    };
	}])

	.controller("myctrl", function($scope,socket,DataPrueba,Sensors){

		$scope.formData = {};
		$scope.loading = true;
		$scope.sensor = {};
		//window.io = io.connect();
		//io.on('data_arduino', function(data){
	        
	       // $scope.chart1.series[0].data.push(data.dato1);
	       // $scope.chart2.series[0].data.push(data.dato2);
	        //$scope.chart3.series[0].data.push(dato.dato3);
	       // $scope.chart4.series[0].data.push(dato.dato4);
	        
	       
	    //});
		socket.on('data_arduino', function (data) {
			$scope.chart1.series[0].data.push(parseFloat(data.dato1));
			$scope.sensor.stemp = parseFloat(data.dato1);
	        $scope.chart2.series[0].data.push(parseFloat(data.dato2));
			$scope.sensor.sph = parseFloat(data.dato2);
	        $scope.chart3.series[0].data.push(parseFloat(data.dato3));
	        $scope.sensor.sconduct = parseFloat(data.dato3);
	        $scope.chart4.series[0].data.push(parseFloat(data.dato4));
	        $scope.sensor.sdureza = parseFloat(data.dato4);
	        /*UmaEye.save({data: {stemp:1,sph:2,sconduc:3,sdureza:4}},function(data){
				console.log(data);
				
			});*/
			//$scope.uma = UmaEye.query();

			//Sensors.create($scope.pet)
			Sensors.create($scope.sensor)

				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					//$scope.loading = false;
					//$scope.formData = {}; // clear the form so our user is ready to enter another
					//$scope.todos = data; // assign our new list of todos
					//$location.path("/");
					console.log("data: "+data);
				});
		});

		/*$scope.saveData = function(){
			UmaEye.save({data: $scope.post},function(data){
				console.log(data);
				$location.path("/");
			});
		}*/

		$scope.DataPrueba = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				DataPrueba.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						//$scope.formData = {}; // clear the form so our user is ready to enter another
						//$scope.todos = data; // assign our new list of todos
					});
			}
		};

		$scope.addPoints1 = function () {
			$scope.chart1.series[0].data.push(5);
			//debugger;
	        //var seriesArray = $scope.chart1.series
	        //var rndIdx = Math.floor(Math.random() * seriesArray.length);
	        //var rndIdx = 3.0;
	        //seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
	    };

	    $scope.addPoints2 = function () {
			$scope.chart2.series[0].data.push(5);
			//debugger;
	        //var seriesArray = $scope.chart1.series
	        //var rndIdx = Math.floor(Math.random() * seriesArray.length);
	        //var rndIdx = 3.0;
	        //seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
	    };

	    $scope.addPoints3 = function () {
			$scope.chart3.series[0].data.push(5);
			//debugger;
	        //var seriesArray = $scope.chart1.series
	        //var rndIdx = Math.floor(Math.random() * seriesArray.length);
	        //var rndIdx = 3.0;
	        //seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
	    };

	    $scope.addPoints4 = function () {
			$scope.chart4.series[0].data.push(5);
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
	        $scope.chart3.series.push({
	            data: rnd
	        })
	        $scope.chart4.series.push({
	            data: rnd
	        })
	    };

	    $scope.removeRandomSeries = function () {
	        var seriesArray = $scope.chart1.series
	        var rndIdx = Math.floor(Math.random() * seriesArray.length);
	        seriesArray.splice(rndIdx, 1)

	        var seriesArray2 = $scope.chart2.series
	        var rndIdx2 = Math.floor(Math.random() * seriesArray2.length);
	        seriesArray2.splice(rndIdx2, 1)

	        var seriesArray3 = $scope.chart3.series
	        var rndIdx3 = Math.floor(Math.random() * seriesArray3.length);
	        seriesArray3.splice(rndIdx3, 1)

	        var seriesArray4 = $scope.chart4.series
	        var rndIdx4 = Math.floor(Math.random() * seriesArray4.length);
	        seriesArray4.splice(rndIdx4, 1)
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

	        if (this.chart3.options.chart.type === 'line') {
	            this.chart3.options.chart.type = 'bar'
	        } else {
	            this.chart3.options.chart.type = 'line'
	        }

	        if (this.chart4.options.chart.type === 'line') {
	            this.chart4.options.chart.type = 'bar'
	        } else {
	            this.chart4.options.chart.type = 'line'
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
	            text: 'Temperatura'
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
	            data: [10, 15, 12, 8, 7]
	        }],
	        title: {
	            text: 'PH'
	        },
	        loading: false
	    };


	    $scope.chart3 = {
	        options: {
	            chart: {
	                type: 'line'
	            }
	        },
	        series: [{
	            data: [10, 15, 12, 8, 7]
	        }],
	        title: {
	            text: 'CONDUCTIVIDAD'
	        },
	        loading: false
	    };

	    $scope.chart4 = {
	        options: {
	            chart: {
	                type: 'line'
	            }
	        },
	        series: [{
	            data: [10, 15, 12, 8, 7]
	        }],
	        title: {
	            text: 'DUREZA'
	        },
	        loading: false
	    };


	})

;