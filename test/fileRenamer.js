var requirejs = require('../bootstrap').bootstrap(),        
    fileRenamer = requirejs('src/fileRenamer'),
    demand = requirejs('must');

describe('file renamer', function() {        

    describe('when decorating the episodes with destination information', function(){
        var results;

        beforeEach(function(){
            var episodes = [
                {
                    folderDir : 'testDir\\',
                    fileName: 'fantastic_show_E01_S01',
                    fileExtension: '.avi' ,
                    fullFilePath : 'testDir\\fantastic_show_E01_S01.avi'       
                },
                {
                    folderDir : 'testDir\\someNestedDir\\',
                    fileName: 'fantastic_show_E01_S02_www.downloadthisnow.com_ripped',
                    fileExtension: '.avi',        
                    fullFilePath : 'testDir\\someNestedDir\\fantastic_show_E01_S02_www.downloadthisnow.com_ripped.avi'
                },
                {
                    folderDir : 'testDir\\',
                    fileName: 'fantastic_show_E01_S03_www.downloadthisnow.com_ripped',
                    fileExtension: '.mp4',
                    fullFilePath : 'testDir\\fantastic_show_E01_S03_www.downloadthisnow.com_ripped.mp4'        
                }
            ];

            results = fileRenamer.decorateWithRenameInformation(episodes);
        });


        it('should return the 3 episodes', function(){
            results.length.must.be(3);            
        });

        it('should leave the existing information about the first episode in tact', function() {
            results[0].folderDir.must.equal('testDir\\');
            results[0].fileName.must.equal('fantastic_show_E01_S01');
            results[0].fileExtension.must.equal('.avi');  
            results[0].fullFilePath.must.equal('testDir\\fantastic_show_E01_S01.avi');                    
        });

        //it('should decorate the first episode with the correct destination information', function() {
            //results[0].fullSourcePath.must.equal('testDir\\fantastic_show_E01_S01.avi');            
        //});

        it('should leave the existing information about the second episode in tact', function() {
            results[1].folderDir.must.equal('testDir\\someNestedDir\\');
            results[1].fileName.must.equal('fantastic_show_E01_S02_www.downloadthisnow.com_ripped');
            results[1].fileExtension.must.equal('.avi');                    
            results[1].fullFilePath.must.equal('testDir\\someNestedDir\\fantastic_show_E01_S02_www.downloadthisnow.com_ripped.avi');                    
        });

        //it('should decorate the second episode with the correct destination information', function() {
          //  results[1].fullSourcePath.must.equal('testDir\\fantastic_show_E01_S01.avi');            
        //});

        it('should leave the existing information about the third episode in tact', function() {
            results[2].folderDir.must.equal('testDir\\');
            results[2].fileName.must.equal('fantastic_show_E01_S03_www.downloadthisnow.com_ripped');
            results[2].fileExtension.must.equal('.mp4');  
            results[2].fullFilePath.must.equal('testDir\\fantastic_show_E01_S03_www.downloadthisnow.com_ripped.mp4');                                      
        });

        //it('should decorate the third episode with the correct destination information', function() {
        //    results[2].fullSourcePath.must.equal('testDir\\fantastic_show_E01_S03_www.downloadthisnow.com_ripped.avi');            
        //});
        
        
    });

    
  

});