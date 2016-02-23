angular.module("FinalApp",["lumx","ngRoute","ngResource","ngTouch","highcharts-ng"])
.config(function($routeProvider){
	$routeProvider
		.when("/", {
			controller: "myctrl",
			templateUrl: "templates/home.html"
		})
		.when("/bd", {
			controller: "BdController",
			templateUrl: "templates/bd.html"
		})
		.when("/qr", {
			controller: "QrController",
			templateUrl: "templates/qr.html"
		})
		
		.when("/rd", {
			controller: "UsersController",
			templateUrl: "templates/rd.html"
		})
		/*
		.when("/maps/:id", {
			controller: "MapsController",
			templateUrl: "templates/maps.html"
		})
		.when("/pet/:id",{
			controller: "PetController",
			templateUrl: "templates/post.html"
		})
		.when("/pets/new",{
			controller: "NewPetController",
			templateUrl: "templates/pet_form.html"
		})
		.when("/pets/edit/:id",{
			controller: "PetController",
			templateUrl: "templates/pet_form.html"
		})*/
});