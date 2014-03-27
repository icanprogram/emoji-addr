Array.prototype.getKeyByValue = function(value) {
	for(var key in this){
		if(this.hasOwnProperty(key)){
			if(this[key] === value){
				return key;
			}
		}
	}
};

(function($){
	var emoji_mapping = [];
	var setupEmoji = function(){
		emoji.include_title = true;
		emoji.img_path = "/emoji-addr/emoji/";
		
		$.getJSON("./res/emojimapping.json", function(mapping){
			emoji_mapping = mapping;
		});
	}

	$(function(){
		setupEmoji();
		
		$("#address").on('keyup', function(e){
			var address = $(this).val(), emojis = "";
			for(var i=0; i < address.length; i++){
				var integer = base58.decode(address[i]);
				emojis += emoji_mapping[integer];
			}
			$("#emojis").html(emoji.replace_colons(emojis));
			$("#emojis-flat").text(emojis);
		});
		
		$("#emojis-input").on('keyup', function(e){
			var emojis = $(this).val().substr(1, $(this).val().length-2).split("::"), address = "";
			
			
			for(var i=0; i < emojis.length; i++){
				var integer = parseInt(emoji_mapping.getKeyByValue(":" + emojis[i] + ":"));
				address += base58.encode(integer);
			}
			
			$("#d_coinaddress").text(address);
		});
	});
})(jQuery);
