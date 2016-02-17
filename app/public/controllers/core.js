var app = angular.module('tntApp', []);
app.controller('tntCtrl', function($scope)
{
	$scope.displayLoadingAnimation = false;
	$scope.signup_form =
	{
		name: "",
		email: "",
		password: ""
	};

	$scope.signup = function()
	{
		// Regarder ce qu'il y a dans signup_form
		alert($scope.signup_form.name + " " +
		      $scope.signup_form.email + " " +
		      $scope.signup_form.password);

		$scope.displayLoadingAnimation = true;

		// Ajax

		$scope.displayLoadingAnimation = false;
	}
});