$( document ).ready(function(){
   $(document).on('click','#create_new_farm',function(){
        add_farm();
   });

   


    $('.alert_template .close').click(function(e) {
        $('#alert_template').fadeOut('slow');
    });

   


});

function add_farm(){
    var farm_name=$('#farm_name').val();
    var farm_address=$('#farm_address').val();
    var farm_bio=$('#farm_bio').val();
    var farm_lat;
    var farm_lng;
    var farm_state=$('#farm_state').val();
    farm_state=$("#farm_state option[value='"+farm_state+"']").text();
    var farm_media=farm_name.replace(/\s/g, '');
    console.log(farm_state);
    var geocoder = new google.maps.Geocoder();
        (function (farm_add) {
          // remember original element as variable entry
          geocoder.geocode( { 'address': farm_add}, function(results, status) {
          
            if (status == google.maps.GeocoderStatus.OK)
            {
                farm_lat = results[0].geometry.location.lat();
                farm_lng = results[0].geometry.location.lng();

                $.ajax({
                    type: 'POST',
                    datatype: 'jsonp',
                    url: '/insert_farm/'+farm_name+'/'+farm_address+'/'+farm_state+'/'+farm_bio+'/'+farm_media+'/'+farm_lat+'/'+farm_lng,
                      success: function(data) {
                        document.farm_image.action="/upload/"+farm_media
                        document.getElementById("farm_image_form").submit()
                       
                        $("#alert_success button").after('<span>Farm successfully added!</span>');
                        $('#alert_success').fadeIn('slow');
                      
                    },
                    error: function (xhr, status, error) {
                        $("#alert_error button").after('<span>Error! Please try again.</span>');
                        $('#alert_error').fadeIn('slow');
                        console.log("Error : "+ error);
                    }
                
                  });
                
            }
            }) ;
         
        }) (farm_address)

    

}


