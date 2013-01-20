//Pixel Sorting with GUI

var sortPixels = (function(){

  var threshold, mode, numPixels, loopCount;

  function init(img, mode) {
    this.threshold = 95;
    this.mode = 2;
    this.loopCount = 0;

    this.canvas = setup_canvas(img);
    this.imageStuff = setup(img);
    
    this.imageStuff.imageData = draw();

    this.imageStuff.imageDataWrapper.data = this.imageStuff.imageData;
    this.imageStuff.ctx.clearRect(0,0, this.imageStuff.width, this.imageStuff.height);
    this.imageStuff.ctx.putImageData(this.imageStuff.imageDataWrapper, 0,0);
    return this.canvas;
  }
  
  function setup_canvas(img) {
    canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    return canvas;
  }

  function setup(img) {
    width = this.canvas.width;
    height = this.canvas.height;
    numPixels = width*height*4;
    
    ctx = canvas.getContext('2d');
    ctx.drawImage(img,0,0);
    
    imageDataWrapper = ctx.getImageData(0, 0, width, height);
    imageData = imageDataWrapper.data;
    var imageStuff = {
      width: width,
      height: height,
      numPixels: numPixels,
      ctx: ctx,
      imageData: imageData,
      imageDataWrapper: imageDataWrapper
    };
    return imageStuff;
  }
 
  function setPixel(imageData, offset, pixel) {
    for (var i=0; i < 3; i++) {
      imageData[offset + i] = pixel[i];
    }
    return imageData;
  }

  function getPixel(imageData, offset) {
    var pixel = new Array();
    for (var i=0; i < 3; i++) {
      pixel[i] = imageData[offset + i];
    }
    return pixel;
  }
 
  function draw() {
    // ugh, these are here to make things a *bit* more readable and less
    // verbose, should eventually break some of the if statements into
    // functions i think
    var loopCount = this.loopCount;
    var threshold = this.threshold;
    var numPixels = this.imageStuff.numPixels;
    var imageData = this.imageStuff.imageData;
    var width = this.imageStuff.width;
    var height = this.imageStuff.height;
    while (loopCount < numPixels){
        switch(this.mode) {
          case 0:
            if (loopCount > width) { 
              if (getPixelBrightness(loopCount) > threshold) {
                imageData = setPixel(imageData, loopCount, getPixel(imageData, loopCount - 1));
//              if (getPixelBrightness(img.pixels[loopCount]) > threshold) {
//                img.pixels[loopCount] = img.pixels[loopCount-img.width];
                
              }
            }
            break;
          case 1:
            if (loopCount > 0) {
              if (getPixelBrightness(loopCount) > threshold) {
                imageData = setPixel(imageData, loopCount, getPixel(imageData, loopCount -1));
//              if (getPixelBrightness(img.pixels[loopCount]) > threshold) {
//                img.pixels[loopCount] = img.pixels[loopCount-1];
              }
            }
            break;
          case 2:
            if (loopCount > width) { 
              var test = getPixelBrightness(loopCount);
              if (getPixelBrightness(loopCount) > threshold) {
                imageData = setPixel(imageData, (loopCount- width), getPixel(imageData, loopCount));
                //img.pixels[loopCount-img.width] = int(abs(sin(loopCount)*loopCount));
              }
            }
            break;       
        }
        loopCount = loopCount + 4;
    }
    /*
    if (loopCount++ >= numPixels) {
      ctx.putImageData(imgeDataWrapper,0,0);
    } else {
      draw();
    }
    */
    return imageData;
  }
  
  function getPixelBrightness(x) {
    var offset = x;
    var r = imageData[offset];
    var g = imageData[offset + 1];
    var b = imageData[offset + 2];
    // HSL - lightness:
    //return (Math.max(r,g,b) + Math.min(r,g,b)) / 2
    // HSV - value:
    return Math.max(r,g,b) / 255 * 100;
  }
  
  return init;
})();

