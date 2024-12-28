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
function validateType(value, exampleValue, valueName = null) {
    const generateWrongTypeMessage = (provided, expected) => {
        return `Wrong type` +
            (isNullOrUndefined(valueName) ? '' : ` at '${valueName}'`) +
            `, provided ${provided}, expected ${expected}.`;
    };

    const valueType = Object.prototype.toString.call(value);
    const defaultType = Object.prototype.toString.call(exampleValue);

    if (valueType !== defaultType) {
        const message = generateWrongTypeMessage(valueType, defaultType);
        throw new TypeError(message);
    }

    if (value.constructor !== exampleValue.constructor) {
        const message = generateWrongTypeMessage(value.constructor.name, exampleValue.constructor.name);
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
function validateTypeOrDefault(value, defaultValue, valueName = undefined) {
    try {
        return validateType(value, defaultValue, valueName);
    } catch (e) {
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
function validateFilePath(path, extensions, valueName = null) {
    path = validateType(path, '/', valueName);

    for (const extension of extensions) {
        if (isFilePathValid(path, extension)) return path;

        const message =
            `Wrong file extension` +
            (isNullOrUndefined(valueName) ? '' : ` at '${valueName}'`) +
            `, provided ${extractFileExtension(path)}, expected any of [${extensions.join(
                ', '
            )}]\n (Full path: ${path})`;

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

export { validateFilePath, validateType, validateTypeOrDefault };
