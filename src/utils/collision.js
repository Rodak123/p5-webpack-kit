class Collision {
    /**
     * @param {{x: number, y: number}} point
     * @param {{x: number, y: number}} rectPosition
     * @param {{x: number, y: number}} rectDimensions
     */
    static pointRect(point, rectPosition, rectDimensions) {
        return (
            point.x >= rectPosition.x &&
            point.x < rectPosition.x + rectDimensions.x &&
            point.y >= rectPosition.y &&
            point.y < rectPosition.y + rectDimensions.y
        );
    }
}

export { Collision };
