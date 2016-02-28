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

    .factory('SaveDataPrueba', ['$http',function($http) {
        return {
            create : function(todoData) {
                return $http.post('/api/dataprueba', todoData);
		    }
	    }
    }]);
