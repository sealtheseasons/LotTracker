//global variables


$( document ).ready(function(){


    $("#enterLotNumber").click(function(){
            findFarm();
    });


});



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
