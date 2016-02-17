var express = require('express');
var router = express.Router();

// Index
router.get(	'/', function(req, res) {
	res.render('index', {title : "Yazid"});
});

/* Login */

// Sign up
router.post('/signup', function(req, res) {});
// validate an account
router.get(	'/signup/validate', function(req, res) {});
// Sign in
router.post('/signin', function(req, res) {});
// Get lost password
router.get( '/passwd/lost', function(req, res) {});
// Set new password
router.post('/passwd/new', function(req, res) {});

/* Profil */
// Get profil information to display
router.get( '/profil', function(req, res) {});
// Modify the profil information
router.post('/profil', function(req, res) {});

/* Journey */
// get all the bookmarked journey
router.get( '/bookmarkedjourney', function(req, res) {});
// add abookmarked journey
router.post('/bookmarkedjourney', function(req, res) {});
// delete a bookmarked journey
router.get( '/bookmarkedjourney/:idJourney', function(req, res) {});

<<<<<<< HEAD
 
=======

router.get( '/test', function(req, res) {
	res.render( 'test' );
});
router.get( '/testangular', function(req, res) {
	res.render( 'testangular' );
});

>>>>>>> refs/remotes/origin/sebferrer

module.exports = router;