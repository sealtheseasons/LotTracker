
$( document ).ready(function(){
    getFarm();

});

function getFarm(){
    var farm_id = window.localStorage.getItem("farm");
   
    $.ajax({
        type: 'GET',
        datatype: 'jsonp',
        url: '/farm_info/'+ farm_id,
          success: function(data) {
              $("#farm_name").text(data[0].farm_name);
              $("#farm_bio").append("<p>"+data[0].farm_bio+"</p>");
           
              var farm_image=data[0].farm_name.replace(/\s/g, '');
              console.log('/img/'+farm_image+".png");
              $("#picture").attr('src', '/img/'+farm_image+".png");
              initMap(data[0].farm_address);
              
          
        },
        error: function (xhr, status, error) {
            console.log("Error : "+ error);
        }
    
      });

}

function initMap(farm_address){
  
    var latitude;
    var longitude;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': farm_address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK)
    {
       
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
  
        var uluru = {lat: latitude, lng: longitude};

        var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 6,
        center: uluru
        });

        var contentString = '<div class="farmAddress">' + results[0].formatted_address+ '</div>';
    
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        }) ;

        var marker = new google.maps.Marker({
        position: uluru,
        map: map
        });

        marker.addListener('click', function(){
            infowindow.open(map, marker);
        });
    }
    });
    
    
}