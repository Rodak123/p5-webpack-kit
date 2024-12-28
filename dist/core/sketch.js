"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sketch = void 0;
const p5_1 = __importDefault(require("p5"));
const drawSettings_js_1 = require("./drawSettings.js");
const font_js_1 = require("./font.js");
const input_js_1 = require("./input.js");
const shader_js_1 = require("./shader/shader.js");
const time_js_1 = require("./time.js");
const validation_js_1 = require("./validation.js");
/**
 * A wrapper class for a p5 sketch instance.
 */
class Sketch {
    /**
     * @returns {string} Path to the resources folder from the index
     */
    static get resourcesPath() {
        return './res';
    }
    /**
     * @returns {string} Name of the preload event
     */
    static get preloadEventName() {
        return 'preload';
    }
    /**
     * @returns {string} Name of the setup event
     */
    static get setupEventName() {
        return 'setup';
    }
    /**
     * @returns {boolean} Wheter there is an active sketch
     */
    static get isSketchActive() {
        return this._activeSketch !== null;
    }
    /**
     * @returns {Sketch|null} The active sketch
     */
    static get sketch() {
        return this._activeSketch;
    }
    /**
     * @returns {Input|null}
     */
    static get input() {
        var _a;
        return (_a = this._activeSketch) === null || _a === void 0 ? void 0 : _a.input;
    }
    /**
     * @returns {p5|null} p5 instance used by the active sketch
     */
    static get p5() {
        if (!this.isSketchActive)
            return null;
        return this._activeSketch.p5;
    }
    /**
     * @returns {p5.Graphics|null} Graphics of the active sketch
     */
    static get graphics() {
        if (!this.isSketchActive)
            return null;
        return this._activeSketch.graphics;
    }
    /**
     * @returns {p5.Graphics|null} UI Graphics of the active sketch
     */
    static get graphicsUI() {
        if (!this.isSketchActive)
            return null;
        return this._activeSketch.graphicsUI;
    }
    /**
     * @returns {p5.Graphics|null} Pixel Graphics of the active sketch
     */
    static get pixelGraphics() {
        if (!this.isSketchActive)
            return null;
        return this._activeSketch.pixelGraphics;
    }
    /**
     * @returns {number} Width of the active sketch canvas or -1
     */
    static get width() {
        if (!this.isSketchActive)
            return -1;
        return this._activeSketch.width;
    }
    /**
     * @returns {number} Height of the active sketch canvas or -1
     */
    static get height() {
        if (!this.isSketchActive)
            return -1;
        return this._activeSketch.height;
    }
    /**
     * @returns {Font|null} Font used by the active sketch
     */
    static get font() {
        if (!this.isSketchActive)
            return null;
        return this._activeSketch.font;
    }
    /**
     * @returns {p5.Font|null} p5.Font used by the active sketch, from Sketch.font
     */
    static get p5font() {
        const font = this.font;
        if (font === null)
            return null;
        return font.font;
    }
    /**
     * @param {()=>void} event Method that gets called on preload
     */
    static addPreloadEvent(event) {
        this._preloadEvents.push(event);
    }
    /**
     * @param {()=>void} event Method that gets called on setup
     */
    static addSetupEvent(event) {
        this._setupEvents.push(event);
    }
    /**
     * @returns {bool}
     */
    static get isAfterPreload() {
        if (!this.isSketchActive)
            return false;
        return this._activeSketch.isAfterPreload;
    }
    /**
     * @returns {bool}
     */
    static get isAfterSetup() {
        if (!this.isSketchActive)
            return false;
        return this._activeSketch.isAfterSetup;
    }
    /**
     * @param {Shader} shader Shader that is going to be applied during draw
     */
    static addShader(shader) {
        this._shaders.push(shader);
    }
    /**
     * @returns {(()=>void)[]} All preload events defined up to this point
     */
    static _dumpPrelaodEvents() {
        return this._preloadEvents.splice(0, this._preloadEvents.length);
    }
    /**
     * @returns {(()=>void)[]} All setup events defined up to this point
     */
    static _dumpSetupEvents() {
        return this._setupEvents.splice(0, this._setupEvents.length);
    }
    /**
     * @returns {Shader[]} All defined shaders up to this point
     */
    static _dumpShaders() {
        return this._shaders.splice(0, this._shaders.length);
    }
    /**
     * @returns {p5} The p5 instance used by this sketch.
     * If this sketch was not yet started, returns a noCanvas(), noLoop() p5 instance.
     */
    get p5() {
        return this._p5;
    }
    /**
     * @returns {number} Width of the canvas
     */
    get width() {
        return this._width;
    }
    /**
     * @returns {number} Height of the canvas
     */
    get height() {
        return this._height;
    }
    /**
     * @returns {p5.Graphics|null} Graphics
     */
    get graphics() {
        return this._graphics;
    }
    /**
     * @returns {p5.Graphics|null} UI Graphics
     */
    get graphicsUI() {
        return this._graphicsUI;
    }
    /**
     * @returns {p5.Graphics|null} Pixel Graphics
     */
    get pixelGraphics() {
        return this._pixelGraphics;
    }
    /**
     * @returns {DrawSettings} Draw settings
     */
    get drawSettings() {
        return this._drawSettings;
    }
    /**
     * Set the default font
     * @param {Font} font
     */
    set font(font) {
        this._font = font;
    }
    /**
     * Get the default font
     * @returns {Font|null}
     */
    get font() {
        return this._font;
    }
    /**
     * @returns {boolean}
     */
    get isAfterPreload() {
        return this._isAfterPreload;
    }
    /**
     * @returns {boolean}
     */
    get isAfterSetup() {
        return this._isAfterSetup;
    }
    /**
     * @returns {Input}
     */
    get input() {
        return this._input;
    }
    /**
     * Sketch settings:
     * @param {number} width Width of the canvas
     * @param {number} height Height of the canvas
     * @param {number} defaultFontPath Path to the automatically loaded font
     */
    constructor(settings = {}) {
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
        const defaultFontPath = (0, validation_js_1.validateTypeOrDefault)(settings.defaultFontPath, 'Roboto/Roboto-Regular.ttf', 'Sketch default font path');
        this._font = new font_js_1.Font(defaultFontPath);
        Sketch._activeSketch = this;
        this._p5 = new p5_1.default((p5) => {
            p5.setup = () => {
                p5.noCanvas();
                p5.noLoop();
            };
        });
        this._canStart = true;
    }
    /**
     * Starts this sketch
     * @returns {void}
     */
    start(global = false) {
        if (this._canStart !== true)
            return;
        new p5_1.default((p5) => {
            this._p5 = p5;
            p5.preload = () => this._preload();
            p5.setup = () => this._setup();
            p5.draw = () => this._draw();
            this.input.bindEvents(p5);
        });
        if (global) {
            console.warn('Sketch is viewed globally!');
            window.sketch = this;
        }
    }
    /**
     * @param {number} width
     * @param {number} height
     * @returns {void}
     */
    resize(width, height) {
        this._resizeParameters = {
            width: width,
            height: height,
        };
    }
    /**
     * @returns {void}
     */
    _resize() {
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
    }
    /**
     * Gets called by p5 on p5.preload
     * @returns {void}
     */
    _preload() {
        Sketch._dumpPrelaodEvents().forEach((preloadEvent) => preloadEvent === null || preloadEvent === void 0 ? void 0 : preloadEvent.call());
        this._isAfterPreload = true;
    }
    /**
     * Gets called by p5 on p5.setup
     * @returns {void}
     */
    _setup() {
        this._canvas = this.p5.createCanvas(this.width, this.height, this.p5.WEBGL);
        this.p5.pixelDensity(1);
        this._graphics = this.p5.createGraphics(this.width, this.height, this.p5.WEBGL);
        this._graphicsUI = this.p5.createGraphics(this.width, this.height, this.p5.WEBGL);
        this._pixelGraphics = this.p5.createGraphics(this.width, this.height);
        this._pixelGraphics.noSmooth();
        time_js_1.Time.synchronizeMillis();
        Sketch._dumpShaders().forEach((shader) => {
            const shaderArray = shader.layer.isSameAs(shader_js_1.ShaderLayer.GLOBAL)
                ? this._globalShaders
                : this._shaders;
            shaderArray.push(shader);
        });
        this._isAfterSetup = true;
        this._setupListeners.forEach((listener) => listener === null || listener === void 0 ? void 0 : listener.call(this));
        Sketch._dumpSetupEvents().forEach((setupEvent) => setupEvent === null || setupEvent === void 0 ? void 0 : setupEvent.call());
    }
    /**
     * Gets called by p5 on p5.draw
     * @returns {void}
     */
    _draw() {
        time_js_1.Time.update(this.p5);
        this._updateListeners.forEach((listener) => listener === null || listener === void 0 ? void 0 : listener.call(this));
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
        this._drawListeners.forEach((listener) => listener === null || listener === void 0 ? void 0 : listener.call(this));
        this.drawSettings.autoClearCanvas && this.p5.clear();
        this._globalShaders.length > 0 && this.p5.plane(Sketch.width, Sketch.height);
        this.p5.translate(-this.width / 2, -this.height / 2);
        this._shaders.forEach((shader) => {
            shader.autoApplied && shader.applyShader();
        });
        this.drawSettings.drawPixelGraphics &&
            this.graphics.image(this.pixelGraphics, 0, 0, this.width, this.height);
        this.drawSettings.drawGraphics &&
            this.p5.image(this.graphics, 0, 0, this.width, this.height);
        this.drawSettings.drawGraphicsUI &&
            this.p5.image(this.graphicsUI, 0, 0, this.width, this.height);
        this._globalShaders.forEach((shader) => {
            shader.autoApplied && shader.applyShader();
        });
    }
    /**
     * Gets called after canvas and graphics are created and before setupEvents are executed.
     * @param {()=>void} value
     */
    set setup(value) {
        this._setupListeners.push(value);
    }
    /**
     * Gets called before draw
     * @param {()=>void} value
     */
    set update(value) {
        this._updateListeners.push(value);
    }
    /**
     * Gets called each frame.
     * @param {()=>void} value
     */
    set draw(value) {
        this._drawListeners.push(value);
    }
    /**
     * Hides the canvas, and pauses time
     * @returns {bool} True on success
     */
    hide() {
        if (this._isHidden)
            return false;
        this._isHidden = true;
        this._canvas.hide();
        time_js_1.Time.timeScale = 0;
        return true;
    }
    /**
     * Show the canvas, and resumes time
     * @returns {bool} True on success
     */
    show() {
        if (!this._isHidden)
            return false;
        this._isHidden = false;
        this._canvas.show();
        time_js_1.Time.timeScale = 1;
        return true;
    }
}
exports.Sketch = Sketch;
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
