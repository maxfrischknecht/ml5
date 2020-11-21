let mobileNet;
let puffin;
let src = 'trump15.jpeg'

function setup() {
	createCanvas(640, 460);
	// create <img> with p5
	image = createImg('images/'+ src, 'alt image');
	// chose the mobile net classifier from ml5, callback
	mobileNet = ml5.imageClassifier('MobileNet', modelReady);
	
}

// callback when the modal is loaded
function modelReady(){
	console.log('Model is ready');
	// predict the image, select callback
	mobileNet.predict(image, gotResults);
}

// error first syntax, must be with mobileNet Model
function gotResults(error, results){
	if(error){
		console.error(error);
	} else {
		console.log(results);
		let index = 1;
		let label = results[index].label;
		let confidence = "confidence: "+ results[index].confidence;
		document.getElementById("label").innerHTML = label;
		document.getElementById("confidence").innerHTML = confidence;
	}
}

