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
	});
})(jQuery);
