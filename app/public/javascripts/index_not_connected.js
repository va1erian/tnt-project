/// Contrôleur permettant de gérer le comportement de la page d'accueil lorsque
/// l'utilisateur n'est pas connecté. Permet de contrôler la connexion ainsi que l'inscription.

var app = angular.module('tntApp', []);
app.controller('tntHomeCtrl', function($scope)
{
	$scope.displayLoadingAnimation = false;
	/// Wrapper contenant les informations du formulaire d'inscription.
	$scope.signup_form =
	{
		firstname: "",
		lastname: "",
		birthdate: "",
		gender: "rofl",
		email: "",
		password: ""
	};

	/// Wrapper contenant les informations du formulaire de connexion.
	$scope.signin_form = 
	{
		email: "",
		password: ""
	};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	/// Méthode utilisée pour l'inscription
	$scope.signup = function()
	{
		// Regarder ce qu'il y a dans signup_form
		alert($scope.signup_form.firstname + " " +
			  $scope.signup_form.lastname + " " +
			  $scope.signup_form.birthdate + " " +
			  $scope.signup_form.gender + " " + 
		      $scope.signup_form.email + " " +
		      $scope.signup_form.password);

		// GENRE : M ou F


		$scope.displayLoadingAnimation = true;

		//TODO: Ajax

		$scope.displayLoadingAnimation = false;
	}

	/// Méthode utilisée pour la connexion
	$scope.signin = function()
	{
		alert($scope.signin_form.email + " " +
			  $scope.signin_form.password);

		//TODO: Ajax
	}
});