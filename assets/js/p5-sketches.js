let currentSketchInstance = null;

function switchSketch(type) {
    if (currentSketchInstance) {
        currentSketchInstance.remove();
    }
    
    // Update active button state
    document.querySelectorAll('.sketch-btn').forEach(btn => btn.classList.remove('active'));
    if (type === 'plexus') {
        const btn = document.getElementById('sketchPlexus');
        if (btn) btn.classList.add('active');
        const inst = document.getElementById('instructionText');
        if (inst) inst.innerHTML = '<i class="fas fa-mouse-pointer"></i> Move your mouse to interact. Click to spawn packet streams.';
        currentSketchInstance = new p5(plexusSketch, 'p5-canvas-container');
    } else if (type === 'flowfield') {
        const btn = document.getElementById('sketchFlowField');
        if (btn) btn.classList.add('active');
        const inst = document.getElementById('instructionText');
        if (inst) inst.innerHTML = '<i class="fas fa-mouse-pointer"></i> Move your mouse to warp the flow field. Click to reset particle flow.';
        currentSketchInstance = new p5(flowfieldSketch, 'p5-canvas-container');
    }
}

// Data Plexus Sketch definition
const plexusSketch = (p) => {
    let particles = [];
    const maxParticles = 65;
    let customColor = '#d4a574';
    
    p.setup = () => {
        const container = document.getElementById('p5-canvas-container');
        const width = container.clientWidth || 800;
        const height = container.clientHeight || 400;
        p.createCanvas(width, height);
        
        // Read active theme color
        updateThemeColor();
        
        // Initialize particles
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle(p.random(width), p.random(height)));
        }
    };
    
    p.draw = () => {
        // Transparent background for trail effect
        const isLight = document.body.classList.contains('light-theme');
        if (isLight) {
            p.background(255, 255, 255, 200);
        } else {
            p.background(26, 19, 17, 180); // match --bg-card
        }
        
        // Draw connections and update particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].display();
            
            // Connect to mouse
            let dMouse = p.dist(p.mouseX, p.mouseY, particles[i].x, particles[i].y);
            if (dMouse < 150) {
                let alpha = p.map(dMouse, 0, 150, 150, 0);
                p.stroke(getColorWithAlpha(customColor, alpha));
                p.strokeWeight(1);
                p.line(p.mouseX, p.mouseY, particles[i].x, particles[i].y);
            }
            
            // Connect to other particles
            for (let j = i + 1; j < particles.length; j++) {
                let d = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                if (d < 100) {
                    let alpha = p.map(d, 0, 100, 100, 0);
                    p.stroke(getColorWithAlpha(customColor, alpha));
                    p.strokeWeight(0.5);
                    p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                }
            }
        }
        
        // Filter out dead particles
        particles = particles.filter(pt => !pt.isDead || !pt.isTemporary);
        
        // Keep population stable if below max
        while (particles.length < maxParticles) {
            particles.push(new Particle(p.random(p.width), p.random(p.height)));
        }
    };
    
    p.windowResized = () => {
        const container = document.getElementById('p5-canvas-container');
        if (container) {
            p.resizeCanvas(container.clientWidth, container.clientHeight || 400);
        }
    };
    
    p.mousePressed = () => {
        if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            for (let i = 0; i < 15; i++) {
                let tempP = new Particle(p.mouseX, p.mouseY, true);
                tempP.vx = p.random(-4, 4);
                tempP.vy = p.random(-4, 4);
                particles.push(tempP);
            }
        }
    };
    
    function updateThemeColor() {
        const primary = getComputedStyle(document.body).getPropertyValue('--primary-color').trim();
        customColor = primary || '#d4a574';
    }
    
    function getColorWithAlpha(hex, alpha) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha / 255})`;
    }
    
    class Particle {
        constructor(x, y, isTemporary = false) {
            this.x = x;
            this.y = y;
            this.vx = p.random(-1, 1);
            this.vy = p.random(-1, 1);
            this.size = p.random(3, 7);
            this.isTemporary = isTemporary;
            this.alpha = 255;
            this.isDead = false;
        }
        
        update() {
            let dMouse = p.dist(p.mouseX, p.mouseY, this.x, this.y);
            if (dMouse < 200 && !this.isTemporary) {
                let forceX = (p.mouseX - this.x) * 0.0005;
                let forceY = (p.mouseY - this.y) * 0.0005;
                this.vx += forceX;
                this.vy += forceY;
            }
            
            this.x += this.vx;
            this.y += this.vy;
            
            let speed = p.sqrt(this.vx * this.vx + this.vy * this.vy);
            const maxSpeed = this.isTemporary ? 8 : 2;
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }
            
            if (this.x < 0 || this.x > p.width) this.vx *= -1;
            if (this.y < 0 || this.y > p.height) this.vy *= -1;
            
            if (this.isTemporary) {
                this.alpha -= 5;
                this.size -= 0.1;
                if (this.alpha <= 0 || this.size <= 0.1) {
                    this.isDead = true;
                }
            }
        }
        
        display() {
            p.noStroke();
            let c = getColorWithAlpha(customColor, this.isTemporary ? this.alpha : 180);
            p.fill(c);
            p.ellipse(this.x, this.y, this.size, this.size);
        }
    }
};

// Flow Field Sketch definition
const flowfieldSketch = (p) => {
    let particles = [];
    const numParticles = 120;
    let customColor = '#d4a574';
    let noiseScale = 0.01;
    let time = 0;
    
    p.setup = () => {
        const container = document.getElementById('p5-canvas-container');
        const width = container.clientWidth || 800;
        const height = container.clientHeight || 400;
        p.createCanvas(width, height);
        
        updateThemeColor();
        
        for (let i = 0; i < numParticles; i++) {
            particles.push(new FlowParticle());
        }
        
        const isLight = document.body.classList.contains('light-theme');
        p.background(isLight ? '#ffffff' : '#1a1311');
    };
    
    p.draw = () => {
        const isLight = document.body.classList.contains('light-theme');
        p.background(isLight ? 'rgba(255, 255, 255, 0.08)' : 'rgba(26, 19, 17, 0.08)');
        
        time += 0.002;
        
        for (let pt of particles) {
            let n = p.noise(pt.x * noiseScale, pt.y * noiseScale, time);
            let angle = p.map(n, 0, 1, 0, p.TWO_PI * 2);
            
            let dMouse = p.dist(p.mouseX, p.mouseY, pt.x, pt.y);
            if (dMouse < 150) {
                let mouseAngle = p.atan2(p.mouseY - pt.y, p.mouseX - pt.x);
                angle = p.lerp(angle, mouseAngle + p.HALF_PI, p.map(dMouse, 0, 150, 0.4, 0));
            }
            
            pt.follow(angle);
            pt.update();
            pt.edges();
            pt.show();
        }
    };
    
    p.windowResized = () => {
        const container = document.getElementById('p5-canvas-container');
        if (container) {
            p.resizeCanvas(container.clientWidth, container.clientHeight || 400);
            const isLight = document.body.classList.contains('light-theme');
            p.background(isLight ? '#ffffff' : '#1a1311');
        }
    };
    
    p.mousePressed = () => {
        if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            for (let pt of particles) {
                pt.reset();
            }
            p.noiseSeed(p.random(10000));
        }
    };
    
    function updateThemeColor() {
        const primary = getComputedStyle(document.body).getPropertyValue('--primary-color').trim();
        customColor = primary || '#d4a574';
    }
    
    function getColorWithAlpha(hex, alpha) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha / 255})`;
    }
    
    class FlowParticle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = p.random(p.width);
            this.y = p.random(p.height);
            this.vx = 0;
            this.vy = 0;
            this.ax = 0;
            this.ay = 0;
            this.maxSpeed = p.random(1.5, 3.5);
            this.size = p.random(1.5, 3.5);
            this.prevX = this.x;
            this.prevY = this.y;
        }
        
        update() {
            this.prevX = this.x;
            this.prevY = this.y;
            
            this.vx += this.ax;
            this.vy += this.ay;
            
            let speed = p.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > this.maxSpeed) {
                this.vx = (this.vx / speed) * this.maxSpeed;
                this.vy = (this.vy / speed) * this.maxSpeed;
            }
            
            this.x += this.vx;
            this.y += this.vy;
            
            this.ax = 0;
            this.ay = 0;
        }
        
        follow(angle) {
            let forceX = p.cos(angle) * 0.12;
            let forceY = p.sin(angle) * 0.12;
            this.ax += forceX;
            this.ay += forceY;
        }
        
        show() {
            p.strokeWeight(this.size);
            let speed = p.sqrt(this.vx * this.vx + this.vy * this.vy);
            let alpha = p.map(speed, 0, this.maxSpeed, 60, 200);
            p.stroke(getColorWithAlpha(customColor, alpha));
            p.line(this.prevX, this.prevY, this.x, this.y);
        }
        
        edges() {
            if (this.x < 0 || this.x > p.width || this.y < 0 || this.y > p.height) {
                this.reset();
            }
        }
    }
};

// Initialize default sketch on load
window.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            setTimeout(() => {
                const activeBtn = document.querySelector('.sketch-btn.active');
                const type = activeBtn && activeBtn.id === 'sketchFlowField' ? 'flowfield' : 'plexus';
                switchSketch(type);
            }, 50);
        });
    }
    
    // Auto-initialize Plexus sketch
    setTimeout(() => {
        switchSketch('plexus');
    }, 200);
});
