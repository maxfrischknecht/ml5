let mobileNet;
let video;
let label = '';

function setup() {
	createCanvas(640, 360);
	background(0, 0, 255);

	// select default camera
	video = createCapture(VIDEO);
	video.hide();

	// chose the mobile net classifier, act continously on 'video', callback
	mobileNet = ml5.imageClassifier('MobileNet', video, modelReady);
	
}

function modelReady(){
	console.log('Model is ready');
	// linked with video in setup, select callback
	mobileNet.predict(gotResults);
}

// error first syntax, must be with mobileNet Model
function gotResults(error, results){
	if(error){
		console.error(error);
	} else {
		// console.log(results);
		label = results[0].label + ", confidence: "+ results[0].confidence;
		
		// do loop for contiouns prediction:
		mobileNet.predict(gotResults);
	}
}

function draw() {
	image(video, 0, 0);

	// draw label 
	fill(255, 255, 0);
	textSize(32);
	text(label, 10, 30);
}