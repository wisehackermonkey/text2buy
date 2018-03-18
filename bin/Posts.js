var getIDPosts = {
	"get":function(IDPosts){

		var id_num = IDPosts.trim();

		if(id_num.charAt(0) === "#"){

			console.log("Post Id was found!");

			var id_num = id_num.remove("#","");


			var messages = connectdb.get_post_desc(`{"postid":${id_num}}`,function(data){
				console.log(JSON.stringify(data));
				return data;
			});
		}else{
			console.log("Post ID was not found!!");
		}

	}
}


module.exports = getIDPosts;
