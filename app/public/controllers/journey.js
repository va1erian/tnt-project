var app = angular.module('tntApp', []);
app.controller('journeyCtrl', function($scope, $http)
{
	$scope.URL = "http://" + window.location.hostname + ":3000/tnt";

  $scope.addressesList = Array(); 

  angular.element(document).ready(function () {
    var url = $scope.URL + '/address/list';
    $http.get(url)
        .success(function (data, status, headers, config) {
          $scope.addressesList = data;
        })
        .error(function (data, status, headers, config) {
          $scope.errorMessage = "SUBMIT ERROR";
        });

    (function wait() {
        if ($('#choseDeparture1 option').size() > 0) {
          $(".chosen-select").chosen();
        } else {
          setTimeout(wait, 200);
        }
    })();

/*    $(".chosen-select").each(function() {
      (function wait() {
        alert($(this).options.size());
        if ($('this option').size() > 0) {
          $(this).chosen();
        } else {
          setTimeout(wait, 200);
        }
      })();
    });*/


  });


    $scope.toggleBackJourney = function(id) {
        if($('#'+id).is(":checked")) {
            $('#backJourney').fadeOut(200);
        }
        else {
           $('#backJourney').fadeIn(200);
        }
    }

    $scope.edit_outward = function() {
        var departure = {lat: 48.725559, lng: 2.260095};
        var arrival = {lat: 48.709267, lng: 2.171263};
        $scope.initMap(departure, arrival);
    }

    $scope.edit_return = function() {
        var departure = {lat: 48.725559, lng: 2.260095};
        var arrival = {lat: 48.709267, lng: 2.171263};
        $scope.initMap(departure, arrival);
    }

    $scope.initMap = function(departure, arrival) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: {lat: -24.345, lng: 134.46}  // Australia.
        });

        //var depart = {lat: 48.725559, lng: 2.260095}; //48.725559, 2.260095
        //var arrivee = {lat: 48.709267, lng: 2.171263}; //48.709267, 2.171263
        var wpts = Array();

        // Set wpts (via input)
        /*wpts.push({location:new google.maps.LatLng(48.7311728,2.255312199999935)});
        wpts.push({location:new google.maps.LatLng(48.737497,2.229105)});
        wpts.push({location:new google.maps.LatLng(48.7575442,2.1729616999999735)});
        wpts.push({location:new google.maps.LatLng(48.7191667,2.151718599999981)});*/

        console.log(wpts);

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        //markerOptions : { visible : false },
        //panel: document.getElementById('right-panel')
        });

        var request = {
        origin: departure,
        destination: arrival,
        waypoints: wpts,//[{location:new google.maps.LatLng(48.737497,2.229105)}],   //{lat:48.737497, lng:2.229105}
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: true
        };

        directionsDisplay.addListener('directions_changed', function() {
            $scope.computeTotalDistance(directionsDisplay.getDirections());
        });

        $scope.displayRoute(request, directionsService, directionsDisplay);
        //sendDirections(depart, arrivee, directionsDisplay.getDirections());

        /*document.getElementById("envoi").addEventListener("click", function() {
            sendDirections(depart, arrivee, directionsDisplay.getDirections(), request);
        });*/
    }

    // Creation du tableau des points intermediaires pour output
    $scope.sendDirections = function(departure, arrival, trajets, request) {
      var myroute = trajets.routes[0];
      var waypoints = Array();
      
      for (var i = 0; i < myroute.legs.length; i++) {
        console.log(myroute.legs[i].via_waypoints.length);
        for(var j = 0; j < myroute.legs[i].via_waypoints.length; j++) {
          // waypoints.push({lat:48.709267, lng:2.171263});
          //if(myroute.legs[i].via_waypoints[j])
            waypoints.push({lat:myroute.legs[i].via_waypoints[j].lat(),
                            lng:myroute.legs[i].via_waypoints[j].lng()});
        }
        //console.log(request.waypoints[i].location);
        if(i < myroute.legs.length-1) {
          waypoints.push({lat:request.waypoints[i].location.lat(),
                          lng:request.waypoints[i].location.lng()});
        }
      }
      console.log(waypoints);
    }

    $scope.displayRoute = function(request, service, display) {
      service.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(response);
          display.setDirections(response);
        } else {
          alert('Could not display directions due to: ' + status);
        }
      });
    }

    $scope.computeTotalDistance = function(result) {
      var total = 0;
      var temps = 0;
      var myroute = result.routes[0];
      var i, j, somme = 0;

      for (i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
        temps += myroute.legs[i].duration.value;
        for(j = 0;j < myroute.legs[i].via_waypoints.length; j++) {
            somme++;
            console.log(myroute.legs[i].via_waypoints[j].lat());
            console.log(myroute.legs[i].via_waypoints[j].lng());
        }
      }
    }

});