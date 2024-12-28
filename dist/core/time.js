"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
var p5_1 = __importDefault(require("p5"));
var sketch_js_1 = require("./sketch.js");
/**
 * A global time class that allows speeding up and slowing down time
 */
var Time = /** @class */ (function () {
    function Time() {
    }
    Object.defineProperty(Time, "deltaTime", {
        /**
         * Time between the previous frame and the one before, modified by timeScale
         * @returns {number} milliseconds
         */
        get: function () {
            return this._deltaTime * this._timeScale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "realDeltaTime", {
        /**
         * Actual time between the previous frame and the one before
         * @returns {number} milliseconds
         */
        get: function () {
            return this._deltaTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "deltaTimeSec", {
        /**
         * Time between the previous frame and the one before, modified by timeScale
         * @returns {number} seconds
         */
        get: function () {
            return this.deltaTime * 0.001;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "realDeltaTimeSec", {
        /**
         * Actual time between the previous frame and the one before
         * @returns {number} seconds
         */
        get: function () {
            return this.realDeltaTime * 0.001;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "millis", {
        /**
         * Milliseconds since the start of the sketch, modified by timeScale
         * @returns {number} milliseconds
         */
        get: function () {
            return this._millis;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "realMillis", {
        /**
         * Actual milliseconds since the start of the sketch
         * @returns {number} milliseconds
         */
        get: function () {
            return sketch_js_1.Sketch.p5.millis();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "timeScale", {
        /**
         * @returns {number} Returns current time scale
         */
        get: function () {
            return this._timeScale;
        },
        /**
         * Modifies deltaTime, used for speeding up or slowing down time
         * @param {number} value
         */
        set: function (value) {
            this._timeScale = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "frameRate", {
        /**
         * @returns {number} Current frame rate
         */
        get: function () {
            return sketch_js_1.Sketch.p5.frameRate();
        },
        /**
         * Sets the target frame rate
         * @param {number} value
         */
        set: function (value) {
            sketch_js_1.Sketch.p5.frameRate(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "frameCount", {
        /**
         * @returns {number} Frames since start of the sketch
         */
        get: function () {
            return sketch_js_1.Sketch.p5.frameCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time, "avgFrameRate", {
        /**
         * @returns {number} Returns the average frame rate over AVG_FRAMERATE_FRAMES frames
         */
        get: function () {
            if (this._lastFrameRate.length == 0)
                return 0;
            return (this._lastFrameRate.reduce(function (val, curr) {
                return val + curr;
            }, 0) / this._lastFrameRate.length);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {p5} p5 A p5 instance from which deltaTime is read
     */
    Time.update = function (p5) {
        this._deltaTime = p5.deltaTime;
        this._millis += this.deltaTime;
        this._lastFrameRate.push(this.frameRate);
        if (this._lastFrameRate.length > this.AVG_FRAMERATE_FRAMES)
            this._lastFrameRate.unshift();
    };
    /**
     * Synchronizes millis with realMillis
     */
    Time.synchronizeMillis = function () {
        this._millis = this.realMillis;
    };
    /**
     * The number of frames that the average FPS is calculated from
     * @type {number}
     */
    Time.AVG_FRAMERATE_FRAMES = 16;
    /**
     * @type {number[]}
     */
    Time._lastFrameRate = [];
    /**
     * @type {number}
     */
    Time._deltaTime = 0;
    /**
     * @type {number}
     */
    Time._timeScale = 1;
    /**
     * @type {number}
     */
    Time._millis = 0;
    return Time;
}());
exports.Time = Time;
