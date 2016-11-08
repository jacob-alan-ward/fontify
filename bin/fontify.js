#!/usr/bin/env node

var fontify = require('../index.js');
var fs = require('fs');
var path = require('path');
var isThere = require('is-there');
var appRoot = require('app-root-dir').get();

var packageFile = path.join(appRoot, 'package.json');

var package = require(packageFile);

if (!package.fonts) {
	console.error('package.json "fonts" property not found');
	return;
}

package.fonts.forEach(function (fontEntry) {
	fontEntry.dest = fontEntry.dest || '.';

	fontEntry.modules.forEach(function (module) {
		fontify.copy(module, fontEntry.dest, function (err) {
			if (err) {
				console.error(err);
				return;
			}

			console.log("Finished copying " + module);
		});
	});
});