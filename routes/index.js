var express = require('express');
var twilio = require('twilio');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var connectdb=require('../bin/db_connect');

let parser = require('../bin/parser');
let Postid = require("../bin/Posts");


router.get('/', function(req, res, next){
   	let message_data = JSON.parse(req.query.message_data);

	let dbRequest = parser(message_data);
	// Check if the sms message comming in is a post number quest
	if(message_data.Body.charAt(0) === "#"){
		let search = Postid.get(message_data.Body);
		console.log(search);
		res.send(search);
	}else if(dbRequest.query && dbRequest.city) {

		let messages=connectdb.search(dbRequest, function(data){
			console.log(data);
			let postList = "";
	    	data.forEach(function(post, index){
	    		let template = `#${post.postid} Title: ${post.title}, Price: $ ${post.price}`;
	    		postList += template + '\n';
	    	});
			res.send(postList);
		});

	}

   	// res.send("Thank you for requesting posts for : " + message_data.Body);
    // var messages=connectdb.test(function(data){
    // 	// TODO: formate data into userfriendly
    // 	let postList = "";
    // 	data.forEach(function(post, index){
    // 		let template = `#${post.postid} Title: ${post.title}, Price: $ ${post.price}`;
    // 		postList += template + '\n';
    // 	})
	// 	res.send(postList);
	// });



	////----------------------> done
//
// 	console.log("connecting to db");
// 	var messages=connectdb.test(function(data){
// 		console.log(data);
// 	});
//
// 	// var search=JSON.parse("{\"query\":\"cars\",\"city\":\"san jose\"}");
//
//
// 	var post_search=JSON.parse(`{"postid":8`);
// 	var messages=connectdb.get_post_desc(post_search,function(data){
// 		console.log(data);
// 	});
//
// 	var post=JSON.parse("{\"phone\":\"+1111110000\",\"name\":\"xyzabc\",\"title\":\"cars\",\"description\":\"a good cars\",\"price\":22,\"city\":\"san jose\"}");
// 	var messages=connectdb.post_items(post,function(data){
// 		console.log(data);
// 	});
//
// 	// //------------------------------------------------
// 	 res.render('index', { title: 'Express' });
});


module.exports = router;
