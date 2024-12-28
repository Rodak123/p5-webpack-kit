"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid2D = void 0;
class Grid2D {
    /**
     * @returns {number}
     */
    get width() {
        return this._width;
    }
    /**
     * @returns {number}
     */
    get height() {
        return this._height;
    }
    /**
     *
     * @param {number} width Width of grid
     * @param {number} height Height of grid
     * @param {(number, number) => any} init Function called for each cell
     */
    constructor(width, height, init = (x, y) => 0) {
        this._width = width;
        this._height = height;
        this._cells = [];
        for (let x = 0; x < this._width; x++) {
            const row = [];
            for (let y = 0; y < this._height; y++)
                row.push(init(x, y));
            this._cells.push(row);
        }
    }
    /**
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {any} value Value
     */
    setCell(x, y, value) {
        if (!this.inGrid(x, y))
            throw new Error(`Index (${x}, ${y}) is outside grid (${this._width}x${this.height})`);
        this._cells[x][y] = value;
    }
    /**
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     */
    getCell(x, y) {
        if (!this.inGrid(x, y))
            throw new Error(`Index (${x}, ${y}) is outside grid (${this._width}x${this.height})`);
        return this._cells[x][y];
    }
    /**
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @returns {bool} Whether (x, y) is in this grid
     */
    inGrid(x, y) {
        return x >= 0 && x < this._width && y >= 0 && y < this._height;
    }
}
exports.Grid2D = Grid2D;
