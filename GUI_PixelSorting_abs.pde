//Pixel Sorting with GUI
//This one uses an absolute path
/* @pjs preload="sort_tokyo.jpg"; */

//Sexy Exciting Variables - Stick these in the JS
int threshold, density, mode;
String url;
PImage img;

void setup() {
  frameRate(12);
  //Set default vales for image, threshold, density, and mode - you're going to change these with DAT.GUI
  threshold = 135;
  density = 3;
  mode = 0;
  url = "sort_tokyo.jpg";
  img = loadImage(url);
  size(img.width,img.height);
}

void draw() {
  //Pixel Sorting
  img.loadPixels();
  for (int w=0; w<img.width*img.height; w++){
    if ((img.pixels[w]%density) == 0) {
      
        switch(mode) {
          case 0:
            if (w > img.width) { 
              if (brightness(img.pixels[w]) > threshold) {
                img.pixels[w] = img.pixels[w-img.width];
              }
            }
            break;
          case 1:
            if (w > 0) {
              if (brightness(img.pixels[w]) > threshold) {
                img.pixels[w] = img.pixels[w-1];
              }
            }
            break;
          case 2:
            if (w > img.width) { 
              if (brightness(img.pixels[w]) > threshold) {
                img.pixels[w-img.width] = img.pixels[w];
                //img.pixels[w-img.width] = int(abs(sin(w)*w));
              }
            }
            break;       
        }
      
    }
  }
  img.updatePixels();
  image(img,0,0);
}
