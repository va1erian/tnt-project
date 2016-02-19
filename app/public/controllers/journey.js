var app = angular.module('tntApp', []);
app.controller('addressCtrl', function($scope, $http)
{
	$scope.URL = "http://" + window.location.hostname + ":3000/tnt";


});