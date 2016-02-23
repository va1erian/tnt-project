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
    wsRequest.post("...../address/checkAddress", data.new_address, function (error, resp, body) {
        if (error) {
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
        formattedAddress: "8 Avenue du superbe Kiabi, Saumur, 91000",
        gps: {gpsLatitude: 47.279127, gpsLongitude: -0.064639}
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
    wsRequest.post("...../address/add", postData, function (error, resp, body) {
        if (error) {
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
    wsRequest.post("...../address/delete", data, function (error, resp, body) {
        if (error) {
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
    wsRequest.get("...../address/list", paramsJs, function (error, resp, body) {
        if (error) {
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
        number: 8,
        street: "Avenue de la déchéance",
        postalCode: "91420",
        city: "Morangui",
        country: "France",
        gps: {gpsLatitude: 12.2, gpsLongitude: 14.5}
    }, {
        idAddress: 2,
        number: 14,
        street: "Rue du poulet",
        postalCode: "91600",
        city: "Savignou",
        country: "France",
        gps: {gpsLatitude: 12.2, gpsLongitude: 14.5}
    }]);
};

exports.getAddressModal = function (req, res) {
    res.render('addressModal');
};