$( document ).ready(function(){

    //when "Add Farm" button is clicked
   $(document).on('click','#create_new_farm',function(){
        add_farm();
   });

   


});

//this function takes admin input and adds farm to the database
function add_farm(){

    //farm location will determine the lat and long
    var farm_lat;
    var farm_lng;

    //these inputs are taken from text inputs on admin.html
    var farm_name=$('#farm_name').val();
    var farm_address=$('#farm_address').val();
    var farm_bio=$('#farm_bio').val();
    
    //this takes initial two letter value of state from dropdown
    var farm_state;
    

    //farm media name will correspond to the unique farm name
    var farm_media=farm_name.replace(/\s/g, '');

    //make sure all of the inputs have values, or an error will be thrown
    if(farm_name != "" && farm_address != "" && farm_bio != "" ){

        $.ajax({
            type: 'GET',
            datatype: 'jsonp',
            url: '/get_farm_by_name/'+ farm_name,
              success: function(data) {
                  //make sure the farm name is unique
                  if(data.length>0){
                        alert("This farm name is already being used. Please choose another name!");
                  
                    }else{
    
                      //the following geocoder will assign values to lat and long variables
                        var geocoder = new google.maps.Geocoder();

                            
                        //this IIFE function ensures the geocoder callback will be complete before moving on in code
                        //takes farm_address as a parameter
                        (function (farm_add) {
                        
                        geocoder.geocode( { 'address': farm_add }, function(results, status) {
                            
                            //execute if the geocoder is successful
                            if (status == google.maps.GeocoderStatus.OK)
                            {
                            
                                //sets lat and long needed for database
                                farm_lat = results[0].geometry.location.lat();
                                farm_lng = results[0].geometry.location.lng();

                                //make sure this is the address the user wants to enter from google
                                if (confirm("Is this the correct address you want to use? "+ results[0].formatted_address)) {
                                    
                                    //find state of the address
                                    var arrAddress = results[0].address_components;
                            
                                    // iterate through address_component array
                                    $.each(arrAddress, function (i, address_component) {
                                        if (address_component.types[0] == "administrative_area_level_1"){
                                            farm_state=address_component.long_name
                                            
                                            return false; // break the loop
                                        } 
                                    });

                                    //calls insert farm post function
                                    $.ajax({
                                        type: 'POST',
                                        datatype: 'jsonp',
                                        url: '/insert_farm/'+farm_name+'/'+results[0].formatted_address+'/'+farm_state+'/'+farm_bio+'/'+farm_media+'/'+farm_lat+'/'+farm_lng,
                                        success: function(data) {
                                            document.farm_image.action="/upload/"+farm_media
                                            document.getElementById("farm_image_form").submit()
                                        
                                            $("#alert_success button").after('<span>Farm successfully added!</span>');
                                            $('#alert_success').fadeIn('slow');
                                        
                                        },
                                        error: function (xhr, status, error) {
                                            alert("Error! Please try again.");
                                            console.log("Error : "+ error);
                                        }
                                    
                                    });

                                //do not input farm if user says it is incorrect
                                } else {
                                    alert("Farm not entered. Please recheck to make sure you have the correct address");
                                } 
                                
                                
                            
                            //if geocoder does not work, console.log the problem     
                            }else{
                                console.log(google.maps.GeocoderStatus);
                                alert("This cannot be completed right now. Please try again later");
                            }
                            }) ;
                        
                        }) (farm_address)
                  }
              
            },
            error: function (xhr, status, error) {
                console.log("Error : "+ error);
            }
        
          });
        
    }else{
        alert("Make sure you have values filled in for all inputs!");
    }

    

    

}


