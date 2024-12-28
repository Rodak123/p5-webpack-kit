"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderLayer = exports.Shader = void 0;
var p5_1 = __importDefault(require("p5"));
var sketch_js_1 = require("../sketch.js");
var validation_js_1 = require("../validation.js");
var shaderLayer_js_1 = require("./shaderLayer.js");
Object.defineProperty(exports, "ShaderLayer", { enumerable: true, get: function () { return shaderLayer_js_1.ShaderLayer; } });
/**
 * Checks if source exists and is not empty
 * @param {null|string} source Source code of a shader component
 * @returns {boolean} True if source code is valid for compiling
 */
function isSourceMissing(source) {
    return source === null || source.length === 0;
}
/**
 * A easy to use shader class that loads the needed files and creates the desired shader type. Gets applied automatically.
 */
var Shader = /** @class */ (function () {
    /**
     * @constructor
     * @param {ShaderLayer} shaderLayer On which layer gets this shader applied
     * @param {boolean} isFilter Whether this shader is a filter shader (Uses the canvas as a uniform sampler2D)
     * @param {string} frag Path or source of the fragment shader, based on the usingSource argument
     * @param {string} vert Path or source of the vertex shader, based on the usingSource argument
     * @param {boolean} usingSource Wheter the second and third arguments are paths to the shader or source code of the shader
     */
    function Shader(shaderLayer, isFilter, frag, vert, usingSource) {
        if (vert === void 0) { vert = ''; }
        if (usingSource === void 0) { usingSource = false; }
        var _this = this;
        /**
         * @type {p5.Shader|null}
         */
        this._shader = null;
        /**
         * Path to the fragment shader or null when not used
         * @type {string|null}
         */
        this._fragPath = null;
        /**
         * Path to the vertex shader or null when not used
         * @type {string|null}
         */
        this._vertPath = null;
        /**
         * Source code of the fragment shader or null when not used
         * @type {string|null}
         */
        this._fragSource = null;
        /**
         * Source code of the vertex shader or null when not used
         * @type {string|null}
         */
        this._vertSource = null;
        /**
         * Whether this shader is a filter shader
         * @type {boolean}
         */
        this._isFilter = false;
        /**
         * On which layer gets this shader applied
         * @type {ShaderLayer}
         */
        this._layer = shaderLayer_js_1.ShaderLayer.GLOBAL;
        /**
         * Shader's context is a place where this shader can be applied.
         * Context get's picked automatically on creation.
         * @type {p5|p5.Graphics|null}
         */
        this._context = null;
        /**
         * Whether this shader gets applied by the Sketch instance automatically
         * @type {boolean}
         */
        this.autoApplied = true;
        this._shader = null;
        this._isFilter = (0, validation_js_1.validateType)(isFilter, true, 'isFilter');
        this._layer = (0, validation_js_1.validateType)(shaderLayer, shaderLayer_js_1.ShaderLayer.GRAPHICS, 'shaderLayer');
        (0, validation_js_1.validateType)(usingSource, false, 'usingSource', this);
        if (usingSource) {
            this._fragSource = frag;
            if (isFilter === false)
                this._vertSource = vert;
        }
        else {
            this._fragPath = (0, validation_js_1.validateFilePath)(frag, ['frag'], 'Shader fragment path');
            if (isFilter === false)
                this._vertPath = (0, validation_js_1.validateFilePath)(vert, ['vert'], 'Shader vertex path');
            if (sketch_js_1.Sketch.isAfterPreload) {
                console.error("Shader that is not using source must be created before ".concat(sketch_js_1.Sketch.preloadEventName, ". Aborting."));
                return;
            }
            else {
                sketch_js_1.Sketch.addPreloadEvent(function () {
                    _this._loadShader();
                });
            }
        }
        if (sketch_js_1.Sketch.isAfterSetup) {
            console.error("Every shader must be created before ".concat(sketch_js_1.Sketch.setupEventName, ". Aborting."));
            return;
        }
        else {
            sketch_js_1.Sketch.addSetupEvent(function () {
                _this._createShader();
            });
        }
        sketch_js_1.Sketch.addShader(this);
    }
    /**
     * Returns paths of the shader components
     * @param {string} shaderName Name of the shader
     * @returns {string[]} [Fragment shader path, Vertex shader path]
     */
    Shader.getShaderPaths = function (shaderName) {
        var shaderFolder = this.getShaderFolder(shaderName);
        return ["".concat(shaderFolder, "/").concat(shaderName, ".frag"), "".concat(shaderFolder, "/").concat(shaderName, ".vert")];
    };
    /**
     * Returns the shader folder inside the resources folder
     * @param {string} shaderName Name of the shader
     * @returns {string} Folder of the shader
     */
    Shader.getShaderFolder = function (shaderName) {
        return sketch_js_1.Sketch.resourcesPath + '/shaders/' + shaderName;
    };
    /**
     * Loads shader source file content
     * @returns {void}
     */
    Shader.prototype._loadShader = function () {
        var _this = this;
        sketch_js_1.Sketch.p5.loadStrings(this._fragPath, function (fragShaderLines) {
            _this._fragSource = fragShaderLines.join('\n');
        });
        if (this._isFilter)
            return;
        sketch_js_1.Sketch.p5.loadStrings(this._vertPath, function (vertShaderLines) {
            _this._vertSource = vertShaderLines.join('\n');
        });
    };
    /**
     * Creates p5.Shader instance
     * @returns {void}
     */
    Shader.prototype._createShader = function () {
        this._context = shaderLayer_js_1.ShaderLayer.getShaderLayerContext(this.layer);
        if (this._isFilter) {
            if (isSourceMissing(this._fragSource))
                throw new Error('Filter shader is missing fragment source.');
            this._shader = this._context.createFilterShader(this._fragSource);
        }
        else {
            if (isSourceMissing(this._fragSource))
                throw new Error('Shader is missing fragment source.');
            if (isSourceMissing(this._vertSource))
                throw new Error('Shader is missing vertex source.');
            this._shader = this._context.createShader(this._vertSource, this._fragSource);
        }
    };
    /**
     * Applies the shader to this layer's context
     * @returns {void}
     */
    Shader.prototype.applyShader = function () {
        var _a, _b;
        if (this._shader === null)
            return;
        try {
            if (this._isFilter)
                (_a = this._context) === null || _a === void 0 ? void 0 : _a.filter(this._shader);
            else
                (_b = this._context) === null || _b === void 0 ? void 0 : _b.shader(this._shader);
        }
        catch (err) {
            console.error("Shader failed to apply. Maybe a syntax error?\n".concat(err));
        }
    };
    Object.defineProperty(Shader.prototype, "layer", {
        /**
         * @returns {ShaderLayer} On which layer gets this shader applied
         */
        get: function () {
            return this._layer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "shader", {
        /**
         * @returns {p5.Shader|null} Loaded p5.Shader
         */
        get: function () {
            return this._shader;
        },
        enumerable: false,
        configurable: true
    });
    return Shader;
}());
exports.Shader = Shader;
