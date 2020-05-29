// Import stylesheets
import './style.css';

var canvas = new fabric.Canvas('mycanvas');
var rect = new fabric.Rect({
            originX: 'center',
            originY: 'center',
            top : 0,
            left : 0,
            width : 60,
            height : 70,
            fill : 'red'
        });
 canvas.centerObject(rect);
        canvas.add(rect);
// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;