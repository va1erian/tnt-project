var URL = "http://" + window.location.hostname + ":3000";

$( document ).ready(function() {
    console.log( "ready!" );
    $("#bButton").on('click', function(event) {
		test();
	});
});
function test() {
	$.ajax({
		type : 'GET',
		url : URL + '/test'
	})
	.done( function( data ) {
		$("#toto").html(data);
	})
	.fail(function(data) {
		alert('Error');
	})
	.always(function() {});
}


