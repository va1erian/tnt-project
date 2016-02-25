var logger = require('../../log/logger');
var wsRequest = require('../../utils/wsRequest');

exports.getProfilInformation = function(req, res) {
	var sess = req.session;
	/*
	 wsRequest.get(global.config.ws.getUserProfile, { idUser : sess.user.userId }, 
		function(error, response, body) {
			if (error) {
				logger.error('\t ' + error);
				res.render('profil', {title : 'Profil', error : "Error when trying to get the user's information"});
			} 
			else if (response.statusCode !== 200) {
				logger.error("\t Error when trying to get user's information from WS. status code : " + response.statusCode);
				res.render('profil', {title : 'Profil', error : "Error when trying to get the user's information"});
			} 
			else {
				//Data retrieved from Ws
				try {
					var user = JSON.parse(body);
					sess.user = user;
					var tmp = {
						firstName :	user.firstName,
						lastName : 	user.lastName,
						birthDate : user.birthDate,
						gender : 	user.gender,
						email : 	user.email
					}; 
					res.render('profil', {title : 'Profil', user : tmp});
				} catch (e) {
					logger.error("\t Exception when trying to parse user data. Exception : " + e);
					res.render('profil', {title : 'Profil', error : "Error when trying to get the user's information"});
				}
			}
		}
	);
	*/

	var user = {
        firstName: "Yazid",
        lastName: "Bousetta",
        birthDate: "01/01/2020",
        gender: "M",
        email: "yazid@gmail.com",
        userId: "63"
    };
    sess.user = user;
    res.render('profil', {title : 'Profil', user : user});
};

exports.setProfilInformation = function(req, res) {
	var sess = req.session;
	var data = req.body;
	data.idUser = sess.user.userId;
	/*
	wsRequest.post(global.config.ws.updateUserProfile, {updateUser : data},
		function(error, response, body) {
			if (error) {
				logger.error('\t ' + error);
				res.status(200).json({success: false, error : "Error when trying to update the user's information"});
			} 
			else if (response.statusCode !== 200) {
				logger.error("\t Error when trying to update user's information from WS. status code : " + response.statusCode);
				res.status(200).json({success: false, error : "Error when trying to update the user's information"});
			} 
			else {
				//Data retrieved from Ws
				try {
					var output = JSON.parse(body);
					if(output.result === 1) {
						res.status(200).json({success: true});
					}
					else {
						logger.error('\t the user was not found in DB. user : ' + JSON.stringify(data));
						res.status(200).json({success: false, error : "Error when trying to update the user's information"});
					}
				} catch (e) {
					logger.error("\t Exception when trying to parse the WS' response data. Exception : " + e);
					res.status(200).json({success: false, error : "Error when trying to update the user's information"});
				}
			}
		}
	);
	*/
	res.status(200).json({success: true});
}; 