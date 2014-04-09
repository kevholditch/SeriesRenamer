var requirejs = require('../bootstrap').bootstrap(),        
    nameGenerator = requirejs('src/nameGenerator'),
    demand = requirejs('must');

describe('name generator', function() {
    
    describe('when generating the name for a show', function(){
        
        it('should generate the name correctly with a single digit series and episode', function () {
            nameGenerator.generateNewFileName('Unforgettable', 1, 7, '.avi').must.be('Unforgettable_S01_E07.avi');
        });

        it('should generate the name correctly with a double digit series and single episode', function () {
            nameGenerator.generateNewFileName('Prison_Break', 11, 7, '.mkv').must.be('Prison_Break_S11_E07.mkv');
        });

        it('should generate the name correctly with a single digit series and double digit episode', function () {
            nameGenerator.generateNewFileName('Dexter', 2, 15, '.mp4').must.be('Dexter_S02_E15.mp4');
        });

    });



});