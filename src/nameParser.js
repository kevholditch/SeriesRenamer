
define([], function(){
	
    var getShowDetails = function (filename) {
        var seriesNumberRegex = /s(\d+)/gi;
        var matchSeries = seriesNumberRegex.exec(filename);
        
        var episodeNumberRegex = /e(\d+)/gi;
        var matchEpisodes = episodeNumberRegex.exec(filename);

        return {
            seriesNumber: parseInt(matchSeries[1], 10),
            episodeNumber: parseInt(matchEpisodes[1], 10)
        };
	};

	return {
		getShowDetails: getShowDetails
	};
});