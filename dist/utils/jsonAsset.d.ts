/**
 * Simple asset that loads a JSON file
 */
export class JsonAsset {
    /**
     * @type {string[]}
     */
    static _instanceKeys: string[];
    /**
     * Appends new instance keys
     * @param {string[]} value
     */
    static set instanceKeys(value: string[]);
    /**
     * @type {object[]}
     */
    static _instances: object[];
    /**
     * Loads all instances based on _instanceKeys
     */
    static load(): void;
    /**
     * @returns {object[]}
     */
    static get(): object[];
    /**
     * All registered assets
     * @type {JsonAsset[]}
     */
    static _assets: JsonAsset[];
    /**
     * @returns {boolean} Whether all assets are loaded
     */
    static get areAllAssetsLoaded(): boolean;
    /**
     * @param {string} key Unique key
     * @param {string} assetPath Path to the folder of this asset
     * @param {boolean} load Whether this asset should be loaded
     */
    constructor(key: string, assetPath: string, load?: boolean);
    /**
     * @type {string} Unique key of this asset
     */
    _key: string;
    /**
     * @type {object} Raw JSON data of this asset
     */
    _data: object;
    /**
     * @type {boolean} Whether this asset failed to load
     */
    _isFailed: boolean;
    /**
     * @returns {boolean} Whether this asset is loaded
     */
    get isLoaded(): boolean;
    /**
     * @returns {boolean} Whether this asset failed to load
     */
    get isFailed(): boolean;
    /**
     * Gets called after being loaded
     * @param {string} assetPath Path to this asset
     */
    _onLoaded(assetPath: string): void;
    /**
     * Marks this asset as failed
     * @param {Error} err Error to log
     */
    _failLoad(err: Error): void;
}
