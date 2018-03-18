var express = require('express');
var twilio = require('twilio');
var sqlite3=require('sqlite3').verbose();
var router = express.Router();
var connectdb=require('../bin/db_connect');

router.get('/text2buy', function(req, res, next) {

////----------------------> done

console.log("connecting to db");
var messages=connectdb.test(function(data){
	console.log(data);
});

var search=JSON.parse("{\"query\":\"cars\",\"city\":\"san jose\"}");
var messages=connectdb.search(search, function(data){
	console.log(data);
});

var post_search=JSON.parse(`{"postid":8}`);
var messages=connectdb.get_post_desc(post_search,function(data){
	console.log(data);
});

var post=JSON.parse("{\"phone\":\"+1111110000\",\"name\":\"xyzabc\",\"title\":\"cars\",\"description\":\"a good cars\",\"price\":22,\"city\":\"san jose\"}");
var messages=connectdb.post_items(post,function(data){
	console.log(data);
});

// //------------------------------------------------
 res.render('index', { title: 'Express' });
});

module.exports = router;
