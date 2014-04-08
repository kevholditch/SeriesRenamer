var requirejs = require('../bootstrap').bootstrap(),        
    fileFetcher = requirejs('src/fileFetcher'),
    demand = requirejs('must'),
    _ = requirejs('lodash');

describe('file fetcher', function() {
  var result, seriesPath;

  var getEpisodeByFilename = function(input, filename){        
      return _(input.episodes).where(function(e){ return e.fileName === filename; }).value()[0];
  };
  
  describe('when getting all files from a single folder', function() {
    beforeEach(function(done) {
      seriesPath = __dirname + '\\testSeries1\\';

      fileFetcher.fetchFiles(seriesPath).then(function(data){
        result = data;
        done();
      });      
    });
   
    it('should return 4 episodes ignoring other files', function() {
        result.episodes.length.must.equal(4);      
    });

    it('should return the correct information for each episode', function() {
        var episode1 = getEpisodeByFilename(result, 'random_show_S01_E01_www.downloadthis.com');                
        episode1.folderDir.must.be(seriesPath);
        episode1.fileName.must.be('random_show_S01_E01_www.downloadthis.com');
        episode1.fileExtension.must.be('.avi');

        var episode2 = getEpisodeByFilename(result, 'random_show_S01_E02_www.downloadthis.com');        
        episode2.folderDir.must.be(seriesPath);
        episode2.fileName.must.be('random_show_S01_E02_www.downloadthis.com');
        episode2.fileExtension.must.be('.avi');

        var episode3 = getEpisodeByFilename(result, 'random_show_S01_E03_www.downloadthis.com');
        episode3.folderDir.must.be(seriesPath);
        episode3.fileName.must.be('random_show_S01_E03_www.downloadthis.com');
        episode3.fileExtension.must.be('.avi');

        var episode4 = getEpisodeByFilename(result, 'random_show_S01_E04_www.downloadthis.com');
        episode4.folderDir.must.be(seriesPath);
        episode4.fileName.must.be('random_show_S01_E04_www.downloadthis.com');
        episode4.fileExtension.must.be('.mp4');
        
    });

  });

describe('when getting all files from a nested folder structure', function() {    
    beforeEach(function(done) {
      seriesPath = __dirname + '\\testSeries2\\';

      fileFetcher.fetchFiles(seriesPath).then(function(data){
        result = data;        
        done();
      });      
    });
   
    it('should return 4 episodes ignoring other files', function() {
        result.episodes.length.must.equal(4);      
    });

    it('should return the correct information for each episode', function() {
        var episode1 = getEpisodeByFilename(result, 'random_show_S01_E01_www.downloadthis.com');                
        episode1.folderDir.must.be(seriesPath + 'thanks_for_downloading\\');
        episode1.fileName.must.be('random_show_S01_E01_www.downloadthis.com');
        episode1.fileExtension.must.be('.avi');

        var episode2 = getEpisodeByFilename(result, 'random_show_S01_E02_www.downloadthis.com');        
        episode2.folderDir.must.be(seriesPath + 'Show_Episode_2\\');
        episode2.fileName.must.be('random_show_S01_E02_www.downloadthis.com');
        episode2.fileExtension.must.be('.avi');

        var episode3 = getEpisodeByFilename(result, 'random_show_S01_E03_www.downloadthis.com');
        episode3.folderDir.must.be(seriesPath + 'Show_3\\');
        episode3.fileName.must.be('random_show_S01_E03_www.downloadthis.com');
        episode3.fileExtension.must.be('.avi');

        var episode4 = getEpisodeByFilename(result, 'random_show_S01_E04_www.downloadthis.com');
        episode4.folderDir.must.be(seriesPath);
        episode4.fileName.must.be('random_show_S01_E04_www.downloadthis.com');
        episode4.fileExtension.must.be('.mp4');
        
    });

  });
  

});