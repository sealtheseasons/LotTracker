var item_type;
var product_state;
var farm_state={};
var farm_name={};
var ids=[];

$( document ).ready(function(){

    item_type= document.getElementById("product_dropdown");
    item_type.onchange = function(){
        $('.farm_results').show();
        $('.farm_class').empty();
        console.log("why");
        getStates();
    }
    product_state = document.getElementById("search_state");
    product_state.onclick = function(){
        $(".farm_class").empty();
        getFarms();
    }

   getProducts();


});

/**get the farm that corresponds to the chosen state*/
function getFarms(){

    var chosenState= $('#product_state').val();
    var state;

    for (var key in farm_state) {
        
        /**if the farms that go with a product matches the chosen state, append that farm*/
        if(farm_state[key]==chosenState){
            $('#possible_farms').append('<a onclick="setFarmResult('+key+')" class="state_option" href="/views/farmResult.html">' + farm_name[key]+'</a></div><br>');

        }
   
    }
   

}
    

 function setFarmResult(farm_id){
    window.localStorage.setItem("farm",farm_id);
}


/**this will return the states that correspond to each item_type selected*/
function getStates(){

 
    farms=[];
    var states=[];
    farm_address={};
    farm_name={};

   var item_type_id = $('#product_dropdown').val();
   /**clears state section when new product is selected*/
   $('#product_state').html("");
    var state=$('#product_state').val();

    $.ajax({
         type: 'GET',
         datatype: 'jsonp',
         url: '/get_product_farms/'+ item_type_id,
         success: function(data) {
             $.each(data, function(i, farm)
             {
                
                if(farm.farm_address != "blank address"){

                    /**if the state is not publicated, add to array and append to state dropdown*/
                    if(states.indexOf(farm.farm_state)<0){
                        states.push(farm.farm_state);

                        $('#product_state').append("<option value='"+farm.farm_state+"'>"+farm.farm_state+"</option");
    
                    }

                    /**if the name is not already in name section, add it as a possible farm*/
                    if (!(farm.farm_id in farm_name)){
                        $('#possible_farms').append('<a onclick="setFarmResult('+farm.farm_id+')" class="state_option" href="/views/farmResult.html">' + farm.farm_name+'</a></div><br/>');

                            farm_name[farm.farm_id] = farm.farm_name;    
                            farm_state[farm.farm_id] = farm.farm_state;  
                    }
                }
                
            
            });
         
            $('#state_div').show();
         },
         error: function (xhr, status, error) {
             console.log("Error : "+ error);
         }
 
   });
   

}

/**this function will return all item_types that exist in the database*/
function getProducts(){
    $.ajax({
        type: 'GET',
        datatype: 'jsonp',
        url: '/get_products',
          success: function(data) {
            $.each(data, function(i, product)
            {
              $("#product_dropdown").append("<option id=" +product.item_type_id+" value='"+product.item_type_id+"'>"+product.item_type_name+"</option");
        });
    },
        error: function (xhr, status, error) {
            console.log("Error : "+ error);
        }
    
      });

}

function getState(address){
    
}