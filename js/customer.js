$( document ).ready(function(){
    $(document).on('click','#create_new_customer',function(){
         add_farm();
    });
 });
 
 function add_farm(){
     var first_name=$('#first_name').val();
     var last_name=$('#last_name').val();
     var email=$('#email').val();

     $.ajax({
        type: 'GET',
        datatype: 'jsonp',
        url: '/get_customer_by_email/'+email,
          success: function(data) {
            if(data.length>0){
                alert("This email has already been used for subscription");
            }else{
                $.ajax({
                    type: 'POST',
                    datatype: 'jsonp',
                    url: '/insert_customer/'+first_name+'/'+last_name+'/'+email,
                      success: function(data) {
                        alert("You have been successfully subscribed!");
                      
                    },
                    error: function (xhr, status, error) {
                        console.log("Error : "+ error);
                    }
                
                  });
            }
          
        },
        error: function (xhr, status, error) {
            console.log("Error : "+ error);
        }
    
      });

     
 
 }
 