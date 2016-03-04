/// update_profile.js

var app = angular.module('tntApp', []);
app.controller('tntUpdateProfileCtrl', function($scope, $http)
{
	$scope.URL = window.location;

	// Ces champs sont remplis dans  profil.jade à partir de
	// la variable session.user (donc côté serveur)
	$scope.profileInfo =
	{
		firstName: "",
    	lastName: "",
    	birthDate:  "",
    	gender: "",
    	email: ""
    }

	$scope.updateProfile = function()
	{
		if($scope.profileInfo.firstName.length == 0)
		{
			$scope.addProfileAlert('Vous devez renseigner votre prénom.', 'alert-danger');
			return;
		}
		else if($scope.profileInfo.lastName.length == 0)
		{
			$scope.addProfileAlert('Vous devez renseigner votre nom de famille.', 'alert-danger');
			return;
		}
		else if($scope.profileInfo.birthDate.length == 0)
		{
			//TODO: vérifier format date de naissance 
			$scope.addProfileAlert('Vous devez renseigner votre date de naissance.', 'alert-danger');
			return;
		}
		else if($scope.profileInfo.gender.length == 0)
		{
			$scope.addProfileAlert('Vous devez renseigner votre sexe.', 'alert-danger');
			return;
		}
		else if($scope.profileInfo.email.length == 0)
		{
			$scope.addProfileAlert('Vous devez renseigner votre e-mail.', 'alert-danger');
			return;
		}
		else
		{
			$("#signup-alert").hide();
		}

		$scope.loadProfile(true);

		$http.post($scope.URL, $scope.profileInfo)
			.success(function(data, status, headers, config)
			{
			    // Si succès, afficher un message pour dire que tout est okay
			    if(data.success)
			    {
			    	$scope.addProfileAlert("Votre profil a été mis à jour", 'alert-success');
			    }
			    // Si le serveur ne nous a pas envoyé de données
			    else if(typeof data.errors === 'undefined')
			    {
			    	$scope.addProfileAlert("Une erreur inattendue est survenue.", 'alert-danger');
			    }
				// Sinon, afficher l'erreur
			    else	
			    {
			    	$scope.addProfileAlert(data.errors, 'alert-danger');
			    }

			    // Masquer le composant de chargement
			    $scope.loadProfile(false);
			})
			.error(function(data, status, headers, config)
			{
				$scope.addProfileAlert('Erreur ' + status + ', impossible de contacter le serveur. Essayez plus tard.', 'alert-danger');
				$scope.loadProfile(false);
			});
	}

	// // // // //

	$scope.passwords = {  oldPassword: "", newPassword : ""  }
	$scope.newPassword_confirmation = "";

	/// Demande de maj du mdp
	$scope.updatePassword = function()
	{
		if($scope.passwords.oldPassword.length == 0)
		{
			$scope.addPasswordAlert("Vous devez spécifier votre ancien mot de passe.", "alert-danger")
			return;
		}
		else if($scope.passwords.newPassword.length == 0)
		{
			$scope.addPasswordAlert("Vous devez spécifier votre nouveau mot de passe.", "alert-danger")
			return;
		}
		else if($scope.newPassword_confirmation != $scope.passwords.newPassword)
		{
			$scope.addPasswordAlert("Le nouveau mot de passe et la confirmation du nouveau mot de passe sont différents.", "alert-danger")
			return;
		}
		else if($scope.passwords.newPassword.length < 6)
		{
			$scope.addPasswordAlert("Votre mot de passe doit être composé d'au moins 6 caractères.", "alert-danger")
			return;
		}
		else
		{
			$('#password-alert').hide();
		}

		// Ajax

		alert("Not implemented");
	}

	$scope.loadProfile = function(loading)
    {
    	if(loading)
    	{
    		$("#update_profile_loading").show();
			$("#profile_send").hide();
			$("#profile_form input").prop("disabled", true);
    	}
    	else
    	{
    		$("#update_profile_loading").hide();
			$("#profile_send").show();
			$("#profile_form input").prop("disabled", false);
    	}
    }

	$scope.addProfileAlert = function(message, type)
	{
		$('#profile-alert').show();
	    $('#profile-alert').html( 
	        '<div class="alert ' + type + ' fadein">' +
	            '<a href="#" class="close" data-dismiss="alert">' +
	            '&times;</a>' + message + '</div>');
	}

	$scope.addPasswordAlert = function(message, type)
	{
		$('#password-alert').show();
	    $('#password-alert').html( 
	        '<div class="alert ' + type + ' fadein">' +
	            '<a href="#" class="close" data-dismiss="alert">' +
	            '&times;</a>' + message + '</div>');
	}
});