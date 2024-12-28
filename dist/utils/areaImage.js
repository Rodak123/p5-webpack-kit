var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import p5 from 'p5';
import { Input, Sketch } from '../core/index.js';
var Area = /** @class */ (function () {
    /**
     *
     * @param {number} x X Position
     * @param {number} y Y Position
     * @param {number} w Width
     * @param {number} h Height
     * @param {Area|null} parent Area that this area is relative to
     */
    function Area(x, y, w, h, parent) {
        if (parent === void 0) { parent = null; }
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
     * pos = [number, number], dim = [number, number]
     * @param {object} data JSON containing pos and dim.
     * @param {*} parent Parent area
     * @returns {Area} Extracted area
     */
    Area.extractArea = function (data, parent) {
        var _a, _b;
        if (data === void 0) { data = { pos: [0, 0], dim: [0, 0] }; }
        if (parent === void 0) { parent = null; }
        var _c = (_a = data.pos) !== null && _a !== void 0 ? _a : [0, 0], x = _c[0], y = _c[1];
        var _d = (_b = data.dim) !== null && _b !== void 0 ? _b : [0, 0], w = _d[0], h = _d[1];
        return new Area(x, y, w, h, parent);
    };
    Object.defineProperty(Area.prototype, "x", {
        /**
         * @returns {number} X position
         */
        get: function () {
            var _a, _b;
            return this._x + ((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Area.prototype, "y", {
        /**
         * @returns {number} Y position
         */
        get: function () {
            var _a, _b;
            return this._y + ((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Area.prototype, "w", {
        /**
         * @returns {number} Width
         */
        get: function () {
            return this._w;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Area.prototype, "h", {
        /**
         * @returns {number} Height
         */
        get: function () {
            return this._h;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {number} value
     * @returns {Area} Self
     */
    Area.prototype.scale = function (value) {
        this._x *= value;
        this._y *= value;
        this._w *= value;
        this._h *= value;
        return this;
    };
    /**
     * @param {number|undefined} w New width
     * @param {number|undefined} h New Height
     */
    Area.prototype.resize = function (w, h) {
        if (w === void 0) { w = undefined; }
        if (h === void 0) { h = undefined; }
        this._w = w !== null && w !== void 0 ? w : this._w;
        this._h = h !== null && h !== void 0 ? h : this._h;
        return this;
    };
    /**
     * @param {number|undefined} pointX X position, undefined for mouseX
     * @param {number|undefined} pointY Y position, undefined for mouseY
     * @returns {boolean} Whether this point is overlapping this area
     */
    Area.prototype.over = function (pointX, pointY) {
        if (pointX === void 0) { pointX = undefined; }
        if (pointY === void 0) { pointY = undefined; }
        pointX = pointX !== null && pointX !== void 0 ? pointX : Input.mouseX;
        pointY = pointY !== null && pointY !== void 0 ? pointY : Input.mouseY;
        var _a = this, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
        return pointX >= x && pointX < x + w && pointY >= y && pointY < y + h;
    };
    /**
     * Draws this area using p5.Graphics.rect
     */
    Area.prototype.draw = function () {
        var _a = this, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
        Sketch.pixelGraphics.rectMode(Sketch.p5.CORNER);
        Sketch.pixelGraphics.rect(x, y, w, h);
    };
    return Area;
}());
var AreaImage = /** @class */ (function () {
    /**
     * @param {Area} area Area of this image
     * @param {string} imagePath Path to the image
     * @param {()=>void|undefined} fail Optional, Called on fail, error as argument
     * @param {()=>void|undefined} success Optional, Called on success, image as argument
     */
    function AreaImage(area, imagePath, fail, success) {
        if (fail === void 0) { fail = undefined; }
        if (success === void 0) { success = undefined; }
        var _this = this;
        /**
         * @type {p5.Image|null}
         */
        this._image = null;
        Sketch.p5.loadImage(imagePath, function (image) {
            _this._image = image;
            success === null || success === void 0 ? void 0 : success.call(_this, image);
        }, function (err) {
            fail === null || fail === void 0 ? void 0 : fail.call(_this, err);
        });
        this._area = area;
    }
    Object.defineProperty(AreaImage.prototype, "area", {
        /**
         * @returns {Area} Area of this image
         */
        get: function () {
            return this._area;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AreaImage.prototype, "image", {
        /**
         * @returns {p5.Image|null} Image
         */
        get: function () {
            return this._image;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Draws this image
     */
    AreaImage.prototype.draw = function () {
        var _a = this._area, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
        Sketch.pixelGraphics.imageMode(Sketch.p5.CORNER);
        Sketch.pixelGraphics.image(this.image, x, y, w, h);
    };
    /**
     * Draw this image, uses an (x, y) position as center
     * @param {number} x X position
     * @param {number} y Y position
     */
    AreaImage.prototype.drawAt = function (x, y) {
        var _a = this._area, w = _a.w, h = _a.h;
        Sketch.pixelGraphics.imageMode(Sketch.p5.CENTER);
        Sketch.pixelGraphics.image(this.image, x, y, w, h);
    };
    /**
     * Draws this images area using p5.Graphics.rect
     */
    AreaImage.prototype.drawArea = function () {
        this._area.draw();
    };
    return AreaImage;
}());
var AreaSpriteSheet = /** @class */ (function (_super) {
    __extends(AreaSpriteSheet, _super);
    /**
     * @param {number} spriteW Width of one sprite
     * @param {Area} area Area of this image
     * @param {string} imagePath Path to the image
     * @param {()=>void|undefined} fail Optional, Called on fail, error as argument
     * @param {()=>void|undefined} success Optional, Called on success, image as argument
     */
    function AreaSpriteSheet(spriteW, area, imagePath, fail, success) {
        if (fail === void 0) { fail = undefined; }
        if (success === void 0) { success = undefined; }
        var _this = _super.call(this, area, imagePath, fail, function (image) {
            for (var x = 0; x < image.width; x += spriteW) {
                _this._sprites.push(image.get(x, 0, spriteW, image.height));
            }
            success === null || success === void 0 ? void 0 : success.call(_this, image);
        }) || this;
        /**
         * @type {p5.Image[]}
         */
        _this._sprites = [];
        /**
         * @type {number}
         */
        _this._sprite = 0;
        return _this;
    }
    Object.defineProperty(AreaSpriteSheet.prototype, "sprite", {
        /**
         * @returns {number} Current sprite index
         */
        get: function () {
            return this._sprite;
        },
        /**
         * @param {number} value
         */
        set: function (value) {
            value = parseInt(value);
            this._sprite = Sketch.p5.constrain(value, 0, this._sprites.length - 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AreaSpriteSheet.prototype, "spriteT", {
        /**
         * @param {number} value
         */
        set: function (value) {
            this.sprite = value * this._sprites.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AreaSpriteSheet.prototype, "image", {
        /**
         * @returns {p5.Image}
         */
        get: function () {
            return this._sprites[this.sprite];
        },
        enumerable: false,
        configurable: true
    });
    return AreaSpriteSheet;
}(AreaImage));
export { Area, AreaImage, AreaSpriteSheet };
