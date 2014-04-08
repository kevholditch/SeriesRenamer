var requirejs = require('../bootstrap').bootstrap(),        
    fileFetcher = requirejs('src/fileFetcher'),
    demand = requirejs('must');

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
        result.episodes.length.must.equal(4);      
    });

    it('should return the correct information for each episode', function() {
        result.episodes[0].folderDir.must.be(__dirname + '\\testSeries1\\');
        result.episodes[0].fileName.must.be('random_show_S01_E01_www.downloadthis.com');
        result.episodes[0].fileExtension.must.be('.avi');

        result.episodes[1].folderDir.must.be(__dirname + '\\testSeries1\\');
        result.episodes[1].fileName.must.be('random_show_S01_E02_www.downloadthis.com');
        result.episodes[1].fileExtension.must.be('.avi');

        result.episodes[2].folderDir.must.be(__dirname + '\\testSeries1\\');
        result.episodes[2].fileName.must.be('random_show_S01_E03_www.downloadthis.com');
        result.episodes[2].fileExtension.must.be('.avi');

        result.episodes[3].folderDir.must.be(__dirname + '\\testSeries1\\');
        result.episodes[3].fileName.must.be('random_show_S01_E04_www.downloadthis.com');
        result.episodes[3].fileExtension.must.be('.mp4');
        
    });

  });
  

});