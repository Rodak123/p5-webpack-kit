"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const p5_1 = __importDefault(require("p5"));
const sketch_js_1 = require("./sketch.js");
const validation_js_1 = require("./validation.js");
/**
 * Easy to use image class that loads the desired image on preload
 */
class Image {
    /**
     * @param {string} imagePath Path to the desired image inside the images/ folder
     */
    constructor(imagePath) {
        this._imagePath = (0, validation_js_1.validateFilePath)(imagePath, [], 'Image path');
        this._image = null;
        if (sketch_js_1.Sketch.isAfterPreload) {
            console.error(`Image must be created before '${sketch_js_1.Sketch.preloadEventName}'.`);
        }
        else {
            sketch_js_1.Sketch.addPreloadEvent(() => {
                this._loadImage();
            });
        }
    }
    /**
     * @returns {void}
     */
    _loadImage() {
        const imagePath = `${sketch_js_1.Sketch.resourcesPath}/images/${this._imagePath}`;
        sketch_js_1.Sketch.p5.loadImage(imagePath, (image) => {
            this._image = image;
        }, (err) => {
            console.error(`Failed to load image at '${imagePath}'.\n${err}`);
        });
    }
    /**
     * @returns {p5.Image} Loaded p5.Image
     */
    get image() {
        return this._image;
    }
}
exports.Image = Image;
