let particles = [];
let algorithmActive = true; // Variable to control the algorithm state

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 20);

  if (algorithmActive) {
    for (let i = 0; i < 1; i++) {
      let p = new Particle();
      particles.push(p);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].finished()) {
        particles.splice(i, 1);
      }
    }
  }

  fill(40, 25, 2);
  //rect(230, 390, 135, 20);
}

class Particle {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.alpha = 250;
    this.baseSize = random(1, 13);
    this.d = this.baseSize;
    this.noiseOffsetX = random(0, 1000);
    this.noiseOffsetY = random(0, 1000);
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    // Use Perlin noise to create a wavy path
    let noiseX = noise(this.noiseOffsetX);
    let noiseY = noise(this.noiseOffsetY);
    this.x += map(noiseX, 0, 1, -2, 2); // Adjust the mapping for the desired wave
    this.y += map(noiseY, 0, 1, -2, 2);
    this.noiseOffsetX += 0.01; // Adjust the increment for the speed of the wa1
    this.noiseOffsetY += 0.01;

    this.alpha -= 1;
    this.d -= random(0.05, 0.1);
    this.d = this.baseSize + random(-3, 3);
  }

  show() {
    noStroke();
    let glowColor = color(random(200, 255), random(50, 100), 10, this.alpha * 0.3);
    fill(glowColor);
    ellipse(this.x, this.y, this.d * 2);
    fill(random(250, 255), random(170, 200), 10, this.alpha);
    ellipse(this.x, this.y, this.d);
  }
}

// Function to toggle the algorithm on or off
function toggleAlgorithm() {
  algorithmActive = !algorithmActive;
}

// Mouse button click event to toggle the algorithm state
function mousePressed() {
  toggleAlgorithm();
}
