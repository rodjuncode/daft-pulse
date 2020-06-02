let beaters = [];
let maxBeaters = 1;
let gravity;

function setup() {
	createCanvas(400, 400);
	gravity = createVector(0,1);
}

function draw() {
	background(50);
	if (beaters.length < maxBeaters) {
		b = Beater(width/2, height/2, random(30,60),1000,random(5,20));
		b.reactTo(createVector(random(-5,5),0));
		beaters.push(b);
	}
	for (let b of beaters) {
		b.reactTo(gravity);
		
		b.move(); 
		b.bounce(); 
		
		// config and run pulse
		push();
		noFill();
		stroke("#FFD788");
		b.pulse();
		pop();
		
		b.show();	
	}
}

function mouseClicked(event) {
	// shake
	for (let b of beaters) {
		b.reactTo(createVector(random(-5,5),random(-20,-40)));
	}
}