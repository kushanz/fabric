// Import stylesheets
import './style.css';
import {fabric} from 'fabric';
var canvas = new fabric.Canvas('mycanvas');
// canvas.backgroundColor = 'yellow';
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

// ad doc image
var imgDoc = document.getElementById('imgdoc');
var docInstance = new fabric.Image(imgDoc, {
  left: 0,
  top: 0,
  angle: 0,
  opacity: 0.75,
  width:450,
  height:500,
  hasControls:false,
  lockMovementX: false,
  lockMovementY:false
})
docInstance.lockMovementX = false

 canvas.centerObject(rect);
        canvas.add(docInstance);
        canvas.add(rect);
        canvas.item(1).set({
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 10,
    transparentCorners: false
  });
  canvas.item(0).selectable = false;


// mouse wheel zooming function
canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
});