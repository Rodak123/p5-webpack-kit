"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid2D = void 0;
var Grid2D = /** @class */ (function () {
    /**
     *
     * @param {number} width Width of grid
     * @param {number} height Height of grid
     * @param {(number, number) => any} init Function called for each cell
     */
    function Grid2D(width, height, init) {
        if (init === void 0) { init = function (x, y) { return 0; }; }
        this._width = width;
        this._height = height;
        this._cells = [];
        for (var x = 0; x < this._width; x++) {
            var row = [];
            for (var y = 0; y < this._height; y++)
                row.push(init(x, y));
            this._cells.push(row);
        }
    }
    Object.defineProperty(Grid2D.prototype, "width", {
        /**
         * @returns {number}
         */
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid2D.prototype, "height", {
        /**
         * @returns {number}
         */
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {any} value Value
     */
    Grid2D.prototype.setCell = function (x, y, value) {
        if (!this.inGrid(x, y))
            throw new Error("Index (".concat(x, ", ").concat(y, ") is outside grid (").concat(this._width, "x").concat(this.height, ")"));
        this._cells[x][y] = value;
    };
    /**
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     */
    Grid2D.prototype.getCell = function (x, y) {
        if (!this.inGrid(x, y))
            throw new Error("Index (".concat(x, ", ").concat(y, ") is outside grid (").concat(this._width, "x").concat(this.height, ")"));
        return this._cells[x][y];
    };
    /**
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @returns {bool} Whether (x, y) is in this grid
     */
    Grid2D.prototype.inGrid = function (x, y) {
        return x >= 0 && x < this._width && y >= 0 && y < this._height;
    };
    return Grid2D;
}());
exports.Grid2D = Grid2D;
