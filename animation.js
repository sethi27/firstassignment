// Debug message
console.log("Interactive animation loaded successfully!");

// P5.js Animation
let particles = [];
const numParticles = 50;
let isPaused = false;

// Color variables
let hue = 0;
let saturation = 80;
let brightness = 100;

let circleX;
let circleY;
let circleSize = 50;
let speedX = 3;
let speedY = 3;

function setup() {
    const canvas = createCanvas(400, 200);
    canvas.parent('p5-container');
    circleX = width/2;
    circleY = height/2;
    
    // Set color mode to HSB for easier color transitions
    colorMode(HSB, 360, 100, 100, 1);
    
    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
    
    console.log('Canvas created with particle system');
}

function draw() {
    if (isPaused) return;
    
    background(17, 17, 17); // Dark background to match theme
    
    // Draw bouncing circle
    fill(59, 130, 246); // Using our primary color
    noStroke();
    circle(circleX, circleY, circleSize);
    
    // Update position
    circleX += speedX;
    circleY += speedY;
    
    // Bounce off edges
    if (circleX > width - circleSize/2 || circleX < circleSize/2) {
        speedX *= -1;
    }
    if (circleY > height - circleSize/2 || circleY < circleSize/2) {
        speedY *= -1;
    }
    
    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
    
    // Slowly change the base hue
    hue = (hue + 0.5) % 360;
    
    // Display instructions
    fill(0, 0, 100);
    textSize(14);
    textAlign(CENTER);
    text("Move your mouse to interact", width/2, height - 30);
}

// Particle class
class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.acc = createVector(0, 0);
        this.size = random(5, 15);
        this.color = color(random(100, 255), random(100, 255), random(100, 255), 150);
    }
    
    update() {
        // Add some randomness to movement
        this.acc.x = random(-0.1, 0.1);
        this.acc.y = random(-0.1, 0.1);
        
        this.vel.add(this.acc);
        this.vel.limit(3);
        this.pos.add(this.vel);
        
        // Wrap around screen
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }
    
    display() {
        noStroke();
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.size);
    }
}

// Handle window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    console.log('Canvas resized');
}

// Animation control functions
function resetAnimation() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function toggleAnimation(pause) {
    isPaused = pause;
}

// Mouse interaction
function mouseMoved() {
    if (isPaused) return;
    
    // Create a new particle at mouse position
    const p = new Particle();
    p.pos = createVector(mouseX, mouseY);
    particles.push(p);
    
    // Limit the number of particles
    if (particles.length > numParticles * 2) {
        particles.splice(0, 1);
    }
}