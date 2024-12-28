import { Sketch } from '../webpacked-p5';
/**
 * Simple asset that loads a JSON file
 */
var JsonAsset = /** @class */ (function () {
    /**
     * @param {string} key Unique key
     * @param {string} assetPath Path to the folder of this asset
     * @param {boolean} load Whether this asset should be loaded
     */
    function JsonAsset(key, assetPath, load) {
        if (load === void 0) { load = true; }
        var _this = this;
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
        Sketch.addPreloadEvent(function () {
            assetPath = "".concat(assetPath, "/").concat(key);
            Sketch.p5.loadJSON("".concat(assetPath, "/").concat(key, ".json"), function (data) {
                var _a;
                _this._data = data;
                (_a = _this._onLoaded) === null || _a === void 0 ? void 0 : _a.call(_this, assetPath);
            }, function (err) {
                _this._failLoad(err);
            });
        });
    }
    Object.defineProperty(JsonAsset, "instanceKeys", {
        /**
         * Appends new instance keys
         * @param {string[]} value
         */
        set: function (value) {
            this._instanceKeys = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Loads all instances based on _instanceKeys
     */
    JsonAsset.load = function () {
        var _this = this;
        this._instances = this._instanceKeys.map(function (key) { return new _this(key); });
    };
    /**
     * @returns {object[]}
     */
    JsonAsset.get = function () {
        return this._instances;
    };
    Object.defineProperty(JsonAsset, "areAllAssetsLoaded", {
        /**
         * @returns {boolean} Whether all assets are loaded
         */
        get: function () {
            return this._assets.every(function (asset) { return asset.isLoaded; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JsonAsset.prototype, "isLoaded", {
        /**
         * @returns {boolean} Whether this asset is loaded
         */
        get: function () {
            return this._data != null && this._isFailed === false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JsonAsset.prototype, "isFailed", {
        /**
         * @returns {boolean} Whether this asset failed to load
         */
        get: function () {
            return this._isFailed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets called after being loaded
     * @param {string} assetPath Path to this asset
     */
    JsonAsset.prototype._onLoaded = function (assetPath) { };
    /**
     * Marks this asset as failed
     * @param {Error} err Error to log
     */
    JsonAsset.prototype._failLoad = function (err) {
        this._isFailed = true;
        console.error("Failed to load jsonAsset: '".concat(this._key, "'\n").concat(err));
    };
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
    return JsonAsset;
}());
export { JsonAsset };
