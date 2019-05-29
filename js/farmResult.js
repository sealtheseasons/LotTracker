
$( document ).ready(function(){
    getFarm();

});

/**this function will present farm information */
function getFarm(){

    /**gets the farm id from local session info. This will be the farm presented*/
    var farm_id = window.localStorage.getItem("farm");

    /**make sure id was stored*/
    if(farm_id== undefined){
        alert("no farm has been selected");
        window.location.href = "/";

    }else{
        /**this ajax function will retrieve farm data*/
        $.ajax({
            type: 'GET',
            datatype: 'jsonp',
            url: '/farm_info/'+ farm_id,
            success: function(data) {
                
                /**on success, the farm data will be added to the farm result page*/
                $("#farm_name").text(data[0].farm_name);
                $("#mini_farm").text("About "+data[0].farm_name);
                $("#farm_bio").append("<p>"+data[0].farm_bio+"</p>");
            
                var farm_image=data[0].farm_name.replace(/\s/g, '');

                /**check if image exists corresponding to image name*/
                $.ajax({
                    url:'/img/'+farm_image+'.png',
                    type:'HEAD',
                    error: function()
                    {
                        /**the image does not exist--- use default image*/
                        $("#picture").attr('src', '/img/default.png');
                        
                    },
                    success: function()
                    {
                        /**the image exists in files*/
                        $("#picture").attr('src', '/img/'+farm_image+".png");      
                    }
                });
       

                /**sets google api map*/
                initMap(data[0].farm_address);
                
            
            },
            error: function (xhr, status, error) {
                console.log("Error : "+ error);
            }
        
        });
    }
   
    

}

/**this will present farm on google map*/
function initMap(farm_address){
  
    var latitude;
    var longitude;

    /**the geocoder will get latitude and longitude from google api using address*/
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': farm_address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {
        /**sets latitude and longitude from address results*/
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
    
            /**sets marker location on map*/
            var uluru = {lat: latitude, lng: longitude};

            /**creates new google map*/
            var map = new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 6,
            center: uluru
            });

            /**set the text that the marker will contain*/
            var contentString = '<div class="farmAddress">' + results[0].formatted_address+ '</div>';
        
            /**creates a new info window for when marker is clicked*/
            var infowindow = new google.maps.InfoWindow({
            content: contentString
            }) ;

            /**creates a new marker at the position on a given map*/
            var marker = new google.maps.Marker({
            position: uluru,
            map: map
            });

            /**implements the info window to open when clicked*/
            marker.addListener('click', function(){
                infowindow.open(map, marker);
            });
        }else{
            alert("Location unavailable!");
        }
    });
    
    
}
