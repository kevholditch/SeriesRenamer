
define(['fs', 'q', 'lodash', 'src/fileExaminer', 'src/nameParser'], function(fs, $q, _, fileExaminer, nameParser) {
	'use strict';

	var getEpisodes = function(dir, files){
		var results = [],
			currentFile;
		for(var i=0; i<files.length; i++){
			currentFile = files[i];
			
			if (dir[dir.length - 1] !== '/'){
				dir += '/';
			}
			if (fs.lstatSync(dir + currentFile).isFile() && fileExaminer.isEpisode(currentFile)){
				var showDetails = nameParser.getShowDetails(currentFile);			
			    results.push({
			        folderDir: dir,
			        fileName: fileExaminer.extractFilename(currentFile),
			        fileExtension: fileExaminer.extractExtension(currentFile),
			        fullFilePath: dir + currentFile,
			        seriesNumber: showDetails.seriesNumber,
			        episodeNumber: showDetails.episodeNumber
			    });
				
			}
		}
		return results;
	};

	var processDir = function(dir){
		var deferred = $q.defer();
		
		fs.readdir(dir, function(err, files){			
			var results = getEpisodes(dir, files);		
			deferred.resolve(results);
		});

		return deferred.promise;
	};

	var fetchFiles = function(dir) {
		var deferred = $q.defer();
		
		fs.readdir(dir, function(err, files){			
			var promises = [];
			promises.push(processDir(dir));

			for(var i=0; i<files.length; i++){
				if (fs.lstatSync(dir + files[i]).isDirectory()){
					promises.push(processDir(dir + files[i]));
				}
			}		

			$q.all(promises).then(function(promiseResults){								
				deferred.resolve({episodes: _.flatten(promiseResults)});
			});
			
		});

		return deferred.promise;		
	};	

	return {
		fetchFiles: fetchFiles
	};
});
