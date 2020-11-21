let img;
let detecort;

function preload() {
	img = loadImage('images/animals.jpg');
	// load the coco ssd model
	detector = ml5.objectDetector('cocossd');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	image(img, 0, 0);
	detector.detect(img, gotDetections);
}

function gotDetections(error, results) {
	if (error) {
		console.log(error)
	} else {
		console.log(results)
		results.forEach((object, index) => {

			if (object.confidence >= 0.50) {
				// stroke(map(index, 0, results.length, 255, 0), map(index, 0, results.length, 0, 255), 0);
				stroke(255, 255, 0)
				strokeWeight(2);
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
}

function draw() {

}