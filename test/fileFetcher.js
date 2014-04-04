var requirejs = require('../bootstrap').bootstrap(),        
    fileFetcher = requirejs('src/fileFetcher'),
    should = requirejs('should');

describe('file fetcher', function() {
  var result;

  
  describe('when getting a single source', function() {
    beforeEach(function() {
      result = fileFetcher.fetchFiles('');      
    });
   
    it('should do blah', function() {
      result.length.should.equal(0);      
    });
  });
  

});