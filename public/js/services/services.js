angular.module("FinalApp")

    .factory("PostResource", function($resource){
        return $resource("http://jsonplaceholder.typicode.com/posts/:id",{id:"@id"},{update: {method: "PUT"}});
    })

    .factory('Socket', function ($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    })

    .factory('Sensors', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/sensors');
            },
            getId : function(id) {
                return $http.get('/sensor/'+id);
            },
            update : function(id) {
                return $http.put('/sensor/'+id);
            },
            create : function(sensor) {
                return $http.post('/sensor', sensor);
            },
            delete : function(id) {
                return $http.delete('/sensor/' + id);
            }
        }
    }])


    .factory('Riot', ['$http',function($http) {

        return {
            login : function(user) {

                var params_login = {
                    /*"username": "arduino5",
                     "password": "bth101"*/

                    "username": user.username,
                    "password": user.password
                };

                var http = $http({
                    method: 'POST',
                    url: 'http://vizix.hackiot.com:8080/riot-core-services/api/user/login',
                    data: params_login });
                return http;

                //return $http.post('http://vizix.hackiot.com:8080/riot-core-services/api/user/login',{username:"arduino",password:"bth101"});
            },
            addData : function(temperature, heart) {
                //debugger;
                /*var params_data = {
                    "group": ">hackathon>arduino5",
                    "name": "Pet",
                    "serialNumber": "c1",
                    "thingTypeCode": "gps",
                    "udfs": {
                        "temperature": {
                            //"value": "71"
                            "value": temperature
                        },
                        "heart": 		{
                            //"value": "71"
                            "value": heart
                        }
                    }
                };*/

                var params_data = [

                    {
                        "fieldValues":{"frequency.value":heart, "temperature.value":temperature},
                        "whereThing":"serialNumber=S00001",
                        "returnThings":true
                    }
                    /*,
                    {
                        "fieldValues":{"frequency.value":"65", "temperature.value":"65"},
                        "whereThing":"serialNumber=S0002",
                        "returnThings":true
                    }*/
                ];


                var http = $http({
                    method: 'POST',
                    //url: '//vizix.hackiot.com:8080/riot-core-services/api/thing/89',
                    url: 'http://hackiot.com:8080/riot-core-services/api/things/',
                    headers: {
                        'Api_key': 'root',
                        'Content-Type': 'application/json',
                        'Authorization' : 'application/json'
                        //Api_key: api_key
                    },
                    data: params_data
                });

                return http;

                //return $http.post('http://vizix.hackiot.com:8080/riot-core-services/api/user/login',{username:"arduino",password:"bth101"});
            }

        }
    }])

    .factory('SaveDataPrueba', ['$http',function($http) {
        return {
            create : function(todoData) {
                return $http.post('/api/dataprueba', todoData);
		    }
	    }
    }]);
