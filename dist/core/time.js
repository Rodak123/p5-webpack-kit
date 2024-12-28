"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
const p5_1 = __importDefault(require("p5"));
const sketch_js_1 = require("./sketch.js");
/**
 * A global time class that allows speeding up and slowing down time
 */
class Time {
    /**
     * Time between the previous frame and the one before, modified by timeScale
     * @returns {number} milliseconds
     */
    static get deltaTime() {
        return this._deltaTime * this._timeScale;
    }
    /**
     * Actual time between the previous frame and the one before
     * @returns {number} milliseconds
     */
    static get realDeltaTime() {
        return this._deltaTime;
    }
    /**
     * Time between the previous frame and the one before, modified by timeScale
     * @returns {number} seconds
     */
    static get deltaTimeSec() {
        return this.deltaTime * 0.001;
    }
    /**
     * Actual time between the previous frame and the one before
     * @returns {number} seconds
     */
    static get realDeltaTimeSec() {
        return this.realDeltaTime * 0.001;
    }
    /**
     * Milliseconds since the start of the sketch, modified by timeScale
     * @returns {number} milliseconds
     */
    static get millis() {
        return this._millis;
    }
    /**
     * Actual milliseconds since the start of the sketch
     * @returns {number} milliseconds
     */
    static get realMillis() {
        return sketch_js_1.Sketch.p5.millis();
    }
    /**
     * Modifies deltaTime, used for speeding up or slowing down time
     * @param {number} value
     */
    static set timeScale(value) {
        this._timeScale = value;
    }
    /**
     * @returns {number} Returns current time scale
     */
    static get timeScale() {
        return this._timeScale;
    }
    /**
     * @returns {number} Current frame rate
     */
    static get frameRate() {
        return sketch_js_1.Sketch.p5.frameRate();
    }
    /**
     * Sets the target frame rate
     * @param {number} value
     */
    static set frameRate(value) {
        sketch_js_1.Sketch.p5.frameRate(value);
    }
    /**
     * @returns {number} Frames since start of the sketch
     */
    static get frameCount() {
        return sketch_js_1.Sketch.p5.frameCount;
    }
    /**
     * @returns {number} Returns the average frame rate over AVG_FRAMERATE_FRAMES frames
     */
    static get avgFrameRate() {
        if (this._lastFrameRate.length == 0)
            return 0;
        return (this._lastFrameRate.reduce((val, curr) => {
            return val + curr;
        }, 0) / this._lastFrameRate.length);
    }
    /**
     * @param {p5} p5 A p5 instance from which deltaTime is read
     */
    static update(p5) {
        this._deltaTime = p5.deltaTime;
        this._millis += this.deltaTime;
        this._lastFrameRate.push(this.frameRate);
        if (this._lastFrameRate.length > this.AVG_FRAMERATE_FRAMES)
            this._lastFrameRate.unshift();
    }
    /**
     * Synchronizes millis with realMillis
     */
    static synchronizeMillis() {
        this._millis = this.realMillis;
    }
}
exports.Time = Time;
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
