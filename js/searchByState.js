$( document ).ready(function(){

    //called automatically to get all states in database	
    getAvailableStates();


});

function getAvailableStates(){

    //call that will return all distinct states in database
    $.ajax({
        type: 'GET',
        datatype: 'jsonp',
        url: '/get_distinct_states',
          success: function(states) {
            
            //for each state, create an accordion div that will list all farms
            $.each(states, function(i, state)
            {
                //check that state exists for that farm
                if(state.farm_state!=''){

                    //take spaces out of state in order to put in html
                    var noSpaceState= (state.farm_state).replace(/\s+/g, '');

                    //append the state to accoridon div
                    $(".accordion").append('<div class="accordion-head"><h4>'+state.farm_state+'</h4></div><div class="accordion-body"><div id="'+noSpaceState+'"></ul></div>')
                    
                    //call will get all the farms in a given state
                    $.ajax({
                        type: 'GET',
                        datatype: 'jsonp',
                        url: '/get_farm_by_state/'+state.farm_state,
                          success: function(data) {
                            $.each(data, function(i, farm)
                            {
                                //second state variable with no spaces
                                var noSpaceState2= (state.farm_state).replace(/\s+/g, '');
                              
                                //lists farm under the appropriate state in accodion div
                                $('#'+noSpaceState2).append('<a onclick="setFarmResult('+farm.farm_id+')" class="state_option" href="/views/farmResult.html">' + farm.farm_name+'</a></div><br/>');
                            
                            });
                            
                            
                              
                          
                        },
                        error: function (xhr, status, error) {
                            console.log("Error : "+ error);
                        }
                    
                    });
                }
                
            });

            //Accordian
        $('.accordion').each(function () {
            var $accordian = $(this);

            //when the accordion head is clicked (state name)
            $accordian.find('.accordion-head').on('click', function () {
         
                //find the corresponding accodion body and hide contents
                $accordian.find('.accordion-body').slideUp();

                //if the contents are not visible, expose contents
                if (!$(this).next().is(':visible')) {

                    $(this).next().slideDown();
                }
            });
        });
            
              
          
        },
        error: function (xhr, status, error) {
            console.log("Error : "+ error);
        }
    
    });

    

    
}

function setFarmResult(farm_id){
    window.localStorage.setItem("farm",farm_id);
}