/**
 * A easy to use shader class that loads the needed files and creates the desired shader type. Gets applied automatically.
 */
export class Shader {
    /**
     * Returns paths of the shader components
     * @param {string} shaderName Name of the shader
     * @returns {string[]} [Fragment shader path, Vertex shader path]
     */
    static getShaderPaths(shaderName: string): string[];
    /**
     * Returns the shader folder inside the resources folder
     * @param {string} shaderName Name of the shader
     * @returns {string} Folder of the shader
     */
    static getShaderFolder(shaderName: string): string;
    /**
     * @constructor
     * @param {ShaderLayer} shaderLayer On which layer gets this shader applied
     * @param {boolean} isFilter Whether this shader is a filter shader (Uses the canvas as a uniform sampler2D)
     * @param {string} frag Path or source of the fragment shader, based on the usingSource argument
     * @param {string} vert Path or source of the vertex shader, based on the usingSource argument
     * @param {boolean} usingSource Wheter the second and third arguments are paths to the shader or source code of the shader
     */
    constructor(shaderLayer: ShaderLayer, isFilter: boolean, frag: string, vert?: string, usingSource?: boolean);
    /**
     * @type {p5.Shader|null}
     */
    _shader: p5.Shader | null;
    /**
     * Path to the fragment shader or null when not used
     * @type {string|null}
     */
    _fragPath: string | null;
    /**
     * Path to the vertex shader or null when not used
     * @type {string|null}
     */
    _vertPath: string | null;
    /**
     * Source code of the fragment shader or null when not used
     * @type {string|null}
     */
    _fragSource: string | null;
    /**
     * Source code of the vertex shader or null when not used
     * @type {string|null}
     */
    _vertSource: string | null;
    /**
     * Whether this shader is a filter shader
     * @type {boolean}
     */
    _isFilter: boolean;
    /**
     * On which layer gets this shader applied
     * @type {ShaderLayer}
     */
    _layer: ShaderLayer;
    /**
     * Shader's context is a place where this shader can be applied.
     * Context get's picked automatically on creation.
     * @type {p5|p5.Graphics|null}
     */
    _context: p5 | p5.Graphics | null;
    /**
     * Whether this shader gets applied by the Sketch instance automatically
     * @type {boolean}
     */
    autoApplied: boolean;
    /**
     * Loads shader source file content
     * @returns {void}
     */
    _loadShader(): void;
    /**
     * Creates p5.Shader instance
     * @returns {void}
     */
    _createShader(): void;
    /**
     * Applies the shader to this layer's context
     * @returns {void}
     */
    applyShader(): void;
    /**
     * @returns {ShaderLayer} On which layer gets this shader applied
     */
    get layer(): ShaderLayer;
    /**
     * @returns {p5.Shader|null} Loaded p5.Shader
     */
    get shader(): p5.Shader | null;
}
import { ShaderLayer } from './shaderLayer.js';
export { ShaderLayer };
