/// Contrôleur permettant de gérer le comportement de la page d'accueil lorsque
/// l'utilisateur n'est pas connecté. Permet de contrôler la connexion ainsi que l'inscription.

var app = angular.module('tntApp', []);
app.controller('tntHomeCtrl', function($scope)
{
	$scope.displayLoadingAnimation = false;

	$scope.errorMessage = "test";

	/// Wrapper contenant les informations du formulaire d'inscription.
	$scope.signup_form =
	{
		firstName: "",
		lastName: "",
		birthDate: "",
		gender: "", // GENRE : M ou F
		email: "",
		password: ""
	};

	$scope.signup_response =
	{
		success : true,
		errors : Array()
	};

	$scope.signup_password_confirmation = "";

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
		if($scope.signup_form.firstName.length == 0)
		{
			$scope.addSignupAlert('Vous devez renseigner votre prénom.');
			return;
		}
		else if($scope.signup_form.lastName.length == 0)
		{
			$scope.addSignupAlert('Vous devez renseigner votre nom de famille.');
			return;
		}
		else if($scope.signup_form.birthDate.length == 0)
		{
			//TODO: vérifier format
			$scope.addSignupAlert('Vous devez renseigner votre date de naissance.');
			return;
		}
		else if($scope.signup_form.gender.length == 0)
		{
			$scope.addSignupAlert('Vous devez renseigner votre sexe.');
			return;
		}
		else if($scope.signup_form.email.length == 0)
		{
			$scope.addSignupAlert('Vous devez renseigner votre e-mail.');
			return;
		}
		else if($scope.signup_form.password.length == 0)
		{
			$scope.addSignupAlert('Vous devez renseigner votre mot de passe.');
			return;
		}
		else if($scope.signup_password_confirmation != $scope.signup_form.password)
		{
			$scope.addSignupAlert('Les deux mots de passe ne sont pas identiques');
			return;
		}
		else if($scope.signup_form.password.length < 6)
		{
			$scope.addSignupAlert('Le mot de passe est trop court, il doit être composé d\'au moins 6 caractères.');
			return;
		}
		else
		{
			$("#signup-alert").hide();
		}

		/*alert($scope.signup_form.firstName + " " +
			  $scope.signup_form.lastName + " " +
			  $scope.signup_form.birthDate + " " +
			  $scope.signup_form.gender + " " + 
		      $scope.signup_form.email + " " +
		      $scope.signup_form.password);*/

		$scope.displayLoadingAnimation = true;

		//TODO: Ajax
		// Envoyer une requête ajax en post vers /tnt/signup avec

		$scope.displayLoadingAnimation = false;
	}

	/// Méthode utilisée pour la connexion
	$scope.signin = function()
	{
		if($scope.signin_form.email.length == 0)
		{
			$scope.addSigninAlert("Vous devez renseigner votre adresse e-mail.");
			return;
		}
		else if($scope.signin_form.password.length == 0)
		{
			$scope.addSigninAlert("Vous devez renseigner votre mot-de-passe.");
			return;
		}
		else
		{
			$("#signin-alert").hide();
		}

		alert($scope.signin_form.email + " " +
			  $scope.signin_form.password);

		//TODO: Ajax
	}

	$scope.addSignupAlert = function(message)
	{
	    $('#signup-alert').html( 
	        '<div class="alert alert-danger fadein">' +
	            '<a href="#" class="close" data-dismiss="alert">' +
	            '&times;</a>' + message + '</div>');
	}

	$scope.addSigninAlert = function(message)
	{
	    $('#signin-alert').html( 
	        '<div class="alert alert-danger fadein">' +
	            '<a href="#" class="close" data-dismiss="alert">' +
	            '&times;</a>' + message + '</div>');
	}
});