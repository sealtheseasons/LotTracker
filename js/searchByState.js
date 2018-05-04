$( document ).ready(function(){

    	
    getAvailableStates();


});

function getAvailableStates(){

    $.ajax({
        type: 'GET',
        datatype: 'jsonp',
        url: '/get_distinct_states',
          success: function(states) {
            $.each(states, function(i, state)
            {
                if(state.farm_state!=''){
                    var noSpaceState= (state.farm_state).replace(/\s+/g, '');
                    $(".accordion").append('<div class="accordion-head"><h4>'+state.farm_state+'</h4></div><div class="accordion-body"><div id="'+noSpaceState+'"></ul></div>')
                    $.ajax({
                        type: 'GET',
                        datatype: 'jsonp',
                        url: '/get_farm_by_state/'+state.farm_state,
                          success: function(data) {
                            $.each(data, function(i, farm)
                            {
                                console.log(farm);
                                var noSpaceState2= (state.farm_state).replace(/\s+/g, '');
                                console.log(noSpaceState2);
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
            $accordian.find('.accordion-head').on('click', function () {
                console.log("here");
                $accordian.find('.accordion-body').slideUp();
                console.log($(this).next());
                if (!$(this).next().is(':visible')) {
                    console.log("slide");
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