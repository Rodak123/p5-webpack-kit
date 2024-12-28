import p5 from 'p5';
import { Sketch } from './sketch.js';
import { validateFilePath } from './validation.js';

/**
 * Easy to use font class that loads the desired font on preload
 */
class Font {
    /**
     * @type {p5.Font|null}
     */
    _font;

    /**
     * @type {string}
     */
    _fontPath;

    /**
     * @param {string} fontPath Path to desired font inside the fonts/ folder
     */
    constructor(fontPath) {
        this._fontPath = validateFilePath(fontPath, [], 'Font path');
        this._font = null;

        if (Sketch.isAfterPreload) {
            console.error(`Font must be created before '${Sketch.preloadEventName}'.`);
        } else {
            Sketch.addPreloadEvent(() => {
                this._loadFont();
            });
        }
    }

    /**
     * @returns {void}
     */
    _loadFont() {
        const fontPath = `${Sketch.resourcesPath}/fonts/${this._fontPath}`;
        this._font = Sketch.p5.loadFont(
            fontPath,
            (font) => {
                this._font = font;
            },
            (err) => {
                console.error(`Failed to load font at '${fontPath}'.\n${err}`);
            }
        );
    }

    /**
     * @param {string} text Text to get bounds of
     * @param {number} x Left top corner X
     * @param {number} y Left top corner Y
     * @param {number} fontSize Size of the font
     * @returns {{x: number, y: number, w: number, h: number}}
     */
    textBounds(text, x, y, fontSize) {
        Sketch.graphicsUI.textFont(this.font, fontSize);
        Sketch.graphicsUI.textAlign(Sketch.p5.LEFT, Sketch.p5.TOP);

        const bounds = Sketch.font.font.textBounds(text, x, y, fontSize);

        // Don't ask why this is here, for some reason the p5 function textBounds does not work :O
        bounds.w += fontSize * 0.25;
        bounds.h += fontSize * 0.33;

        return bounds;
    }

    /**
     * Loaded p5.Font
     * @returns {p5.Font|null}
     */
    get font() {
        return this._font;
    }
}

export { Font };
