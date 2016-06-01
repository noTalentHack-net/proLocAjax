function initialize() {

// Ivan's Code
function array_intersect() {
  var i, all, shortest, nShortest, n, len, ret = [], obj={}, nOthers;
  nOthers = arguments.length-1;
  nShortest = arguments[0].length;
  shortest = 0;
  for (i=0; i<=nOthers; i++){
    n = arguments[i].length;
    if (n<nShortest) {
      shortest = i;
      nShortest = n;
    }
  }

  for (i=0; i<=nOthers; i++) {
    n = (i===shortest)?0:(i||shortest); //Read the shortest array first. Read the first array instead of the shortest
    len = arguments[n].length;
    for (var j=0; j<len; j++) {
        var elem = arguments[n][j];
        if(obj[elem] === i-1) {
          if(i === nOthers) {
            ret.push(elem);
            obj[elem]=0;
          } else {
            obj[elem]=i;
          }
        }else if (i===0) {
          obj[elem]=0;
        }
    }
  }
  return ret;
}

var dataOSTpkeyNew = '1YBEx5Ye65ZTSKJgc2_X_pZPZKuku8FSogmH91T9C';
var dataOSTpkey = '1cIEAw1VCm2rcYL5_FqOIHjhWer2WGN3SIVvaJxMm';

//var dataOstUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20*%20FROM%' + table_id + '&key=' + api_key;

var dataOstUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20*%20FROM%201YBEx5Ye65ZTSKJgc2_X_pZPZKuku8FSogmH91T9C&key=AIzaSyAp4nVJu4DyB0fEx07op_7C6yGh53JqMzw';
var listArray = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var filterArray = ['.gradesCheck', '.daysCheck', '.times_oCheck', '.enrollment_tCheck', '.wardsCheck', '.academic', '.ArtsAndCulture', '.Environment', '.SportsAndRecreation', '.TechnologyMediaLiteracy', '.EarlyEducation', '.JobsCareerExploration', '.CommunityServiceCivicEngagement', '.YouthDevelopment', '.CollegeReadiness', '.Health', '.FaithBasedSpirituality'];

/**
Column names and corresponding column numbers
Name of Program = 8
Program Website = 9
Program Site Telephone = 11
Program Site Address = 7
Name of Organization = 4
Overview of Program = 21
Date of Program Start = 22
Date of Program Finish = 23
Days offered = 24
Time of Program = 25
Meals Offered at Program = 28
Grades Served = 30
Enrollment Type = 32
Ward = 3

Academic = 92
Arts and Culture = 93
Environment = 94
Sports and Recreation = 95
Technology and Media Literacy = 96
Early Education = 97
Jobs/ Career Exploration = 98
Community Service/Civic Engagement = 99
Youth Development = 100
College Readiness = 101
Health = 102
Faith-Based/ Spirituality = 103
*/

$("#progList").hide();

	$.getJSON(dataOstUrl, function(data){
		var rows = data.rows;
		var columns = data.columns;
		var searchProg = function(regexp, colNum, listArrayNum){
			var pos = 0;
			var array = [];
			rows.forEach(function(prog){
			var test = prog[colNum].search(regexp);
				if(test != -1) {
					array.push(pos);
				}
			pos++;
			});
			return array;
		};

		var checkboxes = function(checkboxCat) {

			$(checkboxCat).on('click',function(){

					if (checkboxCat == filterArray[0]) {
						var colNum = 30, listArrayNum = 0;
					} else if (checkboxCat == filterArray[1]) {
						var colNum = 24, listArrayNum = 1;
					} else if (checkboxCat == filterArray[2]) {
						var colNum = 25, listArrayNum = 2;
					} else if (checkboxCat == filterArray[3]) {
						var colNum = 32, listArrayNum = 3;
					} else if (checkboxCat == filterArray[4]) {
						var colNum = 3, listArrayNum = 4;
					} else if (checkboxCat == filterArray[5]) {
						var colNum = 92, listArrayNum = 5;
					} else if (checkboxCat == filterArray[6]) {
						var colNum = 93, listArrayNum = 6;
					} else if (checkboxCat == filterArray[7]) {
						var colNum = 94, listArrayNum = 7;
					} else if (checkboxCat == filterArray[8]) {
						var colNum = 95, listArrayNum = 8;
					} else if (checkboxCat == filterArray[9]) {
						var colNum = 96, listArrayNum = 9;
					} else if (checkboxCat == filterArray[10]) {
						var colNum = 97, listArrayNum = 10;
					} else if (checkboxCat == filterArray[11]) {
						var colNum = 98, listArrayNum = 11;
					} else if (checkboxCat == filterArray[12]) {
						var colNum = 99, listArrayNum = 12;
					} else if (checkboxCat == filterArray[13]) {
						var colNum = 100, listArrayNum = 13;
					} else if (checkboxCat == filterArray[14]) {
						var colNum = 101, listArrayNum = 14;
					} else if (checkboxCat == filterArray[15]) {
						var colNum = 102, listArrayNum = 15;
					} else if (checkboxCat == filterArray[16]) {
						var colNum = 103, listArrayNum = 16;
					}

					var checkVal = [];

					if ($(checkboxCat+':checked').length == 0) {
						var matchAll = /[\s\S]*/gi;
						checkVal.push(matchAll);
					} else {
						$(checkboxCat).each(function(){
							if(this.checked){

								if (this.value.search(/,/) != -1) {
									var multiVal = this.value.split(",");
									for (var i = 0; i < multiVal.length; i++) {
										checkVal.push(multiVal[i]);
									}
								} else {
									checkVal.push(this.value);
								}
								
							}
						});
					}
					var array = [];
					checkVal.forEach(function(value){
    					var regexp = new RegExp(value, "i");
    					$('#progList').text("");
    					var results = searchProg(regexp,colNum,listArrayNum);
    					results.forEach(function(pos){
    						array.push(pos);
    					});
					});

					listArray[listArrayNum] = Array.from(new Set(array));
				allFilters(checkboxCat);
				
			});

		};
		
		var allFilters = function(checkboxCat){
			for (var i = 0; i < filterArray.length; i++) {
					if (filterArray[i] != checkboxCat) {

						var otherCheckboxCat = filterArray[i];
						if (otherCheckboxCat == filterArray[0]) {
							var colNum = 30, listArrayNum = 0;
						} else if (otherCheckboxCat == filterArray[1]) {
							var colNum = 24, listArrayNum = 1;
						} else if (otherCheckboxCat == filterArray[2]) {
							var colNum = 25, listArrayNum = 2;
						} else if (otherCheckboxCat == filterArray[3]) {
							var colNum = 32, listArrayNum = 3;
						} else if (otherCheckboxCat == filterArray[4]) {
							var colNum = 3, listArrayNum = 4;
						} else if (otherCheckboxCat == filterArray[5]) {
							var colNum = 92, listArrayNum = 5;
						} else if (otherCheckboxCat == filterArray[6]) {
							var colNum = 93, listArrayNum = 6;
						} else if (otherCheckboxCat == filterArray[7]) {
							var colNum = 94, listArrayNum = 7;
						} else if (otherCheckboxCat == filterArray[8]) {
							var colNum = 95, listArrayNum = 8;
						} else if (otherCheckboxCat == filterArray[9]) {
							var colNum = 96, listArrayNum = 9;
						} else if (otherCheckboxCat == filterArray[10]) {
							var colNum = 97, listArrayNum = 10;
						} else if (otherCheckboxCat == filterArray[11]) {
							var colNum = 98, listArrayNum = 11;
						} else if (otherCheckboxCat == filterArray[12]) {
							var colNum = 99, listArrayNum = 12;
						} else if (otherCheckboxCat == filterArray[13]) {
							var colNum = 100, listArrayNum = 13;
						} else if (otherCheckboxCat == filterArray[14]) {
							var colNum = 101, listArrayNum = 14;
						} else if (otherCheckboxCat == filterArray[15]) {
							var colNum = 102, listArrayNum = 15;
						} else if (otherCheckboxCat == filterArray[16]) {
							var colNum = 103, listArrayNum = 16;
						}

						var checkVal = [];

						if ($(otherCheckboxCat+':checked').length == 0) {
							var matchAll = /[\s\S]*/gi;
							checkVal.push(matchAll);
						} else {
							$(otherCheckboxCat).each(function(){
								if(this.checked){
									
									if (this.value.search(/,/) != -1) {
										var multiVal = this.value.split(",");
										for (var i = 0; i < multiVal.length; i++) {
											checkVal.push(multiVal[i]);
										}
									} else {
										checkVal.push(this.value);
									}

								}
							});
						}

						var array = [];

						checkVal.forEach(function(value){
    						var regexp = new RegExp(value, "i");
    						$('#progList').text("");
    						var results = searchProg(regexp,colNum,listArrayNum);
    						results.forEach(function(pos){
    							array.push(pos);
    						});
						});

						listArray[listArrayNum] = Array.from(new Set(array));

					} else {
						// do nothing
					}
				}
				
				var prog = array_intersect(listArray[0], listArray[1], listArray[2], listArray[3], listArray[4], listArray[5], listArray[6], listArray[7], listArray[8], listArray[9], listArray[10], listArray[11], listArray[12], listArray[13], listArray[14], listArray[15], listArray[16]);
				
				if (prog.length == 0) {
					$("#progList").append('<h3>Filter choices are too specific and did not result in any programs. Please try a broader search.</h3>');
				}

				var whereArray =[];
				prog.forEach(function(progArray){
					whereArray.push(rows[progArray][0]);
					$("#progList").append('<hr style="height:1px;border:none;color:#772950;background-color:#772950;" />'+'<ul class="programs">'+columns[8]+': '+rows[progArray][8]+'<br>'+columns[9]+': '+'<a href="'+rows[progArray][9]+'">'+rows[progArray][9]+'</a>'+'<br>'+columns[11]+': '+rows[progArray][11]+'<br>'+columns[7]+': '+rows[progArray][7]+'<br>'+columns[21]+': '+rows[progArray][21]+'<br>'+columns[4]+': '+rows[progArray][4]+'<br>'+columns[30]+': '+rows[progArray][30]+'<br>'+columns[32]+': '+rows[progArray][32]+'<br>'+columns[22]+': '+rows[progArray][22]+'<br>'+columns[23]+': '+rows[progArray][23]+'<br>'+columns[24]+': '+rows[progArray][24]+'<br>'+columns[25]+': '+rows[progArray][25]+'<br>'+columns[28]+': '+rows[progArray][28]+'</ul>');
				});

				filterMap(pointsLayer, tableId, locationColumn, whereArray);

		};
		
		$("#toggleView").click(function(){
			if ($('#toggleView').text() == 'Map View') {
				$("#progList").hide();
				allFilters("#toggleView");
				$("#mapCanvas").show();
				$('#reset_div').show();
				$('#toggleView').text("List View");
			} else if ($('#toggleView').text() == 'List View') {
				$('#progList').text("");
				$('#mapCanvas').hide();
				$('#reset_div').hide();
				$('#toggleView').text("Map View");
				allFilters("#toggleView");
				$('#progList').show();
			}
		});

		$("#submit-btn").click(function(){
			$('#progList').text("");
			var value = $("#searchQuery").val();
			var regexp = new RegExp(value, "i");
			var j = 0;
			var progArr = [];
			rows.forEach(function(prog){
				
				prog.forEach(function(column){
					column = column.toString();
					var test = column.search(regexp);
					if (test != -1) {
						progArr.push(prog[0]);
					}
				});
				
				j++;
			});

			var uniqueArray = Array.from(new Set(progArr));
				
				uniqueArray.forEach(function(progArray){
					$("#progList").append('<hr style="height:1px;border:none;color:#772950;background-color:#772950;" />'+'<ul class="programs">'+columns[8]+': '+progArray[8]+'<br>'+columns[9]+': '+'<a href="'+progArray[9]+'">'+progArray[9]+'</a>'+'<br>'+columns[11]+': '+progArray[11]+'<br>'+columns[7]+': '+progArray[7]+'<br>'+columns[21]+': '+progArray[21]+'<br>'+columns[4]+': '+progArray[4]+'<br>'+columns[30]+': '+progArray[30]+'<br>'+columns[32]+': '+progArray[32]+'<br>'+columns[22]+': '+progArray[22]+'<br>'+columns[23]+': '+progArray[23]+'<br>'+columns[24]+': '+progArray[24]+'<br>'+columns[25]+': '+progArray[25]+'<br>'+columns[28]+': '+progArray[28]+'</ul>');
				});

				filterMap(pointsLayer, tableId, locationColumn, uniqueArray);
			
		});

		checkboxes(filterArray[0]);
		checkboxes(filterArray[1]);
		checkboxes(filterArray[2]);
		checkboxes(filterArray[3]);
		checkboxes(filterArray[4]);
		checkboxes(filterArray[5]);
		checkboxes(filterArray[6]);
		checkboxes(filterArray[7]);
		checkboxes(filterArray[8]);
		checkboxes(filterArray[9]);
		checkboxes(filterArray[10]);
		checkboxes(filterArray[11]);
		checkboxes(filterArray[12]);
		checkboxes(filterArray[13]);
		checkboxes(filterArray[14]);
		checkboxes(filterArray[15]);
		checkboxes(filterArray[16]);

	}).error(function(e){
		$('#progList').text('Unable to load program list');
	});

// Ivan's Code

  //document.getElementById('directionsPanel').innerHTML = "";
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

  var tableId = "1YBEx5Ye65ZTSKJgc2_X_pZPZKuku8FSogmH91T9C";

  var locationColumn = "col0";

  var infoWindow = new google.maps.InfoWindow();
  var directionsMapActive = false;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;

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
  // pointsLayer.setMap(map);

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

//google.maps.event.addDomListener(document.getElementById('filtermap'),'click', function() {
      //filterMap(pointsLayer, tableId, locationColumn);
//});


google.maps.event.addDomListener(document.getElementById('get-transit'),'click', function() {
    initMap();
  });

    function initMap() {
      directionsMapActive = true;
      var map2 = new google.maps.Map(document.getElementById('mapCanvas'), {
        center: new google.maps.LatLng(40.735657, -74.172367),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      directionsDisplay.setMap(map2);
       
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
      clearPanel();     
      $('#directionsPanel').hide();
      initialize();
    }
    else {
      map.setCenter(new google.maps.LatLng(40.735657, -74.172367));
      map.setZoom(13);
    }

  });

  $('#resetpanel').on('click', function() {
    document.getElementById('directionsPanel').innerHTML = "";
  });

  function clearPanel() {
    document.getElementById('directionsPanel').innerHTML = "";
    directionsDisplay.setPanel(null);
  }

  //var where = "'Sports and Recreation' MATCHES '%Basketball%'";

    function filterMap(pointsLayer, tableId, map, whereArray) {

    	where = "'pKey' IN (" + whereArray.join(',') + ")"; 
      	pointsLayer.setOptions({
        	query: {
          		select: "col0",
          		from: tableId,
          		where: where
        	}
      	});
      //pointsLayer.setMap(map);
    }

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


function init(){		
	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	          acc[i].onclick = function(){
		this.classList.toggle("active");
	          this.nextElementSibling.classList.toggle("show");
		}
	}
}

		

google.maps.event.addDomListener(window, 'load', initialize);
