$(document).ready(function() {

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

var dataOstUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20*%20FROM%201eTYAHZAF5EQGuBSo0tPZY837lAqm2AqJ_hH-6NbS&key=AIzaSyC8Tw06vYAmuQHYg3Uw4dgVGta3DNhBO-w';
var listArray = [[],[],[],[]];
var filterArray = ['.gradesCheck', '.daysCheck', '.times_oCheck', '.enrollment_tCheck'];

/**
Column names and corresponding column numbers
Name of Program = 7
Program Website = 8
Program Site Telephone = 10
Program Site Address = 6
Name of Organization = 3
Overview of Program = 20
Date of Program Start = 21
Date of Program Finish = 22
Days offered = 23
Time of Program = 24
Meals Offered at Program = 27
Grades Served = 29
Enrollment Type = 31
*/

$("#progList").hide();

	$.getJSON(dataOstUrl, function(data){
		var rows = data.rows;
		var columns = data.columns;
		console.log(columns);
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
				console.log(checkboxCat);

					if (checkboxCat == '.gradesCheck') {
						var colNum = 29, listArrayNum = 0;
					} else if (checkboxCat == '.daysCheck') {
						var colNum = 23, listArrayNum = 1;
					} else if (checkboxCat == '.times_oCheck') {
						var colNum = 24, listArrayNum = 2;
					} else if (checkboxCat == '.enrollment_tCheck') {
						var colNum = 31, listArrayNum = 3;
					} else if (checkboxCat == '.wardsCheck') {
						var colNum = 89, listArrayNum = 4;
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
										console.log(multiVal[i]);
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
						if (otherCheckboxCat == '.gradesCheck') {
							var colNum = 29, listArrayNum = 0;
						} else if (otherCheckboxCat == '.daysCheck') {
							var colNum = 23, listArrayNum = 1;
						} else if (otherCheckboxCat == '.times_oCheck') {
							var colNum = 24, listArrayNum = 2;
						} else if (otherCheckboxCat == '.enrollment_tCheck') {
							var colNum = 31, listArrayNum = 3;
						} else if (otherCheckboxCat == '.wardsCheck') {
							var colNum = 89, listArrayNum = 4;
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
											console.log(multiVal[i]);
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
				
				var prog = array_intersect(listArray[0], listArray[1], listArray[2], listArray[3]);
				console.log(prog.length);
				
				if (prog.length == 0) {
					$("#progList").append('<h3>Filter choices are too specific and did not result in any programs. Please try a broader search.</h3>');
				}

				prog.forEach(function(progArray){
					$("#progList").append('<hr style="height:1px;border:none;color:#772950;background-color:#772950;" />'+'<ul class="programs">'+columns[7]+': '+rows[progArray][7]+'<br>'+columns[8]+': '+'<a href="'+rows[progArray][8]+'">'+rows[progArray][8]+'</a>'+'<br>'+columns[10]+': '+rows[progArray][10]+'<br>'+columns[6]+': '+rows[progArray][6]+'<br>'+columns[20]+': '+rows[progArray][20]+'<br>'+columns[3]+': '+rows[progArray][3]+'<br>'+columns[29]+': '+rows[progArray][29]+'<br>'+columns[31]+': '+rows[progArray][31]+'<br>'+columns[21]+': '+rows[progArray][21]+'<br>'+columns[22]+': '+rows[progArray][22]+'<br>'+columns[23]+': '+rows[progArray][23]+'<br>'+columns[24]+': '+rows[progArray][24]+'<br>'+columns[27]+': '+rows[progArray][27]+'</ul>');
				});
		};
		
		$("#toggleView").click(function(){
			if ($('#toggleView').text() == 'Map View') {
				$("#progList").hide();
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

		checkboxes(".gradesCheck");
		checkboxes(".daysCheck");
		checkboxes(".times_oCheck");
		checkboxes(".enrollment_tCheck");

	}).error(function(e){
		$('#progList').text('Unable to load program list');
	});

});
