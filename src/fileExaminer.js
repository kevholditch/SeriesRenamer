
define([], function(){
	
	var isEpisode = function(filename){
		return false;
	};

	var extractExtension = function(filename){
		var parts = filename.split('.');
		if (parts.length === 1 || (parts[0] === '' && parts.length === 2)){
			return null;
		}
		return parts.pop().toLowerCase();
	};

	return {
		isEpisode: isEpisode,
		extractExtension: extractExtension
	};
});