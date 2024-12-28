/**
 * @param {string} path Path to the validated file
 * @param {string[]} extensions Desired file extensions, empty if any are ok
 * @param {null|string} valueName Name of the validated value
 * @returns {string} The same path
 * @throws {Error} When file has the wrong extension
 */
export function validateFilePath(path: string, extensions: string[], valueName?: null | string): string;
/**
 * Checks if the types of value and exampleValue are equal
 * @param {any} value Valided value
 * @param {any} exampleValue Value of the desired type
 * @param {string|null} valueName Name of the value
 * @returns {any} The provided value
 * @throws {TypeError} If types of value and exampleValue don't match
 */
export function validateType(value: any, exampleValue: any, valueName?: string | null): any;
/**
 * Checks if the types of value and exampleValue are equal, returns the default value if not
 * @param {any} value Validated value
 * @param {any} defaultValue Default value of the desired type
 * @param {string|null} valueName Name of the value
 * @returns {any} Return value or defaultValue
 */
export function validateTypeOrDefault(value: any, defaultValue: any, valueName?: string | null): any;
//# sourceMappingURL=validation.d.ts.map