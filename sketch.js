let beaters = [];
let maxBeaters = 50;
let gravity;

function setup() {
	createCanvas(600, 600);
	gravity = createVector(0,1);
}

function draw() {
	background(50);
	if (beaters.length < maxBeaters) {
		beaters.push(Beater(random(width), random(height), random(50)));
	}
	for (let b of beaters) {
		b.reactTo(gravity);	b.reactTo(createVector(random(-1,1),0));
		b.move(); b.bounce(); b.show();	b.pulse();
	}
}

function mouseClicked(event) {
	// shake
	for (let b of beaters) {
		b.reactTo(createVector(0,random(-20,-40)));
	}
}