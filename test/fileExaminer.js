var requirejs = require('../bootstrap').bootstrap(),        
    fileExaminer = requirejs('src/fileExaminer'),
    must = requirejs('must');

describe('file examiner', function() {
    
  describe.only('when examining whether a file is an episode', function() {
    
    it('should return true when filename ends with .avi', function() {
        fileExaminer.isEpisode('coolShow.avi').must.be.true();
    });

  });
  

});