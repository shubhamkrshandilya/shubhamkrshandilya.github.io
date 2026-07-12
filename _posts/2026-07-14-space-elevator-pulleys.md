---
layout: newspaper
title: "Space Elevator Docking: Pulley Dynamics"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Physics Series"
section: "Mechanics Branch"
division: "Applied Physics"
author: "Shubham Kumar"
volume: "I"
issue: "5"
date: 2026-07-14
tags: [Physics, Connected Bodies, Pulleys, Tension, p5.js, Education]
weather: "Calm solar winds over orbit bay 7"
ticker_index: "Ideal strings: Massless & Inextensible | a = g(m2-m1)/(m1+m2)"
price: "10 Credits"
---

When hoisting heavy mineral containers from docking cargo pods to geosynchronous space elevator tracks, mechanical power on orbital stations must be strictly conserved. To accomplish this, station engineers rely on a classic mechanical setup: the counterweight lift.

In physics, this connected system represents an **Atwood's Machine**—a frictionless, massless pulley holding two masses connected by a light, inextensible string.

Suppose we load a titanium mineral container of mass m₁ on the left side of our hoist, and set an adjustable counterweight block of mass m₂ on the right. If the counterweight is too heavy, the payload accelerates upward too quickly and impacts the station ceiling. If it is too light, the cargo container falls back down.

To coordinate safe hoisting speeds, engineers must draw **Free-Body Diagrams (FBD)** and apply Newton's Laws of Motion to calculate string tension and system acceleration.

<div class="newspaper-clipping">
    <h3>The Mechanics Dictionary</h3>
    <ul>
        <li><strong>Tension (T)</strong>: The pulling force exerted by each end of a string.</li>
        <li><strong>Connected Bodies</strong>: Multiple objects whose motion is linked together by a string or rod.</li>
        <li><strong>Free-Body Diagram (FBD)</strong>: A diagram isolating a body to show all external forces acting upon it.</li>
        <li><strong>Atwood's Machine</strong>: A system of two masses connected by a string passing over a pulley.</li>
    </ul>
</div>

## The Physics of connected Masses

To model this hoist system, we assume an **ideal pulley** (massless, frictionless, and does not slip) and an **ideal string** (massless and inextensible). These assumptions have two critical physical consequences:

1.  **Uniform Tension**: Since the string is massless, the pulling force—**Tension (T)**—is identical at both ends of the string.
2.  **Identical Acceleration**: Since the string cannot stretch, both masses must move with the exact same acceleration magnitude (a).

If we let m₂ be heavier than m₁ (m₂ > m₁), Block 2 will accelerate downward while Block 1 accelerates upward.

```
       [ Pulley Wheel ]
           /      \
          /        \
         |          |
      T  ^          ^  T
      (Up)          (Up)
       [m1]        [m2]
        |            |
        v m1*g       v m2*g
      (Down)       (Down)
```

## Writing Force Equations

To find the acceleration and tension, we isolate each block and draw its Free-Body Diagram. We then write Newton's Second Law (F_net = m · a) for each block in its direction of motion:

### 1. For Mass 1 (Ascending Upward)
The tension T pulls upward (direction of acceleration), while gravity pulls downward.
T - m₁ · g = m₁ · a

### 2. For Mass 2 (Descending Downward)
Gravity pulls downward (direction of acceleration), while tension pulls upward.
m₂ · g - T = m₂ · a

### Solving for Acceleration (a)
By adding these two simultaneous equations together, the tension T terms cancel out:
(m₂ · g - T) + (T - m₁ · g) = m₂ · a + m₁ · a
m₂ · g - m₁ · g = (m₁ + m₂) · a

Solving for acceleration a:
a = g · (m₂ - m₁) / (m₁ + m₂)

### Solving for Tension (T)
We can substitute this acceleration value back into either of the isolated force equations to find the uniform tension:
T = g · (2 · m₁ · m₂) / (m₁ + m₂)

<div class="newspaper-clipping">
    <h3>Pedagogical Insights</h3>
    <p>Look closely at the acceleration equation: </p>
    <p style="text-align: center; font-weight: bold; font-size: 1.05rem;">a = g · (m₂ - m₁) / (m₁ + m₂)</p>
    <p>If the masses are equal (m₁ = m₂), the numerator becomes 0, resulting in zero acceleration—the system remains in static equilibrium. If one mass is infinitely larger than the other, the acceleration approaches g (free-fall)!</p>
</div>

---

<!-- Dynamic p5.js Interactive Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.01); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase;">Space Elevator Pulley Sandbox</h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Adjust payload masses and hangar gravity. Click Hoist to release the brake. Watch the live Free-Body Diagrams draw forces on each block.
        </p>

        <!-- Canvas Container -->
        <div id="pulley-canvas-container" style="width: 100%; height: 360px; border-radius: 12px; overflow: hidden; border: 1px solid var(--news-border); margin-bottom: 1.5rem; position: relative;"></div>

        <!-- Controls HUD -->
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px; margin: 0 auto; padding: 0.5rem;">
            <!-- Sliders & Selects -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; width: 100%;">
                <!-- Mass 1 Slider -->
                <div style="flex: 1; min-width: 170px; display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem;">
                    <div style="width: 100%; display: flex; justify-content: space-between; font-weight: bold; font-size: 0.9rem;">
                        <span>Cargo Mass (m₁):</span>
                        <span id="m1Val" style="color: var(--primary-color);">15 kg</span>
                    </div>
                    <input type="range" id="m1Slider" min="5" max="50" step="1" value="15" style="width: 100%;" oninput="document.getElementById('m1Val').textContent = this.value + ' kg'">
                </div>

                <!-- Mass 2 Slider -->
                <div style="flex: 1; min-width: 170px; display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem;">
                    <div style="width: 100%; display: flex; justify-content: space-between; font-weight: bold; font-size: 0.9rem;">
                        <span>Counterweight (m₂):</span>
                        <span id="m2Val" style="color: var(--primary-color);">30 kg</span>
                    </div>
                    <input type="range" id="m2Slider" min="5" max="50" step="1" value="30" style="width: 100%;" oninput="document.getElementById('m2Val').textContent = this.value + ' kg'">
                </div>

                <!-- Gravity Select -->
                <div style="flex: 1; min-width: 170px; display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem;">
                    <span style="font-weight: bold; font-size: 0.9rem;">Hangar Gravity Field:</span>
                    <select id="gravitySelect" style="width: 100%; padding: 0.25rem; font-family: 'Playfair Display', serif; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-weight: bold; font-size: 0.9rem; height: 1.8rem; outline: none; cursor: pointer;">
                        <option value="9.8" selected>Earth (9.8 m/s²)</option>
                        <option value="3.71">Mars (3.71 m/s²)</option>
                        <option value="1.62">Moon (1.62 m/s²)</option>
                        <option value="0.0">Zero-G (0.0 m/s²)</option>
                    </select>
                </div>
            </div>

            <!-- Toggles & Buttons -->
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: 0.5rem; flex-wrap: wrap; gap: 1rem;">
                <div style="font-size: 0.85rem; font-weight: bold; text-align: left;">
                    <span style="color: #38a169;"><i class="fas fa-arrow-up"></i> Green: Cable Tension (T)</span> &nbsp;&nbsp;&nbsp;
                    <span style="color: #e53e3e;"><i class="fas fa-arrow-down"></i> Red: Gravity (mg)</span>
                </div>
                
                <div style="display: flex; gap: 0.75rem;">
                    <button id="resetBtn" style="background: var(--news-bg); color: var(--news-ink); border: 1px solid var(--news-border); padding: 0.5rem 1.25rem; font-weight: bold; cursor: pointer; transition: var(--transition); border-radius: 4px; font-family: 'Playfair Display', serif;">
                        Lock Brake
                    </button>
                    <button id="hoistBtn" style="background: var(--news-ink); color: var(--news-bg); border: 1px solid var(--news-border); padding: 0.5rem 1.5rem; font-weight: bold; cursor: pointer; transition: var(--transition); border-radius: 4px; font-family: 'Playfair Display', serif;">
                        Initiate Hoist
                    </button>
                </div>
            </div>

            <!-- Status Readout -->
            <div id="pulleyResultText" style="font-style: italic; font-size: 0.95rem; text-align: center; font-weight: bold; color: var(--news-muted); margin-top: 0.5rem; min-height: 1.5rem;">
                Adjust payloads to begin hoisting sequence.
            </div>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
const pulleySketch = (p) => {
    let m1 = 15; 
    let m2 = 30; 
    let g = 9.8; 
    
    let isRunning = false;
    let y1 = 180; 
    let y2 = 180; 
    let vel = 0; 
    let acc = 0; 
    let tension = 0; 
    let timeStep = 0.08;
    
    let m1Slider, m2Slider, gravitySelect, hoistBtn, resetBtn;
    
    let pulleyX = 375;
    let pulleyY = 80;
    let pulleyRadius = 25;
    let maxTravel = 95; 
    
    let primaryColor = '#d4a574';
    let textDark = '#1c1a17';
    let textMuted = '#5c5246';
    let bgCard = '#f4edd8';
    
    p.setup = () => {
        console.log("p5 setup starting (pulley)");
        const container = document.getElementById('pulley-canvas-container');
        const w = container ? (container.clientWidth || 750) : 750;
        const h = container ? (container.clientHeight || 360) : 360;
        p.createCanvas(w, h);
        
        updateThemeColors();
        
        m1Slider = document.getElementById('m1Slider');
        m2Slider = document.getElementById('m2Slider');
        gravitySelect = document.getElementById('gravitySelect');
        hoistBtn = document.getElementById('hoistBtn');
        resetBtn = document.getElementById('resetBtn');
        
        if (hoistBtn) {
            hoistBtn.onclick = () => {
                console.log("hoistBtn clicked! Release brake");
                startHoist();
            };
        }
        if (resetBtn) {
            resetBtn.onclick = () => {
                console.log("resetBtn clicked! Lock brake");
                resetHoist();
            };
        }
        
        pulleyX = p.width / 2;
        
        resetHoist();
    };
    
    p.draw = () => {
        updateThemeColors();
        p.background(bgCard);
        
        drawPulleySystem();
        
        if (isRunning) {
            updatePhysics();
        }
        
        drawBlocksWithFBD();
        drawHUD();
    };
    
    function updatePhysics() {
        let m1Val = m1Slider ? parseFloat(m1Slider.value) : 15;
        let m2Val = m2Slider ? parseFloat(m2Slider.value) : 30;
        let gVal = gravitySelect ? parseFloat(gravitySelect.value) : 9.8;
        
        acc = gVal * (m2Val - m1Val) / (m1Val + m2Val);
        tension = gVal * (2 * m1Val * m2Val) / (m1Val + m2Val);
        
        vel += acc * timeStep;
        
        let deltaY = vel * timeStep * 10; 
        y1 -= deltaY; 
        y2 += deltaY; 
        
        let midHeight = 180;
        if (p.abs(y1 - midHeight) >= maxTravel) {
            isRunning = false;
            vel = 0;
            if (y1 < midHeight) {
                y1 = midHeight - maxTravel;
                y2 = midHeight + maxTravel;
                showTelemetry("Hoist limits reached: Cargo fully raised.", "var(--primary-color)");
            } else {
                y1 = midHeight + maxTravel;
                y2 = midHeight - maxTravel;
                showTelemetry("Hoist limits reached: Counterweight fully raised.", "var(--primary-color)");
            }
        }
    }
    
    function startHoist() {
        if (isRunning) return;
        
        let m1Val = m1Slider ? parseFloat(m1Slider.value) : 15;
        let m2Val = m2Slider ? parseFloat(m2Slider.value) : 30;
        let gVal = gravitySelect ? parseFloat(gravitySelect.value) : 9.8;
        
        acc = gVal * (m2Val - m1Val) / (m1Val + m2Val);
        tension = gVal * (2 * m1Val * m2Val) / (m1Val + m2Val);
        
        isRunning = true;
        showTelemetry("Hoist brake released. Acceleration in progress...", "var(--news-muted)");
    }
    
    function resetHoist() {
        isRunning = false;
        y1 = 180;
        y2 = 180;
        vel = 0;
        acc = 0;
        tension = 0;
        
        showTelemetry("Hoist locked in neutral. Adjust payloads to begin.", "var(--news-muted)");
    }
    
    function showTelemetry(msg, color) {
        const readout = document.getElementById('pulleyResultText');
        if (readout) {
            readout.style.color = color;
            readout.textContent = msg;
        }
    }
    
    function drawPulleySystem() {
        p.stroke(textMuted);
        p.strokeWeight(1);
        
        p.line(pulleyX, 0, pulleyX, pulleyY);
        
        p.stroke(textDark);
        p.strokeWeight(3);
        p.fill(primaryColor);
        p.ellipse(pulleyX, pulleyY, pulleyRadius * 2);
        p.fill(textDark);
        p.ellipse(pulleyX, pulleyY, 6, 6);
        
        p.stroke(textDark);
        p.strokeWeight(1.5);
        
        p.line(pulleyX - pulleyRadius, pulleyY, pulleyX - pulleyRadius, y1 - 20);
        p.line(pulleyX + pulleyRadius, pulleyY, pulleyX + pulleyRadius, y2 - 20);
    }
    
    function drawBlocksWithFBD() {
        let m1Val = m1Slider ? parseFloat(m1Slider.value) : 15;
        let m2Val = m2Slider ? parseFloat(m2Slider.value) : 30;
        let gVal = gravitySelect ? parseFloat(gravitySelect.value) : 9.8;
        
        let s1 = p.map(m1Val, 5, 50, 20, 45);
        let s2 = p.map(m2Val, 5, 50, 20, 45);
        
        p.stroke(textDark);
        p.strokeWeight(2);
        
        // Block 1 (Left Cargo)
        let x1 = pulleyX - pulleyRadius;
        p.fill(primaryColor);
        p.rect(x1 - s1 / 2, y1 - s1 / 2, s1, s1, 3);
        p.fill(textDark);
        p.noStroke();
        p.textSize(8);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("m1", x1, y1);
        
        // Block 2 (Right Counterweight)
        let x2 = pulleyX + pulleyRadius;
        p.stroke(textDark);
        p.fill(bgCard);
        p.rect(x2 - s2 / 2, y2 - s2 / 2, s2, s2, 3);
        p.fill(textDark);
        p.noStroke();
        p.text("m2", x2, y2);
        
        let forceScale = 0.8; 
        
        let fg1 = m1Val * gVal;
        let fg2 = m2Val * gVal;
        
        if (isRunning || acc !== 0 || tension !== 0) {
            let tForce = tension;
            
            // Tension vector arrows (Upward - Green)
            p.stroke('#38a169'); 
            p.strokeWeight(2.5);
            
            p.line(x1, y1 - s1 / 2, x1, y1 - s1 / 2 - tForce * forceScale);
            drawArrowhead(x1, y1 - s1 / 2 - tForce * forceScale, -p.HALF_PI, '#38a169');
            
            p.line(x2, y2 - s2 / 2, x2, y2 - s2 / 2 - tForce * forceScale);
            drawArrowhead(x2, y2 - s2 / 2 - tForce * forceScale, -p.HALF_PI, '#38a169');
            
            // Gravity vector arrows (Downward - Red)
            p.stroke('#e53e3e'); 
            p.strokeWeight(2.5);
            
            p.line(x1, y1 + s1 / 2, x1, y1 + s1 / 2 + fg1 * forceScale);
            drawArrowhead(x1, y1 + s1 / 2 + fg1 * forceScale, p.HALF_PI, '#e53e3e');
            
            p.line(x2, y2 + s2 / 2, x2, y2 + s2 / 2 + fg2 * forceScale);
            drawArrowhead(x2, y2 + s2 / 2 + fg2 * forceScale, p.HALF_PI, '#e53e3e');
            
            p.noStroke();
            p.fill('#38a169');
            p.textSize(8);
            p.text("T: " + tForce.toFixed(1) + " N", x1 - 32, y1 - s1 / 2 - 10);
            p.text("T: " + tForce.toFixed(1) + " N", x2 + 32, y2 - s2 / 2 - 10);
            
            p.fill('#e53e3e');
            p.text("m₁g: " + fg1.toFixed(1) + " N", x1 - 32, y1 + s1 / 2 + 10);
            p.text("m₂g: " + fg2.toFixed(1) + " N", x2 + 32, y2 + s2 / 2 + 10);
        }
    }
    
    function drawHUD() {
        p.noStroke();
        p.fill(textDark);
        p.textSize(9);
        p.textAlign(p.LEFT);
        
        let labelY = 30;
        let spacing = 15;
        
        p.text("📊 Hoist Telemetry Logs:", 30, labelY);
        p.fill(textMuted);
        
        let m1Val = m1Slider ? parseFloat(m1Slider.value) : 15;
        let m2Val = m2Slider ? parseFloat(m2Slider.value) : 30;
        let gVal = gravitySelect ? parseFloat(gravitySelect.value) : 9.8;
        
        let currentAcc = isRunning ? acc : gVal * (m2Val - m1Val) / (m1Val + m2Val);
        let currentTen = isRunning ? tension : gVal * (2 * m1Val * m2Val) / (m1Val + m2Val);
        
        p.text("Cargo Mass (m1): " + m1Val + " kg", 30, labelY + spacing);
        p.text("Counterweight (m2): " + m2Val + " kg", 30, labelY + spacing * 2);
        p.text("Acceleration (a): " + currentAcc.toFixed(2) + " m/s²", 30, labelY + spacing * 3);
        p.text("Cable Tension (T): " + currentTen.toFixed(1) + " N", 30, labelY + spacing * 4);
    }
    
    function drawArrowhead(x, y, angle, col) {
        p.push();
        p.translate(x, y);
        p.rotate(angle);
        p.noStroke();
        p.fill(col);
        p.triangle(0, 0, -4, -2, -4, 2);
        p.pop();
    }
    
    function updateThemeColors() {
        const styles = getComputedStyle(document.body);
        primaryColor = styles.getPropertyValue('--primary-color').trim() || '#d4a574';
        textDark = styles.getPropertyValue('--news-ink').trim() || '#1c1a17';
        textMuted = styles.getPropertyValue('--news-muted').trim() || '#5c5246';
        bgCard = styles.getPropertyValue('--news-bg').trim() || '#f4edd8';
    }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initPulley, 100);
} else {
    window.addEventListener('DOMContentLoaded', initPulley);
}

function initPulley() {
    const hBtn = document.getElementById('hoistBtn');
    const rstBtn = document.getElementById('resetBtn');
    if (hBtn && rstBtn) {
        hBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--primary-color)';
            this.style.borderColor = 'var(--primary-color)';
            this.style.color = 'white';
        });
        hBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--news-ink)';
            this.style.borderColor = 'var(--news-border)';
            this.style.color = 'var(--news-bg)';
        });
        rstBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--primary-color)';
            this.style.borderColor = 'var(--primary-color)';
            this.style.color = 'white';
        });
        rstBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--news-bg)';
            this.style.borderColor = 'var(--news-border)';
            this.style.color = 'var(--news-ink)';
        });
    }
    
    new p5(pulleySketch, 'pulley-canvas-container');
}
</script>
