// https://www.youtube.com/watch?v=eeO-rWYFuG0&list=PLRqwX-V7Uu6YPSwT06y_AEYTqIwbeam3y&index=5
// https://learn.ml5js.org/docs/#/reference/feature-extractor?id=featureextractor

let mobileNet;
let classifier;
let video;
let label = 'loading model';
let aButton;
let bButton;
let trainButton;

function modelReady() {
	console.log('Model is ready!!');
	// load your own model
	classifier.load('model.json', customModelReady);
}

function customModelReady(){
	console.log('Custom Model is ready');
	label = 'model ready';

}

function videoReady() {
	console.log('Video is ready');
	classifier.classify(gotResults);

}

function whileTraining(loss) {
	// loss calculates the probablity, 0 = its not an apple
	if (loss == null) {
		console.log('training is complete');
		classifier.classify(gotResults);
	} else {
		console.log(loss);
	}
}

// error first syntax, must be with mobileNet Model
function gotResults(error, results) {
	if (error) {
		console.error(error);
	} else {
		// console.log(results);
		label = results[0].label + ", confidence: " + results[0].confidence;
		classifier.classify(gotResults);
	}
}


function setup() {
	createCanvas(640, 360);
	background(0, 0, 255);

	// select default camera
	video = createCapture(VIDEO);
	video.hide();

	// chose the feature Extractor: https://learn.ml5js.org/docs/#/reference/feature-extractor?id=featureextractor
	mobileNet = ml5.featureExtractor('MobileNet', modelReady);
	// use the mobileNet classification on the video, with callback
	classifier = mobileNet.classification(video, videoReady);

}

function draw() {
	image(video, 0, 0);

	// draw label 
	fill(255, 255, 0);
	textSize(32);
	text(label, 10, 30);
}