"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaSpriteSheet = exports.AreaImage = exports.Area = void 0;
const p5_1 = __importDefault(require("p5"));
const index_js_1 = require("../core/index.js");
class Area {
    /**
     * pos = [number, number], dim = [number, number]
     * @param {object} data JSON containing pos and dim.
     * @param {*} parent Parent area
     * @returns {Area} Extracted area
     */
    static extractArea(data = { pos: [0, 0], dim: [0, 0] }, parent = null) {
        var _a, _b;
        const [x, y] = (_a = data.pos) !== null && _a !== void 0 ? _a : [0, 0];
        const [w, h] = (_b = data.dim) !== null && _b !== void 0 ? _b : [0, 0];
        return new Area(x, y, w, h, parent);
    }
    /**
     * @returns {number} X position
     */
    get x() {
        var _a, _b;
        return this._x + ((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0);
    }
    /**
     * @returns {number} Y position
     */
    get y() {
        var _a, _b;
        return this._y + ((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0);
    }
    /**
     * @returns {number} Width
     */
    get w() {
        return this._w;
    }
    /**
     * @returns {number} Height
     */
    get h() {
        return this._h;
    }
    /**
     *
     * @param {number} x X Position
     * @param {number} y Y Position
     * @param {number} w Width
     * @param {number} h Height
     * @param {Area|null} parent Area that this area is relative to
     */
    constructor(x, y, w, h, parent = null) {
        /**
         * @type {Area|null}
         */
        this._parent = null;
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._parent = parent;
    }
    /**
     * @param {number} value
     * @returns {Area} Self
     */
    scale(value) {
        this._x *= value;
        this._y *= value;
        this._w *= value;
        this._h *= value;
        return this;
    }
    /**
     * @param {number|undefined} w New width
     * @param {number|undefined} h New Height
     */
    resize(w = undefined, h = undefined) {
        this._w = w !== null && w !== void 0 ? w : this._w;
        this._h = h !== null && h !== void 0 ? h : this._h;
        return this;
    }
    /**
     * @param {number|undefined} pointX X position, undefined for mouseX
     * @param {number|undefined} pointY Y position, undefined for mouseY
     * @returns {boolean} Whether this point is overlapping this area
     */
    over(pointX = undefined, pointY = undefined) {
        pointX = pointX !== null && pointX !== void 0 ? pointX : index_js_1.Input.mouseX;
        pointY = pointY !== null && pointY !== void 0 ? pointY : index_js_1.Input.mouseY;
        const { x, y, w, h } = this;
        return pointX >= x && pointX < x + w && pointY >= y && pointY < y + h;
    }
    /**
     * Draws this area using p5.Graphics.rect
     */
    draw() {
        const { x, y, w, h } = this;
        index_js_1.Sketch.pixelGraphics.rectMode(index_js_1.Sketch.p5.CORNER);
        index_js_1.Sketch.pixelGraphics.rect(x, y, w, h);
    }
}
exports.Area = Area;
class AreaImage {
    /**
     * @returns {Area} Area of this image
     */
    get area() {
        return this._area;
    }
    /**
     * @returns {p5.Image|null} Image
     */
    get image() {
        return this._image;
    }
    /**
     * @param {Area} area Area of this image
     * @param {string} imagePath Path to the image
     * @param {()=>void|undefined} fail Optional, Called on fail, error as argument
     * @param {()=>void|undefined} success Optional, Called on success, image as argument
     */
    constructor(area, imagePath, fail = undefined, success = undefined) {
        /**
         * @type {p5.Image|null}
         */
        this._image = null;
        index_js_1.Sketch.p5.loadImage(imagePath, (image) => {
            this._image = image;
            success === null || success === void 0 ? void 0 : success.call(this, image);
        }, (err) => {
            fail === null || fail === void 0 ? void 0 : fail.call(this, err);
        });
        this._area = area;
    }
    /**
     * Draws this image
     */
    draw() {
        const { x, y, w, h } = this._area;
        index_js_1.Sketch.pixelGraphics.imageMode(index_js_1.Sketch.p5.CORNER);
        index_js_1.Sketch.pixelGraphics.image(this.image, x, y, w, h);
    }
    /**
     * Draw this image, uses an (x, y) position as center
     * @param {number} x X position
     * @param {number} y Y position
     */
    drawAt(x, y) {
        const { w, h } = this._area;
        index_js_1.Sketch.pixelGraphics.imageMode(index_js_1.Sketch.p5.CENTER);
        index_js_1.Sketch.pixelGraphics.image(this.image, x, y, w, h);
    }
    /**
     * Draws this images area using p5.Graphics.rect
     */
    drawArea() {
        this._area.draw();
    }
}
exports.AreaImage = AreaImage;
class AreaSpriteSheet extends AreaImage {
    /**
     * @param {number} value
     */
    set sprite(value) {
        value = parseInt(value);
        this._sprite = index_js_1.Sketch.p5.constrain(value, 0, this._sprites.length - 1);
    }
    /**
     * @returns {number} Current sprite index
     */
    get sprite() {
        return this._sprite;
    }
    /**
     * @param {number} value
     */
    set spriteT(value) {
        this.sprite = value * this._sprites.length;
    }
    /**
     * @returns {p5.Image}
     */
    get image() {
        return this._sprites[this.sprite];
    }
    /**
     * @param {number} spriteW Width of one sprite
     * @param {Area} area Area of this image
     * @param {string} imagePath Path to the image
     * @param {()=>void|undefined} fail Optional, Called on fail, error as argument
     * @param {()=>void|undefined} success Optional, Called on success, image as argument
     */
    constructor(spriteW, area, imagePath, fail = undefined, success = undefined) {
        super(area, imagePath, fail, (image) => {
            for (let x = 0; x < image.width; x += spriteW) {
                this._sprites.push(image.get(x, 0, spriteW, image.height));
            }
            success === null || success === void 0 ? void 0 : success.call(this, image);
        });
        /**
         * @type {p5.Image[]}
         */
        this._sprites = [];
        /**
         * @type {number}
         */
        this._sprite = 0;
    }
}
exports.AreaSpriteSheet = AreaSpriteSheet;
