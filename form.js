/*
function initialize() {
          var mapProp = {
            center:new google.maps.LatLng(40.735657,-74.172367),
            zoom:13,
            mapTypeId:google.maps.MapTypeId.ROADMAP
            };
          var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
          }
          
      google.maps.event.addDomListener(window, 'load', initialize);
*/

function initialize() {
  // $('#mapDirections').hide();
  $('#directionsPanel').hide();
  google.maps.visualRefresh = true;
  var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) ||
    (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
  if (isMobile) {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
  }
  //var mapDiv = document.getElementById('mapCanvas');
  //mapDiv.style.width = isMobile ? '100%' : '500px';
  //mapDiv.style.height = isMobile ? '100%' : '300px';

  var tableId = "1Ah486A9wQKYyWq9V_6eFFE2fTSxYt9tv8ipKpFZf";
  var locationColumn = "col0";

  var infoWindow = new google.maps.InfoWindow();
  var directionsMapActive = false;

  var map = new google.maps.Map(document.getElementById('mapCanvas'), {
    center: new google.maps.LatLng(40.735657, -74.172367),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var wardsLayer = new google.maps.FusionTablesLayer({
    query: {
      select: "'geometry'",
      from: '1WgAEYo358LxwjtmHkhRxq6AconsfE76nTf7aAS-Z'
    },
    map: map,
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });
   // google.maps.event.addListener(wardsLayer, 'click', function(e) {
   //   windowControl(e, infoWindow, map);
   // });

  var pointsLayer = new google.maps.FusionTablesLayer({
    map: map,
    suppressInfoWindows: true,
    heatmap: { enabled: false },
    query: {
      select: locationColumn,
      from: tableId,
      where: ""
    },
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  // Creating info windows when clicking points on the map
  google.maps.event.addListener(pointsLayer, 'click', function(e) {
    infoWindow.setContent(e.infoWindowHtml +
        '<div class="googft-info-window"> ' +
        '<div id="infotitle">' +
        '<b>' + e.row["Name of Program"].value + '</b><br>' +
        '</div><br>' +
        '<b>Name of Organization:</b> ' + e.row["Name of Organization"].value + ' <br>' +
        '<b>Program Site Address:</b> ' + e.row["Program Site Address"].value + ' <br>' +
        '<b>Program Website:</b> <a href="' + e.row["Program Website"].value + ' " target="_blank">' + e.row["Program Website"].value + '</a><br>' +
        '<b>Organization Telephone:</b> ' + e.row["Organization Telephone"].value + ' <br>' +
        '<b>Name of Executive Director:</b> ' + e.row["Name of Executive Director"].value + '<br>' +
        '</div><br>' +
        '<center>' +
        '<div id="transit_button_div"> ' +
        '<input type="button" id="transit_button" value="Transit Directions" data-toggle="modal" data-target="#transitModal">' +
        '</center>' +
        '</div>');
    infoWindow.setPosition(e.latLng);
    infoWindow.open(map);

    // Populates the program address into the 'To:' field for Transit Directions
    document.getElementById("to-addr").value = e.row["Program Site Address"].value;
  });

  /*
  google.maps.event.addDomListener(document.getElementById('academic'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('arts_and_culture'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('college_readiness'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('community_service_civic_engagement'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('early_education'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('environment'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('faith_based_spirituality'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('health'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('jobs_career_exploration'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('sports_and_recreation'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('technology_and_media_literacy'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  google.maps.event.addDomListener(document.getElementById('youth_development'),'click', function() {
        filterMap(pointsLayer, tableId, map);
  });
  */

google.maps.event.addDomListener(document.getElementById('get-transit'),'click', function() {
    initMap();
  });

    function initMap() {
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      directionsMapActive = true;
      var map2 = new google.maps.Map(document.getElementById('mapCanvas'), {
        center: new google.maps.LatLng(40.735657, -74.172367),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      directionsDisplay.setMap(map2);
      directionsDisplay.setPanel(null);
      directionsDisplay.setPanel(document.getElementById('directionsPanel'));
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      $('#directionsPanel').show();
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var originAddr = document.getElementById('from-addr').value;
        var destinationAddr = document.getElementById('to-addr').value;
        directionsService.route({
          origin: originAddr, 
          destination: destinationAddr, 
          travelMode: google.maps.TravelMode.TRANSIT
        }, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    // $('#mapCanvas').hide();
    // $('#mapDirections').show();

  $('#reset_button').on('click', function() {
    if (directionsMapActive) {
      directionsMapActive = false;
      // document.getElementById('directionsPanel').innerHTML = "";      
      $('#directionsPanel').hide();
      initialize();
    }
    else {
      map.setCenter(new google.maps.LatLng(40.735657, -74.172367));
      map.setZoom(13);
    }

  });

  if (isMobile) {
    var legend = document.getElementById('googft-legend');
    var legendOpenButton = document.getElementById('googft-legend-open');
    var legendCloseButton = document.getElementById('googft-legend-close');
    legend.style.display = 'none';
    legendOpenButton.style.display = 'block';
    legendCloseButton.style.display = 'block';
    legendOpenButton.onclick = function() {
      legend.style.display = 'block';
      legendOpenButton.style.display = 'none';
    }
    legendCloseButton.onclick = function() {
      legend.style.display = 'none';
      legendOpenButton.style.display = 'block';
    }
  }

  // Create the legend and display on the map
  var legend = document.createElement('div');
  legend.id = 'legend';
  var content = [];
  content.push('<h4>Wards</h4>');
  content.push('<p><div class="color central"></div>Central</p>');
  content.push('<p><div class="color north"></div>North</p>');
  content.push('<p><div class="color south"></div>South</p>');
  content.push('<p><div class="color east"></div>East</p>');
  content.push('<p><div class="color west"></div>West</p>');
  legend.innerHTML = content.join('');
  legend.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}



  // Filter the map based on checkbox selection.
/*
function filterMap(pointsLayer, tableId, map) {
  var where = generateWhere();

  if (where) {
    if (!pointsLayer.getMap()) {
      pointsLayer.setMap(map);
    }
    pointsLayer.setOptions({
      query: {
        select: "col0",
        from: tableId,
        where: where
      }
    });
  } else {
    pointsLayer.setMap(null);
  }
}

// Generate a where clause from the checkboxes. If no boxes
// are checked, return an empty string.
function generateWhere() {
  var filter = [];
  var programs = document.getElementsByName('program');
  for (var i = 0, program; program = programs[i]; i++) {
    if (program.checked) {
      var programName = program.value.replace(/'/g, '\\\'');
      filter.push("'" + programName + "'");
    }
  }
  var where = '';
  if (filter.length) {
    where = "'Store Name' IN (" + filter.join(',') + ')';
  }
  return where;
}
*/


google.maps.event.addDomListener(window, 'load', initialize);



