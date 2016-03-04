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

	/// E-mail du formulaire du mot de passe oublié
	$scope.lost_password_email = 
	{
		email: ""
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

		$http.post($scope.URL + "/signup", $scope.signup_form)
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

		// Clear le formulaire (éviter que l'utilisateur spam le bouton)
		$scope.signup_form = { firstName: "", lastName: "", birthDate: "", gender: "", email: "", password: "" };
		$scope.signup_password_confirmation = "";
	}

	/// Fonction permettant d'afficher/masquer le formulaire de mot de passe oublié
	$scope.displayLostPassword = function(display)
	{
		$("#signin-alert").hide();

		if(!display)
		{
			$('#signin-modal h4.modal-title').html("Connexion");
			$('#login_form').show();
			$('#forgotten_password_form').hide();
		}
		else
		{
			$('#signin-modal h4.modal-title').html("Mot de passé oublié");
			$('#login_form').hide();
			$('#forgotten_password_form').show();
		}
	}

	$scope.askLostPassword = function()
	{
		if($scope.lost_password_email.email.length == 0)
		{
			$scope.addSigninAlert("Vous devez renseigner votre mot de passe.", 'alert-danger');
			return;
		}
		else 
		{
			$("#signin-alert").hide();
		}

		// Envoi en Ajax
		
		$http.post($scope.URL + "/passwd/lost", $scope.lost_password_email)
			.success(function(data, status, headers, config)
			{
			    if(data.success)
			    {
			    	$scope.displayLostPassword(false);
					$scope.addSigninAlert("Un message expliquant comment réinitialiser le mot de passe a été envoyé à l'adresse <strong>" + $scope.lost_password_email + "</strong>.", 'alert-success');
					$scope.lost_password_email = "";
					$scope.loadSignup(false);
			    }
			    else
			    {
			    	$scope.displayLostPassword(false);
					$scope.addSigninAlert("L'adresse <strong>" + $scope.lost_password_email + "</strong> ne correspond à aucun utilisateur.", 'alert-danger');
			    }
			})
			.error(function(data, status, headers, config)
			{
				$scope.addSignupAlert('Erreur ' + status + ', impossible de contacter le serveur. Essayez plus tard.', 'alert-danger');
			});

		// Reception du message : l'e-mail est-il valide?

		// Si valide, afficher message indiquant que l'action a été effectuée
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

		// Affichage du composant de chargement
		$scope.loadSignup(true);

	    $http.post($scope.URL + "/signin", $scope.signin_form)
			.success(function(data, status, headers, config)
			{
			    // Si succès, redirection sur la page d'accueil connecté
			    if(data.success)
			    {
			    	location.reload();
			    }
			    // Si le serveur ne nous a pas envoyé de données
			    else if(typeof data.error === 'undefined')
			    {
			    	$scope.addSigninAlert("Une erreur inattendue est survenue.", 'alert-danger');
			    }
				// Sinon, afficher l'erreur
			    else
			    {
			    	$scope.addSigninAlert(data.error, 'alert-danger');
			    }

			    // Masquer le composant de chargement
			    $scope.loadSignup(false);
			})
			.error(function(data, status, headers, config)
			{
				$scope.addSigninAlert('Erreur ' + status + ', impossible de contacter le serveur. Essayez plus tard.', 'alert-danger');
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