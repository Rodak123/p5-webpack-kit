export class Area {
    /**
     * pos = [number, number], dim = [number, number]
     * @param {object} data JSON containing pos and dim.
     * @param {*} parent Parent area
     * @returns {Area} Extracted area
     */
    static extractArea(data?: object, parent?: any): Area;
    /**
     *
     * @param {number} x X Position
     * @param {number} y Y Position
     * @param {number} w Width
     * @param {number} h Height
     * @param {Area|null} parent Area that this area is relative to
     */
    constructor(x: number, y: number, w: number, h: number, parent?: Area | null);
    /**
     * @type {number}
     */
    _x: number;
    /**
     * @returns {number} X position
     */
    get x(): number;
    /**
     * @type {number}
     */
    _y: number;
    /**
     * @returns {number} Y position
     */
    get y(): number;
    /**
     * @type {number}
     */
    _w: number;
    /**
     * @returns {number} Width
     */
    get w(): number;
    /**
     * @type {number}
     */
    _h: number;
    /**
     * @returns {number} Height
     */
    get h(): number;
    /**
     * @type {Area|null}
     */
    _parent: Area | null;
    /**
     * @param {number} value
     * @returns {Area} Self
     */
    scale(value: number): Area;
    /**
     * @param {number|undefined} w New width
     * @param {number|undefined} h New Height
     */
    resize(w?: number | undefined, h?: number | undefined): this;
    /**
     * @param {number|undefined} pointX X position, undefined for mouseX
     * @param {number|undefined} pointY Y position, undefined for mouseY
     * @returns {boolean} Whether this point is overlapping this area
     */
    over(pointX?: number | undefined, pointY?: number | undefined): boolean;
    /**
     * Draws this area using p5.Graphics.rect
     */
    draw(): void;
}
export class AreaImage {
    /**
     * @param {Area} area Area of this image
     * @param {string} imagePath Path to the image
     * @param {()=>void|undefined} fail Optional, Called on fail, error as argument
     * @param {()=>void|undefined} success Optional, Called on success, image as argument
     */
    constructor(area: Area, imagePath: string, fail?: () => void | undefined, success?: () => void | undefined);
    /**
     * @type {Area}
     */
    _area: Area;
    /**
     * @returns {Area} Area of this image
     */
    get area(): Area;
    /**
     * @type {p5.Image|null}
     */
    _image: p5.Image | null;
    /**
     * @returns {p5.Image|null} Image
     */
    get image(): p5.Image | null;
    /**
     * Draws this image
     */
    draw(): void;
    /**
     * Draw this image, uses an (x, y) position as center
     * @param {number} x X position
     * @param {number} y Y position
     */
    drawAt(x: number, y: number): void;
    /**
     * Draws this images area using p5.Graphics.rect
     */
    drawArea(): void;
}
export class AreaSpriteSheet extends AreaImage {
    /**
     * @param {number} spriteW Width of one sprite
     * @param {Area} area Area of this image
     * @param {string} imagePath Path to the image
     * @param {()=>void|undefined} fail Optional, Called on fail, error as argument
     * @param {()=>void|undefined} success Optional, Called on success, image as argument
     */
    constructor(spriteW: number, area: Area, imagePath: string, fail?: () => void | undefined, success?: () => void | undefined);
    /**
     * @type {p5.Image[]}
     */
    _sprites: p5.Image[];
    /**
     * @type {number}
     */
    _sprite: number;
    /**
     * @param {number} value
     */
    set sprite(value: number);
    /**
     * @returns {number} Current sprite index
     */
    get sprite(): number;
    /**
     * @param {number} value
     */
    set spriteT(value: number);
}
//# sourceMappingURL=areaImage.d.ts.map