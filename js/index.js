$( document ).ready(function(){
  /**create google map*/
    initMap();


});

/**this function will set the local storage variable as farm id so it can be accessed from farm result page*/
function setFarmResult(farm_id){
    window.localStorage.setItem("farm",farm_id);
}

/**this will create the google map*/
function initMap() {

  /**this makes call to get all of the farms in the database to add to the map*/
  $.ajax({
    type: 'GET',
    datatype: 'jsonp',
    url: '/farms',
      success: function(data) {

        /**this will be future marker position*/
        var uluru;

        /**creates new map*/
        var map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 5.5,
        });
        
        /**needs to create marker for every farm that is returned*/
        for(var j=0; j < data.length; j++){
          
          /**if the address is usable*/
          if(data[j].farm_address!="blank address"){

            /**IIFE function with farm data param*/
            (function (entry) {

              /**sets the lat and long for new farm marker*/
              var latitude = entry.farm_lat,
              longitude = entry.farm_lng;
              
              /**sets the content of the info window*/
              var contentString = '<div class="farmName"><a onclick="setFarmResult('+entry.farm_id+')" href="/views/farmResult.html">' + entry.farm_name+'</a></br><p>' +entry.farm_address + '</p></div>';
              
              var infowindow = new google.maps.InfoWindow({
                content: contentString
              }) ;
      
              /**this sets the position of the new marker*/
              var newMark = {lat: latitude, lng: longitude};

              /**creates new marker*/
              var marker = new google.maps.Marker({
                position: newMark,
                map: map
              });

              /**when the marker is clicked, info window will open*/
              marker.addListener('click', function(){
                infowindow.open(map, marker);
                
                
              });
              map.setCenter(newMark);
                
              
              
            }) (data[j])
          }
      
        
        }
  

    },
    error: function (xhr, status, error) {
        console.log("Error : "+ error);
    }

  });
    
  }


