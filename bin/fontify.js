#!/usr/bin/env node

var fontify = require('../index.js');
var fs = require('fs');
var path = require('path');
var isThere = require('is-there');
var appRoot = require('app-root-dir').get();

var dataFile = path.join(appRoot, 'fontify.json');

if (!isThere(dataFile)) {
	console.error('Configuration file not found: fontify.json');
	return;
}

var data = require(dataFile);

data.forEach(function (entry) {
	entry.dest = entry.dest || '.';

	entry.modules.forEach(function (module) {
		fontify.copy(module, entry.dest, function (err) {
			if (err) {
				console.error(err);
				return;
			}

			console.log("Finished copying " + module);
		});
	});
});