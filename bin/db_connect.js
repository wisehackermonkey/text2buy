var sqlite3=require('sqlite3').verbose();

var tester={"test":function(callback){
	let db = new sqlite3.Database('./db/text2buy.db');
	var query=`SELECT * FROM posts`;
	db.all(query,function(err,row){
		//console.log(err,row);
		db.close();
		callback(row);
	});

}}

module.exports=tester;