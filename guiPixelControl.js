/*
int threshold, density, mode;
String url;
*/

var control = function() {
	this.threshold = 188;
	this.density = 1;
	this.mode = 0;
	this.url = 'http://farm9.staticflickr.com/8320/7981151399_f14a663bf4.jpg';

}

window.onload = function() {
	var ctrl = new control();
	var gui = new dat.GUI();
	gui.add(text, 'threshold');
	gui.add(text, 'density');
	gui.add(text, 'mode');
	gui.add(text, 'url');

}