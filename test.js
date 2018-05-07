var express = require('express'),
  app = express(),

  port = process.env.PORT || 8081,
  ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
  bodyParser = require('body-parser');


var db_config= require('./database_config.js');
var db = require('mysql');
//try and repush code etc
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

global.globalDB={
    host: "h7xe2knj2qb6kxal.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "o1p4jl162g2mmn5y",
    password: "k9gzd34oqdg40mzx",
    database: "qba5flb42gpskk2s"
};


const path  = require('path');
const VIEWS = path.join(__dirname,"views");
const js = path.join(__dirname,"js");
const css = path.join(__dirname,"css");
const img = path.join(__dirname,"img");

bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile('index.html',{root:VIEWS});
});

app.get('/views/:html_page', function(req, res) {
  res.sendFile(req.params.html_page,{root:VIEWS});
});

app.get('/js/:js_page', function(req, res) {
  res.sendFile(req.params.js_page,{root:js});
});

app.get('/css/index.css', function(req, res) {
  res.sendFile('index.css',{root:css});
});


app.get('/img/:image_name', function(req, res) {
  res.sendFile(req.params.image_name,{root:img});
});



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var routes = require('./backend/routes.js');
routes(app);



var multer= require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
     callback(null, "./img");
   },
   filename: function (req, file, callback) {
      callback(null, req.params.image_name+".png");
   }
})

var upload = multer({ storage: storage }).single('file');

app.post('/upload/:image_name', function (req, res, next) {
  upload(req, res, function(err) {
    targetPath = path.resolve('./uploads/image.png');
      if (err) {return next(err)}
      res.redirect('/views/admin.html');
  })
});




var server= app.listen(port,ip);

module.exports= server;


console.log('RESTful API server started on: ' + port);