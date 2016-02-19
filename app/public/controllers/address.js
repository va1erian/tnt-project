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

        $http.post(url)
            .success(function (data, status, headers, config) {
                if(data.success) {
                    $scope.foundAddresses = data.addresses;
                    $('#addr_validationBlock_list').fadeIn(200);
                    $('#addNewAddress input').prop('disabled', true);
                    $('#addr_prevalidation').prop('disabled', true);
                }
                else {

                }
            })
            .error(function (data, status, headers, config)
            {
                $scope.errorMessage = "SUBMIT ERROR";
            });
    }

    $scope.confirmAddress = function(addr) {
        $scope.confirmedAddress = addr;
        $('#addr_validationBlock_list').fadeOut(200, function() {
            $('#addr_validationBlock_map').fadeIn(200);
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
        var url = $scope.URL + '/address/add';

        $http.post(url)
            .success(function (data, status, headers, config) {
                if(data.success) {
                    $scope.listAddresses();
                    $('#addr_validationBlock_map').fadeOut(200, function() {
                        $scope.confirmedAddress = '';
                    });
                    $('#addNewAddress input').prop('disabled', false);
                    $('#addr_prevalidation').prop('disabled', false);
                }
                else {
                    
                }
            })
            .error(function (data, status, headers, config)
            {
                $scope.errorMessage = "SUBMIT ERROR";
            });
    }

    $scope.cancelFoundAddresses = function() {
        $('#addr_validationBlock_list').fadeOut(200, function() {
            $scope.foundAddresses = '';
            $scope.confirmedAddress = '';
        });
        $('#addNewAddress input').prop('disabled', false);
        $('#addr_prevalidation').prop('disabled', false);
    }

    $scope.cancelAddress = function() {
        $('#addr_validationBlock_map').fadeOut(200, function() {
            $('#addr_validationBlock_list').fadeIn(200);
            $scope.confirmedAddress = '';
        });
    }

});