var express = require('express');
var router = express.Router();

var login = require('./lib/services/user/login');
var profil = require('./lib/services/user/profil');
var bookdJourney = require('./lib/services/journey/bookmarkedJourney');
var addresses = require('./lib/services/addresses/addresses');

// Index
router.get(	'/', function(req, res) {
	res.render('index_connected', {title : "Root"});
	//res.render('index_connected', {title : "Root"});
});

/* Login */

// Sign up
router.post('/signup', login.createUser );
// validate an account
router.get(	'/signup/validate', login.validateAccount);
// Sign in
router.post('/signin', login.connectUser);
// Get lost password
router.get( '/passwd/lost', login.getLostPasswd);
// Set new password
router.post('/passwd/new', login.setNewPasswd);

/* Profil */
// Get profil information to display
router.get( '/profil', profil.getProfilInformation );
// Modify the profil information
router.post('/profil', profil.setProfilInformation );

/* Journey */
// get all the bookmarked journey
router.get( '/bookmarkedjourney', bookdJourney.getAllBookmarkedJourney );
// add abookmarked journey
router.post('/bookmarkedjourney', bookdJourney.addBookmarkedJourney );
// delete a bookmarked journey
router.get( '/bookmarkedjourney/:idJourney', bookdJourney.deleteBookmarkedJourney );

/* Addresses */
// check if the address exists
router.get( '/address/check', addresses.checkAddress );
// add the address
router.get( '/address/add', addresses.addAddress );
// delete the address
router.get( '/address/delete', addresses.deleteAddress );
// add the address
router.get( '/address/all', addresses.getListAddresses );

module.exports = router;