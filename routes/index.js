var express = require('express');
var twilio = require('twilio');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var connectdb=require('../bin/db_connect');

let parser = require('../bin/parser');
let Postid = require("../bin/Posts");


router.get('/', function(req, res, next){
   	let message_data = JSON.parse(req.query.message_data);
	console.log(message_data.Body);
    let dbRequest;
	try {dbRequest = parser(message_data);
	} catch(error) {
	}
	// Check if the sms message comming in is a post number quest
	if(message_data.Body.charAt(0) === "@"){
		let search = Postid.get(message_data.Body);
		 var messages = connectdb.get_post_desc({"postid":search},function(data){
                                console.log(data);
				data = data[0];
				let responseMsg = "@"+data.postid+"\n"+data.title.toUpperCase()+"\n\n"+data.description+"\n\n$"+
							data.price+"\n"+data.city;
				res.send(responseMsg);
                        });
	}    
    else if(message_data.Body.substring(0,3).toLowerCase() == 'add') {
		console.log("Tring to add");

            let newPost = message_data.Body.replace("Add:", "");
            // let TestString = "Add: title:Buy House, description: Nice House, Name: Uzair, price: 900000, city: San Francisco";
            // let newPost = TestString.replace("Add:", "");
            let tokens = newPost.split(',');
            let Title =  tokens[0].split(':');
            let Description = tokens[1].split(':');
            let Phone = message_data.From;
            let Name = tokens[2].split(':');
            let Price = tokens[3].split(':');
            Price = parseInt(Price[1].trim());
            let City = tokens[4].split(':');
            dbNewPostObj = {
                title: Title[1].trim(),
                description: Description[1].trim(),
                phone: Phone.trim(),
                name: Name[1],
                price:  Price,
                city: City[1].trim()
            }

		console.log(dbNewPostObj);

            var messages=connectdb.post_items(dbNewPostObj,function(data){
            		console.log(data[0].msg);
                    res.send(data[0].msg);
            });


        }
        else if(typeof(dbRequest.query) != undefined && typeof(dbRequest.city) != undefined) {

		console.log("last if entered");
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
    else {
        let helpString = "invalid entry. Plese type one of the following commands:\n";
        helpString += "-> Query: <query-string>, city:<city>\n";
        helpString += "-> @<post-id>\n";
        helpString += "> Add: title: <title>, description: <description>, name: <name>, price: <price>, city: <city>";
        res.send(helpString);
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
