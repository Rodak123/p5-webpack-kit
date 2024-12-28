import p5 from 'p5';
import { Sketch } from './sketch.js';

/**
 * A global time class that allows speeding up and slowing down time
 */
class Time {
    /**
     * The number of frames that the average FPS is calculated from
     * @type {number}
     */
    static AVG_FRAMERATE_FRAMES = 16;
    /**
     * @type {number[]}
     */
    static _lastFrameRate = [];

    /**
     * @type {number}
     */
    static _deltaTime = 0;
    /**
     * @type {number}
     */
    static _timeScale = 1;

    /**
     * @type {number}
     */
    static _millis = 0;

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
        return Sketch.p5.millis();
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
        return Sketch.p5.frameRate();
    }

    /**
     * Sets the target frame rate
     * @param {number} value
     */
    static set frameRate(value) {
        Sketch.p5.frameRate(value);
    }

    /**
     * @returns {number} Frames since start of the sketch
     */
    static get frameCount() {
        return Sketch.p5.frameCount;
    }

    /**
     * @returns {number} Returns the average frame rate over AVG_FRAMERATE_FRAMES frames
     */
    static get avgFrameRate() {
        if (this._lastFrameRate.length == 0) return 0;

        return (
            this._lastFrameRate.reduce((val, curr) => {
                return val + curr;
            }, 0) / this._lastFrameRate.length
        );
    }

    /**
     * @param {p5} p5 A p5 instance from which deltaTime is read
     */
    static update(p5) {
        this._deltaTime = p5.deltaTime;

        this._millis += this.deltaTime;

        this._lastFrameRate.push(this.frameRate);
        if (this._lastFrameRate.length > this.AVG_FRAMERATE_FRAMES) this._lastFrameRate.unshift();
    }

    /**
     * Synchronizes millis with realMillis
     */
    static synchronizeMillis() {
        this._millis = this.realMillis;
    }
}

export { Time };
