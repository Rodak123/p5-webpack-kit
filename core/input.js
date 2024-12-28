import p5 from 'p5';
import { Sketch } from './sketch.js';
import { Time } from './time.js';

/**
 * Easy to use class that stores all p5 events as an array of listeners, rather than just as one method
 */
class Input {
    /**
     * @param {string} key Key character
     * @returns {boolean} Wheter asked key is pressed
     */
    static isKeyDown(key) {
        if (!Sketch.isSketchActive) return false;
        return Sketch.p5.keyIsDown(key.toUpperCase().charCodeAt(0));
    }

    /**
     * @type {number[]} Number of frames that ellapsed since last mouse press for each button
     */
    static _lastMousePressFrame = {
        left: -1,
        center: -1,
        right: -1,
    };

    /**
     * @param {p5.LEFT|p5.CENTER|p5.RIGHT} mouseButton
     * @returns {int} Number of frames that ellapsed since last mouse press, -1 when that button was not yet pressed
     */
    static getFramesSinceLastMousePress(mouseButton) {
        if (!mouseButton in this._lastMousePressFrame) return -1;
        return Time.frameCount - this._lastMousePressFrame[mouseButton];
    }

    /**
     * @param {number} keyCode Key code
     * @returns {boolean} Wheter asked key code is pressed
     */
    static isKeyCodeDown(keyCode) {
        if (!Sketch.isSketchActive) return false;
        return Sketch.p5.keyIsDown(keyCode);
    }

    /**
     * @returns {number} Horizontal mouse or touch position relative to the canvas (0, 0)
     */
    static get mouseX() {
        if (!Sketch.isSketchActive) return 0;
        return Sketch.p5.mouseX;
    }

    /**
     * @returns {number} Vertical mouse or touch position relative to the canvas (0, 0)
     */
    static get mouseY() {
        if (!Sketch.isSketchActive) return 0;
        return Sketch.p5.mouseY;
    }

    /**
     * @returns {number} Horizontal mouse or touch position relative to the canvas (0, 0) of the previous frame
     */
    static get pmouseX() {
        if (!Sketch.isSketchActive) return 0;
        return Sketch.p5.pmouseX;
    }

    /**
     * @returns {number} Vertical mouse or touch position relative to the canvas (0, 0) of the previous frame
     */
    static get pmouseY() {
        if (!Sketch.isSketchActive) return 0;
        return Sketch.p5.pmouseY;
    }

    /**
     * @returns {number} Horizontal mouse or touch position relative to the window (0, 0)
     */
    static get winMouseX() {
        if (!Sketch.isSketchActive) return 0;
        return Sketch.p5.winMouseX;
    }

    /**
     * @returns {number} Vertical mouse or touch position relative to the window (0, 0)
     */
    static get winMouseY() {
        if (!Sketch.isSketchActive) return 0;
        return Sketch.p5.winMouseY;
    }

    /**
     * @returns {object[]} Array of touch x and y positions relative to the canvas (0, 0) and unique IDs of each touch
     */
    static get touches() {
        if (!Sketch.isSketchActive) return [];
        return Sketch.p5.touches;
    }

    /**
     * @returns {string} Which mouse button was pressed last, either p5.LEFT, p5.RIGHT, p5.CENTER or 'none' when p5 is not yet loaded.
     */
    static get mouseButton() {
        if (!Sketch.isSketchActive) return 'none';
        return Sketch.p5.mouseButton;
    }

    /**
     * @returns {boolean} True if mouse is pressed and false if not
     */
    static get mouseIsPressed() {
        if (!Sketch.isSketchActive) return false;
        return Sketch.p5.mouseIsPressed;
    }

    /**
     * @type {(()=>void)[]}
     */
    _mouseDraggedEvents = [];
    /**
     * @type {(()=>void)[]}
     */
    _mouseMovedEvents = [];

    /**
     * @type {(()=>void)[]}
     */
    _mousePressedEvents = [];
    /**
     * @type {(()=>void)[]}
     */
    _mouseReleasedEvents = [];
    /**
     * @type {(()=>void)[]}
     */
    _mouseClickedEvents = [];

    /**
     * @type {(()=>void)[]}
     */
    _mouseWheelEvents = [];

    /**
     * @type {(()=>void)[]}
     */
    _keyPressedEvents = [];
    /**
     * @type {(()=>void)[]}
     */
    _keyReleasedEvents = [];
    /**
     * @type {(()=>void)[]}
     */
    _keyTypedEvents = [];

    /**
     * @type {(()=>void)[]}
     */
    _touchStartedEvents = [];
    /**
     * @type {(()=>void)[]}
     */
    _touchMovedEvents = [];
    /**
     * @type {(()=>void)[]}
     */
    _touchEndedEvents = [];

    /**
     * @type {(()=>void)[]}
     */
    _windowResizedEvents = [];

    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMouseDraggedEvent(event) {
        this._mouseDraggedEvents.push(event);
    }
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMouseMovedEvent(event) {
        this._mouseMovedEvents.push(event);
    }

    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMousePressedEvent(event) {
        this._mousePressedEvents.push(event);
    }
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMouseReleasedEvent(event) {
        this._mouseReleasedEvents.push(event);
    }
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMouseClickedEvent(event) {
        this._mouseClickedEvents.push(event);
    }

    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMouseWheelEvent(event) {
        this._mouseWheelEvents.push(event);
    }

    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addKeyPressedEvent(event) {
        this._keyPressedEvents.push(event);
    }
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addKeyReleasedEvent(event) {
        this._keyReleasedEvents.push(event);
    }
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addKeyTypedEvent(event) {
        this._keyTypedEvents.push(event);
    }

    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addTouchStartedEvent(event) {
        this._touchStartedEvents.push(event);
    }
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addTouchMovedEvent(event) {
        this._touchMovedEvents.push(event);
    }
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addTouchEndedEvent(event) {
        this._touchEndedEvents.push(event);
    }

    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addWindowResizedEvent(event) {
        this._windowResizedEvents.push(event);
    }

    /**
     * @todo Check if all events are present and are getting correct parameters
     * @param {p5} p5 p5 instance that is used to listen for events
     * @returns {void}
     */
    bindEvents(p5) {
        p5.mouseDragged = (event) => callAllEventListeners(this._mouseDraggedEvents, event);
        p5.mouseMoved = (event) => callAllEventListeners(this._mouseMovedEvents, event);

        p5.mousePressed = (event) => {
            Input._lastMousePressFrame[Sketch.p5.mouseButton] = Time.frameCount;

            callAllEventListeners(this._mousePressedEvents, event);
        };
        p5.mouseReleased = (event) => callAllEventListeners(this._mouseReleasedEvents, event);
        p5.mouseClicked = (event) => callAllEventListeners(this._mouseClickedEvents, event);

        p5.mouseWheel = (event) => callAllEventListeners(this._mouseWheelEvents, event);

        p5.keyPressed = (event) => callAllEventListeners(this._keyPressedEvents, event);
        p5.keyReleased = (event) => callAllEventListeners(this._keyReleasedEvents, event);
        p5.keyTyped = (event) => callAllEventListeners(this._keyTypedEvents, event);

        p5.touchStarted = (event) => callAllEventListeners(this._touchStartedEvents, event);
        p5.touchMoved = (event) => callAllEventListeners(this._touchMovedEvents, event);
        p5.touchEnded = (event) => callAllEventListeners(this._touchEndedEvents, event);

        p5.windowResized = (event) => callAllEventListeners(this._windowResizedEvents, event);

        /**
         * @param {(()=>void)[]} eventListeners
         * @param {Event} event
         */
        const callAllEventListeners = (eventListeners, event) => {
            eventListeners.forEach((eventListener) => eventListener?.call(Sketch.sketch, event));
        };
    }
}

export { Input };
