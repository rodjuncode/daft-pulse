// # behaviors

// basic stuff
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

// pulser stuff
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

// shape stuff
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

// behaviors sets
const Particle = (self) => 	Object.assign({},WillMove(self),WillReact(self));