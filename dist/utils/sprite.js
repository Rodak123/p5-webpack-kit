"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
var p5_1 = __importDefault(require("p5"));
var index_js_1 = require("../core/index.js");
var Sprite = /** @class */ (function () {
    /**
     * @param {string} assetPath
     * @param {object} data JSON
     */
    function Sprite(assetPath, _a) {
        var _b = _a === void 0 ? { name: '', dim: [1, 1] } : _a, name = _b.name, dim = _b.dim;
        var _this = this;
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
            console.error("Failed to load sprite: '".concat(name, "'."));
            return;
        }
        this._name = name;
        this._width = dim[0];
        this._height = dim[1];
        index_js_1.Sketch.addPreloadEvent(function () {
            _this._image = index_js_1.Sketch.p5.loadImage("".concat(assetPath, "/").concat(name), function (image) {
                _this._image = image;
            }, function (err) {
                _failed = true;
                console.error("Failed to load sprite: '".concat(name, "'. \n:").concat(err));
            });
        });
    }
    Object.defineProperty(Sprite.prototype, "width", {
        /**
         * @returns {number} Pixel width
         */
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        /**
         * @returns {number} Pixel height
         */
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "image", {
        /**
         * @returns {p5.Image|null}
         */
        get: function () {
            return this._image;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {p5.Graphics} graphics
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} scale Optional, Scale size
     */
    Sprite.prototype.draw = function (graphics, x, y, scale) {
        if (scale === void 0) { scale = 1; }
        if (this._failed || this._image === null)
            return;
        graphics.image(this._image, x, y, this._width * scale, this._height * scale);
    };
    /**
     * @param {p5.Graphics} graphics
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} w Width
     * @param {number} h Height
     */
    Sprite.prototype.drawAtRect = function (graphics, x, y, w, h) {
        if (this._failed || this._image === null)
            return;
        graphics.image(this._image, x, y, w, h);
    };
    return Sprite;
}());
exports.Sprite = Sprite;
