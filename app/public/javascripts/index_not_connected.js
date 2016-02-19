/// Contrôleur permettant de gérer le comportement de la page d'accueil lorsque
/// l'utilisateur n'est pas connecté. Permet de contrôler la connexion ainsi que l'inscription.

var app = angular.module('tntApp', []);
app.controller('tntHomeCtrl', function($scope, $http)
{
	$scope.URL = "http://" + window.location.hostname + ":3000/tnt";

	$scope.errorMessage = "test";

	/// Wrapper contenant les informations du formulaire d'inscription.
	/*$scope.signup_form =
	{
		firstName: "",
		lastName: "",
		birthDate: "",
		gender: "", // GENRE : M ou F
		email: "",
		password: ""
	};*/

	$scope.signup_form =
	{
		firstName: "bastien",
		lastName: "guillon",
		birthDate: "18/01/1993",
		gender: "M", // GENRE : M ou F
		email: "bastien.guillon42@gmail.com",
		password: "fuckit"
	};

	$scope.signup_response =
	{
		success : true,
		errors : Array()
	};

	/*$scope.signup_password_confirmation = "";*/
	$scope.signup_password_confirmation = "fuckit";

	/// Wrapper contenant les informations du formulaire de connexion.
	$scope.signin_form = 
	{
		email: "",
		password: ""
	};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	/// Permet d'afficher ou de masquer le bouton de chargement dans le formulaire d'inscription,
	/// ainsi que de disable ou non le formulaire.
    $scope.loadSignup = function(loading)
    {
    	if(loading)
    	{
    		$("#signup_loading").show();
			$("#signup_send").hide();
			$("#signup_form input").prop("disabled", true);
    	}
    	else
    	{
    		$("#signup_loading").hide();
			$("#signup_send").show();
			$("#signup_form input").prop("disabled", false);
    	}
    }

	/// Méthode utilisée pour l'inscription
	$scope.signup = function()
	{
		if($scope.signup_form.firstName.length == 0)
		{
			$scope.addSignupAlert('Vous devez renseigner votre prénom.', 'alert-danger');
			return;
		}
		else if($scope.signup_form.lastName.length == 0)
		{
			$scope.addSignupAlert('Vous devez renseigner votre nom de famille.', 'alert-danger');
			return;
		}
		else if($scope.signup_form.birthDate.length == 0)
		{
			//TODO: vérifier format date de naissance
			$scope.addSignupAlert('Vous devez renseigner votre date de naissance.', 'alert-danger');
			return;
		}
		else if($scope.signup_form.gender.length == 0)
		{
			$scope.addSignupAlert('Vous devez renseigner votre sexe.', 'alert-danger');
			return;
		}
		else if($scope.signup_form.email.length == 0)
		{
			//TODO: vérifier format adresse e-mail
			$scope.addSignupAlert('Vous devez renseigner votre e-mail.', 'alert-danger');
			return;
		}
		else if($scope.signup_form.password.length == 0)
		{
			$scope.addSignupAlert('Vous devez renseigner votre mot de passe.', 'alert-danger');
			return;
		}
		else if($scope.signup_password_confirmation != $scope.signup_form.password)
		{
			$scope.addSignupAlert('Les deux mots de passe ne sont pas identiques', 'alert-danger');
			return;
		}
		else if($scope.signup_form.password.length < 6)
		{
			$scope.addSignupAlert('Le mot de passe est trop court, il doit être composé d\'au moins 6 caractères.', 'alert-danger');
			return;
		}
		else
		{
			$("#signup-alert").hide();
		}

		$scope.loadSignup(true);

		$http.post($scope.URL + "/signup", null, $scope.signup_form)
			.success(function(data, status, headers, config)
			{
			    if(data.success)
			    {
			    	$scope.addSignupAlert("Inscription réussie. Vous allez recevoir un e-mail de confirmation.", 'alert-success')
			    }
			    else
			    {
			    	$scope.addSignupAlert(data.errors.join(' | '), 'alert-danger');
			    }

			    $scope.loadSignup(false);
			})
			.error(function(data, status, headers, config)
			{
				$scope.addSignupAlert('Erreur ' + status + ', impossible de contacter le serveur. Essayez plus tard.', 'alert-danger');
				$scope.loadSignup(false);
			});
	}

	/// Méthode utilisée pour la connexion
	$scope.signin = function()
	{
		if($scope.signin_form.email.length == 0)
		{
			$scope.addSigninAlert("Vous devez renseigner votre adresse e-mail.", 'alert-danger');
			return;
		}
		else if($scope.signin_form.password.length == 0)
		{
			$scope.addSigninAlert("Vous devez renseigner votre mot-de-passe.", 'alert-danger');
			return;
		}
		else
		{
			$("#signin-alert").hide();
		}

		$http.post($scope.URL + "/signin", null, $scope.signin_form)
			.success(function(data, status, headers, config)
			{

			    if(data.success)
			    {
			    	// Rediriger l'utilisateur vers la page d'accueil connecté
			    	window.location.replace(URL);
			    }
			    else
			    {
			    	// Afficher les messages d'erreur
			    	$scope.addSignupAlert(data.error, 'alert-danger');
			    }

			    $scope.loadSignup(false);
			})
			.error(function(data, status, headers, config)
			{
				$scope.addSignupAlert('Erreur ' + status + ', impossible de contacter le serveur. Essayez plus tard.', 'alert-danger');
				$scope.loadSignup(false);
			});
	}

	$scope.addSignupAlert = function(message, type)
	{
		$('#signup-alert').show();
	    $('#signup-alert').html( 
	        '<div class="alert ' + type + ' fadein">' +
	            '<a href="#" class="close" data-dismiss="alert">' +
	            '&times;</a>' + message + '</div>');
	}

	$scope.addSigninAlert = function(message, type)
	{
		$('#signin-alert').show();
	    $('#signin-alert').html( 
	        '<div class="alert ' + type + ' fadein">' +
	            '<a href="#" class="close" data-dismiss="alert">' +
	            '&times;</a>' + message + '</div>');
	}
});