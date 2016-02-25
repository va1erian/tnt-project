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
            res.status(200).json({success: true});
        }
    });
};

exports.validateAccount = function (req, res) {

    res.render('index_connected', {title: "validateAccount"});
};

exports.connectUser = function (req, res) {
    var sess = req.session;
    var data = req.body;

    //data.password = crypto.encrypt(data.password);
    /*
     //Request the Ws with {email:"", password:""}
     request.post({
     url: "Ws url",
     form: {email: data.email, password: data.password}
     },
     function (error, resp, body) {
     if (error) {
     res.status(500).json({success: false, error: "Error when trying to authenticate the user"});
     }
     else if (resp.statusCode !== 200) {
     res.status(500).json({success: false, error: "Error when trying to authenticate the user"});
     }
     else {
     //Data retrieved from Ws
     try {
     var user = JSON.parse(body);
     sess.user = user;
     res.status(200).json(user);
     }
     catch (e) {
     res.status(500).json({success: false, error: "Error when trying to authenticate the user"});
     }
     }
     });

     */
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
    res.status(200).json();
};

exports.getLostPasswd = function (req, res) {
    res.render('lost_passwd', {title: "getLostPasswd"});
};

exports.setNewPasswd = function (req, res) {
    res.render('index_connected', {title: "setNewPasswd"});
};