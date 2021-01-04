// Setup:
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const wooConfig = require('../Database/dbconnect.json');
let WooCommerce
WooCommerce = new WooCommerceRestApi({
  url: wooConfig.url, // Your store URL
  consumerKey: wooConfig.consumerKey, // Your consumer key
  consumerSecret: wooConfig.consumerSecret, // Your consumer secret
  version: wooConfig.version, // WooCommerce WP REST API version

 
});


module.exports = WooCommerce
