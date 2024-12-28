var runningInNode = typeof process !== 'undefined' && process.versions && process.versions.node;
if (runningInNode) {
    throw new Error("This module can't be used in a node project");
}
import { Font } from './font.js';
import { Image } from './image.js';
import { Input } from './input.js';
import { Shader } from './shader/shader.js';
import { ShaderLayer } from './shader/shaderLayer.js';
import { Time } from './time.js';
import { Sketch } from './sketch.js';
export { Font, Image, Input, Shader, ShaderLayer, Sketch, Time };
