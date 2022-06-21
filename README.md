# Tepsi

## Beware: work in progress

🧙‍♂️ Animate.css compatible corner popup library for your website.

## Usage
Displays `foo` within the popup.
```javascript
let tepsi = popsy({
    content: 'foo',
});
```

Displays the element with the id `foo` within the popup.

```html
<div id="foo">Hello World!</div>
```

```javascript
let tepsi = popsy({
    popsyId: 'foo',
});
```


## Options
| Option | Type | Default Value | Description |
|------- | ---- | ------- | ----------- |
| width  | string | 300px | width for the popup container |
| autoDismiss | boolean | false | automatically dismisses the popup within the provided `displayDuration` |
| displayDuration | number | 1000 | duration the popup will stay on screen if autoDismiss is set to true |
| animateIdleClass | string | 'popsy-animated' | default animation class |
| animateInClass | string | 'popsy-animated-fadein' | animation class to add when popup is toggled on |
| animateOutClass | string |'popsy-animated-fadeout' | animation class to add when popup is toggled off |
| location | string |'bottom-left' | location where popup will be shown|
| popsyId |string | null | id of the element to be used as container|
| xOffset | string | '10px' | offset from the left/right edge of the screen|
| yOffset | string |'10px' | offset from the top/bottom of the screen|
| containerElement | string | 'div' | default container element tag|
| content | string |'Hello popsycho!' | default content of the popup|
| customClass | string | null | custom class to add to the container element|
| beforeInitialize | function | null | callback to run before popup is initialized|
| afterInitialized | function | null | callback to run after popup is callback to run after popup is initialized|
| onToggle | function | null | callback to run when popup is toggled|


## Methods
| method | description |
| ------ | ----------- |
| toggle | toggles the popup |
| update | replaces the content of the popup runtime |


## License
This project is available under the [MIT](https://opensource.org/licenses/mit-license.php) license.

