"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAsset = void 0;
const index_js_1 = require("../core/index.js");
/**
 * Simple asset that loads a JSON file
 */
class JsonAsset {
    /**
     * Appends new instance keys
     * @param {string[]} value
     */
    static set instanceKeys(value) {
        this._instanceKeys = value;
    }
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
     * @returns {boolean} Whether all assets are loaded
     */
    static get areAllAssetsLoaded() {
        return this._assets.every((asset) => asset.isLoaded);
    }
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
        /**
         * @type {object} Raw JSON data of this asset
         */
        this._data = null;
        /**
         * @type {boolean} Whether this asset failed to load
         */
        this._isFailed = false;
        this._key = key;
        if (!load) {
            this._isFailed = true;
            return;
        }
        JsonAsset._assets.push(this);
        index_js_1.Sketch.addPreloadEvent(() => {
            assetPath = `${assetPath}/${key}`;
            index_js_1.Sketch.p5.loadJSON(`${assetPath}/${key}.json`, (data) => {
                var _a;
                this._data = data;
                (_a = this._onLoaded) === null || _a === void 0 ? void 0 : _a.call(this, assetPath);
            }, (err) => {
                this._failLoad(err);
            });
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
exports.JsonAsset = JsonAsset;
/**
 * @type {string[]}
 */
JsonAsset._instanceKeys = [];
/**
 * @type {object[]}
 */
JsonAsset._instances = [];
/**
 * All registered assets
 * @type {JsonAsset[]}
 */
JsonAsset._assets = [];
