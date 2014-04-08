
define(['lodash'], function(_){
	
    var videoExtensions = ['avi', 'mp4', 'mkv', 'mpg', 'mpg4'];

	var isEpisode = function(filename){
		var extension = extractExtension(filename);
		if (extension === null){
			return false;
		}

		return _(videoExtensions).contains(extension);
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