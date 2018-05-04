module.exports = function(app) {
    var getAPI = require('./controller/getController.js');
    var postAPI = require('./controller/postController.js');
  
    app.route('/farms') // show all lot numbers and information
          .get(getAPI.get_all_farms);
    
    app.route('/lotNumberFarms/:lot_number')
        .get(getAPI.get_lot_farms);
    
    app.route('/farm_info/:farm_id')
        .get(getAPI.get_farm_info);
    
    app.route('/get_products')
        .get(getAPI.get_all_products);
    
    app.route('/get_product_weights/:item_type_id')
        .get(getAPI.get_product_weights);
    
    app.route('/get_product_farms/:item_type_id')
        .get(getAPI.get_product_farms);

    app.route('/get_distinct_states')
        .get(getAPI.get_distinct_states);
    
    app.route('/get_farm_by_state/:farm_state')
        .get(getAPI.get_farm_by_state);
    
    app.route('/get_customer_by_email/:customer_email')
        .get(getAPI.get_customer_by_email);
    
    app.route('/insert_farm/:farm_name/:farm_address/:farm_state/:farm_bio/:farm_media/:farm_lat/:farm_lng')
        .post(postAPI.insert_farm);
    
    app.route('/insert_customer/:customer_first_name/:customer_last_name/:customer_email')
        .post(postAPI.insert_customer);
        
}  