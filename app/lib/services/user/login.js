var request = require('request');

var logger 		= require('../../log/logger');
var validator 	= require('../../utils/validator');
var crypto 		= require('../../utils/crypto');

exports.index = function (req, res) {
    var session = req.session;
    if (session.user === undefined) {
        res.render('index_not_connected', {title: "indexNotConnected"});
    } else {
        res.render('index_connected', {title: "indexConnected", user: session.user});
    }
};

exports.createUser = function (req, res) {

    var data = req.body;
    logger.trace(data);
    validator.validateUser(data, function (errors) {
        if (errors) {
            res.status(200).json({success: false, errors: errors});
        }
        else {
            logger.debug('Encrypting the password');
            data.password = crypto.encrypt(data.password);
            // TO DO : Request the ws for user creation
            /*wsRequest.post( global.config.ws.createUser, data, function(err, resp, body) {
            	if(err) {
            		logger.error(err);
            		res.status(200).json({success: false, errors: ["Une erreur s'est produite lors de la creation d'un utilisateur"]});
            	}
            	else if(resp.statusCode !== 200) {
            		logger.error('Error when trying to create the user. status code : ' + resp.statusCode);
            		res.status(200).json({success: false, errors: ["Une erreur s'est produite lors de la creation d'un utilisateur"]});
            	}
            	else {
            		try {
            			var output = JSON.parse(body);
            			if(output.result === 0) {
            				res.status(200).json({success: false, errors: ["L'utilisateur existe déja"]});
						}
            			else if(output.result === 1) {
            				res.status(200).json({success: true});
            			}
            			else if(output.result === 2) {
            				res.status(200).json({success: false, errors: ["L'utilisateur existe mais l'inscription n'a pas encore été confirmée"]});
            			}
            			else {
            				logger.error('Unexpected result value when trying to create a user. result : ' + output.result);
            				res.status(200).json({success: false, errors: ["Une erreur s'est produite lors de la creation d'un utilisateur"]});
            			}
            		}
            		catch(e) {
            			logger.error('Exception : ' + e);
            			res.status(200).json({success: false, errors: ["Une erreur s'est produite lors de la creation d'un utilisateur"]});
            		}
            	}
            });*/
            res.status(200).json({success: true});
        }
    });
};

exports.validateAccount = function (req, res) {
	
	// Getting the email and idUser from the encrypted string gotten as a GET parameter
	var data = null; // decrypt(req.params.encryptedString)
	
	/*wsRequest.post(global.config.ws.validateEmail, data, function(error, response, body) {
		if(error) {
			logger.error(error);
			res.render('signup_validation', {title: "signup_validation", msg: 'Erreur lors de la validation de votre compte'});
		}
		else if(response.statusCode !== 200) {
			logger.error('Error when trying to validate the user account. status code : ' + response.statusCode);
			res.render('signup_validation', {title: "signup_validation", msg: 'Erreur lors de la validation de votre compte'});
		}
		else {
			var output = JSON.parse(body);
			if(output.result === 0) {
				res.render('signup_validation', {title: "signup_validation", msg: 'Votre compte a déja été validé'});
			}
			else if(output.result === 1) {
				res.render('signup_validation', {title: "signup_validation", msg: 'Votre compte a été validé avec succès'});
			}
			else {
				logger.error('Unexpected result value when trying to create a user. result : ' + output.result);
				res.render('signup_validation', {title: "signup_validation", msg: "Une erreur s'est produite lors de la validation de votre compte"});
			}
		}
	});*/
    res.render('signup_validation', {title: "signup_validation", msg: "Validation en construction"});
};

exports.connectUser = function (req, res) {
    
	var sess = req.session;
	var data = req.body;
	data.password = crypto.encrypt(data.password);

	var formData = {
		email : data.email,
		password : data.password
	};
	
	/*validator.validateUserSignIn( data, function(errorValidator) {
		if(errorValidator) {
			res.status(200).json({ success : false, error : errorValidator });
		}
		else {
			wsRequest.post( global.config.ws.authentificate, formData, function(error, resp, body) {
				if (error) {
					logger.error(error);
					res.status(200).json({ success : false, error : "Une erreur s'est produit lors de la connexion de l'utilisateur" });
				} else if (resp.statusCode !== 200) {
					logger.error('Error when trying to connect the user. status code : ' + resp.statusCode);
					res.status(200).json({ success : false, error : "Une erreur s'est produit lors de la connexion de l'utilisateur" });
				} else {
					//Data retrieved from Ws
					try {
						var user = JSON.parse(body);
						sess.user = user;
						res.status(200).json({ success : true});
					} catch (e) {
						logger.error('Unexpected output value when trying to connect the user. Exception : ' + e);
						res.status(200).json({ success : false, error : "Une erreur s'est produit lors de la connexion de l'utilisateur" });
					}
				}
			});
		}
	});*/

	 

     
    var user =
    {
        firstName: "Yazid",
        lastName: "Bousetta",
        birthDate: "01/01/2020",
        gender: "M",
        email: "yazid@gmail.com",
        idUser: "63"
    };
    sess.user = user;
    res.status(200).json({ success : true});
};

exports.getLostPasswd = function (req, res) {
	var data = req.body;
	
	/*wsRequest.get(global.config.ws.resetPassword, {email: data.email}, function(error, resp, body) {
		if (error) {
			logger.error(error);
			res.status(200).json({ success : false, msg : "Une erreur s'est produit lors de la reinitialisation du mot de passe" });
		} else if (resp.statusCode !== 200) {
			logger.error('Error when trying to reset the password. status code : ' + resp.statusCode);
			res.status(200).json({ success : false, msg : "Une erreur s'est produit lors de la reinitialisation du mot de passe" });
		} else {
			//Data retrieved from Ws
			try {
				var output = JSON.parse(body);
				if(output.result === 0) {
					res.status(200).json({ success : false, msg : "L'utilisateur n'existe pas" });
				}
				else if(output.result === 1) {
					res.status(200).json({ success : true, msg : "Un mot de passe temporaire vous a été envoyé par mail" });
				}
				else {
					logger.error('Unexpected result value when trying to reset the password result : ' + output.result);
					res.status(200).json({ success : false, msg : "Une erreur s'est produit lors de la reinitialisation du mot de passe" });
				}
			} catch (e) {
				logger.error('Unexpected output value when trying to reset the password. Exception : ' + e);
				res.status(200).json({ success : false, msg : "Une erreur s'est produit lors de la reinitialisation du mot de passe" });
			}
		}
	});*/
    res.status(200).json({ success : true, msg : "Mot de passe perdu : en construction" });
};

exports.setNewPasswd = function (req, res) {
    var data = req.body;
	
	data.idUser = req.session.user.idUser;
	data.oldPassword = crypto.encrypt(data.oldPassword);
	data.newPassword = crypto.encrypt(data.newPassword);
	
	/*wsRequest.get(global.config.ws.updatePassword, data, function(error, resp, body) {
		if (error) {
			logger.error(error);
			res.status(200).json({ success : false, error : "Une erreur s'est produit lors de la mise à jour du mot de passe" });
		} else if (resp.statusCode !== 200) {
			logger.error('Error when trying to update the password. status code : ' + resp.statusCode);
			res.status(200).json({ success : false, error : "Une erreur s'est produit lors de la mise à jour du mot de passe" });
		} else {
			//Data retrieved from Ws
			try {
				var output = JSON.parse(body);
				if(output.result === 0) {
					res.status(200).json({ success : false, error : "Ancien mot de passe incorrecte" });
				}
				else if(output.result === 1) {
					res.status(200).json({ success : true});
				}
				else {
					logger.error('Unexpected result value when trying to update the password. result : ' + output.result);
					res.status(200).json({ success : false, error : "Une erreur s'est produit lors de la mise à jour du mot de passe" });
				}
			} catch (e) {
				logger.error('Unexpected output value when trying to update the password. Exception : ' + e);
				res.status(200).json({ success : false, error : "Une erreur s'est produit lors de la mise à jour du mot de passe" });
			}
		}
	});*/
	
    res.status(200).json({ success : true});
};