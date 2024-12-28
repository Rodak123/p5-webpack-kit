import { Sketch } from '../core/index.js';

/**
 * Simple asset that loads a JSON file
 */
class JsonAsset {
    /**
     * @type {string[]}
     */
    static _instanceKeys = [];

    /**
     * Appends new instance keys
     * @param {string[]} value
     */
    static set instanceKeys(value) {
        this._instanceKeys = value;
    }

    /**
     * @type {object[]}
     */
    static _instances = [];

    /**
     * Loads all instances based on _instanceKeys
     */
    static load() {
        this._instances = this._instanceKeys.map((key) => new this(key));
    }

    /**
     * @returns {object[]}
     */
    static get() {
        return this._instances;
    }

    /**
     * All registered assets
     * @type {JsonAsset[]}
     */
    static _assets = [];

    /**
     * @returns {boolean} Whether all assets are loaded
     */
    static get areAllAssetsLoaded() {
        return this._assets.every((asset) => asset.isLoaded);
    }

    /**
     * @type {string} Unique key of this asset
     */
    _key;
    /**
     * @type {object} Raw JSON data of this asset
     */
    _data = null;

    /**
     * @type {boolean} Whether this asset failed to load
     */
    _isFailed = false;

    /**
     * @returns {boolean} Whether this asset is loaded
     */
    get isLoaded() {
        return this._data != null && this._isFailed === false;
    }

    /**
     * @returns {boolean} Whether this asset failed to load
     */
    get isFailed() {
        return this._isFailed;
    }

    /**
     * @param {string} key Unique key
     * @param {string} assetPath Path to the folder of this asset
     * @param {boolean} load Whether this asset should be loaded
     */
    constructor(key, assetPath, load = true) {
        this._key = key;

        if (!load) {
            this._isFailed = true;
            return;
        }

        JsonAsset._assets.push(this);

        Sketch.addPreloadEvent(() => {
            assetPath = `${assetPath}/${key}`;

            Sketch.p5.loadJSON(
                `${assetPath}/${key}.json`,
                (data) => {
                    this._data = data;

                    this._onLoaded?.call(this, assetPath);
                },
                (err) => {
                    this._failLoad(err);
                }
            );
        });
    }

    /**
     * Gets called after being loaded
     * @param {string} assetPath Path to this asset
     */
    _onLoaded(assetPath) { }

    /**
     * Marks this asset as failed
     * @param {Error} err Error to log
     */
    _failLoad(err) {
        this._isFailed = true;
        console.error(`Failed to load jsonAsset: '${this._key}'\n${err}`);
    }
}

export { JsonAsset };
