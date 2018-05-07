$( document ).ready(function(){

    /**execute when "subscribe" button is clicked*/
    $(document).on('click','#create_new_customer',function(){
         add_customer();
    });

 });
 
 /**this function will add a new customer to the database*/
 function add_customer(){

    /**variables assigned from text inputs on customer.html*/
     var first_name=$('#first_name').val();
     var last_name=$('#last_name').val();
     var email=$('#email').val();

     /**no values here can be left blank*/
     if(first_name!="" && last_name!="" && email!=""){
        /**this ajax call will make sure that the given email does not already exist in database. Must be unique*/
        $.ajax({
            type: 'GET',
            datatype: 'jsonp',
            url: '/get_customer_by_email/'+email,
            success: function(data) {

                if(data.length>0){
                    alert("This email has already been used for subscription");

                }else{

                    /**if email does not exist in database, this ajax function will add new subscriber*/
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
     }else{
         alert("Please make sure all values are filled in!");
     }

     

     
 
 }
 