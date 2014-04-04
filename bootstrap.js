module.exports.bootstrap = function(){
	var requirejs = require('requirejs');
	var config = require('./requireconfig').requireConfig;
	requirejs.config(config);
	return requirejs;
};