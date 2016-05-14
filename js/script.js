
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
	var streetStr = $('#street').val();
	var cityStr = $('#city').val();
	var address = streetStr + ', ' + cityStr;
    
	$greeting.text('So, you want to live at ' + address + '?');
	var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
	$body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // NYTIMES API getJSON
    /*
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=f811eacbc97249409aeca749b7af0bce';
    
    $.getJSON(nytimesUrl, function(data){
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
            //console.log(article.web_url);
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Artiles Could Not Be Loaded');
    });
    */

    var dataOstUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20*%20FROM%201eTYAHZAF5EQGuBSo0tPZY837lAqm2AqJ_hH-6NbS&key=AIzaSyC8Tw06vYAmuQHYg3Uw4dgVGta3DNhBO-w';

    // DATAOST CODE
    $.getJSON(dataOstUrl, function(data){
        $nytHeaderElem.text('Newark Thrives! Program Locator ' + cityStr);
        columns = data.columns;
        rows = data.rows;
        for (var i = 7; i < columns.length; i++) {
            var column = columns[i];
            var nameOfProgram = rows[i][7];
            var programSiteAddress = rows[i][6];
            var programWebsite = rows[i][8];
            var programSiteTelephone = rows[i][10];
            $nytElem.append('<li class="article">' + nameOfProgram + '<p>'+ programWebsite +'<br>'+programSiteTelephone+'<br>'+programSiteAddress+'</p>'+'</li>');
        };

    }).error(function(e){
        $nytHeaderElem.text('Unable to load dataOst');
    });
    // DATAOST CODE

    // WIKI API AJAX
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';

    // JSON will return wrapped within a function
    // error handle is not builtin to JSONP because of technicals in the background
    // instead you can use a timeout function if there is no response in 8 seconds
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        // jsonp: "callback",
        success: function(response){
            var articleList = response[1];
            //console.log(response);
            //console.log(response[1]);
        
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
                //console.log('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
            // clears timeout
            clearTimeout(wikiRequestTimeout);
        }
    });
    
    return false;
};

$('#form-container').submit(loadData);
