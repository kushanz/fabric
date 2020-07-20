// Import stylesheets
import './style.css';
import {fabric} from 'fabric';
import $ from "jquery";

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
  // hasControls:false,
  // lockMovementX: false,
  // lockMovementY:false
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
// canvas.on('mouse:wheel', function(opt) {
//   var delta = opt.e.deltaY;
//   var zoom = canvas.getZoom();
//   zoom *= 0.999 ** delta;
//   if (zoom > 20) zoom = 20;
//   if (zoom < 0.01) zoom = 0.01;
//   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//   opt.e.preventDefault();
//   opt.e.stopPropagation();
// });

// button event zoom
canvas.on('object:moving', function(e) {
  var obj;
  obj = e.target;
  obj.setCoords();
  var boundingRect = obj.getBoundingRect();
  var zoom = canvas.getZoom();
  var viewportMatrix = canvas.viewportTransform;

  //there is a bug in fabric that causes bounding rects to not be transformed by viewport matrix
  //this code should compensate for the bug for now
  boundingRect.top = (boundingRect.top - viewportMatrix[5]) / zoom;
  boundingRect.left = (boundingRect.left - viewportMatrix[4]) / zoom;
  boundingRect.width /= zoom;
  boundingRect.height /= zoom;
  // if object is too big ignore
  if (obj.currentHeight * zoom > obj.canvas.height * zoom || obj.currentWidth * zoom > obj.canvas.width * zoom) {
    return;
  }  
  var canvasHeight = obj.canvas.height / zoom,
    canvasWidth = obj.canvas.width / zoom,
    rTop = boundingRect.top + boundingRect.height,
    rLeft = boundingRect.left + boundingRect.width;
  // top-left  corner
  if (rTop < canvasHeight || rLeft < canvasWidth) {
    obj.top = Math.max(obj.top, canvasHeight - boundingRect.height);
    obj.left = Math.max(obj.left, canvasWidth - boundingRect.width);
  }
  // bot-right corner
  if (boundingRect.top + boundingRect.height > obj.canvas.height || boundingRect.left + boundingRect.width > obj.canvas.width) {
    obj.top = Math.min(obj.top, obj.canvas.height - boundingRect.height + obj.top - boundingRect.top);
    obj.left = Math.min(obj.left, obj.canvas.width - boundingRect.width + obj.left - boundingRect.left);
  }
  //canvas.sendToBack(canvas.getObjects()[0])





})

$('#zoomin').click(function() {
  if (canvas.getZoom() < 3) {
    canvas.setZoom(canvas.getZoom() + 0.1);
  }
});

$('#zoomout').click(function() {
  if (canvas.getZoom() != 1) {
    canvas.setZoom(canvas.getZoom() - 0.1)
  };

});