// classes
const Pulser = (mR, a, v, nR, oP, c, i, offset) => {
	let self = {
		maxRadius: mR,
		anchor: a,
		radius: 0,
		vertex: v,
		noiseRange: nR,
		offSet: offset,// random(1000),
		offSetProgression: oP,
		color : c,
		index: i
	}

	return Object.assign(
		self,
		WillPulse(self, 1.5)
	)
}

const Beater = (x,y,s,c,mV) => {
	let self = {
		location: createVector(x,y),
		velocity: createVector(0,0),
		acceleration: createVector(0.0),
		size: s,
		color: c,
		maxVelocity: mV,
	}

	return Object.assign(
		self,
		Particle(self),
		Ellipse(self,self.color),
		WillBounceOnEdges(self, width, height),
		WillHavePulsersAttached(self,6),
	)
}