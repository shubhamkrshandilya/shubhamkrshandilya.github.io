---
layout: newspaper
title: "Astronomy: The Math of Solar Cycles"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Applied Mathematics Series"
section: "Astronomy Physics Column"
division: "Applied Mathematics"
author: "Shubham Kumar"
volume: "I"
issue: "14"
date: 2026-07-12 07:00:00 +0530
tags: [Math, Astronomy, Physics, p5.js, Creative Coding, Atmosphere]
weather: "Ambient landscape shading and solar orbits active"
ticker_index: "Sun: R*cos(theta) | Moon: R*cos(theta+pi) | LerpColor gradient stops"
price: "10 Credits"
---

How do we model the visual passage of a day? In the real world, the colors of the sky, the brightness of the landscape, and the trajectories of the sun and moon are governed by **Earth's axial rotation** and **atmospheric light scattering**.

To recreate this cycle in a web browser, we must combine **Polar Orbit geometry** with **Multi-Stop Color Vector Interpolation**. In this column, we study these mathematical principles and build a **Procedural Day & Night Observatory Suite** in p5.js.

<div class="newspaper-clipping">
    <h3>The Astronomy Glossary</h3>
    <ul>
        <li><strong>Solar Orbit</strong>: The elliptical trajectory of the sun across the sky dome, modeled in 2D using polar coordinate angles.</li>
        <li><strong>Color Interpolation (Lerp)</strong>: Linearly blending two RGB color vectors to calculate intermediate shades at a specific fraction: $0 \le f \le 1$.</li>
        <li><strong>Ambient Shading</strong>: Scaling the color value of landscape layers based on the solar position to match the surrounding sky brightness.</li>
    </ul>
</div>

## 1. Polar Orbit Coordinates

To simulate the sun and moon rising and setting, we model their positions on a circular trajectory centered at the middle of the sky. The angle of rotation $\theta$ is mapped directly to a 24-hour clock cycle:

$$\theta = \left(\frac{\text{Time}}{24}\right) \cdot 2\pi - \frac{\pi}{2}$$

Subtracting $\frac{\pi}{2}$ ensures that the sun peaks at noon ($\text{Time} = 12\text{h}$) when $\theta = \frac{\pi}{2}$ (pointing straight up). The sun and moon are exactly $180^\circ$ ($\pi$ radians) out of phase:

*   **Sun**: $x_{\text{sun}} = R_x \cdot \cos(\theta), \quad y_{\text{sun}} = R_y \cdot \sin(\theta)$
*   **Moon**: $x_{\text{moon}} = R_x \cdot \cos(\theta + \pi), \quad y_{\text{moon}} = R_y \cdot \sin(\theta + \pi)$

---

## 2. Multi-Stop Gradient Interpolation

Sky gradients cannot be represented as a simple transition between two colors. Sunrise has orange and pink stops, noon is bright cyan, sunset is magenta, and midnight is deep indigo.

We solve this by defining a multi-stop color look-up table at 4 key stops (0h, 6h, 12h, 18h). For any current virtual time $T$, we identify the surrounding stops $T_1$ and $T_2$ and calculate the local interpolation fraction $f$:

$$f = \frac{T - T_1}{T_2 - T_1}$$
$$\text{Color}_{\text{Result}} = (1 - f) \cdot \text{Color}_{1} + f \cdot \text{Color}_{2}$$

We evaluate this formula for both the top and bottom sky colors, drawing a seamless vertical gradient band across the canvas.

---

<!-- Playable Game Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.01); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase;">Procedural Day & Night Observatory</h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Select atmosphere themes, toggle play modes, and slide the 24h clock scroller to sweep through sunrise, midday, dusk, and midnight.
        </p>

        <!-- Main Layout Split -->
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; align-items: flex-start; text-align: left;">
            
            <!-- Canvas Container -->
            <div id="blog-daynight-canvas" style="width: 420px; height: 320px; border-radius: 12px; overflow: hidden; border: 1px solid var(--news-border); position: relative; background: #030510;"></div>

            <!-- Controls Panel -->
            <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 1rem; padding: 0.5rem;">
                
                <!-- Play/Pause Control -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <span style="font-weight: bold; font-size: 0.85rem;">Orbit Mode:</span>
                    <button id="blogDnPlay" style="width: 100%; padding: 0.4rem; font-family: 'Playfair Display', serif; font-weight: bold; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); cursor: pointer; border-radius: 4px;">Pause Auto Orbit</button>
                </div>

                <!-- Time Slider -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                        <span>Solar Time (24h):</span>
                        <span id="blogDnTimeVal" style="color: var(--primary-color);">12:00</span>
                    </div>
                    <input type="range" id="blogDnTime" min="0" max="24" step="0.1" value="12" style="width: 100%;">
                </div>

                <!-- Speed Slider -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                        <span>Orbit Speed:</span>
                        <span id="blogDnSpeedVal" style="color: var(--primary-color);">1.0x</span>
                    </div>
                    <input type="range" id="blogDnSpeed" min="0.1" max="5" step="0.1" value="1" style="width: 100%;">
                </div>

                <!-- Atmosphere Theme -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <span style="font-weight: bold; font-size: 0.85rem;">Atmosphere Theme:</span>
                    <select id="blogDnTheme" style="width: 100%; padding: 0.25rem; font-family: 'Playfair Display', serif; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-weight: bold; font-size: 0.9rem; height: 1.8rem; outline: none; cursor: pointer;">
                        <option value="clear" selected>Clear Sky (Standard)</option>
                        <option value="aurora">Aurora Borealis (Northern Lights)</option>
                        <option value="stars">Starry Cluster (Twinkling)</option>
                        <option value="fog">Deep Forest Fog (Misty)</option>
                    </select>
                </div>

                <div style="font-size: 0.8rem; font-family: 'Courier Prime', monospace; background: rgba(0,0,0,0.05); padding: 0.5rem; border-radius: 4px; border: 1px dashed var(--news-border); margin-top: 0.5rem; text-align: center;">
                    <span id="blogDnStatus">Time: 12:00 | Mid-Day</span>
                </div>
            </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--news-muted); margin-top: 1.5rem; text-indent: 0; text-align: center;">
            Explore the codebase and run standalone project builds via: 
            <a href="https://github.com/shubhamkrshandilya/day-and-night" target="_blank" rel="noopener noreferrer" style="font-weight: bold; color: var(--primary-color);">shubhamkrshandilya/day-and-night</a>
        </p>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
const blogDayNightSketch = (p) => {
    let currentTime = 12.0;
    let isPlaying = true;
    let atmosphereTheme = 'clear';
    
    let playBtn, timeSlider, speedSlider, themeSelect;
    let stars = [];
    let rainParticles = [];
    let skyColors = {};
    
    let canvasW = 420;
    let canvasH = 320;
    
    p.setup = () => {
        p.createCanvas(canvasW, canvasH);
        
        playBtn = document.getElementById('blogDnPlay');
        timeSlider = document.getElementById('blogDnTime');
        speedSlider = document.getElementById('blogDnSpeed');
        themeSelect = document.getElementById('blogDnTheme');
        
        if (playBtn) playBtn.onclick = togglePlayback;
        if (themeSelect) {
            themeSelect.addEventListener('change', function() {
                atmosphereTheme = this.value;
            });
        }
        
        skyColors = {
            0:  { top: p.color('#030510'), bottom: p.color('#080d26') },
            6:  { top: p.color('#1e1b4b'), bottom: p.color('#f59e0b') },
            12: { top: p.color('#0284c7'), bottom: p.color('#38bdf8') },
            18: { top: p.color('#311042'), bottom: p.color('#f97316') },
            24: { top: p.color('#030510'), bottom: p.color('#080d26') }
        };
        
        for (let i = 0; i < 40; i++) {
            stars.push({
                x: p.random(0, canvasW),
                y: p.random(0, canvasH - 120),
                size: p.random(1, 2.5),
                phase: p.random(0, p.TWO_PI)
            });
        }
        
        for (let i = 0; i < 30; i++) {
            rainParticles.push({
                x: p.random(0, canvasW),
                y: p.random(0, canvasH),
                speed: p.random(4, 7),
                len: p.random(6, 12)
            });
        }
    };
    
    p.draw = () => {
        let orbitSpeed = speedSlider ? parseFloat(speedSlider.value) : 1.0;
        const speedText = document.getElementById('blogDnSpeedVal');
        if (speedText) speedText.textContent = orbitSpeed.toFixed(1) + "x";
        
        if (isPlaying) {
            let dt = p.deltaTime / 1000;
            currentTime += dt * orbitSpeed * 0.4;
            currentTime = currentTime % 24;
            if (timeSlider) timeSlider.value = currentTime;
        } else {
            if (timeSlider) currentTime = parseFloat(timeSlider.value);
        }
        
        const timeText = document.getElementById('blogDnTimeVal');
        if (timeText) {
            let hr = Math.floor(currentTime);
            let min = Math.floor((currentTime % 1) * 60);
            timeText.textContent = p.nf(hr, 2) + ":" + p.nf(min, 2);
        }
        
        drawSkyBackground();
        drawTwinklingStars();
        
        if (atmosphereTheme === 'aurora') {
            drawNorthernLights();
        }
        
        drawSunAndMoon();
        drawScenery();
        
        if (atmosphereTheme === 'fog') {
            drawMistyFog();
        }
        
        updateHUD();
    };
    
    function drawSkyBackground() {
        let t = currentTime;
        let t1, t2;
        if (t >= 0 && t < 6) { t1 = 0; t2 = 6; }
        else if (t >= 6 && t < 12) { t1 = 6; t2 = 12; }
        else if (t >= 12 && t < 18) { t1 = 12; t2 = 18; }
        else { t1 = 18; t2 = 24; }
        
        let fraction = (t - t1) / (t2 - t1);
        let colTop = p.lerpColor(skyColors[t1].top, skyColors[t2].top, fraction);
        let colBottom = p.lerpColor(skyColors[t1].bottom, skyColors[t2].bottom, fraction);
        
        p.noFill();
        p.strokeWeight(1);
        for (let y = 0; y < canvasH; y++) {
            let inter = p.map(y, 0, canvasH, 0, 1);
            let c = p.lerpColor(colTop, colBottom, inter);
            p.stroke(c);
            p.line(0, y, canvasW, y);
        }
    }
    
    function drawTwinklingStars() {
        let darkness = p.map(p.cos((currentTime / 24) * p.TWO_PI), -1, 1, 0, 1);
        let starAlpha = p.map(darkness, 0.4, 0.9, 0, 255, true);
        if (starAlpha > 0) {
            p.noStroke();
            for (let s of stars) {
                let twinkle = p.sin(p.frameCount * 0.05 + s.phase);
                let sizeF = p.map(twinkle, -1, 1, 0.6, 1.3);
                p.fill(255, 255, 255, starAlpha * p.map(twinkle, -1, 1, 0.5, 1.0));
                p.ellipse(s.x, s.y, s.size * sizeF, s.size * sizeF);
            }
        }
    }
    
    function drawNorthernLights() {
        let darkness = p.map(p.cos((currentTime / 24) * p.TWO_PI), -1, 1, 0, 1);
        let auroraAlpha = p.map(darkness, 0.6, 0.9, 0, 80, true);
        if (auroraAlpha > 0) {
            p.push();
            p.noFill();
            p.strokeWeight(9);
            let colors = [
                p.color(16, 185, 129, auroraAlpha),
                p.color(6, 182, 212, auroraAlpha * 0.7)
            ];
            for (let w = 0; w < 2; w++) {
                p.stroke(colors[w]);
                p.beginShape();
                for (let x = 0; x <= canvasW + 40; x += 30) {
                    let waveY = 60 + w * 25 + p.sin(x * 0.01 + p.frameCount * 0.015 + w) * 15;
                    p.curveVertex(x, waveY);
                }
                p.endShape();
            }
            p.pop();
        }
    }
    
    function drawSunAndMoon() {
        let rx = canvasW * 0.42;
        let ry = canvasH * 0.38;
        let theta = (currentTime / 24) * p.TWO_PI - p.HALF_PI;
        
        let sunX = canvasW / 2 + rx * p.cos(theta);
        let sunY = canvasH / 2 + 80 + ry * p.sin(theta);
        
        let moonX = canvasW / 2 + rx * p.cos(theta + p.PI);
        let moonY = canvasH / 2 + 80 + ry * p.sin(theta + p.PI);
        
        if (sunY < canvasH - 70) {
            p.push();
            p.noStroke();
            for (let r = 60; r > 24; r -= 10) {
                p.fill(245, 158, 11, p.map(r, 60, 24, 5, 45));
                p.ellipse(sunX, sunY, r, r);
            }
            p.fill(255, 243, 204);
            p.ellipse(sunX, sunY, 26, 26);
            p.pop();
        }
        
        if (moonY < canvasH - 70) {
            p.push();
            p.noStroke();
            p.fill(255, 255, 255, 12);
            p.ellipse(moonX, moonY, 32, 32);
            p.fill(230, 235, 245);
            p.ellipse(moonX, moonY, 20, 20);
            let bgCol = getSkyColorAtHeight(moonY);
            p.fill(bgCol);
            p.ellipse(moonX + 5, moonY - 2, 18, 18);
            p.pop();
        }
    }
    
    function getSkyColorAtHeight(yVal) {
        let t = currentTime;
        let t1, t2;
        if (t >= 0 && t < 6) { t1 = 0; t2 = 6; }
        else if (t >= 6 && t < 12) { t1 = 6; t2 = 12; }
        else if (t >= 12 && t < 18) { t1 = 12; t2 = 18; }
        else { t1 = 18; t2 = 24; }
        let fraction = (t - t1) / (t2 - t1);
        let colTop = p.lerpColor(skyColors[t1].top, skyColors[t2].top, fraction);
        let colBottom = p.lerpColor(skyColors[t1].bottom, skyColors[t2].bottom, fraction);
        return p.lerpColor(colTop, colBottom, p.map(yVal, 0, canvasH, 0, 1));
    }
    
    function drawScenery() {
        let ambient = p.map(p.cos((currentTime / 24) * p.TWO_PI), -1, 1, 0.22, 1.0);
        
        let backHillColor = p.color(10, 45 * ambient, 55 * ambient);
        p.fill(backHillColor);
        p.noStroke();
        p.beginShape();
        p.vertex(0, canvasH);
        for (let x = 0; x <= canvasW + 10; x += 15) {
            let y = canvasH - 100 + p.sin(x * 0.01) * 28 + p.cos(x * 0.005) * 12;
            p.vertex(x, y);
        }
        p.vertex(canvasW, canvasH);
        p.endShape(p.CLOSE);
        
        let frontHillColor = p.color(5, 30 * ambient, 40 * ambient);
        p.fill(frontHillColor);
        p.beginShape();
        p.vertex(0, canvasH);
        for (let x = 0; x <= canvasW + 10; x += 15) {
            let y = canvasH - 70 + p.cos(x * 0.015) * 18 + p.sin(x * 0.008) * 10;
            p.vertex(x, y);
        }
        p.vertex(canvasW, canvasH);
        p.endShape(p.CLOSE);
        
        drawPineTree(60, canvasH - 85, 20, 36, ambient);
        drawPineTree(340, canvasH - 90, 22, 40, ambient);
        drawBroadTree(150, canvasH - 75, 24, 42, ambient);
        drawSceneryCabin(220, canvasH - 85, ambient);
    }
    
    function drawPineTree(x, y, w, h, ambient) {
        p.push();
        p.noStroke();
        p.fill(15 * ambient, 10 * ambient, 5 * ambient);
        p.rect(x - w*0.15, y - h*0.2, w*0.3, h*0.25);
        p.fill(8 * ambient, 50 * ambient, 32 * ambient);
        p.triangle(x - w*0.5, y - h*0.2, x + w*0.5, y - h*0.2, x, y - h*0.55);
        p.fill(6 * ambient, 42 * ambient, 28 * ambient);
        p.triangle(x - w*0.4, y - h*0.5, x + w*0.4, y - h*0.5, x, y - h*0.8);
        p.pop();
    }
    
    function drawBroadTree(x, y, w, h, ambient) {
        p.push();
        p.noStroke();
        p.fill(25 * ambient, 15 * ambient, 5 * ambient);
        p.rect(x - w*0.12, y - h*0.3, w*0.24, h*0.35);
        p.fill(12 * ambient, 60 * ambient, 20 * ambient);
        p.ellipse(x, y - h*0.5, w*0.9, w*0.9);
        p.pop();
    }
    
    function drawSceneryCabin(x, y, ambient) {
        p.push();
        p.noStroke();
        p.fill(40 * ambient, 25 * ambient, 15 * ambient);
        p.rect(x, y, 36, 24, 2);
        p.fill(60 * ambient, 20 * ambient, 20 * ambient);
        p.triangle(x - 4, y, x + 40, y, x + 18, y - 12);
        
        let lightI = 0;
        if (currentTime > 17 || currentTime < 6) {
            if (currentTime >= 17 && currentTime < 19) {
                lightI = p.map(currentTime, 17, 19, 0, 255);
            } else if (currentTime >= 5 && currentTime < 6) {
                lightI = p.map(currentTime, 5, 6, 255, 0);
            } else {
                lightI = 255;
            }
        }
        p.fill(30 * ambient, 30 * ambient, 30 * ambient);
        p.rect(x + 10, y + 8, 16, 10, 1);
        if (lightI > 0) {
            p.fill(245, 158, 11, lightI);
            p.drawingContext.shadowBlur = p.map(lightI, 0, 255, 0, 12);
            p.drawingContext.shadowColor = 'rgba(245, 158, 11, 0.7)';
            p.rect(x + 11, y + 9, 14, 8, 1);
        }
        p.pop();
    }
    
    function drawMistyFog() {
        p.push();
        p.stroke('rgba(255,255,255,0.12)');
        p.strokeWeight(1);
        for (let pt of rainParticles) {
            p.line(pt.x, pt.y, pt.x - 1, pt.y + pt.len);
            pt.y += pt.speed;
            pt.x -= 0.5;
            if (pt.y > canvasH) {
                pt.y = -10;
                pt.x = p.random(0, canvasW);
            }
        }
        let density = p.map(p.cos((currentTime / 24) * p.TWO_PI), -1, 1, 90, 40);
        p.noStroke();
        p.fill(255, 255, 255, density);
        p.rect(0, 0, canvasW, canvasH);
        p.pop();
    }
    
    function togglePlayback() {
        isPlaying = !isPlaying;
        if (playBtn) {
            if (isPlaying) {
                playBtn.textContent = 'Pause Auto Orbit';
            } else {
                playBtn.textContent = 'Manual Sweep';
            }
        }
    }
    
    function updateHUD() {
        const status = document.getElementById('blogDnStatus');
        if (status) {
            let hr = Math.floor(currentTime);
            let min = Math.floor((currentTime % 1) * 60);
            let timeStr = p.nf(hr, 2) + ":" + p.nf(min, 2);
            let phase = "";
            if (currentTime >= 5 && currentTime < 8) phase = "Dawn";
            else if (currentTime >= 8 && currentTime < 16) phase = "Mid-Day";
            else if (currentTime >= 16 && currentTime < 19) phase = "Sunset";
            else if (currentTime >= 19 && currentTime < 21) phase = "Twilight";
            else phase = "Midnight";
            
            let themeText = "Clear Sky";
            if (atmosphereTheme === 'aurora') themeText = "Northern Lights";
            else if (atmosphereTheme === 'stars') themeText = "Starry Cluster";
            else if (atmosphereTheme === 'fog') themeText = "Foggy Rain";
            
            status.textContent = `Time: ${timeStr} | ${phase} | ${themeText}`;
        }
    }
};

new p5(blogDayNightSketch, 'blog-daynight-canvas');
</script>
