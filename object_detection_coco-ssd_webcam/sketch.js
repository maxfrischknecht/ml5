let video;
let detector;
let detections = [];

function setup() {
	createCanvas(800, 600);
	video = createCapture(VIDEO, videoReady);
	video.size(800, 600)
	video.hide();
}

function videoReady(){
	detector = ml5.objectDetector('cocossd', modelReady);
}

function modelReady(){
	detector.detect(video, gotDetections);
}

function gotDetections(error, results) {
	if (error) {
		console.log(error)
	} else {
		// console.log(results)
		detections = results;
		detector.detect(video, gotDetections)
	}
}

function draw() {
	image(video, 0, 0, width, height);

	detections.forEach((object, index) => {
		if (object.label != "bicycle") {
			// stroke(map(index, 0, results.length, 255, 0), map(index, 0, results.length, 0, 255), 0);
			stroke(255, 255, 0)
			strokeWeight(1);
			noFill();
			rect(object.x, object.y, object.width, object.height);

			// draw the label
			fill(255,0,0)
			noStroke()
			textSize(24)
			text(object.label, object.x + 10, object.y + 20);
		}
	});
}