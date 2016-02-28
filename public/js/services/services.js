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
            addData : function(api_key,location,timestamp,locationXYZ,temperature,steps,heart,food) {
                //debugger;
                var params_data = {
                    "group": ">hackathon>arduino5",
                    "name": "Pet",
                    "serialNumber": "c1",
                    "thingTypeCode": "gps",
                    "udfs": {
                        "location": {
                            //"value": "-68.084831;-16.541728;0.0"
                            "value": location
                        },
                        "timestamp": {
                            //"value": "346543"
                            "value": timestamp
                        },
                        "locationXYZ": {
                            //"value": "6"
                            "value": locationXYZ
                        },
                        "temperature": {
                            //"value": "71"
                            "value": temperature
                        },
                        "steps": 		{
                            //"value": "71"
                            "value": steps
                        },
                        "heart": 		{
                            //"value": "71"
                            "value": heart
                        },
                        "food": 		{
                            //"value": "71"
                            "value": food
                        }
                    }
                };


                var http = $http({
                    method: 'PATCH',
                    url: '//vizix.hackiot.com:8080/riot-core-services/api/thing/89',
                    headers: {
                        Api_key: 'root'
                        //Api_key: api_key
                    },

                    data: params_data });
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
