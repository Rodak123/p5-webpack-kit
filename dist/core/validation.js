"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilePath = validateFilePath;
exports.validateType = validateType;
exports.validateTypeOrDefault = validateTypeOrDefault;
/**
 * @param {any} value Value to check
 * @returns {boolean} Whether given value is undefined or null
 */
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}
/**
 * Checks if the types of value and exampleValue are equal
 * @param {any} value Valided value
 * @param {any} exampleValue Value of the desired type
 * @param {string|null} valueName Name of the value
 * @returns {any} The provided value
 * @throws {TypeError} If types of value and exampleValue don't match
 */
function validateType(value, exampleValue, valueName) {
    if (valueName === void 0) { valueName = null; }
    var generateWrongTypeMessage = function (provided, expected) {
        return "Wrong type" +
            (isNullOrUndefined(valueName) ? '' : " at '".concat(valueName, "'")) +
            ", provided ".concat(provided, ", expected ").concat(expected, ".");
    };
    var valueType = Object.prototype.toString.call(value);
    var defaultType = Object.prototype.toString.call(exampleValue);
    if (valueType !== defaultType) {
        var message = generateWrongTypeMessage(valueType, defaultType);
        throw new TypeError(message);
    }
    if (value.constructor !== exampleValue.constructor) {
        var message = generateWrongTypeMessage(value.constructor.name, exampleValue.constructor.name);
        throw new TypeError(message);
    }
    return value;
}
/**
 * Checks if the types of value and exampleValue are equal, returns the default value if not
 * @param {any} value Validated value
 * @param {any} defaultValue Default value of the desired type
 * @param {string|null} valueName Name of the value
 * @returns {any} Return value or defaultValue
 */
function validateTypeOrDefault(value, defaultValue, valueName) {
    if (valueName === void 0) { valueName = undefined; }
    try {
        return validateType(value, defaultValue, valueName);
    }
    catch (e) {
        return defaultValue;
    }
}
/**
 * @param {string} path Path to a file
 * @returns {string} Extracted file extension
 */
function extractFileExtension(path) {
    return path.split('/').pop().split('.').pop();
}
/**
 * @param {string} path Path to the validated file
 * @param {string[]} extensions Desired file extensions, empty if any are ok
 * @param {null|string} valueName Name of the validated value
 * @returns {string} The same path
 * @throws {Error} When file has the wrong extension
 */
function validateFilePath(path, extensions, valueName) {
    if (valueName === void 0) { valueName = null; }
    path = validateType(path, '/', valueName);
    for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
        var extension = extensions_1[_i];
        if (isFilePathValid(path, extension))
            return path;
        var message = "Wrong file extension" +
            (isNullOrUndefined(valueName) ? '' : " at '".concat(valueName, "'")) +
            ", provided ".concat(extractFileExtension(path), ", expected any of [").concat(extensions.join(', '), "]\n (Full path: ").concat(path, ")");
        throw new Error(message);
    }
    return path;
}
/**
 * Checks if given file path ends with the desired extension
 * @param {string} path File path that is checked
 * @param {string} extension The desired extension
 * @returns {boolean} Whether the extensions match
 */
function isFilePathValid(path, extension) {
    return extension === extractFileExtension(path);
}
