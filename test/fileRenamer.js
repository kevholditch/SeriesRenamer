var requirejs = require('../bootstrap').bootstrap(),        
    fileRenamer = requirejs('src/fileRenamer'),
    demand = requirejs('must'),
    _ = requirejs('lodash');

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
  

});