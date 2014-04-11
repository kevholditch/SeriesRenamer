SeriesRenamer
=============

A tool that allows you to clean up a series with consistent filenames.  This tool was developed using a TDD approach.


To use:

1.  Clone the repo
2.  npm install
3.  node rename --showName="the show name you want" --inputDir="directory where shows are" --outputDir="directory where you want files moved to"


The renamer will automatically find all files in the input dir that are episodes of a tv show and rename them in the following way:

ShowName_S%%_E%%.extension

<ShowName> is the name of the show you passed in
S%% is the series number of the show (prefixed with 0 for single digit series e.g. 01)
E%% is the episode number of the show (prefixed with 0 for single digit episodes e.g. 01)

It will then move all of the shows into a single folder.  The renamer will also deal with input files in nested folders.
