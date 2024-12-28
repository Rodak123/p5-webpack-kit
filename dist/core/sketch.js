"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sketch = void 0;
var p5_1 = __importDefault(require("p5"));
var drawSettings_js_1 = require("./drawSettings.js");
var font_js_1 = require("./font.js");
var input_js_1 = require("./input.js");
var shader_js_1 = require("./shader/shader.js");
var time_js_1 = require("./time.js");
var validation_js_1 = require("./validation.js");
/**
 * A wrapper class for a p5 sketch instance.
 */
var Sketch = /** @class */ (function () {
    /**
     * Sketch settings:
     * @param {number} width Width of the canvas
     * @param {number} height Height of the canvas
     * @param {number} defaultFontPath Path to the automatically loaded font
     */
    function Sketch(settings) {
        if (settings === void 0) { settings = {}; }
        /**
         * @type {p5}
         */
        this._p5 = null;
        /**
         * @type {p5.Element|null}
         */
        this._canvas = null;
        /**
         * @type {number}
         */
        this._width = -1;
        /**
         * @type {number}
         */
        this._height = -1;
        /**
         * @type {p5.Graphics|null}
         */
        this._graphics = null;
        /**
         * @type {p5.Graphics|null}
         */
        this._graphicsUI = null;
        /**
         * @type {p5.Graphics|null}
         */
        this._pixelGraphics = null;
        /**
         * @type {DrawSettings}
         */
        this._drawSettings = new drawSettings_js_1.DrawSettings();
        /**
         * @type {Font|null}
         */
        this._font = null;
        /**
         * @type {boolean}
         */
        this._isAfterPreload = false;
        /**
         * @type {boolean}
         */
        this._isAfterSetup = false;
        /**
         * @type {Shader[]}
         */
        this._shaders = [];
        /**
         * @type {Shader[]}
         */
        this._globalShaders = [];
        /**
         * @type {Input}
         */
        this._input = new input_js_1.Input();
        /**
         * @type {boolean} Whether this sketch can be started
         */
        this._canStart = false;
        /**
         * @type {boolean} Whether this sketch is hidden
         */
        this._isHidden = false;
        /**
         * @type {{width: number, height: number}?} Parameters for resize before the next update
         */
        this._resizeParameters = null;
        /**
         * @type {(()=>void)[]}
         */
        this._setupListeners = [];
        /**
         * @type {(()=>void)[]}
         */
        this._updateListeners = [];
        /**
         * @type {(()=>void)[]}
         */
        this._drawListeners = [];
        if (Sketch.isSketchActive) {
            console.error('There can be only one sketch instance. Aborting.');
            return;
        }
        this._width = (0, validation_js_1.validateTypeOrDefault)(settings.width, 800, 'Sketch width');
        this._height = (0, validation_js_1.validateTypeOrDefault)(settings.height, 800, 'Sketch height');
        var defaultFontPath = (0, validation_js_1.validateTypeOrDefault)(settings.defaultFontPath, 'Roboto/Roboto-Regular.ttf', 'Sketch default font path');
        this._font = new font_js_1.Font(defaultFontPath);
        Sketch._activeSketch = this;
        this._p5 = new p5_1.default(function (p5) {
            p5.setup = function () {
                p5.noCanvas();
                p5.noLoop();
            };
        });
        this._canStart = true;
    }
    Object.defineProperty(Sketch, "resourcesPath", {
        /**
         * @returns {string} Path to the resources folder from the index
         */
        get: function () {
            return './res';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "preloadEventName", {
        /**
         * @returns {string} Name of the preload event
         */
        get: function () {
            return 'preload';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "setupEventName", {
        /**
         * @returns {string} Name of the setup event
         */
        get: function () {
            return 'setup';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "isSketchActive", {
        /**
         * @returns {boolean} Wheter there is an active sketch
         */
        get: function () {
            return this._activeSketch !== null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "sketch", {
        /**
         * @returns {Sketch|null} The active sketch
         */
        get: function () {
            return this._activeSketch;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "input", {
        /**
         * @returns {Input|null}
         */
        get: function () {
            var _a;
            return (_a = this._activeSketch) === null || _a === void 0 ? void 0 : _a.input;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "p5", {
        /**
         * @returns {p5|null} p5 instance used by the active sketch
         */
        get: function () {
            if (!this.isSketchActive)
                return null;
            return this._activeSketch.p5;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "graphics", {
        /**
         * @returns {p5.Graphics|null} Graphics of the active sketch
         */
        get: function () {
            if (!this.isSketchActive)
                return null;
            return this._activeSketch.graphics;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "graphicsUI", {
        /**
         * @returns {p5.Graphics|null} UI Graphics of the active sketch
         */
        get: function () {
            if (!this.isSketchActive)
                return null;
            return this._activeSketch.graphicsUI;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "pixelGraphics", {
        /**
         * @returns {p5.Graphics|null} Pixel Graphics of the active sketch
         */
        get: function () {
            if (!this.isSketchActive)
                return null;
            return this._activeSketch.pixelGraphics;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "width", {
        /**
         * @returns {number} Width of the active sketch canvas or -1
         */
        get: function () {
            if (!this.isSketchActive)
                return -1;
            return this._activeSketch.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "height", {
        /**
         * @returns {number} Height of the active sketch canvas or -1
         */
        get: function () {
            if (!this.isSketchActive)
                return -1;
            return this._activeSketch.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "font", {
        /**
         * @returns {Font|null} Font used by the active sketch
         */
        get: function () {
            if (!this.isSketchActive)
                return null;
            return this._activeSketch.font;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "p5font", {
        /**
         * @returns {p5.Font|null} p5.Font used by the active sketch, from Sketch.font
         */
        get: function () {
            var font = this.font;
            if (font === null)
                return null;
            return font.font;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {()=>void} event Method that gets called on preload
     */
    Sketch.addPreloadEvent = function (event) {
        this._preloadEvents.push(event);
    };
    /**
     * @param {()=>void} event Method that gets called on setup
     */
    Sketch.addSetupEvent = function (event) {
        this._setupEvents.push(event);
    };
    Object.defineProperty(Sketch, "isAfterPreload", {
        /**
         * @returns {bool}
         */
        get: function () {
            if (!this.isSketchActive)
                return false;
            return this._activeSketch.isAfterPreload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch, "isAfterSetup", {
        /**
         * @returns {bool}
         */
        get: function () {
            if (!this.isSketchActive)
                return false;
            return this._activeSketch.isAfterSetup;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {Shader} shader Shader that is going to be applied during draw
     */
    Sketch.addShader = function (shader) {
        this._shaders.push(shader);
    };
    /**
     * @returns {(()=>void)[]} All preload events defined up to this point
     */
    Sketch._dumpPrelaodEvents = function () {
        return this._preloadEvents.splice(0, this._preloadEvents.length);
    };
    /**
     * @returns {(()=>void)[]} All setup events defined up to this point
     */
    Sketch._dumpSetupEvents = function () {
        return this._setupEvents.splice(0, this._setupEvents.length);
    };
    /**
     * @returns {Shader[]} All defined shaders up to this point
     */
    Sketch._dumpShaders = function () {
        return this._shaders.splice(0, this._shaders.length);
    };
    Object.defineProperty(Sketch.prototype, "p5", {
        /**
         * @returns {p5} The p5 instance used by this sketch.
         * If this sketch was not yet started, returns a noCanvas(), noLoop() p5 instance.
         */
        get: function () {
            return this._p5;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "width", {
        /**
         * @returns {number} Width of the canvas
         */
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "height", {
        /**
         * @returns {number} Height of the canvas
         */
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "graphics", {
        /**
         * @returns {p5.Graphics|null} Graphics
         */
        get: function () {
            return this._graphics;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "graphicsUI", {
        /**
         * @returns {p5.Graphics|null} UI Graphics
         */
        get: function () {
            return this._graphicsUI;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "pixelGraphics", {
        /**
         * @returns {p5.Graphics|null} Pixel Graphics
         */
        get: function () {
            return this._pixelGraphics;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "drawSettings", {
        /**
         * @returns {DrawSettings} Draw settings
         */
        get: function () {
            return this._drawSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "font", {
        /**
         * Get the default font
         * @returns {Font|null}
         */
        get: function () {
            return this._font;
        },
        /**
         * Set the default font
         * @param {Font} font
         */
        set: function (font) {
            this._font = font;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "isAfterPreload", {
        /**
         * @returns {boolean}
         */
        get: function () {
            return this._isAfterPreload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "isAfterSetup", {
        /**
         * @returns {boolean}
         */
        get: function () {
            return this._isAfterSetup;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "input", {
        /**
         * @returns {Input}
         */
        get: function () {
            return this._input;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Starts this sketch
     * @returns {void}
     */
    Sketch.prototype.start = function (global) {
        var _this = this;
        if (global === void 0) { global = false; }
        if (this._canStart !== true)
            return;
        new p5_1.default(function (p5) {
            _this._p5 = p5;
            p5.preload = function () { return _this._preload(); };
            p5.setup = function () { return _this._setup(); };
            p5.draw = function () { return _this._draw(); };
            _this.input.bindEvents(p5);
        });
        if (global) {
            console.warn('Sketch is viewed globally!');
            window.sketch = this;
        }
    };
    /**
     * @param {number} width
     * @param {number} height
     * @returns {void}
     */
    Sketch.prototype.resize = function (width, height) {
        this._resizeParameters = {
            width: width,
            height: height,
        };
    };
    /**
     * @returns {void}
     */
    Sketch.prototype._resize = function () {
        this._width = this._resizeParameters.width;
        this._height = this._resizeParameters.height;
        this._resizeParameters = null;
        this.p5.clear();
        this._graphics.clear();
        this._graphicsUI.clear();
        this._pixelGraphics.clear();
        this.p5.resizeCanvas(this.width, this.height);
        this._graphics.resizeCanvas(this.width, this.height);
        this._graphicsUI.resizeCanvas(this.width, this.height);
        this._pixelGraphics.resizeCanvas(this.width, this.height);
    };
    /**
     * Gets called by p5 on p5.preload
     * @returns {void}
     */
    Sketch.prototype._preload = function () {
        Sketch._dumpPrelaodEvents().forEach(function (preloadEvent) { return preloadEvent === null || preloadEvent === void 0 ? void 0 : preloadEvent.call(); });
        this._isAfterPreload = true;
    };
    /**
     * Gets called by p5 on p5.setup
     * @returns {void}
     */
    Sketch.prototype._setup = function () {
        var _this = this;
        this._canvas = this.p5.createCanvas(this.width, this.height, this.p5.WEBGL);
        this.p5.pixelDensity(1);
        this._graphics = this.p5.createGraphics(this.width, this.height, this.p5.WEBGL);
        this._graphicsUI = this.p5.createGraphics(this.width, this.height, this.p5.WEBGL);
        this._pixelGraphics = this.p5.createGraphics(this.width, this.height);
        this._pixelGraphics.noSmooth();
        time_js_1.Time.synchronizeMillis();
        Sketch._dumpShaders().forEach(function (shader) {
            var shaderArray = shader.layer.isSameAs(shader_js_1.ShaderLayer.GLOBAL)
                ? _this._globalShaders
                : _this._shaders;
            shaderArray.push(shader);
        });
        this._isAfterSetup = true;
        this._setupListeners.forEach(function (listener) { return listener === null || listener === void 0 ? void 0 : listener.call(_this); });
        Sketch._dumpSetupEvents().forEach(function (setupEvent) { return setupEvent === null || setupEvent === void 0 ? void 0 : setupEvent.call(); });
    };
    /**
     * Gets called by p5 on p5.draw
     * @returns {void}
     */
    Sketch.prototype._draw = function () {
        var _this = this;
        time_js_1.Time.update(this.p5);
        this._updateListeners.forEach(function (listener) { return listener === null || listener === void 0 ? void 0 : listener.call(_this); });
        if (this._p5.frameCount > 1) {
            this._graphics.pop();
            this._graphicsUI.pop();
            this._pixelGraphics.pop();
        }
        if (this._resizeParameters !== null)
            this._resize();
        this._graphics.push();
        this._graphics.translate(-this.width / 2, -this.height / 2);
        this._graphicsUI.push();
        this._graphicsUI.translate(-this.width / 2, -this.height / 2);
        this._pixelGraphics.push();
        if (this._isHidden)
            return;
        this._drawListeners.forEach(function (listener) { return listener === null || listener === void 0 ? void 0 : listener.call(_this); });
        this.drawSettings.autoClearCanvas && this.p5.clear();
        this._globalShaders.length > 0 && this.p5.plane(Sketch.width, Sketch.height);
        this.p5.translate(-this.width / 2, -this.height / 2);
        this._shaders.forEach(function (shader) {
            shader.autoApplied && shader.applyShader();
        });
        this.drawSettings.drawPixelGraphics &&
            this.graphics.image(this.pixelGraphics, 0, 0, this.width, this.height);
        this.drawSettings.drawGraphics &&
            this.p5.image(this.graphics, 0, 0, this.width, this.height);
        this.drawSettings.drawGraphicsUI &&
            this.p5.image(this.graphicsUI, 0, 0, this.width, this.height);
        this._globalShaders.forEach(function (shader) {
            shader.autoApplied && shader.applyShader();
        });
    };
    Object.defineProperty(Sketch.prototype, "setup", {
        /**
         * Gets called after canvas and graphics are created and before setupEvents are executed.
         * @param {()=>void} value
         */
        set: function (value) {
            this._setupListeners.push(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "update", {
        /**
         * Gets called before draw
         * @param {()=>void} value
         */
        set: function (value) {
            this._updateListeners.push(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sketch.prototype, "draw", {
        /**
         * Gets called each frame.
         * @param {()=>void} value
         */
        set: function (value) {
            this._drawListeners.push(value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Hides the canvas, and pauses time
     * @returns {bool} True on success
     */
    Sketch.prototype.hide = function () {
        if (this._isHidden)
            return false;
        this._isHidden = true;
        this._canvas.hide();
        time_js_1.Time.timeScale = 0;
        return true;
    };
    /**
     * Show the canvas, and resumes time
     * @returns {bool} True on success
     */
    Sketch.prototype.show = function () {
        if (!this._isHidden)
            return false;
        this._isHidden = false;
        this._canvas.show();
        time_js_1.Time.timeScale = 1;
        return true;
    };
    /**
     * @type {Sketch|null}
     */
    Sketch._activeSketch = null;
    /**
     * @type {(()=>void)[]}
     */
    Sketch._preloadEvents = [];
    /**
     * @type {(()=>void)[]}
     */
    Sketch._setupEvents = [];
    /**
     * @type {Shader[]}
     */
    Sketch._shaders = [];
    return Sketch;
}());
exports.Sketch = Sketch;
