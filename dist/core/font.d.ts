/**
 * Easy to use font class that loads the desired font on preload
 */
export class Font {
    /**
     * @param {string} fontPath Path to desired font inside the fonts/ folder
     */
    constructor(fontPath: string);
    /**
     * @type {p5.Font|null}
     */
    _font: p5.Font | null;
    /**
     * @type {string}
     */
    _fontPath: string;
    /**
     * @returns {void}
     */
    _loadFont(): void;
    /**
     * @param {string} text Text to get bounds of
     * @param {number} x Left top corner X
     * @param {number} y Left top corner Y
     * @param {number} fontSize Size of the font
     * @returns {{x: number, y: number, w: number, h: number}}
     */
    textBounds(text: string, x: number, y: number, fontSize: number): {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    /**
     * Loaded p5.Font
     * @returns {p5.Font|null}
     */
    get font(): p5.Font | null;
}
//# sourceMappingURL=font.d.ts.map