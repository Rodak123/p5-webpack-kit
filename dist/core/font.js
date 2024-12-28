"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Font = void 0;
const p5_1 = __importDefault(require("p5"));
const sketch_js_1 = require("./sketch.js");
const validation_js_1 = require("./validation.js");
/**
 * Easy to use font class that loads the desired font on preload
 */
class Font {
    /**
     * @param {string} fontPath Path to desired font inside the fonts/ folder
     */
    constructor(fontPath) {
        this._fontPath = (0, validation_js_1.validateFilePath)(fontPath, [], 'Font path');
        this._font = null;
        if (sketch_js_1.Sketch.isAfterPreload) {
            console.error(`Font must be created before '${sketch_js_1.Sketch.preloadEventName}'.`);
        }
        else {
            sketch_js_1.Sketch.addPreloadEvent(() => {
                this._loadFont();
            });
        }
    }
    /**
     * @returns {void}
     */
    _loadFont() {
        const fontPath = `${sketch_js_1.Sketch.resourcesPath}/fonts/${this._fontPath}`;
        this._font = sketch_js_1.Sketch.p5.loadFont(fontPath, (font) => {
            this._font = font;
        }, (err) => {
            console.error(`Failed to load font at '${fontPath}'.\n${err}`);
        });
    }
    /**
     * @param {string} text Text to get bounds of
     * @param {number} x Left top corner X
     * @param {number} y Left top corner Y
     * @param {number} fontSize Size of the font
     * @returns {{x: number, y: number, w: number, h: number}}
     */
    textBounds(text, x, y, fontSize) {
        sketch_js_1.Sketch.graphicsUI.textFont(this.font, fontSize);
        sketch_js_1.Sketch.graphicsUI.textAlign(sketch_js_1.Sketch.p5.LEFT, sketch_js_1.Sketch.p5.TOP);
        const bounds = sketch_js_1.Sketch.font.font.textBounds(text, x, y, fontSize);
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
exports.Font = Font;
