var db = require('mysql');
/**determines whether its production database or testing database*/
var database_connection= global.globalDB;
var cn = db.createConnection(database_connection);

/**connect to given database*/
 cn.connect();

/**show all farms. Used for google map on index.js*/
function get_all_farms(req,res){
    
 
    /**query database for all farms*/
    cn.query("SELECT * FROM Farm", function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        /**return all farms*/
            res.jsonp(data)

        }

    });
    
  
}

/**returns all farms attached to a retail lot number-- called from searchByLotNumber*/
function get_lot_farms(req,res){
   
    /**query database with given retail lot number*/
    cn.query("SELECT lt.farm_id as farm_id FROM Lot lt, Retail_Lot rt where lt.lot_id= rt.lot_id and rt.retail_lot_number="+ req.params.lot_number, function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{

            /**check if that lot number exists*/
            if(data.length!=0){

                /**using returned farm id, query database for corresponding darm*/
                /**nested like this to avoid asynchronous issue*/
                cn.query("SELECT * FROM Farm where farm_id="+ data[0].farm_id, function(err, data) {
                    if (err){
                        console.log(err);
                        res.send(err);
                    }
                    else{
                    
                        /**return selected farm*/
                        res.jsonp(data)
            
                    }
            
                });

            } else{ 
                /**send back empty data to be parsed as error by JS*/
                res.send(data);

            }
            

        }

    });

}

/**returns information that will be presented on farmResult.html page*/
function get_farm_info(req,res){
  
    
    /**check if given farm id is a number, or error will be thrown*/
    if(!isNaN(req.params.farm_id)){

        /**query for farm corresponding to given farm id */
        cn.query("SELECT * FROM Farm where farm_id="+ req.params.farm_id, function(err, data) {
            if (err){
                console.log(err);
                res.send(err);
            }
            else{
                /**return farm information*/
                res.jsonp(data)

            }

        });
    } else{
        res.send("id param given was not a number");
    }
    
    
  
}

/**this will be used to return all products into drop down on search by product page*/
function get_all_products(req,res){
    
    /**query for all item types*/
    cn.query("SELECT * FROM Item_Type", function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        /**return all item types*/
            res.jsonp(data)

        }

    });
   
}

/**will show all product weights that correspond to a given item type*/
function get_product_weights(req,res){

    /**check if given item type id is a number, or error will be thrown*/
    if(!isNaN(req.params.item_type_id)){

        /**query for all product weights*/
        cn.query("SELECT * FROM Product WHERE item_type_id="+ req.params.item_type_id, function(err, data) {
            if (err){
                console.log(err);
                res.send(err);
            }
            else{
            /**return all lots*/
                res.jsonp(data)

            }

        });
    }else{
        res.send("id param given was not a number");
    }
    
}

/**gets all farms that produce a given item type*/
function get_product_farms(req,res){
    
    /**check if given item type id is a number, or error will be thrown*/
    if(!isNaN(req.params.item_type_id)){

        /**query for all farms that produce certain item type*/
        cn.query("SELECT fa.farm_id, fa.farm_state,fa.farm_name, fa.farm_address FROM Farm fa, Lot lt, Product pr WHERE lt.product_id=pr.product_id AND lt.farm_id=fa.farm_id AND pr.item_type_id="+req.params.item_type_id, function(err, data) {
            if (err){
                console.log(err);
                res.send(err);
            }
            else{
            /**return all farms*/
                res.jsonp(data)

            }

        });
    }else{
        res.send("id param given was not a number");
    }
 
}

/**simple function to return all states present in the database*/
function get_distinct_states(req,res){
 
    /**get distint states present*/
    cn.query("SELECT DISTINCT farm_state FROM Farm", function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        /**return all states*/
            res.jsonp(data)

        }

    });
   
}

/**get all farms that are present in a certain state*/
function get_farm_by_state(req,res){
  
    /**query database for farms in a given state param*/
    cn.query("SELECT * FROM Farm WHERE farm_state='"+req.params.farm_state+"'", function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        /**return all farms in state*/
            res.jsonp(data)

        }

    });
   
}

/**used to determine if a customer email is already present in the database*/
function get_customer_by_email(req,res){
  
    /**query for a given email in the customer table*/
    cn.query("SELECT * FROM Customer WHERE customer_email='"+req.params.customer_email+"'", function(err, data) {
    
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
            /**return customer data for given email*/
            res.jsonp(data)

        }

    });
  
}

function get_farm_by_name(req,res){
    /**query for a farm with a given name*/
    cn.query("SELECT * FROM Farm WHERE farm_name='"+req.params.farm_name+"'", function(err, data) {
    
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
            /**return farm data for given name*/
            res.jsonp(data)

        }

    });
}

/**make functions accessible to routes page*/
module.exports={
    get_all_farms,
    get_lot_farms,
    get_farm_info,
    get_all_products,
    get_product_weights,
    get_product_farms,
    get_distinct_states,
    get_farm_by_state,
    get_customer_by_email,
    get_farm_by_name
}