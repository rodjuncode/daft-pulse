let beaters = [];
let beatersQty;
let gravity;
let beholdMode = true;
let forcesOn = false;

function setup() {
	createCanvas(400, 400);
	colorMode(HSB,360,100,100);
	gravity = createVector(0,1);
	
	interactButton = createButton("Interact");
	interactButton.mousePressed(interact);

	resetButton = createButton("Reset");
	resetButton.mousePressed(reset);

	beatersQtySlider = createSlider(1,50,10);
}

function draw() {
	background(18);

	beatersQty = beatersQtySlider.value();

	if (beaters.length < beatersQty) {
		init();
	} else {
		while (beaters.length > beatersQty) {
			beaters.splice(-1,1);
		}
	}
	for (let b of beaters) {
		if (forcesOn) b.reactTo(gravity);
		b.move(); 
		b.bounce(); 
		// config and run pulse
		push();
		b.pulse();
		pop();
		// now show the body
		b.show();	
		
	}
}

function init() {
	b = Beater(random(width),random(height),random(10,60),color(random(360),100,100),1000);
	if (forcesOn) b.reactTo(createVector(random(-5,5),0));
	beaters.push(b);	
}

function reset() {
	beaters = []
	beholdMode = true;
	forcesOn = false;	
	init();
}

function interact() {
	if (beholdMode) {
		forcesOn = true;
		beholdMode = false;
	} else {
		// shake
		for (let b of beaters) {
			b.reactTo(createVector(random(-10,10),random(-20,-40)));
		}
	}
}