
define(['fs', 'q'], function(fs, $q) {
	'use strict';

	var fetchFiles = function(dir) {
		var deferred = $q.defer();

		fs.readdir(dir, function(err, files){			
			for(var i=0; i<files.length; i++){
				console.log(files[i]);				
			}
			deferred.resolve({episodes: files});
		});

		return deferred.promise;		
	};	

	return {
		fetchFiles: fetchFiles
	};
});
