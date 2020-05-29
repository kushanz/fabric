// Import stylesheets
import './style.css';
import {fabric} from 'fabric';
var canvas = new fabric.Canvas('mycanvas');

var rect = new fabric.Rect({
            originX: 'center',
            originY: 'center',
            top : 190,
            left : 0,
            width : 60,
            height : 70,
            fill : 'red'
        });
        rect.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
        })
        
 canvas.centerObject(rect);
        canvas.add(rect);
        canvas.item(0).set({
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 10,
    transparentCorners: false
  });
// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;