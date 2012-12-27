//Pixel Sorting with GUI
/* 
@pjs preload="http://farm9.staticflickr.com/8320/7981151399_f14a663bf4.jpg";
*/

//Sexy Exciting Variables - Stick these in the JS
int threshold, density, mode;
String url;
PImage img;

void setup() {
  //Set default vales for image, threshold, density, and mode - you're going to change these with DAT.GUI
  threshold = 188;
  density = 1;
  mode = 2;
  url = "http://farm9.staticflickr.com/8320/7981151399_f14a663bf4.jpg";
  img = loadImage(url);
  size(img.width,img.height);
}

void draw() {
  //background(0);
  //GUI Components - I think I'm going to stick this in with DAT.GUI instead
  //Most of the processing libraries aren't JS compatible, and doing my own looked like crap
    //Mode Buttons
    /*
    for (int i=0; i<3; i++){
      pushMatrix();
        translate(i*(img.width/3),0);
        fill(153,153);
        stroke(135);
        
        rect(0,0,img.width/3,25);
        //text("asdf",0,0);
      popMatrix();
    }
  */
  
  //Pixel Sorting
  //translate(0,25);
  for (int w=0; w<img.width*img.height; w++){
    if ((img.pixels[w]%density) == 0) {
      img.loadPixels();
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
                img.pixels[w-img.width] = int(abs(sin(w)*w));
              }
            }
            break;       
        }
      img.updatePixels();
    }
  }
  image(img,0,0);
}
