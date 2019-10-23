import { ImageManager } from 'ad-control'
import { MonetUtils } from 'ad-utils'


export default function AdData() {
	var self = this

	/**
		EXTRACT JSON DATA
		Prepare dynamic data here.
	 */

	/**
		DYNAMIC IMAGES
		Dynamically loaded images need to be in their own directory, like "dynamic_images/".

		Then, you need to add your dynamic image-paths to the load-queue, so that when
		the secondary preload happens, these assets will get loaded. For example:

		self.theImageName = ImageManager.addToLoad(adParams.imagesPath + 'sample.jpg');
	 */


	self.fonts = {
		primary: 'template_font'


	}

	self.colors = {
		white: '#F5F5F1',
		grey: '#221F1F',
		red: '#E50914',
		black: '#000000',

	}

	// Store svg markup for use in all UISvg instances, reduces duplicate code across builds.  See UISvg.
	self.svg = {

	}

// indicates whether previewing on C2.0 Builder
const previewParam = window.getQueryParams().builder_preview
self.inBuilder = !!previewParam && previewParam !== 'false'

// treatment data
self.useSupercut = MonetUtils.getDataByKey('TOGGLE_SUPERCUT') && MonetUtils.getDataByKey('SUPERCUT_VIDEO')
self.isRTL = window.Monet && window.Monet.isRTL()
self.hasTT = !!MonetUtils.getDataByKey('TITLE_TREATMENT_IMAGE')
self.hasRatings = self.inBuilder || !!MonetUtils.getDataByKey('RATINGS')
self.ratingsKey = self.inBuilder ? 'treatment-assets/ratings_bug_fpo.png' : 'RATINGS'
self.titleText = MonetUtils.getDataByKey('TITLE')
self.headlineText = MonetUtils.getDataByKey('HEADLINE')
self.descriptionText = MonetUtils.getDataByKey('DESCRIPTION')
self.retinaTT = true


}
