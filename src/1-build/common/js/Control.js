import { Styles, Markup, Align } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Gesture, GestureEvent } from 'ad-events'
import { Animation } from '@common/js/Animation.js'
import '@netflixdev/wc-netflix-fonts'
import { MonetUtils } from 'ad-utils'


export class Control {
	static preMarkup() {
		console.log('Control.preMarkup()')
View.netflixFonts = document.createElement('netflix-fonts')
Markup.get('main').appendChild(View.netflixFonts)


	}

	static postMarkup() {
		console.log('Control.postMarkup()')
// listen for default exit
Gesture.add(View.endFrame, GestureEvent.CLICK, Control.handleClick)
if (View.intro) {
	Gesture.add(View.intro, GestureEvent.CLICK, Control.handleClick)
	// remove click listener on Intro before supercut to prevent double clickthrough
	View.ribbon.addEventListener('coverComplete', function(event) {
		Gesture.remove(View.intro, GestureEvent.CLICK, Control.handleClick)
	})
}



		View.endFrame.hide()
		
Gesture.add(View.endFrame, GestureEvent.OVER, function() {
	View.endFrame.cta.mouseover()
})
Gesture.add(View.endFrame, GestureEvent.OUT, function() {
	View.endFrame.cta.mouseout()
})


	}


	static handleClick(event) {	

    if (window.Monet && event.mouse) {
      Monet.trackEvent('CLICK', {
        src: event.target.id,
        coords: {
          x: event.mouse.local.x,
          y: event.mouse.local.y
        }
      })
    }

		Network.exit( 
			overridePlatformExit, 
			MonetUtils.getDataByKey('EXIT_URL')
		); 
	}




	static handleMonetLoadComplete(element) {
		console.log('Control.handleMonetLoadComplete()')
		MonetUtils.setData(element)
			.then(data => {
				console.log('	-> All Netflix web components ready')
				// monet data is now assigned to MonetUtils
// if any Dynamic images must be loaded from monet
// but referenced outside a monet component (CanvasImage, UIImage), follow this pattern
//
// adData.ratingsSrc = ImageManager.addToLoad(MonetUtils.getDataByKey('RATINGS_Image'), { forCanvas: false })
//



// proceed with ad AFTER the setData() Promise has been fulfilled
ImageManager.load(function() {
	if (View.intro) View.intro.postMarkupStyling()
	View.endFrame.postMarkupStyling()
	Control.postMarkup()
	Animation.start()
})


			})
			.catch(err => {
				console.log(err)
				global.failAd()
			})
	}
	
	static handleIntroVideoComplete(event) {
		Animation.showEndFrame()

	}

	static handleIntroClick(event) {
		View.intro.hide()
		Animation.showEndFrame()
		View.intro.introVideoPlayer.pause()
		Control.handleClick(event)
	}
	


}
