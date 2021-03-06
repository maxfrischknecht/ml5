// ml5.js: What is a Convolutional Neural Network
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/8.2-cnn-1.html
// https://youtu.be/qPKsVAI_W6M
// https://editor.p5js.org/codingtrain/sketches/BN1lE-gyl

let forestImg;
let filtered;
let dim = 800;
let scaling = 1;

function preload() {
  forestImg = loadImage('nature800.png');
}

// this filter highlits vertical lines
let filter = [
  [-1, 1, 0],
  [-1, 1, 0],
  [-1, 1, 0]
];

function setup() {
  // make the filter random
  randomFilter();

  createCanvas(dim * scaling * 2, dim * scaling);
  background(255);
  noSmooth();

  // draw the original image
  // image(forestImg, 0, 0, dim * scaling, dim * scaling);
  // create an empty image
  filtered = createImage(dim, dim);

  // load the pixels
  forestImg.loadPixels();
  filtered.loadPixels();

  createNewImage();
}

function createNewImage(){
  // loop over every pixel in the dimensions
  // exept the ege pixels (1, -1)
  for (let x = 1; x < dim - 1; x++) {
    for (let y = 1; y < dim - 1; y++) {
      // get the rgb values from the concolution layer
      let rgb = convolution(forestImg, x, y, filter);
      // get the current x, y, pixel location in the real image
      let pix = index(x, y);
      // draw the image!
      filtered.pixels[pix + 0] = rgb.r;
      filtered.pixels[pix + 1] = rgb.g;
      filtered.pixels[pix + 2] = rgb.b;
      filtered.pixels[pix + 3] = 255;
    }
  }
  filtered.updatePixels();
  // image(filtered, dim * scaling, 0, dim * scaling, dim * scaling);
  image(filtered, 0, 0, dim * scaling, dim * scaling);

}

function randomFilter(){
  // make the filter random
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      filter[i][j] = random(-1, 1);
    }
  }
}

// get the x, y, pos inside the real image
function index(x, y) {
  return (x + y * forestImg.width) * 4;
}

function convolution(img, x, y, filter) {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;

  // the convolutional layer is a 3x3 grid (-1, 0, 1)
  // we want to look at every pixel of the cat image and it's nearest neighbors (top, right, down, left)
  // therefore, we loop over a 3x3 grid (-1, 0, 1) (= the convolutional layer!)
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // we need the pixel location of every of the 3x3 pixels in the real image
      let pix = index(x + i, y + j);
      // now we get the weight for that pixel according to the 3x3 grid
      let factor = filter[j + 1][i + 1];
      // now look at the cat img with the "pix" locaction and select the rgb value with 0, 1, 2, then multiply by factor (grid)
      sumR += img.pixels[pix + 0] * factor;
      sumG += img.pixels[pix + 1] * factor;
      sumB += img.pixels[pix + 2] * factor;
    }
  }

  // return the rgb values we calculated
  return {
    r: sumR,
    g: sumG,
    b: sumB
  };
}

// save function
function keyTyped() {
  if (key === 's') {
    filtered.save('filtered-', 'png');
    console.log('saved!')
  }
}
