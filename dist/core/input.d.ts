/**
 * Easy to use class that stores all p5 events as an array of listeners, rather than just as one method
 */
export class Input {
    /**
     * @param {string} key Key character
     * @returns {boolean} Wheter asked key is pressed
     */
    static isKeyDown(key: string): boolean;
    /**
     * @type {number[]} Number of frames that ellapsed since last mouse press for each button
     */
    static _lastMousePressFrame: number[];
    /**
     * @param {p5.LEFT|p5.CENTER|p5.RIGHT} mouseButton
     * @returns {int} Number of frames that ellapsed since last mouse press, -1 when that button was not yet pressed
     */
    static getFramesSinceLastMousePress(mouseButton: p5.LEFT | p5.CENTER | p5.RIGHT): int;
    /**
     * @param {number} keyCode Key code
     * @returns {boolean} Wheter asked key code is pressed
     */
    static isKeyCodeDown(keyCode: number): boolean;
    /**
     * @returns {number} Horizontal mouse or touch position relative to the canvas (0, 0)
     */
    static get mouseX(): number;
    /**
     * @returns {number} Vertical mouse or touch position relative to the canvas (0, 0)
     */
    static get mouseY(): number;
    /**
     * @returns {number} Horizontal mouse or touch position relative to the canvas (0, 0) of the previous frame
     */
    static get pmouseX(): number;
    /**
     * @returns {number} Vertical mouse or touch position relative to the canvas (0, 0) of the previous frame
     */
    static get pmouseY(): number;
    /**
     * @returns {number} Horizontal mouse or touch position relative to the window (0, 0)
     */
    static get winMouseX(): number;
    /**
     * @returns {number} Vertical mouse or touch position relative to the window (0, 0)
     */
    static get winMouseY(): number;
    /**
     * @returns {object[]} Array of touch x and y positions relative to the canvas (0, 0) and unique IDs of each touch
     */
    static get touches(): object[];
    /**
     * @returns {string} Which mouse button was pressed last, either p5.LEFT, p5.RIGHT, p5.CENTER or 'none' when p5 is not yet loaded.
     */
    static get mouseButton(): string;
    /**
     * @returns {boolean} True if mouse is pressed and false if not
     */
    static get mouseIsPressed(): boolean;
    /**
     * @type {(()=>void)[]}
     */
    _mouseDraggedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _mouseMovedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _mousePressedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _mouseReleasedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _mouseClickedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _mouseWheelEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _keyPressedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _keyReleasedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _keyTypedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _touchStartedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _touchMovedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _touchEndedEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _windowResizedEvents: (() => void)[];
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMouseDraggedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMouseMovedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMousePressedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMouseReleasedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMouseClickedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addMouseWheelEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addKeyPressedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addKeyReleasedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addKeyTypedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addTouchStartedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addTouchMovedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addTouchEndedEvent(event: () => void): void;
    /**
     * @param {()=>void} event Event that gets called
     * @returns {void}
     */
    addWindowResizedEvent(event: () => void): void;
    /**
     * @todo Check if all events are present and are getting correct parameters
     * @param {p5} p5 p5 instance that is used to listen for events
     * @returns {void}
     */
    bindEvents(p5: p5): void;
}
