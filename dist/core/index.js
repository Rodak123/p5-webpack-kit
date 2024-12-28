"use strict";
// const runningInNode = typeof process !== 'undefined' && process.versions && process.versions.node;
// if (runningInNode) {
//     throw new Error(`This module can't be used in a node project`);
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sketch = exports.Time = exports.ShaderLayer = exports.Shader = exports.Input = exports.Image = exports.Font = void 0;
var font_js_1 = require("./font.js");
Object.defineProperty(exports, "Font", { enumerable: true, get: function () { return font_js_1.Font; } });
var image_js_1 = require("./image.js");
Object.defineProperty(exports, "Image", { enumerable: true, get: function () { return image_js_1.Image; } });
var input_js_1 = require("./input.js");
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return input_js_1.Input; } });
var shader_js_1 = require("./shader/shader.js");
Object.defineProperty(exports, "Shader", { enumerable: true, get: function () { return shader_js_1.Shader; } });
var shaderLayer_js_1 = require("./shader/shaderLayer.js");
Object.defineProperty(exports, "ShaderLayer", { enumerable: true, get: function () { return shaderLayer_js_1.ShaderLayer; } });
var time_js_1 = require("./time.js");
Object.defineProperty(exports, "Time", { enumerable: true, get: function () { return time_js_1.Time; } });
var sketch_js_1 = require("./sketch.js");
Object.defineProperty(exports, "Sketch", { enumerable: true, get: function () { return sketch_js_1.Sketch; } });
