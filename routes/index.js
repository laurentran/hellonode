var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var parseString = require('xml2js').parseString;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET cat page. */
router.get('/randomcat', function(req, res) {
    unirest.get("http://thecatapi.com/api/images/get?format=xml&results_per_page=1")
    .header("api_key", "MTY3ODQ")
    .header("size", "small")
    .end(function (result) {
        console.log(result.body);
        parseString(result.body, function(err, response) {
            console.log(response.response.data[0].images[0].image[0].url[0]);
            var url = response.response.data[0].images[0].image[0].url[0];
            res.render('randomcat', { title: 'Meow' , image: url  });
        });
    });
});

module.exports = router;
