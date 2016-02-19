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
			//TODO: vérifier format date de naissance
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
			//TODO: vérifier format adresse e-mail
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

		$scope.loadSignup(true);

		// Envoyer une requête ajax en post vers /tnt/signup avec
		alert($scope.URL + "/signup");
		$http.post($scope.URL + "/signup", null, $scope.signup_form)
			.success(function(data, status, headers, config)
			{
			    if(data.success)
			    {
			    	// Afficher un message de succès
			    }
			    else
			    {
			    	// Afficher les messages d'erreur
			    	addSignupAlert(data.errors.join(' | '));
			    }

			    $scope.loadSignup(false);
			})
			.error(function(data, status, headers, config)
			{
				console.log("DATA\n" + data);
				console.log("STATUS\n" + status);
				console.log("HEADERS\n" + headers);
				console.log("CONFIG\n" + config);

				$scope.addSignupAlert('Erreur ' + status + ', impossible de contacter le serveur. Essayez plus tard.');

			    // Afficher les messages d'erreurs
				 $scope.loadSignup(false);
			});
			 

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
		$('#signup-alert').show();
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