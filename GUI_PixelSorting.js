//Pixel Sorting with GUI

var sortPixels = (function(){

  var threshold, density, mode, numPixels, loopCount;

  function init(img, mode) {
    threshold = 135;
    density = 3;
    mode = 0;
    loopCount = 0;
    
    setup(img);
    draw();
    
    return canvas;
  }
  
  function setup(img) {
    canvas = document.createElement('canvas');
    width = canvas.width = img.naturalWidth;
    height = canvas.height = img.naturalHeight;
    numPixels = width*height;
    
    ctx = canvas.getContext('2d');
    ctx.drawImage(img,0,0);
    
    // document.body.appendChild(img);
    // document.body.appendChild(canvas);
    imageDataWrapper = ctx.getImageData(0, 0, width, height);
    imageData = imageDataWrapper.data;
  }
  
  function draw() {
    for (w = 0; w < numPixels; w++){
        switch(mode) {
          case 0:
            if (w > img.width) { 
              if (getPixelBrightness(img.pixels[w]) > threshold) {
                img.pixels[w] = img.pixels[w-img.width];
              }
            }
            break;
          case 1:
            if (w > 0) {
              if (getPixelBrightness(img.pixels[w]) > threshold) {
                img.pixels[w] = img.pixels[w-1];
              }
            }
            break;
          case 2:
            if (w > img.width) { 
              if (getPixelBrightness(img.pixels[w]) > threshold) {
                img.pixels[w-img.width] = img.pixels[w];
                //img.pixels[w-img.width] = int(abs(sin(w)*w));
              }
            }
            break;       
        }
    }
    
    if (loopCount++ >= numPixels) {
      ctx.putImageData(imgeDataWrapper,0,0);
    } else {
      //draw();
    }
    
  }
  
  function getPixelBrightness(x) {
    var offset = x;
    var r = imageData[offset];
    var g = imageData[offset + 1];
    var b = imageData[offset + 2];
    // HSL - lightness:
    // return (Math.max(r,g,b) + Math.min(r,g,b)) / 2
    // HSV - value:
    return Math.max(r,g,b) / 255 * 100;
  }
  
  return init;
})();