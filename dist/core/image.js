"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
var p5_1 = __importDefault(require("p5"));
var sketch_js_1 = require("./sketch.js");
var validation_js_1 = require("./validation.js");
/**
 * Easy to use image class that loads the desired image on preload
 */
var Image = /** @class */ (function () {
    /**
     * @param {string} imagePath Path to the desired image inside the images/ folder
     */
    function Image(imagePath) {
        var _this = this;
        this._imagePath = (0, validation_js_1.validateFilePath)(imagePath, [], 'Image path');
        this._image = null;
        if (sketch_js_1.Sketch.isAfterPreload) {
            console.error("Image must be created before '".concat(sketch_js_1.Sketch.preloadEventName, "'."));
        }
        else {
            sketch_js_1.Sketch.addPreloadEvent(function () {
                _this._loadImage();
            });
        }
    }
    /**
     * @returns {void}
     */
    Image.prototype._loadImage = function () {
        var _this = this;
        var imagePath = "".concat(sketch_js_1.Sketch.resourcesPath, "/images/").concat(this._imagePath);
        sketch_js_1.Sketch.p5.loadImage(imagePath, function (image) {
            _this._image = image;
        }, function (err) {
            console.error("Failed to load image at '".concat(imagePath, "'.\n").concat(err));
        });
    };
    Object.defineProperty(Image.prototype, "image", {
        /**
         * @returns {p5.Image} Loaded p5.Image
         */
        get: function () {
            return this._image;
        },
        enumerable: false,
        configurable: true
    });
    return Image;
}());
exports.Image = Image;
