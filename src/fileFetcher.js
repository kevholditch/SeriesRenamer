
define(['fs', 'q', 'src/fileExaminer'], function(fs, $q, fileExaminer) {
	'use strict';

	var fetchFiles = function(dir) {
		var deferred = $q.defer();
		
		fs.readdir(dir, function(err, files){			
			var results = [],
				currentFile;

			for(var i=0; i<files.length; i++){
				currentFile = files[i];
				if (fileExaminer.isEpisode(currentFile)){
					results.push({ 
							folderDir: dir, 
							fileName: fileExaminer.extractFilename(currentFile) , 
							fileExtension: fileExaminer.extractExtension(currentFile) 
						})
				}
			}
			deferred.resolve({episodes: results});
		});

		return deferred.promise;		
	};	

	return {
		fetchFiles: fetchFiles
	};
});
