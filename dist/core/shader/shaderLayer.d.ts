/**
 * Shader layers determine in which context is shader applied
 */
export class ShaderLayer {
    /**
     * The "global" shader layer gets applied to the p5 instance after graphics and graphicsUI are rendered
     * @returns {ShaderLayer}
     */
    static get GLOBAL(): ShaderLayer;
    /**
     * The "graphics" shader layer gets applied to the graphics p5.Graphics instance
     * @returns {ShaderLayer}
     */
    static get GRAPHICS(): ShaderLayer;
    /**
     * The "graphicsUI" shader layer gets applied to the graphicsUI p5.Graphics instance
     * @returns {ShaderLayer}
     */
    static get GRAPHICS_UI(): ShaderLayer;
    /**
     * @param {ShaderLayer} shaderLayer Shader layer
     * @returns {p5|p5.Graphics} Context of given shader layer
     * @throws {Error} When shader layer key is unknown
     */
    static getShaderLayerContext(shaderLayer: ShaderLayer): p5 | p5.Graphics;
    /**
     * @constructor
     * @param {string} key
     */
    constructor(key: string, context?: any);
    /**
     * ID of this shader layer
     * @type {string}
     */
    _key: string;
    _context: any;
    /**
     * @returns {string} The key of this shader layer
     */
    get key(): string;
    /**
     * @param {ShaderLayer} other Other shader layer to comapre this one to
     * @returns {boolean} True if this and other shader layer's keys are equal
     */
    isSameAs(other: ShaderLayer): boolean;
}
