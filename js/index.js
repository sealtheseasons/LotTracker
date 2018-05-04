


$( document ).ready(function(){
   
    initMap();

  $("#enterLotNumber").click(function(){
        findFarm();
  });


});
function showModal(){
  $('#myModal').modal('show');
}
function findFarm(){
    var lotNumber = $("#lotNumber").val();
    $.ajax({
        type: 'GET',
        datatype: 'jsonp',
        url: '/lotNumberFarms/'+ lotNumber,
          success: function(data) {
              if(data.length>1){
                    console.log("greater than one");
              }else{
                  //use this farm id on the next page to get info
                    window.localStorage.setItem("farm",data[0].farm_id);
                    console.log(data[0].farm_name);
                    window.location.href = "/views/farmResult.html";
              }
          
        },
        error: function (xhr, status, error) {
            console.log("Error : "+ error);
        }
    
      });

}
function setFarmResult(farm_id){
    window.localStorage.setItem("farm",farm_id);
}

function initMap() {

  $.ajax({
    type: 'GET',
    datatype: 'jsonp',
    url: '/farms',
      success: function(data) {
        var uluru;
        var map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 5.5,
        });
        

       
        

        for(var j=0; j < data.length; j++){
          
          if(data[j].farm_address!="blank address"){
            (function (entry) {
              // remember original element as variable entry
                    console.log(entry);
                    latitude = entry.farm_lat;
                    longitude = entry.farm_lng;
                    
                    
                    var contentString = '<div class="farmName"><a onclick="setFarmResult('+entry.farm_id+')" href="/views/farmResult.html">' + entry.farm_name+'</a></br><p>' +entry.farm_address + '</p></div>';
                    var infowindow = new google.maps.InfoWindow({
                      content: contentString
                    }) ;
            
                    
                    var newMark = {lat: latitude, lng: longitude};
                    var marker = new google.maps.Marker({
                      position: newMark,
                      map: map
                    });
                    marker.addListener('click', function(){
                      infowindow.open(map, marker);
                      
                     
                    });
                    map.setCenter(newMark);
                
              
              
            }) (data[j])
          }
          // IIFE
          

          
        
            //////
          
      
        
        }
  

    },
    error: function (xhr, status, error) {
        console.log("Error : "+ error);
    }

  });
    
  }


