
define(['q', 'fs', 'lodash', 'src/fileFetcher', 'src/nameGenerator'], function($q, fs, _, fileFetcher, nameGenerator){
	
    var generateRename = function(showName, fromDir, toDir) {

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

	var performRename = function(showName, fromDir, toDir) {
		var deferred = $q.defer();

		generateRename(showName, fromDir, toDir)
			.then(function(files){				
				var promises = [];
				var moveFile = $q.denodeify(fs.rename);
				for(var i=0; i<files.length; i++){
					promises.push(moveFile(files[i].from, files[i].to));
				}
				$q.all(promises).then(function(){
					deferred.resolve();
				});
				
			});

		return deferred.promise;
	};


	return {
		generateRename: generateRename,
		performRename: performRename
	};
});