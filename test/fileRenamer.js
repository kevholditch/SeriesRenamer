var requirejs = require('../bootstrap').bootstrap(),        
    fileRenamer = requirejs('src/fileRenamer'),
    demand = requirejs('must'),
    fs = requirejs('fs'),
    _ = requirejs('lodash'),
    $q = requirejs('q');

describe('file renamer', function() {        

    var getBasedOnFrom;

    beforeEach(function(){
        getBasedOnFrom = function(results, fromPath){
                return _.find(results, function(r){ return r.from === fromPath; });
            };
    });

    describe('when getting rename information for a normal folder structure', function(){
        var results, seriesPath, outputDir;

        beforeEach(function(done){   
            seriesPath = __dirname + '/testSeries1/';         
            outputDir = __dirname + '/output/';
            
            fileRenamer.generateRename('Great_Show', seriesPath, outputDir).then(function(data){
                results = data;
                done();
            });
        });

        it('should return 4 renames', function() {
            results.length.must.be(4);    
        });

        it('should return the rename information for each episode correctly', function() {                    
            getBasedOnFrom(results, seriesPath + 'random_show_S01_E01_www.downloadthis.com.avi').to.must.be(outputDir + 'Great_Show_S01_E01.avi');
            getBasedOnFrom(results, seriesPath + 'random_show_S01_E02_www.downloadthis.com.avi').to.must.be(outputDir + 'Great_Show_S01_E02.avi');
            getBasedOnFrom(results, seriesPath + 'random_show_S01_E03_www.downloadthis.com.avi').to.must.be(outputDir + 'Great_Show_S01_E03.avi');
            getBasedOnFrom(results, seriesPath + 'random_show_S01_E04_www.downloadthis.com.mp4').to.must.be(outputDir + 'Great_Show_S01_E04.mp4');                
        });
    });

    describe('when getting rename information for a nested folder structure', function(){
        var results, seriesPath, outputDir;

        beforeEach(function(done){   
            seriesPath = __dirname + '/testSeries2/';         
            outputDir = __dirname + '/output/';

            fileRenamer.generateRename('Great_Show', seriesPath, outputDir).then(function(data){
                results = data;
                done();
            });
        });

        it('should return 4 renames', function() {
            results.length.must.be(4);    
        });

        it('should return the rename information for each episode correctly', function() {                    
            getBasedOnFrom(results, seriesPath + 'thanks_for_downloading/' + 'random_show_S01_E01_www.downloadthis.com.avi').to.must.be(outputDir + 'Great_Show_S01_E01.avi');
            getBasedOnFrom(results, seriesPath + 'Show_Episode_2/' + 'random_show_S01_E02_www.downloadthis.com.avi').to.must.be(outputDir + 'Great_Show_S01_E02.avi');
            getBasedOnFrom(results, seriesPath + 'Show_3/' + 'random_show_S01_E03_www.downloadthis.com.avi').to.must.be(outputDir + 'Great_Show_S01_E03.avi');
            getBasedOnFrom(results, seriesPath + 'random_show_S01_E04_www.downloadthis.com.mp4').to.must.be(outputDir + 'Great_Show_S01_E04.mp4');                
        });
    });

    describe('when performing a rename', function(){
        var inputDir, outputDir;

        var deleteFolderRecursive = function(path) {
          if( fs.existsSync(path) ) {
                fs.readdirSync(path).forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.lstatSync(curPath).isDirectory()) { e
                    deleteFolderRecursive(curPath);
                } else { 
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
          }
        };

        beforeEach(function(done){   
            inputDir = __dirname + '/testInput/';         
            outputDir = __dirname + '/testOutput/';

            var writeFile = $q.denodeify(fs.writeFile);
            fs.mkdir(inputDir, function(){
                fs.mkdir(outputDir, function(){
                    var promises = [];
                    for(var i=0; i<4; i++){
                        promises.push(writeFile(inputDir + 'my_funky_show_s01e0' + (i+1) + '_www.downloadthis.avi'));
                    }
                    $q.all(promises).then(function(results){
                        done();
                    });
                });
            });

        });

        beforeEach(function(done){
            fileRenamer.performRename('Great_Show', inputDir, outputDir).then(function(){
                done();
            });
        });
        
        it('should rename the files into the output dir', function(done) {
            fs.readdir(outputDir, function(err, files){                
                _.where(files, function(f){ return f === "Great_Show_S01_E01.avi"}).length.must.be(1);
                _.where(files, function(f){ return f === "Great_Show_S01_E02.avi"}).length.must.be(1);
                _.where(files, function(f){ return f === "Great_Show_S01_E03.avi"}).length.must.be(1);
                _.where(files, function(f){ return f === "Great_Show_S01_E04.avi"}).length.must.be(1);     
                done();
            });    
        });

        afterEach(function(){
            deleteFolderRecursive(inputDir);
            deleteFolderRecursive(outputDir);
        });
        
    });
    
  

});