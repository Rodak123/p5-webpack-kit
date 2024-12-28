"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collision = void 0;
var Collision = /** @class */ (function () {
    function Collision() {
    }
    /**
     * @param {{x: number, y: number}} point
     * @param {{x: number, y: number}} rectPosition
     * @param {{x: number, y: number}} rectDimensions
     */
    Collision.pointRect = function (point, rectPosition, rectDimensions) {
        return (point.x >= rectPosition.x &&
            point.x < rectPosition.x + rectDimensions.x &&
            point.y >= rectPosition.y &&
            point.y < rectPosition.y + rectDimensions.y);
    };
    return Collision;
}());
exports.Collision = Collision;
