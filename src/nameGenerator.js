define([], function(){
	
    var padNumber = function(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    var generateNewFileName = function (showName, seriesNumber, episodeNumber, fileExtension) {        
        return showName + '_S' + padNumber(seriesNumber, 2) + '_E' + padNumber(episodeNumber, 2) + fileExtension;
	};

	return {
		generateNewFileName: generateNewFileName
	};
});