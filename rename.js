
var requirejs = require('./bootstrap').bootstrap(),	
	fileRenamer = requirejs('src/fileRenamer'),
	_ = requirejs('lodash');


var argv = require('optimist')
    .usage('Usage: $0 -showName [string] -inputDir [directoryPath] -outputDir [directoryPath] -execute [flag]')
    .demand(['showName','inputDir', 'outputDir'])
    .argv;


if (argv.execute){
	fileRenamer.performRename(argv.showName, argv.inputDir, argv.outputDir)
		.then(function(files){
			console.log('Renaming...');

			_.each(files, function(file){
				console.log(file.from + '  ->  ' + file.to);
			});

			console.log('Rename complete.');
		});
}else{
	fileRenamer.generateRename(argv.showName, argv.inputDir, argv.outputDir)
		.then(function(files){
			console.log('Will rename...');

			_.each(files, function(file){
				console.log(file.from + '  ->  ' + file.to);
			});
		});
}


