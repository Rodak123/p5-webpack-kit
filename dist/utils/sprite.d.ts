export class Sprite {
    /**
     * @param {string} assetPath
     * @param {object} data JSON
     */
    constructor(assetPath: string, { name, dim }?: object);
    /**
     * @type {string}
     */
    _name: string;
    /**
     * @type {number} Pixel width
     */
    _width: number;
    /**
     * @type {number} Pixel height
     */
    _height: number;
    /**
     * @returns {number} Pixel width
     */
    get width(): number;
    /**
     * @returns {number} Pixel height
     */
    get height(): number;
    /**
     * @type {p5.Image|null}
     */
    _image: p5.Image | null;
    /**
     * @returns {p5.Image|null}
     */
    get image(): p5.Image | null;
    /**
     * @type {boolean}
     */
    _failed: boolean;
    /**
     * @param {p5.Graphics} graphics
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} scale Optional, Scale size
     */
    draw(graphics: p5.Graphics, x: number, y: number, scale?: number): void;
    /**
     * @param {p5.Graphics} graphics
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} w Width
     * @param {number} h Height
     */
    drawAtRect(graphics: p5.Graphics, x: number, y: number, w: number, h: number): void;
}
//# sourceMappingURL=sprite.d.ts.map