/**
 * Settings that change how draw is handeled
 */
var DrawSettings = /** @class */ (function () {
    function DrawSettings() {
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
    Object.defineProperty(DrawSettings.prototype, "drawGraphics", {
        /**
         * Wheter Sketch.graphics is drawn
         * @returns {boolean}
         */
        get: function () {
            return this._drawGraphics;
        },
        /**
         * @param {boolean} value
         */
        set: function (value) {
            if (value !== false && value !== true) {
                throw new Error("Unexpected value: ".concat(value, " when setting drawGraphics. Expected true or false."));
            }
            this._drawGraphics = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrawSettings.prototype, "drawGraphicsUI", {
        /**
         * Wheter Sketch.graphicsUI is drawn
         * @returns {boolean}
         */
        get: function () {
            return this._drawGraphicsUI;
        },
        /**
         * @param {boolean} value
         */
        set: function (value) {
            if (value !== false && value !== true) {
                throw new Error("Unexpected value: ".concat(value, " when setting drawGraphicsUI. Expected true or false."));
            }
            this._drawGraphicsUI = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrawSettings.prototype, "drawPixelGraphics", {
        /**
         * Wheter Sketch.pixelGraphics is drawn
         * @returns {boolean}
         */
        get: function () {
            return this._drawPixelGraphics;
        },
        /**
         * @param {boolean} value
         */
        set: function (value) {
            if (value !== false && value !== true) {
                throw new Error("Unexpected value: ".concat(value, " when setting drawPixelGraphics. Expected true or false."));
            }
            this._drawPixelGraphics = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrawSettings.prototype, "autoClearCanvas", {
        /**
         * Wheter p5.clear() gets called before draw
         * @returns {boolean}
         */
        get: function () {
            return this._autoClearCanvas;
        },
        /**
         * @param {boolean} value
         */
        set: function (value) {
            if (value !== false && value !== true) {
                throw new Error("Unexpected value: ".concat(value, " when setting autoClearCanvas. Expected true or false."));
            }
            this._autoClearCanvas = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrawSettings;
}());
export { DrawSettings };
