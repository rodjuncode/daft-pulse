let beaters = [];
let maxBeaters = 20;
let gravity;
let beholdMode = true;
let forcesOn = false;

function setup() {
	createCanvas(400, 400);
	gravity = createVector(0,1);
}

function draw() {
	background(50);
	stroke(255);

	if (beaters.length < maxBeaters) {
		init();
	}
	for (let b of beaters) {
		if (forcesOn) b.reactTo(gravity);
		b.move(); 
		b.bounce(); 
		// config and run pulse
		push();
		noFill();
		b.pulse();
		pop();
		// now show the body
		b.show();	
	}
}

function init() {
	b = Beater(random(width),random(height),random(10,60),1000,random(5,20));
	if (forcesOn) b.reactTo(createVector(random(-5,5),0));
	beaters.push(b);	
}

function reset() {
	forcesOn = false;	
	init();
}

function doubleClicked() {
	beaters = [];
	beholdMode = true;
	reset();
}
function mouseClicked(event) {
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