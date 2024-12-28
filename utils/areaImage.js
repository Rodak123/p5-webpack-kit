import p5 from 'p5';
import { Input, Sketch } from '../core/index.js';

class Area {
    /**
     * pos = [number, number], dim = [number, number]
     * @param {object} data JSON containing pos and dim.
     * @param {*} parent Parent area
     * @returns {Area} Extracted area
     */
    static extractArea(data = { pos: [0, 0], dim: [0, 0] }, parent = null) {
        const [x, y] = data.pos ?? [0, 0];
        const [w, h] = data.dim ?? [0, 0];
        return new Area(x, y, w, h, parent);
    }

    /**
     * @type {number}
     */
    _x;

    /**
     * @returns {number} X position
     */
    get x() {
        return this._x + (this._parent?.x ?? 0);
    }

    /**
     * @type {number}
     */
    _y;

    /**
     * @returns {number} Y position
     */
    get y() {
        return this._y + (this._parent?.y ?? 0);
    }

    /**
     * @type {number}
     */
    _w;

    /**
     * @returns {number} Width
     */
    get w() {
        return this._w;
    }

    /**
     * @type {number}
     */
    _h;

    /**
     * @returns {number} Height
     */
    get h() {
        return this._h;
    }

    /**
     * @type {Area|null}
     */
    _parent = null;

    /**
     *
     * @param {number} x X Position
     * @param {number} y Y Position
     * @param {number} w Width
     * @param {number} h Height
     * @param {Area|null} parent Area that this area is relative to
     */
    constructor(x, y, w, h, parent = null) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._parent = parent;
    }

    /**
     * @param {number} value
     * @returns {Area} Self
     */
    scale(value) {
        this._x *= value;
        this._y *= value;
        this._w *= value;
        this._h *= value;
        return this;
    }

    /**
     * @param {number|undefined} w New width
     * @param {number|undefined} h New Height
     */
    resize(w = undefined, h = undefined) {
        this._w = w ?? this._w;
        this._h = h ?? this._h;
        return this;
    }

    /**
     * @param {number|undefined} pointX X position, undefined for mouseX
     * @param {number|undefined} pointY Y position, undefined for mouseY
     * @returns {boolean} Whether this point is overlapping this area
     */
    over(pointX = undefined, pointY = undefined) {
        pointX = pointX ?? Input.mouseX;
        pointY = pointY ?? Input.mouseY;
        const { x, y, w, h } = this;

        return pointX >= x && pointX < x + w && pointY >= y && pointY < y + h;
    }

    /**
     * Draws this area using p5.Graphics.rect
     */
    draw() {
        const { x, y, w, h } = this;

        Sketch.pixelGraphics.rectMode(Sketch.p5.CORNER);
        Sketch.pixelGraphics.rect(x, y, w, h);
    }
}

class AreaImage {
    /**
     * @type {Area}
     */
    _area;

    /**
     * @returns {Area} Area of this image
     */
    get area() {
        return this._area;
    }

    /**
     * @type {p5.Image|null}
     */
    _image = null;

    /**
     * @returns {p5.Image|null} Image
     */
    get image() {
        return this._image;
    }

    /**
     * @param {Area} area Area of this image
     * @param {string} imagePath Path to the image
     * @param {()=>void|undefined} fail Optional, Called on fail, error as argument
     * @param {()=>void|undefined} success Optional, Called on success, image as argument
     */
    constructor(area, imagePath, fail = undefined, success = undefined) {
        Sketch.p5.loadImage(
            imagePath,
            (image) => {
                this._image = image;
                success?.call(this, image);
            },
            (err) => {
                fail?.call(this, err);
            }
        );

        this._area = area;
    }

    /**
     * Draws this image
     */
    draw() {
        const { x, y, w, h } = this._area;
        Sketch.pixelGraphics.imageMode(Sketch.p5.CORNER);
        Sketch.pixelGraphics.image(this.image, x, y, w, h);
    }

    /**
     * Draw this image, uses an (x, y) position as center
     * @param {number} x X position
     * @param {number} y Y position
     */
    drawAt(x, y) {
        const { w, h } = this._area;
        Sketch.pixelGraphics.imageMode(Sketch.p5.CENTER);
        Sketch.pixelGraphics.image(this.image, x, y, w, h);
    }

    /**
     * Draws this images area using p5.Graphics.rect
     */
    drawArea() {
        this._area.draw();
    }
}

class AreaSpriteSheet extends AreaImage {
    /**
     * @type {p5.Image[]}
     */
    _sprites = [];
    /**
     * @type {number}
     */
    _sprite = 0;

    /**
     * @param {number} value
     */
    set sprite(value) {
        value = parseInt(value);
        this._sprite = Sketch.p5.constrain(value, 0, this._sprites.length - 1);
    }

    /**
     * @returns {number} Current sprite index
     */
    get sprite() {
        return this._sprite;
    }

    /**
     * @param {number} value
     */
    set spriteT(value) {
        this.sprite = value * this._sprites.length;
    }

    /**
     * @returns {p5.Image}
     */
    get image() {
        return this._sprites[this.sprite];
    }

    /**
     * @param {number} spriteW Width of one sprite
     * @param {Area} area Area of this image
     * @param {string} imagePath Path to the image
     * @param {()=>void|undefined} fail Optional, Called on fail, error as argument
     * @param {()=>void|undefined} success Optional, Called on success, image as argument
     */
    constructor(spriteW, area, imagePath, fail = undefined, success = undefined) {
        super(area, imagePath, fail, (image) => {
            for (let x = 0; x < image.width; x += spriteW) {
                this._sprites.push(image.get(x, 0, spriteW, image.height));
            }

            success?.call(this, image);
        });
    }
}

export { Area, AreaImage, AreaSpriteSheet };
