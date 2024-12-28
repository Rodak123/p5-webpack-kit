import p5 from 'p5';
import { Sketch } from './sketch.js';
import { validateFilePath } from './validation.js';
/**
 * Easy to use image class that loads the desired image on preload
 */
var Image = /** @class */ (function () {
    /**
     * @param {string} imagePath Path to the desired image inside the images/ folder
     */
    function Image(imagePath) {
        var _this = this;
        this._imagePath = validateFilePath(imagePath, [], 'Image path');
        this._image = null;
        if (Sketch.isAfterPreload) {
            console.error("Image must be created before '".concat(Sketch.preloadEventName, "'."));
        }
        else {
            Sketch.addPreloadEvent(function () {
                _this._loadImage();
            });
        }
    }
    /**
     * @returns {void}
     */
    Image.prototype._loadImage = function () {
        var _this = this;
        var imagePath = "".concat(Sketch.resourcesPath, "/images/").concat(this._imagePath);
        Sketch.p5.loadImage(imagePath, function (image) {
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
export { Image };
