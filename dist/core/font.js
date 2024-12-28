import p5 from 'p5';
import { Sketch } from './sketch.js';
import { validateFilePath } from './validation.js';
/**
 * Easy to use font class that loads the desired font on preload
 */
var Font = /** @class */ (function () {
    /**
     * @param {string} fontPath Path to desired font inside the fonts/ folder
     */
    function Font(fontPath) {
        var _this = this;
        this._fontPath = validateFilePath(fontPath, [], 'Font path');
        this._font = null;
        if (Sketch.isAfterPreload) {
            console.error("Font must be created before '".concat(Sketch.preloadEventName, "'."));
        }
        else {
            Sketch.addPreloadEvent(function () {
                _this._loadFont();
            });
        }
    }
    /**
     * @returns {void}
     */
    Font.prototype._loadFont = function () {
        var _this = this;
        var fontPath = "".concat(Sketch.resourcesPath, "/fonts/").concat(this._fontPath);
        this._font = Sketch.p5.loadFont(fontPath, function (font) {
            _this._font = font;
        }, function (err) {
            console.error("Failed to load font at '".concat(fontPath, "'.\n").concat(err));
        });
    };
    /**
     * @param {string} text Text to get bounds of
     * @param {number} x Left top corner X
     * @param {number} y Left top corner Y
     * @param {number} fontSize Size of the font
     * @returns {{x: number, y: number, w: number, h: number}}
     */
    Font.prototype.textBounds = function (text, x, y, fontSize) {
        Sketch.graphicsUI.textFont(this.font, fontSize);
        Sketch.graphicsUI.textAlign(Sketch.p5.LEFT, Sketch.p5.TOP);
        var bounds = Sketch.font.font.textBounds(text, x, y, fontSize);
        // Don't ask why this is here, for some reason the p5 function textBounds does not work :O
        bounds.w += fontSize * 0.25;
        bounds.h += fontSize * 0.33;
        return bounds;
    };
    Object.defineProperty(Font.prototype, "font", {
        /**
         * Loaded p5.Font
         * @returns {p5.Font|null}
         */
        get: function () {
            return this._font;
        },
        enumerable: false,
        configurable: true
    });
    return Font;
}());
export { Font };
