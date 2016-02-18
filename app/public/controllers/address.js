var app = angular.module('tntApp', []);
app.controller('addressCtrl', function($scope, $http)
{
	$scope.URL = "http://" + window.location.hostname + ":3000/tnt";

	var url = $scope.URL + '/address/all';
	
    $http.get(url)
        .success(function (data, status, headers, config) {
       	 	$scope.addressesList = data;
        })
        .error(function (data, status, headers, config)
        {
            $scope.errorMessage = "SUBMIT ERROR";
        });


    $scope.checkAddress = function() {
        var url = $scope.URL + '/address/check';

        $http.get(url)
            .success(function (data, status, headers, config) {
                if(data.success) {
                    $scope.confirmedAddress = data;
                    $('#validateAddress').show();
                }
                else {

                }
            })
            .error(function (data, status, headers, config)
            {
                $scope.errorMessage = "SUBMIT ERROR";
            });
    }

    $scope.deleteAddress = function(id) {
        var url = $scope.URL + '/address/delete?'+id;

        $http.get(url)
            .success(function (data, status, headers, config) {
                $scope.addressesList = data;
            })
            .error(function (data, status, headers, config)
            {
                $scope.errorMessage = "SUBMIT ERROR";
            });
    }


});