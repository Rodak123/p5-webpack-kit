/**
 * A wrapper class for a p5 sketch instance.
 */
export class Sketch {
    /**
     * @returns {string} Path to the resources folder from the index
     */
    static get resourcesPath(): string;
    /**
     * @returns {string} Name of the preload event
     */
    static get preloadEventName(): string;
    /**
     * @returns {string} Name of the setup event
     */
    static get setupEventName(): string;
    /**
     * @type {Sketch|null}
     */
    static _activeSketch: Sketch | null;
    /**
     * @type {(()=>void)[]}
     */
    static _preloadEvents: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    static _setupEvents: (() => void)[];
    /**
     * @type {Shader[]}
     */
    static _shaders: Shader[];
    /**
     * @returns {boolean} Wheter there is an active sketch
     */
    static get isSketchActive(): boolean;
    /**
     * @returns {Sketch|null} The active sketch
     */
    static get sketch(): Sketch | null;
    /**
     * @returns {Input|null}
     */
    static get input(): Input | null;
    /**
     * @returns {p5|null} p5 instance used by the active sketch
     */
    static get p5(): p5 | null;
    /**
     * @returns {p5.Graphics|null} Graphics of the active sketch
     */
    static get graphics(): p5.Graphics | null;
    /**
     * @returns {p5.Graphics|null} UI Graphics of the active sketch
     */
    static get graphicsUI(): p5.Graphics | null;
    /**
     * @returns {p5.Graphics|null} Pixel Graphics of the active sketch
     */
    static get pixelGraphics(): p5.Graphics | null;
    /**
     * @returns {number} Width of the active sketch canvas or -1
     */
    static get width(): number;
    /**
     * @returns {number} Height of the active sketch canvas or -1
     */
    static get height(): number;
    /**
     * @returns {Font|null} Font used by the active sketch
     */
    static get font(): Font | null;
    /**
     * @returns {p5.Font|null} p5.Font used by the active sketch, from Sketch.font
     */
    static get p5font(): p5.Font | null;
    /**
     * @param {()=>void} event Method that gets called on preload
     */
    static addPreloadEvent(event: () => void): void;
    /**
     * @param {()=>void} event Method that gets called on setup
     */
    static addSetupEvent(event: () => void): void;
    /**
     * @returns {bool}
     */
    static get isAfterPreload(): bool;
    /**
     * @returns {bool}
     */
    static get isAfterSetup(): bool;
    /**
     * @param {Shader} shader Shader that is going to be applied during draw
     */
    static addShader(shader: Shader): void;
    /**
     * @returns {(()=>void)[]} All preload events defined up to this point
     */
    static _dumpPrelaodEvents(): (() => void)[];
    /**
     * @returns {(()=>void)[]} All setup events defined up to this point
     */
    static _dumpSetupEvents(): (() => void)[];
    /**
     * @returns {Shader[]} All defined shaders up to this point
     */
    static _dumpShaders(): Shader[];
    /**
     * Sketch settings:
     * @param {number} width Width of the canvas
     * @param {number} height Height of the canvas
     * @param {number} defaultFontPath Path to the automatically loaded font
     */
    constructor(settings?: {});
    /**
     * @type {p5}
     */
    _p5: p5;
    /**
     * @type {p5.Element|null}
     */
    _canvas: p5.Element | null;
    /**
     * @returns {p5} The p5 instance used by this sketch.
     * If this sketch was not yet started, returns a noCanvas(), noLoop() p5 instance.
     */
    get p5(): p5;
    /**
     * @type {number}
     */
    _width: number;
    /**
     * @type {number}
     */
    _height: number;
    /**
     * @returns {number} Width of the canvas
     */
    get width(): number;
    /**
     * @returns {number} Height of the canvas
     */
    get height(): number;
    /**
     * @type {p5.Graphics|null}
     */
    _graphics: p5.Graphics | null;
    /**
     * @type {p5.Graphics|null}
     */
    _graphicsUI: p5.Graphics | null;
    /**
     * @type {p5.Graphics|null}
     */
    _pixelGraphics: p5.Graphics | null;
    /**
     * @type {DrawSettings}
     */
    _drawSettings: DrawSettings;
    /**
     * @returns {p5.Graphics|null} Graphics
     */
    get graphics(): p5.Graphics | null;
    /**
     * @returns {p5.Graphics|null} UI Graphics
     */
    get graphicsUI(): p5.Graphics | null;
    /**
     * @returns {p5.Graphics|null} Pixel Graphics
     */
    get pixelGraphics(): p5.Graphics | null;
    /**
     * @returns {DrawSettings} Draw settings
     */
    get drawSettings(): DrawSettings;
    /**
     * @type {Font|null}
     */
    _font: Font | null;
    /**
     * Set the default font
     * @param {Font} font
     */
    set font(font: Font);
    /**
     * Get the default font
     * @returns {Font|null}
     */
    get font(): Font | null;
    /**
     * @type {boolean}
     */
    _isAfterPreload: boolean;
    /**
     * @type {boolean}
     */
    _isAfterSetup: boolean;
    /**
     * @returns {boolean}
     */
    get isAfterPreload(): boolean;
    /**
     * @returns {boolean}
     */
    get isAfterSetup(): boolean;
    /**
     * @type {Shader[]}
     */
    _shaders: Shader[];
    /**
     * @type {Shader[]}
     */
    _globalShaders: Shader[];
    /**
     * @type {Input}
     */
    _input: Input;
    /**
     * @returns {Input}
     */
    get input(): Input;
    /**
     * @type {boolean} Whether this sketch can be started
     */
    _canStart: boolean;
    /**
     * @type {boolean} Whether this sketch is hidden
     */
    _isHidden: boolean;
    /**
     * @type {{width: number, height: number}?} Parameters for resize before the next update
     */
    _resizeParameters: {
        width: number;
        height: number;
    } | null;
    /**
     * @type {(()=>void)[]}
     */
    _setupListeners: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _updateListeners: (() => void)[];
    /**
     * @type {(()=>void)[]}
     */
    _drawListeners: (() => void)[];
    /**
     * Starts this sketch
     * @returns {void}
     */
    start(global?: boolean): void;
    /**
     * @param {number} width
     * @param {number} height
     * @returns {void}
     */
    resize(width: number, height: number): void;
    /**
     * @returns {void}
     */
    _resize(): void;
    /**
     * Gets called by p5 on p5.preload
     * @returns {void}
     */
    _preload(): void;
    /**
     * Gets called by p5 on p5.setup
     * @returns {void}
     */
    _setup(): void;
    /**
     * Gets called by p5 on p5.draw
     * @returns {void}
     */
    _draw(): void;
    /**
     * Gets called after canvas and graphics are created and before setupEvents are executed.
     * @param {()=>void} value
     */
    set setup(value: () => void);
    /**
     * Gets called before draw
     * @param {()=>void} value
     */
    set update(value: () => void);
    /**
     * Gets called each frame.
     * @param {()=>void} value
     */
    set draw(value: () => void);
    /**
     * Hides the canvas, and pauses time
     * @returns {bool} True on success
     */
    hide(): bool;
    /**
     * Show the canvas, and resumes time
     * @returns {bool} True on success
     */
    show(): bool;
}
import { DrawSettings } from './drawSettings.js';
import { Font } from './font.js';
import { Shader } from './shader/shader.js';
import { Input } from './input.js';
//# sourceMappingURL=sketch.d.ts.map