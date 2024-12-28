/**
 * A global time class that allows speeding up and slowing down time
 */
export class Time {
    /**
     * The number of frames that the average FPS is calculated from
     * @type {number}
     */
    static AVG_FRAMERATE_FRAMES: number;
    /**
     * @type {number[]}
     */
    static _lastFrameRate: number[];
    /**
     * @type {number}
     */
    static _deltaTime: number;
    /**
     * @type {number}
     */
    static _timeScale: number;
    /**
     * @type {number}
     */
    static _millis: number;
    /**
     * Time between the previous frame and the one before, modified by timeScale
     * @returns {number} milliseconds
     */
    static get deltaTime(): number;
    /**
     * Actual time between the previous frame and the one before
     * @returns {number} milliseconds
     */
    static get realDeltaTime(): number;
    /**
     * Time between the previous frame and the one before, modified by timeScale
     * @returns {number} seconds
     */
    static get deltaTimeSec(): number;
    /**
     * Actual time between the previous frame and the one before
     * @returns {number} seconds
     */
    static get realDeltaTimeSec(): number;
    /**
     * Milliseconds since the start of the sketch, modified by timeScale
     * @returns {number} milliseconds
     */
    static get millis(): number;
    /**
     * Actual milliseconds since the start of the sketch
     * @returns {number} milliseconds
     */
    static get realMillis(): number;
    /**
     * Modifies deltaTime, used for speeding up or slowing down time
     * @param {number} value
     */
    static set timeScale(value: number);
    /**
     * @returns {number} Returns current time scale
     */
    static get timeScale(): number;
    /**
     * Sets the target frame rate
     * @param {number} value
     */
    static set frameRate(value: number);
    /**
     * @returns {number} Current frame rate
     */
    static get frameRate(): number;
    /**
     * @returns {number} Frames since start of the sketch
     */
    static get frameCount(): number;
    /**
     * @returns {number} Returns the average frame rate over AVG_FRAMERATE_FRAMES frames
     */
    static get avgFrameRate(): number;
    /**
     * @param {p5} p5 A p5 instance from which deltaTime is read
     */
    static update(p5: p5): void;
    /**
     * Synchronizes millis with realMillis
     */
    static synchronizeMillis(): void;
}
//# sourceMappingURL=time.d.ts.map