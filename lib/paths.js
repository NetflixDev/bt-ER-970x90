var path = require('path');

/* -- Pathing -----------------------------------------------
 *
 *	 NOTE: All paths are relative to `global.rootPath`
 *
 */
var self = module.exports = {	

	SRC_FOLDER: 'src/',
	TEST_FOLDER: 'test/',

	DIST_FOLDER: 'dist/',
	GWD_FOLDER: 'gwd/',

	GWD_MANIFEST_JSON_FILENAME: 'manifest.json',

	COMPONENT_TEMPLATES_FOLDER: 'tmpl/',
	COMPONENT_LINK_FILENAME: 'component_link.html',
	COMPONENT_PREVIEW_FILENAME: 'index.html',
	BOILERPLATE_TESTS_FILENAME: 'boilerplate_tests.html',
	NPM_ENTRY_FILENAME: 'index.js',
	GWD_FILENAMES: 'filenames.json',

	manifestJsonPath: () => {
		return `./${self.SRC_FOLDER + self.GWD_MANIFEST_JSON_FILENAME}`;
	},
	srcFolderPath: () => {
		return `./${self.SRC_FOLDER}`;
	},
	testFolderPath: () => {
		return `./${self.TEST_FOLDER}`;
	},
	distFolderPath: () => {
		return `./${self.DIST_FOLDER}`;
	},
	distGwdPath: () => {
		return `./${self.DIST_FOLDER + self.GWD_FOLDER}`;
	},
	distSrcPath: () => {
		return `./${self.DIST_FOLDER + self.SRC_FOLDER}`;
	},
	
	tmplFolderPath: () => {
		return `./${self.COMPONENT_TEMPLATES_FOLDER}`;
	},


	escapePath: (path) => {
		return path.replace( ' ', '\ ' )
			.replace( "'", "\\'" )
			.replace( '(', '\(' )
			.replace( ')', '\)' )
			.replace( '-', '\-' )
			.replace( '&', '\&' );
	},
	absFile: (subpath) => {
		return path.resolve(global.rootPath + subpath);
	},
	absPath: (subpath) => {
		return self.absFile(subpath) + '/';
	}
};


