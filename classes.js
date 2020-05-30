// classes
const Pulser = (r, mR, a) => {
	let self = {
		radius: r,
		maxRadius: mR,
		anchor: a,
		waveOne: [],
		waveTwo: []
	}

	return Object.assign(
		self,
		WillPulse(self)
	)
}

/* 
for (float a = 0; a < TWO_PI; a += TWO_PI/vertex) {
	float r_min = size*.8;
	float r_max = size*1.2;
	vertexes.add(new PVector(random(r_min,r_max) * cos(a), random(r_min,r_max) * sin(a)));
}

    beginShape();
    for (int i = 0; i < vertexes.size(); i++) { //<>//
      vertex(vertexes.get(i).x,vertexes.get(i).y,1);
    }
    endShape();
*/

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