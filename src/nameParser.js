
define([], function(){
	
    var getShowDetails = function (filename) {


        var threeDigitNamingRegex = /(\d)(\d\d)/
        var threeDigitMatchResult = threeDigitNamingRegex.exec(filename);

        if (threeDigitMatchResult){
            return {
                seriesNumber: parseInt(threeDigitMatchResult[1], 10),
                episodeNumber: parseInt(threeDigitMatchResult[2], 10)
            }
        }


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