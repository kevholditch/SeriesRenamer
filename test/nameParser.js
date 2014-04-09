var requirejs = require('../bootstrap').bootstrap(),        
    nameParser = requirejs('src/nameParser'),
    demand = requirejs('must');

describe('name parser', function() {
    
    describe('when extracting show information from a file name', function(){

        describe('and series number appears before episode', function () {
            it('should return information when series and show both have two digits', function () {
                var result = nameParser.getShowDetails('cool_show_S07_E05');
                result.seriesNumber.must.be(7);
                result.episodeNumber.must.be(5);
            });

            it('should return information when series has one digit and episode has two', function () {
                var result = nameParser.getShowDetails('cool_show_S7_E05');
                result.seriesNumber.must.be(7);
                result.episodeNumber.must.be(5);
            });

            it('should return information when series has two digits and episode has one', function () {
                var result = nameParser.getShowDetails('cool_show_S7_E5');
                result.seriesNumber.must.be(7);
                result.episodeNumber.must.be(5);
            });

            it('should return information when series and episodes in lower case', function () {
                var result = nameParser.getShowDetails('cool_show_s07_e05');
                result.seriesNumber.must.be(7);
                result.episodeNumber.must.be(5);
            });
        });

        describe('and series number appears after episode', function () {
            it('should return information when series and show both have two digits', function () {
                var result = nameParser.getShowDetails('cool_show_E05_S07');
                result.seriesNumber.must.be(7);
                result.episodeNumber.must.be(5);
            });

            it('should return information when series has one digit and episode has two', function () {
                var result = nameParser.getShowDetails('cool_show_E05_S7');
                result.seriesNumber.must.be(7);
                result.episodeNumber.must.be(5);
            });

            it('should return information when series has two digits and episode has one', function () {
                var result = nameParser.getShowDetails('cool_show_E5_S7');
                result.seriesNumber.must.be(7);
                result.episodeNumber.must.be(5);
            });

            it('should return information when series and episodes in lower case', function () {
                var result = nameParser.getShowDetails('cool_show_e05_s07');
                result.seriesNumber.must.be(7);
                result.episodeNumber.must.be(5);
            });
        });

        
    });



});