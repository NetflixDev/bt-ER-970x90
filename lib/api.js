const packageJson = require('../package.json')

const path = require('path')
var argv = require('minimist')(process.argv.slice(2))

// set app path
global.rootPath = path.resolve(__dirname + '/..') + '/'

const paths = require('./paths')
const publish = require('./publish')
const tracker = require('./tracker')

const debug = require('@ff0000-ad-tech/debug')
const log = debug(packageJson.name + ':api')
if ('silence' in argv) {
	debug.disable(true)
}

// help
if (argv.help) {
	log(
		`CLI OPTIONS:\n` +
			`node ./lib/api.js\n` +
			`-------------------------------------------------------------------------------------------\n` +
			` --cmd	API COMMAND, options include:\n` +
			`    "publish"     mark generic-source as "published",\n` +
			`    "track"       saves current package.version to the Generic-Source-Tracker file \n\n` +
			` --silence, squelches console output\n` +
			`-------------------------------------------------------------------------------------------`
	)
	process.exit()
}

// api command
if (!('cmd' in argv)) {
	console.error('No API COMMAND (--cmd) specified')
	process.exit()
}

/* -- INSTALLATION ----
*
*		
*/
if (argv.cmd == 'track') {
	/* -- TRACKING ----
	*
	*		
	*/
	log('Updating package.json & trackers')
	tracker
		// update branch/commit version
		.markVersion()

		// update username and date-modified
		.then(packageJson => {
			return tracker.markUpdated(packageJson)
		})

		// find and update tracker file
		.then(packageJson => {
			return tracker.updateTracker(packageJson)
		})

		.catch(err => {
			console.error(err)
		})
} else if (argv.cmd == 'publish') {
	/* -- PUBLISH ----
	*
	*		Indicate C20-generic-source is "published"
  */
	// copy src to dist
	log(`Publishing Src package to: ${paths.distFolderPath()}`)
	publish
		.src(paths.distFolderPath())

		// mark generic-source as "published"
		.then(() => {
			log('Marking GenericSource.state as "published"')
			return tracker.markPublished()
		})

		.catch(err => {
			console.error(err)
		})
}
