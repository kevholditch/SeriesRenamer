var requirejs = require('../bootstrap').bootstrap(),        
    fileExaminer = requirejs('src/fileExaminer'),
    demand = requirejs('must');

describe('file examiner', function() {
    
    describe('when extracting the extension from a filename', function(){

        it('should return a 1 letter extension', function(){
            fileExaminer.extractExtension('show.a').must.be('.a');
        });

        it('should return a 2 letter extension', function(){
            fileExaminer.extractExtension('show.bB').must.be('.bb');
        });

        it('should return a 3 letter extension', function(){
            fileExaminer.extractExtension('show.cCc').must.be('.ccc');
        });

        it('should return a 4 letter extension', function(){
            fileExaminer.extractExtension('show.dDDd').must.be('.dddd');
        });

        it('should return null when there is no extension', function(){
            demand(fileExaminer.extractExtension('show')).be.null();
        });

    });

    describe('when extracting the filename', function(){

        it('should return file name when there is an extension', function(){
            fileExaminer.extractFilename('show.xyz').must.be('show');
        });

        it('should return the file name when there is no extension', function(){
            fileExaminer.extractFilename('show').must.be('show');
        });
        
    });

    describe('when examining whether a file is an episode', function() {
    
        it('should return true when filename ends with .avi', function() {
            fileExaminer.isEpisode('coolShow.avi').must.be.true();
        });

        it('should return true when filename ends with .mp4', function() {
            fileExaminer.isEpisode('coolShow.mp4').must.be.true();
        });

        it('should return true when filename ends with .mkv', function() {
            fileExaminer.isEpisode('coolShow.mkv').must.be.true();
        });

        it('should return true when filename ends with .mpg', function() {
            fileExaminer.isEpisode('coolShow.mpg').must.be.true();
        });

        it('should return true when filename ends with .mpg4', function() {
            fileExaminer.isEpisode('coolShow.mpg4').must.be.true();
        });

        it('should return false when filename ends with .txt', function() {
            fileExaminer.isEpisode('coolShow.txt').must.be.false();
        });

        it('should return false when filename ends with .ifo', function() {
            fileExaminer.isEpisode('coolShow.ifo').must.be.false();
        });

        it('should return false when filename ends with .me', function() {
            fileExaminer.isEpisode('coolShow.me').must.be.false();
        });
    });

    describe('when adding trailing slash to directory', function(){

        it('should add trailing slash when there is not one', function(){
            fileExaminer.addTrailingSlash('path/other/x').must.be('path/other/x/');
        });

        it('should leave trailing slash when there is one', function(){
            fileExaminer.addTrailingSlash('path/other/x/').must.be('path/other/x/');
        });
        
    });
  

});