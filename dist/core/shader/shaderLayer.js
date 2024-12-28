"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderLayer = void 0;
var p5_1 = __importDefault(require("p5"));
var sketch_js_1 = require("../sketch.js");
/**
 * Shader layers determine in which context is shader applied
 */
var ShaderLayer = /** @class */ (function () {
    /**
     * @constructor
     * @param {string} key
     */
    function ShaderLayer(key, context) {
        if (context === void 0) { context = null; }
        /**
         * ID of this shader layer
         * @type {string}
         */
        this._key = '';
        this._key = key;
        this._context = context;
    }
    Object.defineProperty(ShaderLayer, "GLOBAL", {
        /**
         * The "global" shader layer gets applied to the p5 instance after graphics and graphicsUI are rendered
         * @returns {ShaderLayer}
         */
        get: function () {
            return GLOBAL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderLayer, "GRAPHICS", {
        /**
         * The "graphics" shader layer gets applied to the graphics p5.Graphics instance
         * @returns {ShaderLayer}
         */
        get: function () {
            return GRAPHICS;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderLayer, "GRAPHICS_UI", {
        /**
         * The "graphicsUI" shader layer gets applied to the graphicsUI p5.Graphics instance
         * @returns {ShaderLayer}
         */
        get: function () {
            return GRAPHICS_UI;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {ShaderLayer} shaderLayer Shader layer
     * @returns {p5|p5.Graphics} Context of given shader layer
     * @throws {Error} When shader layer key is unknown
     */
    ShaderLayer.getShaderLayerContext = function (shaderLayer) {
        if (shaderLayer._context != null)
            return shaderLayer._context;
        switch (shaderLayer.key) {
            case ShaderLayer.GLOBAL.key:
                return sketch_js_1.Sketch.p5;
            case ShaderLayer.GRAPHICS.key:
                return sketch_js_1.Sketch.graphics;
            case ShaderLayer.GRAPHICS_UI.key:
                return sketch_js_1.Sketch.graphicsUI;
            default:
                throw new Error("Shader layer key '".concat(shaderLayer.key, "' is unknown"));
        }
    };
    Object.defineProperty(ShaderLayer.prototype, "key", {
        /**
         * @returns {string} The key of this shader layer
         */
        get: function () {
            return this._key;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {ShaderLayer} other Other shader layer to comapre this one to
     * @returns {boolean} True if this and other shader layer's keys are equal
     */
    ShaderLayer.prototype.isSameAs = function (other) {
        return this.key === other.key;
    };
    return ShaderLayer;
}());
exports.ShaderLayer = ShaderLayer;
/**
 * @constant {ShaderLayer}
 */
var GLOBAL = new ShaderLayer('global');
/**
 * @constant {ShaderLayer}
 */
var GRAPHICS = new ShaderLayer('graphics');
/**
 * @constant {ShaderLayer}
 */
var GRAPHICS_UI = new ShaderLayer('graphicsUI');
