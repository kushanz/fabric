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
            fill : 'yellow'
        });
        rect.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
        })

// ad doc image
// var imgDoc = document.getElementById('imgdoc');
// var docInstance = new fabric.Image(imgDoc, {
//   left: 0,
//   top: 0,
//   angle: 0,
//   opacity: 0.75,
//   width:450,
//   height:500,
//   // hasControls:false,
//   // lockMovementX: false,
//   // lockMovementY:false
// })
// docInstance.lockMovementX = false

 canvas.centerObject(rect);
        // canvas.add(docInstance);
        canvas.add(rect);
  //       canvas.item(1).set({
  //   borderColor: 'red',
  //   cornerColor: 'green',
  //   cornerSize: 10,
  //   transparentCorners: false
  // });
  // canvas.item(0).selectable = false;
canvas.bringForward(rect)


fabric.Image.fromURL('https://picsum.photos/450/500',//doc image url
     function(myImg) {
        var doc = myImg.set({ 
                left: 0,
                top: 0 ,
                width:450, //set canvas eidth
                height:500, //set canvas height
                hasControls:false,
                lockMovementX: false,
                lockMovementY:false,
                selectable:false,
                sendBackwards:true
                    // other options 
            });
        canvas.add(doc);
        canvas.sendBackwards(doc)
})


// mouse wheel zooming function
canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  // if (zoom < 0.01) zoom = 0.01;
  if (zoom < 1) {
    zoom = 1;
    canvas.setZoom(1)
    canvas.setViewportTransform([1,0,0,1,0,0]); 
  }
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();

});


// reset zoom
function resetZoom() {
  // canvas.setZoom(1);
  // canvas.setDimensions({
  //   width: 450,
  //   height: 500
  // });
  canvas.setViewportTransform([1,0,0,1,0,0]); 
  // canvas.renderAll()
}

$('#resetzoom').click(function() {
  resetZoom()
})

// zoom in
$('#zoomin').click(function() {
  if (canvas.getZoom() < 3) {
    // canvas.setZoom(canvas.getZoom() + 0.1);
    console.log(canvas.getZoom())
    // let initzoom = canvas.getZoom();
    // canvas.zoomToPoint({ x: 'center', y: 'center' },initzoom+1 );
    canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() / 0.9);
  }
});

// zoom out
$('#zoomout').click(function() {
  console.log(canvas.getZoom())
  if (canvas.getZoom() < 1.1) {
    canvas.setViewportTransform([1,0,0,1,0,0]); 
  } else {
    canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() / 1.1);
  };

});