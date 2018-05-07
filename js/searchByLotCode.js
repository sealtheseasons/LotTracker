


$( document ).ready(function(){

    /**when submit button is clicked, find farm*/
    $("#enterLotNumber").click(function(){
            findFarm();
    });


});


/**this function will help return the farm based on entered retail lot number*/
function findFarm(){

    /**gets user input for lot number*/
    var lotNumber = $("#lotNumber").val();
    
    if(lotNumber!=""){

        /**makes call to return farm based on entered lot number*/
        $.ajax({
            type: 'GET',
            datatype: 'jsonp',
            url: '/lotNumberFarms/'+ lotNumber,
              success: function(data) {
                  if(data.length<1){
                        alert("We could not find this lot number. Please double check!");
                  }else{
    
                      /**use this farm id on the next page to get info*/
                        window.localStorage.setItem("farm",data[0].farm_id);
    
                        /**redirect to farm result page*/
                        window.location.href = "/views/farmResult.html";
                  }
              
            },
            error: function (xhr, status, error) {
                console.log("Error : "+ error);
            }
        
          });
    } else {
        alert("Please enter a lot number before you search!");
    }
    
    

}
