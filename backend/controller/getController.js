var db = require('mysql');
var cn = db.createConnection({
//      host     : '127.0.0.1',
//     port: '15432',
//    // host: "mysql.dept-stslottracker.svc",
//     user: "userDJN",
//     password: "oJm3CWTrfylM1kqB",
//     database: "stsdb"

    host: "us-cdbr-iron-east-05.cleardb.net",
    user: "b7718b4cdd1740",
    password: "7a8cbfff",
    database: "heroku_d601995354af954"
  });;

cn.connect();

//show all lots
function get_all_farms(req,res){
   
        //query database
    cn.query("SELECT * FROM Farm", function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        //return all lots
            res.jsonp(data)

        }

    });
  
}

function get_lot_farms(req,res){
    cn.query("SELECT lt.farm_id as farm_id FROM Lot lt, Retail_Lot rt where lt.lot_id= rt.lot_id and rt.retail_lot_number="+ req.params.lot_number, function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        //return all lots
            cn.query("SELECT * FROM Farm where farm_id="+ data[0].farm_id, function(err, data) {
                if (err){
                    console.log(err);
                    res.send(err);
                }
                else{
                //return all lots
                    res.jsonp(data)
        
                }
        
            });

        }

    });
}

function get_farm_info(req,res){
    cn.query("SELECT * FROM Farm where farm_id="+ req.params.farm_id, function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        //return all lots
            res.jsonp(data)

        }

    });
  
}

function get_all_products(req,res){
    cn.query("SELECT * FROM Item_Type", function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        //return all lots
            res.jsonp(data)

        }

    });
}

function get_product_weights(req,res){
    cn.query("SELECT * FROM Product WHERE item_type_id="+ req.params.item_type_id, function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        //return all lots
            res.jsonp(data)

        }

    });
}

function get_product_farms(req,res){
    cn.query("SELECT fa.farm_id, fa.farm_state,fa.farm_name, fa.farm_address FROM Farm fa, Lot lt, Product pr WHERE lt.product_id=pr.product_id AND lt.farm_id=fa.farm_id AND pr.item_type_id="+req.params.item_type_id, function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        //return all lots
            res.jsonp(data)

        }

    });
}

function get_distinct_states(req,res){
    cn.query("SELECT DISTINCT farm_state FROM Farm", function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        //return all lots
            res.jsonp(data)

        }

    });
}

function get_farm_by_state(req,res){
  
    cn.query("SELECT * FROM Farm WHERE farm_state='"+req.params.farm_state+"'", function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
        //return all lots
            res.jsonp(data)

        }

    });
}

function get_customer_by_email(req,res){
  
    cn.query("SELECT * FROM Customer WHERE customer_email='"+req.params.customer_email+"'", function(err, data) {
    
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
       
            res.jsonp(data)

        }

    });
}

module.exports={
    get_all_farms,
    get_lot_farms,
    get_farm_info,
    get_all_products,
    get_product_weights,
    get_product_farms,
    get_distinct_states,
    get_farm_by_state,
    get_customer_by_email
}