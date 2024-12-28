/**
 * Easy to use image class that loads the desired image on preload
 */
export class Image {
    /**
     * @param {string} imagePath Path to the desired image inside the images/ folder
     */
    constructor(imagePath: string);
    _imagePath: string;
    _image: any;
    /**
     * @returns {void}
     */
    _loadImage(): void;
    /**
     * @returns {p5.Image} Loaded p5.Image
     */
    get image(): p5.Image;
}
