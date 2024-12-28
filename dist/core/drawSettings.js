"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawSettings = void 0;
/**
 * Settings that change how draw is handeled
 */
class DrawSettings {
    constructor() {
        /**
         * @type {boolean}
         */
        this._drawGraphics = true;
        /**
         * @type {boolean}
         */
        this._drawGraphicsUI = true;
        /**
         * @type {boolean}
         */
        this._drawPixelGraphics = true;
        /**
         * @type {boolean}
         */
        this._autoClearCanvas = false;
    }
    /**
     * Wheter Sketch.graphics is drawn
     * @returns {boolean}
     */
    get drawGraphics() {
        return this._drawGraphics;
    }
    /**
     * @param {boolean} value
     */
    set drawGraphics(value) {
        if (value !== false && value !== true) {
            throw new Error(`Unexpected value: ${value} when setting drawGraphics. Expected true or false.`);
        }
        this._drawGraphics = value;
    }
    /**
     * Wheter Sketch.graphicsUI is drawn
     * @returns {boolean}
     */
    get drawGraphicsUI() {
        return this._drawGraphicsUI;
    }
    /**
     * @param {boolean} value
     */
    set drawGraphicsUI(value) {
        if (value !== false && value !== true) {
            throw new Error(`Unexpected value: ${value} when setting drawGraphicsUI. Expected true or false.`);
        }
        this._drawGraphicsUI = value;
    }
    /**
     * Wheter Sketch.pixelGraphics is drawn
     * @returns {boolean}
     */
    get drawPixelGraphics() {
        return this._drawPixelGraphics;
    }
    /**
     * @param {boolean} value
     */
    set drawPixelGraphics(value) {
        if (value !== false && value !== true) {
            throw new Error(`Unexpected value: ${value} when setting drawPixelGraphics. Expected true or false.`);
        }
        this._drawPixelGraphics = value;
    }
    /**
     * Wheter p5.clear() gets called before draw
     * @returns {boolean}
     */
    get autoClearCanvas() {
        return this._autoClearCanvas;
    }
    /**
     * @param {boolean} value
     */
    set autoClearCanvas(value) {
        if (value !== false && value !== true) {
            throw new Error(`Unexpected value: ${value} when setting autoClearCanvas. Expected true or false.`);
        }
        this._autoClearCanvas = value;
    }
}
exports.DrawSettings = DrawSettings;
