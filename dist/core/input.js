import p5 from 'p5';
import { Sketch } from './sketch.js';
import { Time } from './time.js';
/**
 * Easy to use class that stores all p5 events as an array of listeners, rather than just as one method
 */
var Input = /** @class */ (function () {
    function Input() {
        /**
         * @type {(()=>void)[]}
         */
        this._mouseDraggedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._mouseMovedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._mousePressedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._mouseReleasedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._mouseClickedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._mouseWheelEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._keyPressedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._keyReleasedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._keyTypedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._touchStartedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._touchMovedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._touchEndedEvents = [];
        /**
         * @type {(()=>void)[]}
         */
        this._windowResizedEvents = [];
    }
    /**
     * @param {string} key Key character
     * @returns {boolean} Wheter asked key is pressed
     */
    Input.isKeyDown = function (key) {
        if (!Sketch.isSketchActive)
            return false;
        return Sketch.p5.keyIsDown(key.toUpperCase().charCodeAt(0));
    };
    /**
     * @param {p5.LEFT|p5.CENTER|p5.RIGHT} mouseButton
     * @returns {int} Number of frames that ellapsed since last mouse press, -1 when that button was not yet pressed
     */
    Input.getFramesSinceLastMousePress = function (mouseButton) {
        if (!mouseButton in this._lastMousePressFrame)
            return -1;
        return Time.frameCount - this._lastMousePressFrame[mouseButton];
    };
    /**
     * @param {number} keyCode Key code
     * @returns {boolean} Wheter asked key code is pressed
     */
    Input.isKeyCodeDown = function (keyCode) {
        if (!Sketch.isSketchActive)
            return false;
        return Sketch.p5.keyIsDown(keyCode);
    };
    Object.defineProperty(Input, "mouseX", {
        /**
         * @returns {number} Horizontal mouse or touch position relative to the canvas (0, 0)
         */
        get: function () {
            if (!Sketch.isSketchActive)
                return 0;
            return Sketch.p5.mouseX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input, "mouseY", {
        /**
         * @returns {number} Vertical mouse or touch position relative to the canvas (0, 0)
         */
        get: function () {
            if (!Sketch.isSketchActive)
                return 0;
            return Sketch.p5.mouseY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input, "pmouseX", {
        /**
         * @returns {number} Horizontal mouse or touch position relative to the canvas (0, 0) of the previous frame
         */
        get: function () {
            if (!Sketch.isSketchActive)
                return 0;
            return Sketch.p5.pmouseX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input, "pmouseY", {
        /**
         * @returns {number} Vertical mouse or touch position relative to the canvas (0, 0) of the previous frame
         */
        get: function () {
            if (!Sketch.isSketchActive)
                return 0;
            return Sketch.p5.pmouseY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input, "winMouseX", {
        /**
         * @returns {number} Horizontal mouse or touch position relative to the window (0, 0)
         */
        get: function () {
            if (!Sketch.isSketchActive)
                return 0;
            return Sketch.p5.winMouseX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input, "winMouseY", {
        /**
         * @returns {number} Vertical mouse or touch position relative to the window (0, 0)
         */
        get: function () {
            if (!Sketch.isSketchActive)
                return 0;
            return Sketch.p5.winMouseY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input, "touches", {
        /**
         * @returns {object[]} Array of touch x and y positions relative to the canvas (0, 0) and unique IDs of each touch
         */
        get: function () {
            if (!Sketch.isSketchActive)
                return [];
            return Sketch.p5.touches;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input, "mouseButton", {
        /**
         * @returns {string} Which mouse button was pressed last, either p5.LEFT, p5.RIGHT, p5.CENTER or 'none' when p5 is not yet loaded.
         */
        get: function () {
            if (!Sketch.isSketchActive)
                return 'none';
            return Sketch.p5.mouseButton;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input, "mouseIsPressed", {
        /**
         * @returns {boolean} True if mouse is pressed and false if not
         */
        get: function () {
            if (!Sketch.isSketchActive)
                return false;
            return Sketch.p5.mouseIsPressed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addMouseDraggedEvent = function (event) {
        this._mouseDraggedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addMouseMovedEvent = function (event) {
        this._mouseMovedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addMousePressedEvent = function (event) {
        this._mousePressedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addMouseReleasedEvent = function (event) {
        this._mouseReleasedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addMouseClickedEvent = function (event) {
        this._mouseClickedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addMouseWheelEvent = function (event) {
        this._mouseWheelEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addKeyPressedEvent = function (event) {
        this._keyPressedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addKeyReleasedEvent = function (event) {
        this._keyReleasedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addKeyTypedEvent = function (event) {
        this._keyTypedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addTouchStartedEvent = function (event) {
        this._touchStartedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addTouchMovedEvent = function (event) {
        this._touchMovedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addTouchEndedEvent = function (event) {
        this._touchEndedEvents.push(event);
    };
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    Input.prototype.addWindowResizedEvent = function (event) {
        this._windowResizedEvents.push(event);
    };
    /**
     * @todo Check if all events are present and are getting correct parameters
     * @param {p5} p5 p5 instance that is used to listen for events
     * @returns {void}
     */
    Input.prototype.bindEvents = function (p5) {
        var _this = this;
        p5.mouseDragged = function (event) { return callAllEventListeners(_this._mouseDraggedEvents, event); };
        p5.mouseMoved = function (event) { return callAllEventListeners(_this._mouseMovedEvents, event); };
        p5.mousePressed = function (event) {
            Input._lastMousePressFrame[Sketch.p5.mouseButton] = Time.frameCount;
            callAllEventListeners(_this._mousePressedEvents, event);
        };
        p5.mouseReleased = function (event) { return callAllEventListeners(_this._mouseReleasedEvents, event); };
        p5.mouseClicked = function (event) { return callAllEventListeners(_this._mouseClickedEvents, event); };
        p5.mouseWheel = function (event) { return callAllEventListeners(_this._mouseWheelEvents, event); };
        p5.keyPressed = function (event) { return callAllEventListeners(_this._keyPressedEvents, event); };
        p5.keyReleased = function (event) { return callAllEventListeners(_this._keyReleasedEvents, event); };
        p5.keyTyped = function (event) { return callAllEventListeners(_this._keyTypedEvents, event); };
        p5.touchStarted = function (event) { return callAllEventListeners(_this._touchStartedEvents, event); };
        p5.touchMoved = function (event) { return callAllEventListeners(_this._touchMovedEvents, event); };
        p5.touchEnded = function (event) { return callAllEventListeners(_this._touchEndedEvents, event); };
        p5.windowResized = function (event) { return callAllEventListeners(_this._windowResizedEvents, event); };
        /**
         * @param {(()=>void)[]} eventListeners
         * @param {Event} event
         */
        var callAllEventListeners = function (eventListeners, event) {
            eventListeners.forEach(function (eventListener) { return eventListener === null || eventListener === void 0 ? void 0 : eventListener.call(Sketch.sketch, event); });
        };
    };
    /**
     * @type {number[]} Number of frames that ellapsed since last mouse press for each button
     */
    Input._lastMousePressFrame = {
        left: -1,
        center: -1,
        right: -1,
    };
    return Input;
}());
export { Input };
