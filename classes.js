// classes
const Pulser = (mR, a, v, nR, oP, i) => {
	let self = {
		maxRadius: mR,
		anchor: a,
		radius: a.size/2,
		vertex: v,
		noiseRange: nR,
		offSet: random(1000),
		offSetProgression: oP,
		index: i
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
		maxVelocity: mV
	}

	return Object.assign(
		self,
		Particle(self),
		Ellipse(self),
		WillBounceOnEdges(self, width, height),
		WillHavePulsersAttached(self,3),
	)
}