import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
	classicThemeIcon,
	earthThemeIcon,
	blueThemeIcon,
	orangeThemeIcon,
} from './icons';

export const tagName = 'language-switcher';

@customElement('language-switcher')
export class ThemeSwitcher extends LitElement {
	static styles = [
		css`
			:host {
				display: block;
			}
			button {
				display: inline-flex;
				outline: none;
				border: none;
				background-color: transparent;
				border: 2px solid transparent;
				padding: 1px;
				cursor: pointer;
				transition: border var(--theme-transition);
			}
			button[active] {
				border: 2px solid var(--theme-primary);
        box-shadow: 0 0 12px 1px var(--theme-primary);
			}
			button:hover {
				border: 2px solid var(--theme-primary);
			}
			.theme-switcher__container {
				margin: 2rem 0;
				display: grid;
				grid-template-columns: repeat(4, 1fr);
			}
			.theme-select__container {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.theme-select__container p {
				font-size: var(--font-size-sm);
			}
		`,
	];

	// set the _doc element
	private _doc = document.firstElementChild;

	private _heroImage: HTMLImageElement =
		document.querySelector('#menu-image-food');

	@property({ type: String })
	theme: string = 'default';

	private _getCurrentTheme() {
		// check for a local storage theme first
		const localStorageTheme = localStorage.getItem('theme');
		if (localStorageTheme !== null) {
			this._setTheme(localStorageTheme);
		}
	}

	connectedCallback() {
		super.connectedCallback();
		this._getCurrentTheme();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	private _setTheme(theme) {
		this._doc.setAttribute('data-theme', theme);
		if (theme === 'default') {
			this._heroImage.src = '/assets/images/menu/menu-hr.png';
		}
		if (theme === 'earth') {
			this._heroImage.src = '/assets/images/menu/menu-de.png';
		}
		if (theme === 'ocean') {
			this._heroImage.src = '/assets/images/menu/menu-it.png';
		}
		if (theme === 'sand') {
			this._heroImage.src = '/assets/images/menu/menu-eng.png';
		}
		localStorage.setItem('theme', theme);
		this.theme = theme;
	}

	render() {
		return html`
			<div class="theme-switcher__container">
				<div class="theme-select__container">
					<button
						@click=${() => this._setTheme('default')}
						?active=${this.theme === 'default'}
					>
						${classicThemeIcon}
					</button>
					<p>Hrvatski</p>
				</div>
				<div class="theme-select__container">
					<button
						@click=${() => this._setTheme('earth')}
						?active=${this.theme === 'earth'}
					>
						${earthThemeIcon}
					</button>
					<p>Deutsch</p>
				</div>
				<div class="theme-select__container">
					<button
						@click=${() => this._setTheme('ocean')}
						?active=${this.theme === 'ocean'}
					>
						${blueThemeIcon}
					</button>
					<p>Ocean</p>
				</div>
				<div class="theme-select__container">
					<button
						@click=${() => this._setTheme('sand')}
						?active=${this.theme === 'sand'}
					>
						${orangeThemeIcon}
					</button>
					<p>Sand</p>
				</div>
			</div>
		`;
	}
}
