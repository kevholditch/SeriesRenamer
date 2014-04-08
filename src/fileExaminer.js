
define([], function(){
	
	var isEpisode = function(filename){
		return false;
	};

	var extractExtension = function(filename){
		return null;
	};

	return {
		isEpisode: isEpisode,
		extractExtension: extractExtension
	};
});