angular.module("FinalApp")
    .controller("BdController", function($scope,Sensors){
        $scope.sensors = {};

         // query() -> GET/posts -> Un arreglo de posts -> isArray: true
        Sensors.get()
            .success(function(data) {
                $scope.sensors = data;
                //$scope.loading = false;
            });
    })
