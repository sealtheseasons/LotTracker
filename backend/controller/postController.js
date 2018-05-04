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



function insert_farm(req,res){
  console.log("INSERT INTO Farm (farm_name, farm_address,farm_state,farm_bio,farm_media,farm_lat,farm_lng) VALUES('"+req.params.farm_name+"','"+req.params.farm_address+"','"+req.params.farm_state+"','"+req.params.farm_bio+"','"+req.params.farm_media+"',"+req.params.farm_lat+","+req.params.farm_lng+")");
    cn.query("INSERT INTO Farm (farm_name, farm_address,farm_state,farm_bio,farm_media,farm_lat,farm_lng) VALUES('"+req.params.farm_name+"','"+req.params.farm_address+"','"+req.params.farm_state+"','"+req.params.farm_bio+"','"+req.params.farm_media+"',"+req.params.farm_lat+","+req.params.farm_lng+")", function(err, data) {
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

function insert_customer(req,res){
  
    cn.query("INSERT INTO Customer (customer_fname, customer_lname,customer_email) VALUES('"+req.params.customer_first_name+"','"+req.params.customer_last_name+"','"+req.params.customer_email+"')", function(err, data) {
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

module.exports={
    insert_farm,
    insert_customer
}