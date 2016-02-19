/// update_profile.js

var app = angular.module('tntApp', []);
app.controller('tntUpdateProfileCtrl', function($scope, $http)
{
	//TODO: remplir le profile avec les infos de la session
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

		alert("Not implemented");
		
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
			$scope.addPasswordAlert("Le nouveau mot de passe et la confirmation du nouveau mot de passe sont différentes.", "alert-danger")
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