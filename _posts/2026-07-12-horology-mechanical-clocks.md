---
layout: newspaper
title: "Horology: The Physics of Clocks"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Applied Mathematics Series"
section: "Mechanical Physics Column"
division: "Applied Mathematics"
author: "Shubham Kumar"
volume: "I"
issue: "12"
date: 2026-07-12 05:00:00 +0530
tags: [Math, Physics, Horology, p5.js, Creative Coding, Clocks]
weather: "Synchronous gear tooth meshing rotation cycles active"
ticker_index: "Gears: w_2 = -w_1 * (N_1 / N_2) | Polar: x = R*cos(theta) | Chronograph"
price: "10 Credits"
---

How do we measure the passage of time? For centuries, humanity relied on mechanical timepieces: intricate systems of springs, cogs, and balance wheels meshing together in synchronous harmony. The study of these mechanisms is called **Horology**.

Behind every mechanical ticking hand lies a system of **Polar-to-Cartesian coordinate mappings** and **Interlocking Gear Tooth Physics**. In this column, we study these mathematical principles and build a **Celestial Mechanical Chronograph Suite** in p5.js.

<div class="newspaper-clipping">
    <h3>The Horology Glossary</h3>
    <ul>
        <li><strong>Escape Wheel</strong>: The gear in a mechanical watch that releases energy in discrete steps, producing the "tick" sound.</li>
        <li><strong>Gear Ratio</strong>: The ratio of the angular velocities of two meshed gears, determined by their tooth count: $N_1/N_2$.</li>
        <li><strong>Sweep Motion</strong>: A continuous hand movement where positions are integrated with millisecond precision, mimicking high-frequency escapements.</li>
    </ul>
</div>

## 1. Polar-to-Cartesian Mapping

On a clock face, time is represented as an angle $\theta$. To draw the hands, we must map these angles to Cartesian coordinates $(x, y)$ on our screen:

$$x = R \cdot \cos(\theta)$$
$$y = R \cdot \sin(\theta)$$

To calculate the angle for the second hand:
*   **Ticking (Stepping)**: $\theta_s = \left(\frac{\text{seconds}}{60}\right) \cdot 2\pi - \frac{\pi}{2}$
*   **Sweep (Smooth)**: $\theta_s = \left(\frac{\text{seconds} + \frac{\text{milliseconds}}{1000}}{60}\right) \cdot 2\pi - \frac{\pi}{2}$

Subtracting $\frac{\pi}{2}$ offsets the angle so that zero points vertically upwards (12 o'clock).

---

## 2. The Physics of Meshed Gears

Mechanical clocks use interlocking cogs of different sizes to scale down the speed of the motor. When two gears mesh, their teeth must move at the exact same linear speed along the pitch circle. This dictates their **angular velocities** ($\omega_1, \omega_2$) based on their number of teeth ($N_1, N_2$):

$$v_1 = v_2 \implies \omega_1 \cdot R_1 = \omega_2 \cdot R_2$$
$$\omega_2 = -\omega_1 \cdot \left(\frac{N_1}{N_2}\right)$$

The negative sign indicates that the meshed gears rotate in **opposite directions**. In our Steampunk layout, we simulate this interlocking behavior using three gears (Center, Escape, and Intermediate) rotating at matching mechanical ratios.

---

<!-- Playable Game Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.01); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase;">Interactive Chronograph Suite</h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Configure themes, toggle hand motion styles, and slide the speed multiplier to watch the astronomical day/night cycles and gear cogs spin.
        </p>

        <!-- Main Layout Split -->
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; align-items: flex-start; text-align: left;">
            
            <!-- Canvas Container -->
            <div id="blog-clock-canvas" style="width: 420px; height: 420px; border-radius: 12px; overflow: hidden; border: 1px solid var(--news-border); position: relative; background: #181410;"></div>

            <!-- Controls Panel -->
            <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 1rem; padding: 0.5rem;">
                
                <!-- Theme Select -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <span style="font-weight: bold; font-size: 0.85rem;">Chronograph Theme:</span>
                    <select id="blogClockTheme" style="width: 100%; padding: 0.25rem; font-family: 'Playfair Display', serif; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-weight: bold; font-size: 0.9rem; height: 1.8rem; outline: none; cursor: pointer;">
                        <option value="steampunk" selected>Steampunk Brass (Gears)</option>
                        <option value="celestial">Celestial Astronomy (Sun/Moon)</option>
                        <option value="onyx">Modern Onyx (Neon Minimal)</option>
                    </select>
                </div>

                <!-- Motion Select -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <span style="font-weight: bold; font-size: 0.85rem;">Second Hand Motion:</span>
                    <select id="blogClockMotion" style="width: 100%; padding: 0.25rem; font-family: 'Playfair Display', serif; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-weight: bold; font-size: 0.9rem; height: 1.8rem; outline: none; cursor: pointer;">
                        <option value="sweep" selected>Continuous Sweep (Smooth)</option>
                        <option value="tick">Ticking Step (Mechanical)</option>
                    </select>
                </div>

                <!-- Speed Slider -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                        <span>Time Multiplier:</span>
                        <span id="blogClockSpeedVal" style="color: var(--primary-color);">1x</span>
                    </div>
                    <input type="range" id="blogClockSpeed" min="1" max="500" step="5" value="1" style="width: 100%;">
                </div>

                <!-- Stopwatch Readout -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.5rem;">
                    <span style="font-weight: bold; font-size: 0.8rem; color: var(--news-muted);">Stopwatch Sub-Dial readout:</span>
                    <div id="blogClockSwVal" style="font-family: 'Courier New', monospace; font-size: 1.4rem; font-weight: bold; padding: 0.4rem; text-align: center; border: 1px solid var(--news-border); background: rgba(0,0,0,0.03); border-radius: 4px;">00:00:00.00</div>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem;">
                        <button id="blogClockSwStart" style="flex: 1; padding: 0.4rem; font-family: 'Playfair Display', serif; font-weight: bold; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); cursor: pointer; border-radius: 4px;">Start</button>
                        <button id="blogClockSwReset" style="flex: 1; padding: 0.4rem; font-family: 'Playfair Display', serif; font-weight: bold; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); cursor: pointer; border-radius: 4px;">Reset</button>
                    </div>
                </div>

                <div style="font-size: 0.8rem; font-family: 'Courier Prime', monospace; background: rgba(0,0,0,0.05); padding: 0.5rem; border-radius: 4px; border: 1px dashed var(--news-border); margin-top: 0.5rem; text-align: center;">
                    <span id="blogClockStatus">Time: --:--:--</span>
                </div>
            </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--news-muted); margin-top: 1.5rem; text-indent: 0; text-align: center;">
            Explore the codebase and run standalone project builds via: 
            <a href="https://github.com/shubhamkrshandilya/p5js-clock" target="_blank" rel="noopener noreferrer" style="font-weight: bold; color: var(--primary-color);">shubhamkrshandilya/p5js-clock</a>
        </p>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
const blogClockSketch = (p) => {
    let currentTheme = 'steampunk';
    let motionMode = 'sweep';
    let customTime = 0;
    
    let themeSelect, motionSelect, speedSlider;
    let stopwatchVal, stopwatchStartBtn, stopwatchResetBtn;
    
    let swActive = false;
    let swStartReal = 0;
    let swElapsed = 0;
    let stars = [];
    
    let canvasW = 420;
    let canvasH = 420;
    let primaryColor = '#d4a574';
    
    p.setup = () => {
        p.createCanvas(canvasW, canvasH);
        
        themeSelect = document.getElementById('blogClockTheme');
        motionSelect = document.getElementById('blogClockMotion');
        speedSlider = document.getElementById('blogClockSpeed');
        stopwatchVal = document.getElementById('blogClockSwVal');
        stopwatchStartBtn = document.getElementById('blogClockSwStart');
        stopwatchResetBtn = document.getElementById('blogClockSwReset');
        
        if (themeSelect) {
            themeSelect.addEventListener('change', function() {
                currentTheme = this.value;
            });
        }
        if (motionSelect) {
            motionSelect.addEventListener('change', function() {
                motionMode = this.value;
            });
        }
        
        if (stopwatchStartBtn) stopwatchStartBtn.onclick = toggleStopwatch;
        if (stopwatchResetBtn) stopwatchResetBtn.onclick = resetStopwatch;
        
        customTime = Date.now();
        
        for (let i = 0; i < 40; i++) {
            stars.push({
                x: p.random(-210, 210),
                y: p.random(-210, 210),
                size: p.random(0.5, 2.0),
                phase: p.random(0, p.TWO_PI)
            });
        }
    };
    
    p.draw = () => {
        let dt = p.deltaTime;
        let speedMult = speedSlider ? parseFloat(speedSlider.value) : 1;
        
        const speedText = document.getElementById('blogClockSpeedVal');
        if (speedText) speedText.textContent = speedMult + "x";
        
        customTime += dt * speedMult;
        
        let timeObj = new Date(customTime);
        let ms = timeObj.getMilliseconds();
        let sec = timeObj.getSeconds();
        let min = timeObj.getMinutes();
        let hr = timeObj.getHours();
        
        p.translate(canvasW / 2, canvasH / 2);
        
        if (currentTheme === 'steampunk') {
            drawSteampunkTheme(hr, min, sec, ms);
        } else if (currentTheme === 'celestial') {
            drawCelestialTheme(hr, min, sec, ms);
        } else if (currentTheme === 'onyx') {
            drawOnyxTheme(hr, min, sec, ms);
        }
        
        drawStopwatchSubdial();
        updateHUD(timeObj);
    };
    
    function drawSteampunkTheme(hr, min, sec, ms) {
        p.background('#181410');
        p.stroke('#402b18');
        p.strokeWeight(8);
        p.fill('#231a11');
        p.ellipse(0, 0, 380, 380);
        
        p.stroke('#d4a574');
        p.strokeWeight(1.5);
        p.noFill();
        p.ellipse(0, 0, 362, 362);
        
        let angleSec = calculateHandAngle(sec, ms, 60);
        let angleMin = calculateHandAngle(min, sec, 60);
        let angleHr = calculateHandAngle(hr % 12, min, 12);
        
        drawGear(0, 0, 95, 30, angleMin, '#3d2b19', '#2a1d10');
        drawGear(85, 35, 35, 12, -angleSec * 1.5, '#5c3e21', '#3a2510');
        drawGear(-80, -45, 65, 20, angleHr * 0.8, '#4a331e', '#2c1e10');
        
        p.noStroke();
        p.fill('#d4a574');
        p.textSize(14);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('Georgia');
        
        const roman = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
        for (let i = 0; i < 12; i++) {
            let theta = i * 30 * (p.PI / 180) - p.HALF_PI;
            let rx = 158 * p.cos(theta);
            let ry = 158 * p.sin(theta);
            p.text(roman[i], rx, ry);
        }
        
        drawOrnateHand(angleHr, 80, 6, '#d4a574');
        drawOrnateHand(angleMin, 125, 4, '#a98256');
        
        p.stroke('#b25d38');
        p.strokeWeight(1.5);
        let secX = 145 * p.cos(angleSec);
        let secY = 145 * p.sin(angleSec);
        p.line(-secX * 0.18, -secY * 0.18, secX, secY);
        p.fill('#d4a574');
        p.stroke('#231a11');
        p.strokeWeight(2);
        p.ellipse(0, 0, 14, 14);
    }
    
    function drawGear(x, y, radius, teeth, angle, strokeCol, fillCol) {
        p.push();
        p.translate(x, y);
        p.rotate(angle);
        p.stroke(strokeCol);
        p.strokeWeight(1.5);
        p.fill(fillCol);
        p.ellipse(0, 0, radius * 2, radius * 2);
        let tWidth = (p.TWO_PI / teeth) * 0.45;
        let tHeight = radius * 0.12;
        for (let i = 0; i < teeth; i++) {
            let ta = i * (p.TWO_PI / teeth);
            p.beginShape();
            p.vertex(radius * p.cos(ta - tWidth), radius * p.sin(ta - tWidth));
            p.vertex((radius + tHeight) * p.cos(ta - tWidth * 0.6), (radius + tHeight) * p.sin(ta - tWidth * 0.6));
            p.vertex((radius + tHeight) * p.cos(ta + tWidth * 0.6), (radius + tHeight) * p.sin(ta + tWidth * 0.6));
            p.vertex(radius * p.cos(ta + tWidth), radius * p.sin(ta + tWidth));
            p.endShape(p.CLOSE);
        }
        p.ellipse(0, 0, radius * 0.5, radius * 0.5);
        p.pop();
    }
    
    function drawOrnateHand(angle, len, thickness, col) {
        p.push();
        p.rotate(angle);
        p.stroke(col);
        p.fill(col);
        p.strokeWeight(1.5);
        p.beginShape();
        p.vertex(0, -thickness * 0.5);
        p.vertex(len * 0.25, -thickness * 1.3);
        p.vertex(len * 0.5, -thickness * 0.2);
        p.vertex(len * 0.85, -thickness * 0.8);
        p.vertex(len, 0);
        p.vertex(len * 0.85, thickness * 0.8);
        p.vertex(len * 0.5, thickness * 0.2);
        p.vertex(len * 0.25, thickness * 1.3);
        p.vertex(0, thickness * 0.5);
        p.endShape(p.CLOSE);
        p.pop();
    }
    
    function drawCelestialTheme(hr, min, sec, ms) {
        p.background('#05070f');
        p.noStroke();
        for (let s of stars) {
            let tw = p.sin(p.frameCount * 0.08 + s.phase);
            let alpha = p.map(tw, -1, 1, 80, 255);
            p.fill(255, 255, 255, alpha);
            p.ellipse(s.x, s.y, s.size, s.size);
        }
        
        let dnAngle = ((hr * 3600 + min * 60 + sec) / 86400) * p.TWO_PI - p.HALF_PI;
        p.push();
        p.noStroke();
        p.fill(10, 12, 30, 150);
        p.ellipse(0, 0, 340, 340);
        p.rotate(dnAngle);
        p.fill('#eab308');
        p.ellipse(130, 0, 26, 26);
        p.fill('#cbd5e1');
        p.ellipse(-130, 0, 20, 20);
        p.fill('#05070f');
        p.ellipse(-125, 0, 18, 18);
        p.pop();
        
        p.noFill();
        p.stroke('rgba(212, 165, 116, 0.2)');
        p.strokeWeight(1);
        p.ellipse(0, 0, 270, 270);
        
        p.noStroke();
        p.fill('#e2e8f0');
        p.textSize(13);
        p.textAlign(p.CENTER, p.CENTER);
        for (let i = 1; i <= 12; i++) {
            let th = i * 30 * (p.PI / 180) - p.HALF_PI;
            p.text(i, 155 * p.cos(th), 155 * p.sin(th));
        }
        
        let angleSec = calculateHandAngle(sec, ms, 60);
        let angleMin = calculateHandAngle(min, sec, 60);
        let angleHr = calculateHandAngle(hr % 12, min, 12);
        
        drawCelestialHand(angleHr, 80, '#d4a574', true);
        drawCelestialHand(angleMin, 120, '#cbd5e1', false);
        
        p.stroke('#d4a574');
        p.strokeWeight(1.5);
        let secX = 140 * p.cos(angleSec);
        let secY = 140 * p.sin(angleSec);
        p.line(-secX * 0.15, -secY * 0.15, secX, secY);
        p.fill('#d4a574');
        p.ellipse(0, 0, 8, 8);
    }
    
    function drawCelestialHand(angle, len, col, isStar) {
        p.push();
        p.rotate(angle);
        p.stroke(col);
        p.strokeWeight(2);
        p.noFill();
        p.line(0, 0, len - 12, 0);
        p.translate(len - 8, 0);
        if (isStar) {
            p.fill(col);
            p.noStroke();
            p.beginShape();
            for (let i = 0; i < 8; i++) {
                let r = (i % 2 === 0) ? 8 : 3;
                p.vertex(r * p.cos(i * p.QUARTER_PI), r * p.sin(i * p.QUARTER_PI));
            }
            p.endShape(p.CLOSE);
        } else {
            p.fill(col);
            p.ellipse(0, 0, 10, 10);
            p.fill('#05070f');
            p.ellipse(3, 0, 8, 8);
        }
        p.pop();
    }
    
    function drawOnyxTheme(hr, min, sec, ms) {
        p.background('#07090e');
        p.noFill();
        p.strokeWeight(3.5);
        let secN = (motionMode === 'sweep') ? (sec * 1000 + ms) / 60000 : sec / 60;
        let minN = (min * 60 + sec) / 3600;
        let hrN = ((hr % 12) * 3600 + min * 60 + sec) / 43200;
        
        p.stroke('rgba(6, 182, 212, 0.15)');
        p.ellipse(0, 0, 320, 320);
        p.stroke('#06b6d4');
        p.arc(0, 0, 320, 320, -p.HALF_PI, secN * p.TWO_PI - p.HALF_PI);
        
        p.stroke('rgba(139, 92, 246, 0.15)');
        p.ellipse(0, 0, 280, 280);
        p.stroke('#8b5cf6');
        p.arc(0, 0, 280, 280, -p.HALF_PI, minN * p.TWO_PI - p.HALF_PI);
        
        p.stroke('rgba(236, 72, 153, 0.15)');
        p.ellipse(0, 0, 240, 240);
        p.stroke('#ec4899');
        p.arc(0, 0, 240, 240, -p.HALF_PI, hrN * p.TWO_PI - p.HALF_PI);
        
        let angleSec = calculateHandAngle(sec, ms, 60);
        let angleMin = calculateHandAngle(min, sec, 60);
        let angleHr = calculateHandAngle(hr % 12, min, 12);
        
        p.stroke('#ec4899');
        p.strokeWeight(5);
        p.line(0, 0, 75 * p.cos(angleHr), 75 * p.sin(angleHr));
        p.stroke('#8b5cf6');
        p.strokeWeight(3.5);
        p.line(0, 0, 110 * p.cos(angleMin), 110 * p.sin(angleMin));
        p.stroke('#06b6d4');
        p.strokeWeight(2);
        p.line(0, 0, 140 * p.cos(angleSec), 140 * p.sin(angleSec));
        
        p.fill('#07090e');
        p.stroke('#06b6d4');
        p.strokeWeight(2);
        p.ellipse(0, 0, 8, 8);
    }
    
    function calculateHandAngle(unit, fraction, total) {
        let val = unit;
        if (motionMode === 'sweep') {
            val += fraction / (total === 12 ? 60 : 1000);
        }
        return (val / total) * p.TWO_PI - p.HALF_PI;
    }
    
    function drawStopwatchSubdial() {
        let sy = 75;
        let sRad = 32;
        p.push();
        p.translate(0, sy);
        p.stroke(currentTheme === 'celestial' ? 'rgba(255,255,255,0.1)' : 'rgba(212,165,116,0.25)');
        p.strokeWeight(1.2);
        p.fill(currentTheme === 'onyx' ? '#07090e' : '#100e0b');
        p.ellipse(0, 0, sRad * 2, sRad * 2);
        
        let elapsed = swElapsed;
        if (swActive) {
            elapsed += Date.now() - swStartReal;
        }
        let totalMs = elapsed;
        let swMs = Math.floor((totalMs % 1000) / 10);
        let totalSec = Math.floor(totalMs / 1000);
        let swSec = totalSec % 60;
        let totalMin = Math.floor(totalSec / 60);
        let swMin = totalMin % 60;
        let swHr = Math.floor(totalMin / 60);
        
        let formatted = p.nf(swHr, 2) + ":" + p.nf(swMin, 2) + ":" + p.nf(swSec, 2) + "." + p.nf(swMs, 2);
        const readout = document.getElementById('blogClockSwVal');
        if (readout) readout.textContent = formatted;
        
        let swAngle = (swSec / 60) * p.TWO_PI - p.HALF_PI;
        p.stroke(currentTheme === 'onyx' ? '#ec4899' : '#b25d38');
        p.strokeWeight(1.5);
        p.line(0, 0, sRad * 0.8 * p.cos(swAngle), sRad * 0.8 * p.sin(swAngle));
        p.pop();
    }
    
    function toggleStopwatch() {
        const btn = document.getElementById('blogClockSwStart');
        if (!swActive) {
            swActive = true;
            swStartReal = Date.now();
            if (btn) btn.textContent = 'Pause';
        } else {
            swActive = false;
            swElapsed += Date.now() - swStartReal;
            if (btn) btn.textContent = 'Start';
        }
    }
    
    function resetStopwatch() {
        swActive = false;
        swElapsed = 0;
        swStartReal = 0;
        const btn = document.getElementById('blogClockSwStart');
        if (btn) btn.textContent = 'Start';
        const readout = document.getElementById('blogClockSwVal');
        if (readout) readout.textContent = "00:00:00.00";
    }
    
    function updateHUD(timeObj) {
        const status = document.getElementById('blogClockStatus');
        if (status) {
            let pad = (num) => p.nf(num, 2);
            status.textContent = `Time: ${pad(timeObj.getHours())}:${pad(timeObj.getMinutes())}:${pad(timeObj.getSeconds())}`;
        }
    }
};

new p5(blogClockSketch, 'blog-clock-canvas');
</script>
