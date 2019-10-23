import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'

export default function baseInit(T, { logoWidth = 110, ctaWidth = 107, ctaMaxWidth = 130, ctaHeight = 28, extraCtaLogoInit }) {
	// determine if logo and CTA are vertically laid out
	const isVerticalLockup =
		(window.Creative && Creative.layout && (Creative.layout === 'STACKED' || Creative.layout.indexOf('CORNER') > -1)) || false

	T.background = document.createElement('netflix-img')
	T.background.setAttribute('data-dynamic-key', 'MAIN_IMAGE')
	T.background.setAttribute('width', adParams.adWidth)
	T.appendChild(T.background)

	T.pedigree = new UITextField({
		target: T,
		id: 'pedigree',
		css: {
			width: 200,
			height: 50
		},
		fontSize: 16,
		fontFamily: 'Netflix Sans',
		format: TextFormat.INLINE_FIT_CLAMP,
		alignText: Align.CENTER,
		spacing: -0.2,
		text: ''
	})

	// title treatment
	T.tt = document.createElement('netflix-img')
	T.tt.setAttribute('data-dynamic-key', 'TITLE_TREATMENT_IMAGE')
	// resize TTs if retina setting set
	if (adData.retinaTT) {
		T.tt.setAttribute('width', adParams.adWidth)
	}
	T.appendChild(T.tt)

	// headline
	T.headline = document.createElement('netflix-text')
	T.headline.setAttribute('data-dynamic-key', 'HEADLINE')
	T.appendChild(T.headline)

	// logo
	T.netflixLogo = document.createElement('netflix-brand-logo')
	T.netflixLogo.setAttribute('width', logoWidth)

	// cta
	T.cta = document.createElement('netflix-cta')
	T.cta.setAttribute('data-dynamic-key', 'CTA')
	T.cta.setAttribute('arrow', '')
	T.cta.setAttribute('border', '')
	T.cta.setAttribute('width', ctaWidth)
	T.cta.setAttribute('max-width', isVerticalLockup ? ctaWidth : ctaMaxWidth)
	T.cta.setAttribute('height', ctaHeight)

	if (adData.isRTL) {
		T.cta.setAttribute('rtl', '')
	}

	if (typeof extraCtaLogoInit === 'function') {
		extraCtaLogoInit(T.cta, T.logo)
	}

	T.appendChild(T.netflixLogo)
	T.appendChild(T.cta)

	// ratings bug
	T.ratingsBug = document.createElement('netflix-img')
	T.ratingsBug.setAttribute('data-dynamic-key', adData.ratingsKey)
	T.ratingsBug.setAttribute('id', 'ratings_bug')
	T.ratingsBug.setAttribute('width', 14)
	T.appendChild(T.ratingsBug)

	T.iris =
		window.Creative &&
		Creative.usesCanvasIris &&
		new CanvasIris({
			target: T,
			irisColor: Creative.irisColor
		})
}
