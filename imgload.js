function start_the_magic(filename) {
  var imageUrl = filename || "sort_tokyo.jpg";
  var img = new Image();
  var sortMode = 2;
  var threshold = 25;
  var control = function() {
    this.sortMode = sortMode;
    this.threshold = threshold;
  }
  img.onload = function(){
	var ctrl = new control();
	var gui = new dat.GUI();
    gui.domElement.style.cssFloat = 'left';
	gui.domElement.style.marginLeft = '8px';

	var modeController = gui.add(ctrl, 'sortMode',0,4).step(1);
	var thresholdController = gui.add(ctrl, 'threshold',0,255).step(1);
    
    var sortedCanvas = sortPixels(img,sortMode,threshold);
	sortedCanvas.canvas.setAttribute('id', 'canvas1'); 
	document.body.appendChild(sortedCanvas.canvas);
	this.canvasInterval = setInterval(sortedCanvas.fxn, 100);

	thresholdController.onFinishChange(function(threshold) {
	  //console.log(threshold);
	  var sortedCanvas = sortPixels(img,sortMode,threshold);
	  sortedCanvas.canvas.setAttribute('id', 'canvas1');
	  var oldCanvas = document.getElementById("canvas1");

	  //console.log(oldCanvas);
	  document.body.replaceChild(sortedCanvas.canvas,oldCanvas);

	  //console.log("Clearing current interval.");
	  clearInterval(this.canvasInterval);
	  oldCanvas = undefined;
	  this.canvasInterval = setInterval(sortedCanvas.fxn, 100);
	});
    modeController.onFinishChange(function(sortMode) {
      //console.log(sortMode);
      var sortedCanvas = sortPixels(img,sortMode,threshold);
      sortedCanvas.canvas.setAttribute('id', 'canvas1');
      var oldCanvas = document.getElementById("canvas1");
      //console.log(oldCanvas);
      document.body.replaceChild(sortedCanvas.canvas, oldCanvas);
      //console.log("Clearing current interval.");
      clearInterval(this.canvasInterval);
      oldCanvas = undefined;
      this.canvasInterval = setInterval(sortedCanvas.fxn, 100);
	});
  }
  img.src = imageUrl;
}

