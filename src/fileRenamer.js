
define(['q', 'lodash', 'src/fileFetcher', 'src/nameGenerator'], function($q, _, fileFetcher, nameGenerator){
	
    var generateRename = function(showName, fromDir, toDir){

    	var deferred = $q.defer();
    	fileFetcher.fetchFiles(fromDir).then(function(files){
    		var results = _.map(files.episodes, function(episode){ 
				return {
							from: episode.fullFilePath,
							to: toDir + nameGenerator.generateNewFileName(showName, episode.seriesNumber, episode.episodeNumber, episode.fileExtension)
						};					
			});

    		deferred.resolve(results);
    	});    	

    	return deferred.promise;
    
	};


	return {
		generateRename: generateRename
	};
});