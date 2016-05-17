var app = angular.module('tntApp', []);
app.controller('journeyCtrl', function($scope, $http)
{
  $scope.URL = "http://" + window.location.hostname + ":3000/tnt";

  $scope.addressesList = Array(); 

  angular.element(document).ready(function () {

    var url = $scope.URL + '/address/list';

    var promise_cities = new Promise(function(resolve, reject) {
      $http.get(url)
      .success(function (data, status, headers, config) {
        resolve("Cities loaded!");

        $scope.addressesList = data;
      })
      .error(function (data, status, headers, config) {
        reject(Error("Unable to load cities"));
      });
    });

    promise_cities.then(function(result) {
      $(".chosen-select-1").each(function() {
        var id = $(this).attr('id');
        $('#'+id+' option').eq(0).remove();
        $('#'+id).chosen();
        var gps = {lat: $scope.addressesList[0].gps.gpsLatitude, lng: $scope.addressesList[0].gps.gpsLongitude};
        $scope.departure1 = gps;
        $scope.arrival1 = gps;
        $scope.departure2 = gps;
        $scope.arrival2 = gps;
      });
    }, function(err) {
        console.log(err);
      });

    $scope.backJourneyReady = false;

  });

    $scope.toggleBackJourney = function(id) {
      if($('#'+id).is(":checked")) {
        $('#backJourney').fadeOut(200);
      }
      else {
        $('#backJourney').fadeIn(200, function () {
          if(!$scope.backJourneyReady) {
            $(".chosen-select-2").each(function() {
              var id = $(this).attr('id');
              $('#'+id+' option').eq(0).remove();
              $('#'+id).chosen();
            });
            $scope.backJourneyReady = true;
          }
        });
      }
    }

    $scope.setLocation = function(id) {
      var gps = {lat: $scope.address.gps.gpsLatitude, lng: $scope.address.gps.gpsLongitude};
      switch(id) {
        case "choseDeparture1":
          $scope.departure1 = gps;
          break;
        case "choseArrival1":
          $scope.arrival1 = gps;
          break;
        case "choseDeparture2":
          $scope.departure2 = gps;
          break;
        case "choseArrival2":
          $scope.arrival2 = gps;
          break;
      }
      if($scope.departure1 && $scope.arrival1) {
        $scope.initMap($scope.departure1, $scope.arrival1);
      }
    }

    $scope.edit_outward = function() {
      $scope.initMap($scope.departure1, $scope.arrival1);
    }

    $scope.edit_return = function() {
      if($('#toggleBackJourneyCheckbox').is(":checked")) {
        $scope.initMap($scope.departure1, $scope.arrival1);
      }
      else {
        $scope.initMap($scope.departure2, $scope.arrival2);
      }
    }

    $scope.initMap = function(departure, arrival) {
      $scope.map = new google.maps.Map(document.getElementById('map'), {});
      $scope.map.center = {lat: departure.lat, lng: departure.lng};
      $scope.map.zoom = 4;

      var wpts = Array();

      var directionsService = new google.maps.DirectionsService;
      $scope.directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: $scope.map,
      });

      $scope.request = {
        origin: departure,
        destination: arrival,
        waypoints: wpts,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: true
      };

      $scope.directionsDisplay.addListener('directions_changed', function() {
          $scope.computeTotalDistance($scope.directionsDisplay.getDirections());
      });

      $scope.displayRoute($scope.request, directionsService, $scope.directionsDisplay);

      var location = {lat: $scope.map.center.lat, lng: $scope.map.center.lng};
      google.maps.event.addListenerOnce($scope.map, 'idle', function() {
        google.maps.event.trigger($scope.map, 'resize');
        $scope.map.setCenter(location);
      });
    }

    $scope.validate_journey = function() {
      $scope.sendDirections();
    }

    $scope.sendDirections = function() {
      var myroute = $scope.directionsDisplay.getDirections().routes[0];
      var waypoints = Array();
      
      for (var i = 0; i < myroute.legs.length; i++) {
        //console.log(myroute.legs[i].via_waypoints.length);
        for(var j = 0; j < myroute.legs[i].via_waypoints.length; j++) {
            waypoints.push({lat:myroute.legs[i].via_waypoints[j].lat(),
                            lng:myroute.legs[i].via_waypoints[j].lng()});
        }
        if(i < myroute.legs.length-1) {
          waypoints.push({lat:$scope.request.waypoints[i].location.lat(),
                          lng:$scope.request.waypoints[i].location.lng()});
        }
      }
      console.log(waypoints);
    }

    $scope.displayRoute = function(request, service, display) {
      service.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
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