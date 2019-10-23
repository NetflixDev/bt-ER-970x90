import '@netflixdev/wc-netflix-brand-logo'
import '@netflixdev/wc-netflix-cta'
import '@netflixdev/wc-netflix-text'
import '@netflixdev/wc-netflix-img'
import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import '@netflixdev/wc-netflix-flushed-ribbon'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg, UIGroup } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'
import { titleTreatmentLayout } from './shared.js'

export default function sideBySidePostMarkup() {
	let T = View.endFrame

	// title treatment
	titleTreatmentLayout(T)

	Align.set(T.pedigree, {
		x: {
			type: Align.CENTER,
			against: T.tt
		},
		y: {
			type: Align.CENTER,
			against: 65
		}
	})

	// cta + logo
	const logoCtaY = adData.headlineText ? 45 : 32
	T.cta.resize()

	const leftEl = adData.isRTL ? T.cta : T.netflixLogo
	const rightEl = adData.isRTL ? T.netflixLogo : T.cta

	Align.set(rightEl, {
		x: {
			type: Align.RIGHT,
			offset: -20
		},
		y: {
			type: Align.TOP,
			offset: logoCtaY
		}
	})

	Align.set(leftEl, {
		x: {
			type: Align.LEFT,
			outer: true,
			against: rightEl,
			offset: -14
		},
		y: {
			type: Align.TOP,
			offset: logoCtaY
		}
	})

	// lockup to position CTA and logo together
	T.brandingLockup = new UIGroup({
		target: T,
		children: [T.cta, T.netflixLogo]
	})

	// headline
	Styles.setCss(T.headline, {
		color: '#fff',
		fontSize: 15,
		letterSpacing: 1,
		textAlign: 'center'
	})
	Align.set(T.headline, {
		x: { type: Align.CENTER, against: T.brandingLockup },
		y: {
			type: Align.TOP,
			outer: true,
			against: T.brandingLockup,
			offset: -13
		}
	})

	// ratings bug
	if (adData.hasRatings) {
		Align.set(T.ratingsBug, {
			x: {
				type: Align.RIGHT,
				offset: -5
			},
			y: {
				type: Align.BOTTOM,
				offset: -5
			}
		})
	} else {
		T.removeChild(T.ratingsBug)
	}
}
