"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
const p5_1 = __importDefault(require("p5"));
const index_js_1 = require("../core/index.js");
class Sprite {
    /**
     * @returns {number} Pixel width
     */
    get width() {
        return this._width;
    }
    /**
     * @returns {number} Pixel height
     */
    get height() {
        return this._height;
    }
    /**
     * @returns {p5.Image|null}
     */
    get image() {
        return this._image;
    }
    /**
     * @param {string} assetPath
     * @param {object} data JSON
     */
    constructor(assetPath, { name, dim } = { name: '', dim: [1, 1] }) {
        /**
         * @type {p5.Image|null}
         */
        this._image = null;
        /**
         * @type {boolean}
         */
        this._failed = false;
        if (name.length < 2 || dim.length != 2) {
            this._failed = true;
            console.error(`Failed to load sprite: '${name}'.`);
            return;
        }
        this._name = name;
        this._width = dim[0];
        this._height = dim[1];
        index_js_1.Sketch.addPreloadEvent(() => {
            this._image = index_js_1.Sketch.p5.loadImage(`${assetPath}/${name}`, (image) => {
                this._image = image;
            }, (err) => {
                _failed = true;
                console.error(`Failed to load sprite: '${name}'. \n:${err}`);
            });
        });
    }
    /**
     * @param {p5.Graphics} graphics
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} scale Optional, Scale size
     */
    draw(graphics, x, y, scale = 1) {
        if (this._failed || this._image === null)
            return;
        graphics.image(this._image, x, y, this._width * scale, this._height * scale);
    }
    /**
     * @param {p5.Graphics} graphics
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} w Width
     * @param {number} h Height
     */
    drawAtRect(graphics, x, y, w, h) {
        if (this._failed || this._image === null)
            return;
        graphics.image(this._image, x, y, w, h);
    }
}
exports.Sprite = Sprite;
