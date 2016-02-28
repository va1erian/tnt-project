var express = require('express');
var router = express.Router();

var login = require('./lib/services/user/login');
var profil = require('./lib/services/user/profil');
var bookdJourney = require('./lib/services/journey/bookmarkedJourney');
var addresses = require('./lib/services/addresses/addresses');

// Index
router.get('/index_not_connected.html', function(req, res) {
	res.render('index_not_connected', {title : "Root"});
});

/* Login */
// 
router.get(	'/', login.index);
// Sign up
router.post('/signup', login.createUser );
// validate an account
router.get(	'/signup/validate', login.validateAccount);
// Sign in
router.post('/signin', login.connectUser);
// Get lost password
router.post( '/passwd/lost', login.getLostPasswd);
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
// addresses management main page
router.get( '/address', addresses.renderAddress );
// check if the address exists and get all the formatted addresses
router.post( '/address/check', addresses.checkAddress );
// add the address
router.post( '/address/add', addresses.addAddress );
// delete the address
router.get( '/address/delete/:idAddress', addresses.deleteAddress );
// add the address
// get the list of all thr addresses of the user
router.get( '/address/list', addresses.getListAddresses );
// render the modal of the adresses
router.get( '/address/getModal', addresses.getAddressModal );

module.exports = router;