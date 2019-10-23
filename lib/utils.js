const fs = require('fs');

// promise load
function loadFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf-8', (err, contents) => {
			if (err) {
				reject(err);
			}
			resolve(contents);
		});
	});
}
// promise write
function writeFile(path, contents) {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, contents, (err) => {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
}



const ignoreFiles = [
	'__MACOSX',
  '.DS_Store',
  'node_modules'
];
function isIgnoreFile(path, includeHiddenFiles) {
	var filename = path.match(/[^\/]*$/)[0];
	for (var i in ignoreFiles) {
		if (!includeHiddenFiles && isHiddenFile(filename))
			return true;
		if (filename.indexOf(ignoreFiles[ i ]) != -1) 
			return true;
	}
}
function isHiddenFile(filename) {
	if (filename.indexOf('.') == 0) {
		return true;
	}
}
function getIndent(tabs) {
	tabs = tabs || 2;
	return '\t'.repeat(tabs);
}

module.exports = {
	loadFile: loadFile,
	writeFile: writeFile,
	ignoreFiles: ignoreFiles,
	isIgnoreFile: isIgnoreFile,
	getIndent: getIndent
};



