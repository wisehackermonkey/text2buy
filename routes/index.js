var express = require('express');
var twilio = require('twilio');
var sqlite = require('sqlite');

var router = express.Router();

/* GET home page. */
router.get('/text2buy', function(req, res, next) {
	/*
	get the message

	
	if message is does not have #
	{
		if the message include add: {
				post the contents in to the sql
		}

		else {
			fire the query to search the title from sql
			repond with the titles
		}
	}
	
	if message has #

	search the item with this id and provide the desciption 
	*/

	//provide the response in 
  res.render('index', { title: 'Express' });
});

module.exports = router;
