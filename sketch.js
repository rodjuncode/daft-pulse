let beaters = [];
let b;
let maxBeaters = 50;
let gravity;

function setup() {
	createCanvas(600, 600);
	b = Beater(random(width),random(height),50);
	gravity = createVector(0,1);
}

function draw() {
	background(50);
	if (beaters.length < maxBeaters) {
		beaters.push(Beater(random(width), random(height), random(50)));
	}
	for (let b of beaters) {
		b.reactTo(gravity);
		b.reactTo(createVector(random(-1,1),0));
		b.move();
		b.bounce();
		b.show();
		b.pulse();
	}
}

function mouseClicked(event) {
	// shake
	for (let b of beaters) {
		b.reactTo(createVector(0,random(-20,-40)));
	}
}

// # behaviors
const WillMove = (self) => ({
	move: () => {
		self.velocity.add(self.acceleration);
		if (self.maxVelocity > 0) {
			self.velocity.limit(self.maxVelocity);
		}
		self.location.add(self.velocity);
		self.acceleration.mult(0);
	}
});

const WillReact = (self) => ({
	reactTo: (force) => {
		self.acceleration.add(force);
	}
});

const WillBounceOnEdges = (self, xLimit, yLimit) => ({
	bounce: () => {
		if (self.location.x < 0) {
			self.velocity.x = -self.velocity.x*0.9;
			self.location.x = 0;
			return true;
		}
		if (self.location.x > xLimit) {
			self.velocity.x = -self.velocity.x*0.9;
			self.location.x = xLimit;
			return true;
		}
		if (self.location.y < 0) {
			self.velocity.y = -self.velocity.y*0.9;
			self.location.y = 0;
			return true;
		}
		if (self.location.y > yLimit) {
			self.velocity.y = -self.velocity.y*0.9;
			self.location.y = yLimit;
			return true;
		}
		return false;
	}
});

const WillGoAroundEdges = (self, xLimit, yLimit) => ({
	bounce: () => {
		if (self.location.x < 0) {
			self.location.x = xLimit;
			return true;
		}
		if (self.location.x > xLimit) {
			self.location.x = 0;
			return true;
		}
		if (self.location.y < 0) {
			self.location.y = yLimit;
			return true;
		}  
		if (self.location.y > yLimit) {
			self.location.y = 0;
			return true;
		}	
		return false;
	}
});

const WillHavePulserAttached = (self) => ({
	pulse: () => {
		if (self.anchor == null) {
			self.anchor = Pulser(self.size, self.size*10, self);
		}
		self.anchor.pulse();
	}
});

const WillPulse = (self) => ({
	pulse: () => {
		if (self.radius < self.maxRadius) {
			self.radius += self.anchor.velocity.mag();
		} else {
			self.radius = self.anchor.size;
		}
		push();
		noFill();
		stroke(255);
		ellipseMode(CENTER);
		ellipse(self.anchor.location.x,self.anchor.location.y,self.radius,self.radius)
		pop();
	}	
})

const Ellipse = (self) => ({
	show: () => {
		push();
		noStroke();
		ellipseMode(CENTER);
		ellipse(self.location.x, self.location.y, self.size, self.size)
		pop();
	}
});

const Rectangle = (self) => ({
	show: () => {
		push();
		noStroke();
		rectMode(CENTER);
		rect(self.location.x, self.location.y, self.size, self.size)
		pop();
	}
});

// behaviors set
const Particle = (self) => 	Object.assign({},WillMove(self),WillReact(self));


// classes
const Pulser = (r, mR, a) => {
	let self = {
		radius: r,
		maxRadius: mR,
		anchor: a
	}

	return Object.assign(
		self,
		WillPulse(self)
	)
}

const Beater = (x,y,s,mV) => {
	let self = {
		location: createVector(x,y),
		velocity: createVector(0,0),
		acceleration: createVector(0.0),
		size: s,
		maxVelocity: mV,
		pulser: null
	}

	return Object.assign(
		self,
		Particle(self),
		Ellipse(self),
		WillBounceOnEdges(self, width, height),
		WillHavePulserAttached(self),
	)
}
