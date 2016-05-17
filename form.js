function initialize() {
          var mapProp = {
            center:new google.maps.LatLng(40.735657,-74.172367),
            zoom:13,
            mapTypeId:google.maps.MapTypeId.ROADMAP
            };
          var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
          }
          
      google.maps.event.addDomListener(window, 'load', initialize);

