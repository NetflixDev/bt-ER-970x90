import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'

export { sideBySideInit, stackedInit }

function sideBySideInit(T) {
	baseInit(T, { ctaLogoInit: sideBySideCtaLogoInit })
}

function stackedInit(T) {
	baseInit(T, { ctaLogoInit: stackedCtaLogoInit })
}

function baseInit(T, { ctaLogoInit = sideBySideCtaLogoInit }) {
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
	T.appendChild(T.tt)

	// headline
	T.headline = document.createElement('netflix-text')
	T.headline.setAttribute('data-dynamic-key', 'HEADLINE')
	T.appendChild(T.headline)

	// init CTA and logo
	ctaLogoInit(T)

	// ratings bug
	T.ratingsBug = document.createElement('netflix-img')
	T.ratingsBug.setAttribute('data-dynamic-key', 'RATINGS')
	T.ratingsBug.setAttribute('id', 'RATINGS')
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

function sideBySideCtaLogoInit(T) {
	// logo
	T.netflixLogo = document.createElement('netflix-brand-logo')
	T.netflixLogo.setAttribute('width', 112)
	T.appendChild(T.netflixLogo)

	// cta
	T.cta = document.createElement('netflix-cta')
	T.cta.setAttribute('data-dynamic-key', 'CTA')
	T.cta.setAttribute('arrow', '')
	T.cta.setAttribute('border', '')
	T.cta.setAttribute('width', 107)
	T.cta.setAttribute('max-width', 130)
	T.cta.setAttribute('height', 30)
	T.cta.setAttribute('stretch-origin', 'right')
	T.appendChild(T.cta)
}

function stackedCtaLogoInit(T) {
	// logo
	T.netflixLogo = document.createElement('netflix-brand-logo')
	T.netflixLogo.setAttribute('width', 96)
	T.appendChild(T.netflixLogo)

	// cta
	T.cta = document.createElement('netflix-cta')
	T.cta.setAttribute('data-dynamic-key', 'CTA')
	T.cta.setAttribute('arrow', '')
	T.cta.setAttribute('border', '')
	T.cta.setAttribute('width', 96)
	T.cta.setAttribute('max-width', 96)
	T.cta.setAttribute('height', 25)
	T.cta.setAttribute('horizontal-pad', '9%')
	T.cta.setAttribute('stretch-origin', 'right')
	T.appendChild(T.cta)
}
