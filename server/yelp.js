var Yelp = require('yelp');
var dotenv = require('dotenv');
dotenv.load();

var yelp = new Yelp({
  consumer_key: process.env.yelp_consumer_key,
  consumer_secret: process.env.yelp_consumer_secret,
  token: process.env.yelp_token,
  token_secret: process.env.yelp_token_secret, 
});

// See http://www.yelp.com/developers/documentation/v2/search_api
exports.callYelpApi = function(req, res, next){
  var barData =[];
  console.log('yelp.js -- req.body: ' + JSON.stringify(req.body, null, 2));
  yelp.search(req.body)
  .then(function (data) {
    console.log('BUSINESSES ARE ' + data.businesses[0].location.address)
    for(var i=0; i < data.businesses.length; i++) {
      barData.push(data.businesses[i])
    }
    res.data = barData;
    next();
  }).catch(function (err) {
    console.error(err);
  });
};

