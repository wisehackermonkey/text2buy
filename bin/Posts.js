var getIDPosts = {
	"get":function(IDPosts, callback){
		
		var id_num = IDPosts.trim();
		
		if(id_num.charAt(0) === "#"){

			console.log("Post Id was found!");
			
			var id_num = id_num.remove("#","");
			
			var post_list = [];

			var messages = connectdb.get_post_desc(`{"postid":${id_num}}`,function(data){
				// callback(data)
				test+=data;

				// console.log(data);
			});

			return post_list;
		}else{
			console.log("Post ID was not found!!");
		}
		
	}
}


module.exports = getPostID;