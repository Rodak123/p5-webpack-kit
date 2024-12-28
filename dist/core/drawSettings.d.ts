/**
 * Settings that change how draw is handeled
 */
export class DrawSettings {
    /**
     * @type {boolean}
     */
    _drawGraphics: boolean;
    /**
     * @type {boolean}
     */
    _drawGraphicsUI: boolean;
    /**
     * @type {boolean}
     */
    _drawPixelGraphics: boolean;
    /**
     * @type {boolean}
     */
    _autoClearCanvas: boolean;
    /**
     * @param {boolean} value
     */
    set drawGraphics(value: boolean);
    /**
     * Wheter Sketch.graphics is drawn
     * @returns {boolean}
     */
    get drawGraphics(): boolean;
    /**
     * @param {boolean} value
     */
    set drawGraphicsUI(value: boolean);
    /**
     * Wheter Sketch.graphicsUI is drawn
     * @returns {boolean}
     */
    get drawGraphicsUI(): boolean;
    /**
     * @param {boolean} value
     */
    set drawPixelGraphics(value: boolean);
    /**
     * Wheter Sketch.pixelGraphics is drawn
     * @returns {boolean}
     */
    get drawPixelGraphics(): boolean;
    /**
     * @param {boolean} value
     */
    set autoClearCanvas(value: boolean);
    /**
     * Wheter p5.clear() gets called before draw
     * @returns {boolean}
     */
    get autoClearCanvas(): boolean;
}
