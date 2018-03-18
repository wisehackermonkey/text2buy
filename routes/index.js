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
/* let db = new sqlite3.Database('./db/text2buy.db');
 var search=JSON.parse("{\"query\":\"cars\",\"city\":\"san jose\"}");
 var city=search.city.toLowerCase();
 var title=search.query.toLowerCase();
 var query=`SELECT postid,title,price FROM posts where (title like "%${title}%" OR description like "%${title}%" ) AND (city="${city}")`;
 db.all(query, function(err, row) {
   		console.log(err);
       console.log(row);
       db.close();
   });*/




 
// //-----------------
// //post to the db
/*var post=JSON.parse("{\"phone\":\"+11111111113\",\"name\":\"xyzabc\",\"title\":\"cars\",\"description\":\"a good cars\",\"price\":22,\"city\":\"san jose\"}");
var description=post.description+"-->phone number:"+post.phone;
var query_post=`INSERT INTO posts(uaid,title,description,price,city,expireson,created,modified) values(15,"${post.title}","${description}","${post.price}","${post.city}",'datetime()','datetime()','datetime()')`;
var query_user=`INSERT INTO users(name,phone)values("${post.name}","${post.phone}")`;

 db.run(query_user,function(err,row){
 	console.log(err,row);
 	db.run(query_post,function(err){
 		console.log(err);
 	});
 });
 db.close();*/
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


// //------------------------------------------------
 res.render('index', { title: 'Express' });
});

module.exports = router;
