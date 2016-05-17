var logger = require('../../log/logger');
var request = require('request');
var wsRequest = require('../../utils/wsRequest');

exports.renderAddress = function (req, res) {
    // redirect to the adresses view
    // For the addresses list, when the view is completely charged, an ajax script will invoke
    // the server to get the adresses list
    res.render('address', {title: "Adresses"});
};

exports.checkAddress = function (req, res) {

    // request WS to check the address set and return the formatted address. The json by the returned : {success, formattedAddress, gps}
    // return the same json as the ws's, saves the country, pc, city in the session for the add
    /* OUTPUT:
     "{data :  [
     {  idAddress:
     formattedAddress : ""Résidence ... FRANCE"",
     gpsLatitude : 12.2,
     gpsLongitude : 14.5
     }, ...]}"
     */
   /* var data = req.body;
    wsRequest.post(global.config.ws.checkAddress, data.new_address, function (error, resp, body) {
        if (error) {
            logger.error('\t ' + error);
            res.status(500).json({success: false, error: "Error while checking the address"});
        }
        else if (resp.statusCode !== 200) {
            res.status(500).json({success: false, error: "Error while checking the address"});
        }
        else {
            //Data retrieved from Ws
            try {
                req.session.addrUser = {postalCode: data.postalCode, city: data.city, country: data.country};
                var addressList = JSON.parse(body).data;
                res.status(200).json(addressList);
            }
            catch (e) {
                res.status(500).json({success: false, error: "Error while checking the address"});
            }
        }
    });*/

// If error : {success:false, error: '',}
    res.status(200).json({
        success: true,
        addresses:[
            {formattedAddress: "7 Avenue Carnot, Massy, 91300",
            gps: {gpsLatitude: 48.725912, gpsLongitude: 2.261339}},
            {formattedAddress: "2591 N High St, Columbus, OH 43202, United States",
            gps: {gpsLatitude: 40.015124, gpsLongitude: -83.011842}}
        ]
    });
};

exports.addAddress = function (req, res) {
    /*var data = req.body;
    var postData = {
        idUser: req.session.user.idUser,
        name: data.name,
        addrUser: {
            formattedAddress: data.formattedAddress,
            gpsLatitude: data.gpsLatitude,
            gpsLongitude: data.gpsLongitude,
            postalCode: req.session.addrUser.postalCode,
            city: req.session.addrUser.city,
            country: req.session.addrUser.country
        }
    };
    wsRequest.post(global.config.ws.addAddress, postData, function (error, resp, body) {
        if (error) {
            logger.error('\t ' + error);
            res.status(500).json({success: false, error: "Error while adding the address"});
        }
        else if (resp.statusCode !== 200) {
            res.status(500).json({success: false, error: "Error while adding the address"});
        }
        else {
            //Data retrieved from Ws
            try {
                var result = JSON.parse(body).result;
                res.status(200).json({success: (result === 1) ? true : false, error: ""});
            }
            catch (e) {
                res.status(500).json({success: false, error: "Error while adding the address"});
            }
        }
    });*/
    res.status(200).json({success: true});
};

exports.deleteAddress = function (req, res) {
    /*
    var data = {idUser: req.session.user.idUser, idAddress: req.query.idAddress};
    wsRequest.post(global.config.ws.deleteAddress, data, function (error, resp, body) {
        if (error) {
            logger.error('\t ' + error);
            res.status(500).json({success: false, error: "Error while deleting the address"});
        }
        else if (resp.statusCode !== 200) {
            res.status(500).json({success: false, error: "Error while deleting the address"});
        }
        else {
            //Data retrieved from Ws
            try {
                var result = JSON.parse(body).result;
                res.status(200).json({success: (result === 1) ? true : false, error: ""});
            }
            catch (e) {
                res.status(500).json({success: false, error: "Error while deleting the address"});
            }
        }
    });*/
    res.status(200).json({success: true});
};

exports.getListAddresses = function (req, res) {
/*
    var paramsJs = req.session.user.idUser;
    //logger.trace(paramsJs);
    wsRequest.get(global.config.ws.listAddress, paramsJs, function (error, resp, body) {
        if (error) {
            logger.error('\t ' + error);
            res.status(500).json({success: false, error: "Error while retrieving the address list"});
        }
        else if (resp.statusCode !== 200) {
            res.status(500).json({success: false, error: "Error while retrieving the address list"});
        }
        else {
            //Data retrieved from Ws
            try {
                var addressList = JSON.parse(body).data;
                res.status(200).json(addressList);
            }
            catch (e) {
                res.status(500).json({success: false, error: "Error while retrieving the address list"});
            }
        }
    });*/

    res.status(200).json([{
        idAddress: 1,
        name: "Centro de Mardid",
        number: 16,
        street: "Calle Tetuàn",
        postalCode: "28013",
        city: "Madrid",
        country: "Espagne",
        gps: {gpsLatitude: 40.417434, gpsLongitude: -3.703874}
    }, {
        idAddress: 2,
        name: "Kiabi de Saumur",
        number: 110,
        street: "Boulevard des Demoiselles",
        postalCode: "49400",
        city: "Saumur",
        country: "France",
        gps: {gpsLatitude: 47.279151, gpsLongitude: -0.064629}
    }, {
        idAddress: 3,
        name: "Massy Gare TGV",
        number: 7,
        street: "Avenue Carnot",
        postalCode: "91300",
        city: "Massy",
        country: "France",
        gps: {gpsLatitude: 48.725912, gpsLongitude: 2.261339}
    }, {
        idAddress: 4,
        name: "Polytech Paris-Sud",
        number: 620,
        street: "Rue Louis de Broglie",
        postalCode: "91400",
        city: "Orsay",
        country: "France",
        gps: {gpsLatitude: 48.709061, gpsLongitude: 2.171231}
    }]);
};

exports.getAddressModal = function (req, res) {
    res.render('addressModal', {title: "addressModal"});
};