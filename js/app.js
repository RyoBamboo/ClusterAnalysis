angular.module('App', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'index-tmpl',
		controller: 'HomeController'
	})
	.otherwise({ 
		redirectTo: '/'
	});
}])
.controller('HomeController', [function HomeController() {
}]);

