var db = require('mysql');

/**determines whether its production database or testing database*/
var database_connection= global.globalDB;
var cn = db.createConnection(database_connection);

/**connect to given database*/
cn.connect();


/**used from admin.html this function will insert a new farm into database*/
function insert_farm(req,res){
    
    /**query that inserts farm*/
    cn.query("INSERT INTO Farm (farm_name, farm_address,farm_state,farm_bio,farm_media,farm_lat,farm_lng) VALUES('"+req.params.farm_name+"','"+req.params.farm_address+"','"+req.params.farm_state+"','"+req.params.farm_bio+"','"+req.params.farm_media+"',"+req.params.farm_lat+","+req.params.farm_lng+")", function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
            /**returns id data of inserted farm*/
            res.jsonp(data)

        }

    });
    
}

/**this is used from subscription page to insert into customer table of database*/
function insert_customer(req,res){
    
    /**query that adds a new customer*/
    cn.query("INSERT INTO Customer (customer_fname, customer_lname,customer_email) VALUES('"+req.params.customer_first_name+"','"+req.params.customer_last_name+"','"+req.params.customer_email+"')", function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
            /**returns inserted customer id*/
            res.jsonp(data)

        }

    });
    
}

/**this will delete a farm from the database based on given id*/
function delete_farm(req,res){
    
    /**query that deletes from database*/
    cn.query("DELETE FROM Farm WHERE farm_id="+req.params.farm_id, function(err, data) {
        if (err){
            console.log(err);
            res.send(err);
        }
        else{
            res.jsonp(data)

        }

    });
    
}

/**make functions accessible to routes page*/
module.exports={
    insert_farm,
    insert_customer,
    delete_farm
}