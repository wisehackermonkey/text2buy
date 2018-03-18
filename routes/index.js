var express = require('express');
var twilio = require('twilio');
var sqlite3=require('sqlite3').verbose();
var router = express.Router();
var connectdb=require('../bin/db_connect');
// var db = new sqlite3.Database('./db/text2buy.db');
 
 // let db = new sqlite3.Database('./db/text2buy.db');
 
 /*router.get('/text2buy', function(req, res, next) {
  // insert one row into the langs table
  db.all('SELECT * FROM users', function(err,row) {
    try{
	    if (err) {
	      throw err.message;
	    }else{
	    // get the last insert id
	    	console.log(`A row has been inserted with rowid ${JSON.stringify(row)}`);
		}
	}catch(err){
		console.log(`${err}`)
	}
  });
 
  // close the database connection
  // db.close();
  res.render('index', { title: 'Express' });
});*/
router.get('/text2buy', function(req, res, next) {
// //search the db
// /*var search=JSON.parse("{\"query\":\"cars\",\"city\":\"san jose\"}");
// var city=search.city.toLowerCase();
// var title=search.query.toLowerCase();
// var query=`SELECT postid,title,price FROM posts where (title like "%${title}%" OR description like "%${title}%" ) AND (city="${city}")`;
// db.all(query, function(err, row) {
//   		console.log(err);
//       console.log(row)
//   });
// db.close();*/
// //-----------------

// //post to the db
// var post=JSON.parse("{\"phone\":\"+11111111113\",\"name\":\"xyzabc\",\"title\":\"cars\",\"description\":\"a good cars\",\"price\":22,\"city\":\"san jose\"}");
// var description=post.description+"-->phone number:"+post.phone;

// var query_post=`INSERT INTO posts(uaid,title,description,price,city,expireson,created,modified) values(15,"${post.title}","${description}","${post.price}","${post.city}",'datetime()','datetime()','datetime()')`;
// var query_user=`INSERT INTO users(name,phone)values("${post.name}","${post.phone}")`;

// db.run(query_user,function(err,row){
// 	console.log(err,row);
// 	db.run(query_post,function(err){
// 		console.log(err);
// 	});
// });
// db.close();
// //-----------------------




//------get the post description
/*let db = new sqlite3.Database('./db/text2buy.db');
var post_seach=JSON.parse(`{"postid":8}`);
id=parseInt(post_seach.postid);
var tables = ["postid","uaid","title","description","price","city"];
var query=`SELECT ${tables.join(",")} FROM posts where postid=${id}`;

// var query_user="select * from posts";
db.all(query,function(err,row){
	console.log(err,row[0]);
// console.log(JSON.stringify(this));
db.close();
});
*/

///a tester function
console.log("connecting to db");
var messages=connectdb.test(function(data){
	console.log(data);
});



// //------------------------------------------------



// 	/*
// 	get the message

	
// 	if message is does not have #
// 	{
// 		if the message include add: {
// 				post the contents in to the sql
// 		}

// 		else {
// 			fire the query to search the title from sql
// 			repond with the titles
// 		}
// 	}
	
// 	if message has #

// 	search the item with this id and provide the desciption 
// 	*/

// 	//provide the response in 
 res.render('index', { title: 'Express' });
});

router.get('/testing', function(req, res, next){ 
   	var message_data = JSON.parse(req.query.message_data);
   	// res.send("Thank you for requesting posts for : " + message_data.Body);
    var messages=connectdb.test(function(data){
    	// TODO: formate data into userfriendly
    	let postList = "";
    	data.forEach(function(post, index){
    		let template = `#${post.postid} Title: ${post.title}, Price: $ ${post.price}`;
    		postList += template + '\n';
    	})
		res.send(postList);
	});

});

module.exports = router;
