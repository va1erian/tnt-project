var app = angular.module('tntApp', []);
app.controller('addressCtrl', function($scope, $http)
{
	$scope.URL = "http://" + window.location.hostname + ":3000/tnt";
	
    $scope.listAddresses = function() {
        var url = $scope.URL + '/address/all';
        $http.get(url)
            .success(function (data, status, headers, config) {
           	 	$scope.addressesList = data;
            })
            .error(function (data, status, headers, config)
            {
                $scope.errorMessage = "SUBMIT ERROR";
            });
    }

    $scope.listAddresses();

    $scope.checkAddress = function() {
        var url = $scope.URL + '/address/check';

        $http.get(url)
            .success(function (data, status, headers, config) {
                if(data.success) {
                    $scope.confirmedAddress = data;
                    $('#addr_validationBlock').fadeIn(200);
                    $('#addNewAddress input').prop('disabled', true);
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
        var url = $scope.URL + '/address/delete?idAddress='+id;

        $http.get(url)
            .success(function (data, status, headers, config) {
                if(data.success) {
                    $scope.listAddresses();
                }
                else {

                }
            })
            .error(function (data, status, headers, config)
            {
                $scope.errorMessage = "SUBMIT ERROR";
            });
    }

    $scope.addAddress = function(formattedAddress) {
        var url = $scope.URL + '/address/add?formattedAddress='+formattedAddress;

        $http.get(url)
            .success(function (data, status, headers, config) {
                if(data.success) {
                    $scope.listAddresses();
                    $('#addr_validationBlock').fadeOut(200, function() {
                        $scope.confirmedAddress = '';
                    });
                    $('#addNewAddress input').prop('disabled', false);
                }
                else {
                    
                }
            })
            .error(function (data, status, headers, config)
            {
                $scope.errorMessage = "SUBMIT ERROR";
            });
    }

    $scope.cancelAddress = function() {
        $('#addr_validationBlock').fadeOut(200, function() {
            $scope.confirmedAddress = '';
        });
        $('#addNewAddress input').prop('disabled', false);
    }


});