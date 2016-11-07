var findit = require('findit');
var path = require('path');
var fs = require('fs');
var isThere = require('is-there');
var appRoot = require('app-root-dir').get();

module.exports = {
	copy: function (moduleName, dest, callback) {
		var modulePath = path.join(appRoot, 'node_modules', moduleName);

		if (!isThere(modulePath)) {
			callback("Module not found: " + moduleName);
			return;
		}

		var finder = findit(modulePath);

		if (!isThere(path.join(appRoot, dest)))
			fs.mkdirSync(path.join(appRoot, dest), '0776');

		finder.on('file', function (file, stat) {
			if (isFont(file)) {
				copyFile(file);
			}
		});

		function isFont(file) {
			var ext = path.extname(file);
			return ['.eot', '.svg', '.ttf', '.woff', '.woff2'].indexOf(ext) >= 0;
		}

		finder.on('end', function () {
			callback(null);
			return;
		});

		function copyFile(file) {
			fs.createReadStream(file).pipe(fs.createWriteStream(path.join(appRoot, dest, path.basename(file))));
		}
	}
};
