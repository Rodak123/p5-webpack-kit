export class Grid2D {
    /**
     *
     * @param {number} width Width of grid
     * @param {number} height Height of grid
     * @param {(number, number) => any} init Function called for each cell
     */
    constructor(width: number, height: number, init?: (number: any, number: any) => any);
    /**
     * @type {number}
     */
    _width: number;
    /**
     * @type {number}
     */
    _height: number;
    /**
     * @type {any[][]}
     */
    _cells: any[][];
    /**
     * @returns {number}
     */
    get width(): number;
    /**
     * @returns {number}
     */
    get height(): number;
    /**
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {any} value Value
     */
    setCell(x: number, y: number, value: any): void;
    /**
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     */
    getCell(x: number, y: number): any;
    /**
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @returns {bool} Whether (x, y) is in this grid
     */
    inGrid(x: number, y: number): bool;
}
