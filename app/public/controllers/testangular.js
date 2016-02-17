var app = angular.module('tntApp', []);
app.controller('tntCtrl', function($scope, $http)
{
	$scope.URL = "http://" + window.location.hostname + ":3000/tnt";

	var url = $scope.URL + '/test';
	
	var config;

    config = {
        params: {

        }
    }; 
    $http.get(url, null, config)
        .success(function (data, status, headers, config) {
       	 	$("#toto").html(data);
        })
        .error(function (data, status, headers, config)
        {
            $scope.errorMessage = "SUBMIT ERROR";
        });


});