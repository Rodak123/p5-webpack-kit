#  API Reference - Core

## Logic and Rendering
### Sketch
```js
constructor(settings = {})
```
When creating a `Sketch` instance you can set
- width - width of the canvas in pixels
- height - height of the canvas in pixels
- defaultFontPath - Path to a font in `res/fonts/`

<br>

```js
set setup(value)
```
Adds a p5 instance setup listener

<br>

```js
set update(value)
```
Adds a listener for update, update gets called before draw each frame

<br>

```js
set draw(value)
```
Adds a p5 instance draw listener

### Input

### Time

## Resources
### Font

### Image

### Shader