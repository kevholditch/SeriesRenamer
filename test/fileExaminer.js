var requirejs = require('../bootstrap').bootstrap(),        
    fileExaminer = requirejs('src/fileExaminer'),
    should = requirejs('should');

describe('file fetcher', function() {
  var result;

  
  describe('when getting all files from a single folder', function() {
    beforeEach(function(done) {
      fileFetcher.fetchFiles(__dirname + '\\testSeries1\\').then(function(data){
        result = data;
        done();
      });      
    });
   
    it('should return 4 episodes ignoring other files', function() {
        result.episodes.length.should.equal(4);      
    });

    it('should return the correct information for each episode', function() {
        result.episodes[0].folderDir.should.equal('./testSeries1');
        result.episodes[0].fileName.should.equal('./random_show_S01_E01_www.downloadthis.com');
        result.episodes[0].fileExtensions.should.equal('.avi');

        result.episodes[1].folderDir.should.equal('./testSeries1');
        result.episodes[1].fileName.should.equal('./random_show_S01_E02_www.downloadthis.com');
        result.episodes[1].fileExtensions.should.equal('.avi');

        result.episodes[2].folderDir.should.equal('./testSeries1');
        result.episodes[2].fileName.should.equal('./random_show_S01_E03_www.downloadthis.com');
        result.episodes[2].fileExtensions.should.equal('.avi');

        result.episodes[3].folderDir.should.equal('./testSeries1');
        result.episodes[3].fileName.should.equal('./random_show_S01_E04_www.downloadthis.com');
        result.episodes[3].fileExtensions.should.equal('.mp4');
        
    });

  });
  

});