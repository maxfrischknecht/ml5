// https://www.youtube.com/watch?v=eeO-rWYFuG0&list=PLRqwX-V7Uu6YPSwT06y_AEYTqIwbeam3y&index=5
// https://learn.ml5js.org/docs/#/reference/feature-extractor?id=featureextractor

let mobileNet;
let classifier;
let video;
let label = '';
let aButton;
let aValue = 'Anja';
let bButton;
let bValue = 'Max';
let trainButton;

function modelReady() {
	console.log('Model is ready!!');
}


function videoReady() {
	console.log('Video is ready');
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

	// create buttons that add an image to the classifier
	aButton = createButton(aValue);
	aButton.mousePressed(function () {
		classifier.addImage(aValue);
	});
	bButton = createButton(bValue);
	bButton.mousePressed(function () {
		classifier.addImage(bValue);
	});
	// train the classifier
	trainButton = createButton('train the classifier');
	trainButton.mousePressed(function () {
		classifier.train(whileTraining);
	});
	// save the model!
	trainButton = createButton('save the model');
	trainButton.mousePressed(function () {
		classifier.save();
	});
}

function draw() {
	image(video, 0, 0);

	// draw label 
	fill(255, 255, 0);
	textSize(32);
	text(label, 10, 30);
}