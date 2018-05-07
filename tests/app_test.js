var server   = require('../test'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server

describe('Basic page routes tests', function() {

    it('GET to / should return 200', function(done){
        chai.request(reqServer)
        .get('/')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /views/admin.html should return 200', function(done){
        chai.request(reqServer)
        .get('/views/admin.html')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /views/customer.html should return 200', function(done){
        chai.request(reqServer)
        .get('/views/customer.html')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /views/farmResult.html should return 200', function(done){
        chai.request(reqServer)
        .get('/views/farmResult.html')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /views/searchByLotCode.html should return 200', function(done){
        chai.request(reqServer)
        .get('/views/searchByLotCode.html')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /views/searchByProduct.html should return 200', function(done){
        chai.request(reqServer)
        .get('/views/searchByProduct.html')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /views/searchByState.html should return 200', function(done){
        chai.request(reqServer)
        .get('/views/searchByState.html')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to / should return 200', function(done){
        chai.request(reqServer)
        .get('/')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to / should return 200', function(done){
        chai.request(reqServer)
        .get('/')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /nonexistant route should return 404', function(done){
        chai.request(reqServer)
        .get('/pagecount')
        .end(function(err, res) {
            res.should.have.status(404);
            done();
        })

    })
})

describe('Basic js file routes tests', function() {

    it('GET to /js/index.js should return 200', function(done){
        chai.request(reqServer)
        .get('/')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /js/admin.js should return 200', function(done){
        chai.request(reqServer)
        .get('/js/admin.js')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /js/customer.js should return 200', function(done){
        chai.request(reqServer)
        .get('/js/customer.js')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /js/farmResult.jsshould return 200', function(done){
        chai.request(reqServer)
        .get('/js/farmResult.js')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /js/searchByLotCode.js should return 200', function(done){
        chai.request(reqServer)
        .get('/js/searchByLotCode.js')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /js/searchByProduct.js should return 200', function(done){
        chai.request(reqServer)
        .get('/js/searchByProduct.js')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to /js/searchByState.js should return 200', function(done){
        chai.request(reqServer)
        .get('/js/searchByState.js')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })

    it('GET to / should return 200', function(done){
        chai.request(reqServer)
        .get('/')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })


    it('GET to /js/nonexistant.js route should return 404', function(done){
        chai.request(reqServer)
        .get('/nonexistant.js')
        .end(function(err, res) {
            res.should.have.status(404);
            done();
        })

    })
})

describe('test api routes', function() {
 
    //happy case
    it('Get_all_farms route should work', function(done){


        chai.request(reqServer)
        .get('/farms')
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        })

    })


})

describe('test number errors', function() {
 
    
    it('get_farm_info should not work', function(done){

        chai.request(reqServer)
        .get('/farm_info/hello')
        .end(function(err, res) {
            console.log(res.text);
            chai.assert.equal(res.text,"id param given was not a number");
            done();
        })

    })

    it('get_product_weights should not work', function(done){

        chai.request(reqServer)
        .get('/get_product_weights/hello')
        .end(function(err, res) {
            console.log(res.text);
            chai.assert.equal(res.text,"id param given was not a number");
            done();
        })

    })

    it('get_product_farms should not work', function(done){

        chai.request(reqServer)
        .get('/get_product_farms/hello')
        .end(function(err, res) {
            console.log(res.text);
            chai.assert.equal(res.text,"id param given was not a number");
            done();
        })

    })

})

describe('inserts', function() {
    it('insert farm should work', function(done){

        chai.request(reqServer)
        .post('/insert_farm/Test Name/Test Address/Test Bio/Test State/null/0.1/0.1')
        .end(function(err, res) {
            farm_id=res;
            res.should.have.property["insertID"];
            done();
        })


    })

    it('insert customer should work', function(done){

        chai.request(reqServer)
        .post('/insert_customer/Test Name/Test Last Name/TestEMAIL')
        .end(function(err, res) {
            farm_id=res;
            res.should.have.property["insertID"];
            done();
        })


    })
})

describe('gets should all work', function() {
    it('get farm by lot should work', function(done){

        chai.request(reqServer)
        .get('/lotNumberFarms/5')
        .end(function(err, res) {
           
            res.should.have.status(200);  
             done();
        })


    })

    it('farm_info should work', function(done){

        chai.request(reqServer)
        .get('/lotNumberFarms/96')
        .end(function(err, res) {
           
            res.should.have.status(200);  
             done();
        })


    })

    it('get_products should return data', function(done){

        chai.request(reqServer)
        .get('/get_products')
        .end(function(err, res) {
           
            res.should.have.status(200);  
             done();
        })


    })

    it('get product weights should work', function(done){

        chai.request(reqServer)
        .get('/get_product_weights/10')
        .end(function(err, res) {
           
            res.should.have.status(200);  
             done();
        })


    })

    it('get product farms should work', function(done){

        chai.request(reqServer)
        .get('/get_product_farms/10')
        .end(function(err, res) {
           
            res.should.have.status(200);  
             done();
        })


    })

    it('get distinct states should work', function(done){

        chai.request(reqServer)
        .get('/get_distinct_states')
        .end(function(err, res) {
           
            res.should.have.status(200);  
             done();
        })


    })

    it('get farm by state should work', function(done){

        chai.request(reqServer)
        .get('/get_farm_by_state/Test State')
        .end(function(err, res) {
           
            res.should.have.status(200);  
             done();
        })


    })

    it('get farm by name should work', function(done){

        chai.request(reqServer)
        .get('/get_farm_by_name/Test Farm')
        .end(function(err, res) {
           
            res.should.have.status(200);  
             done();
        })


    })
})
//'/farm/Test Name/Test Address/Test Bio/Test State/0.1/0.1'