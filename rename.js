
var requirejs = require('./bootstrap').bootstrap(),	
	fileRenamer = requirejs('src/fileRenamer');


var argv = require('optimist')
    .usage('Usage: $0 -showName [string] -inputDir [directoryPath] -outputDir [directoryPath] -execute [flag]')
    .demand(['showName','inputDir', 'outputDir'])
    .argv;


if (argv.execute){

}else{
	fileRenamer.generateRename(argv.showName, argv.inputDir, argv.outputDir)
		.then(function(files){
			console.log(files);
		});
}


