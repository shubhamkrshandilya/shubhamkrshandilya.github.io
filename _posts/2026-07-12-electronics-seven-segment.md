---
layout: newspaper
title: "Electronics: 7-Segment Display Logic"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Applied Mathematics Series"
section: "Digital Electronics Column"
division: "Applied Mathematics"
author: "Shubham Kumar"
volume: "I"
issue: "13"
date: 2026-07-12 06:00:00 +0530
tags: [Math, Electronics, AI, p5.js, Creative Coding, Clocks]
weather: "Procedural segment beveling hexagons actively rendering"
ticker_index: "LED: Segments A-G | Glow: shadowBlur + shadowColor | Blueprint Grid"
price: "10 Credits"
---

From early calculator screens to digital alarm clocks and street indicators, the **7-Segment Display** is one of the most ubiquitous electronic components in the world. But how do we represent decimal digits $(0-9)$ using a simple set of seven light-emitting diodes (LEDs)?

The answer lies in **Digital Logic gates** and **Bitmask Mapping**. In this column, we study these mathematical principles and build a **Procedural Cyberpunk LED Chronometer** in p5.js.

<div class="newspaper-clipping">
    <h3>The Electronics Glossary</h3>
    <ul>
        <li><strong>7-Segment Display</strong>: An electronic display device with seven LEDs arranged in an "8" shape, activated in combinations to represent numerical digits.</li>
        <li><strong>Bitmask</strong>: A binary string used to toggle specific states (on or off) in a register.</li>
        <li><strong>Beveling</strong>: Slanting or angling the endpoints of a shape to ensure neat, physical joints when segments meet.</li>
    </ul>
</div>

## 1. The Segment Bitmask

A standard 7-segment display labels its seven diodes as letters from **A** to **G**:

```
      A  (0)
     ---
  F |   | B (1)
 (5)| G |
     --- (6)
  E |   | C (2)
 (4)|   |
     ---
      D  (3)
```

We represent the state of these segments as an array of seven booleans `[A, B, C, D, E, F, G]`, mapping each digit to its binary mask:
*   `0` ⟹ `[true, true, true, true, true, true, false]` (all active except G)
*   `1` ⟹ `[false, true, true, false, false, false, false]` (only B and C active)
*   `8` ⟹ `[true, true, true, true, true, true, true]` (all segments active)

---

## 2. Hexagonal Beveling & Glow Physics

In standard web drawings, segments are drawn as simple rectangles. However, hardware screens bevel the endpoints at $45^\circ$ angles so that adjacent segments meet without overlapping.

We map each segment procedurally as a **hexagon polygon**:
*   **Horizontal**:
    $$\text{Vertices} = \left[(x + t/2, y), (x + L - t/2, y), (x + L, y + t/2), (x + L - t/2, y + t), (x + t/2, y + t), (x, y + t/2)\right]$$
*   **Vertical**:
    $$\text{Vertices} = \left[(x, y + t/2), (x + t/2, y), (x + t, y + t/2), (x + t, y + L - t/2), (x + t/2, y + L), (x, y + L - t/2)\right]$$

Where $L$ is segment length and $t$ is thickness. To represent glowing neon gas tubes, we implement the HTML5 Canvas shadow API:

$$\text{Shadow}_{\text{Blur}} = \text{Glow}, \quad \text{Shadow}_{\text{Color}} = \text{Color}_{\text{Neon}}$$

---

<!-- Playable Game Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.01); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase;">Procedural LED Chronometer</h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Select neon glow color, adjust thickness, and slide the speed multiplier to watch the digital digits, calendar dates, and waves cycle.
        </p>

        <!-- Main Layout Split -->
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; align-items: flex-start; text-align: left;">
            
            <!-- Canvas Container -->
            <div id="blog-digital-canvas" style="width: 420px; height: 320px; border-radius: 12px; overflow: hidden; border: 1px solid var(--news-border); position: relative; background: #07090e;"></div>

            <!-- Controls Panel -->
            <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 1rem; padding: 0.5rem;">
                
                <!-- Color Select -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <span style="font-weight: bold; font-size: 0.85rem;">Glow Color Theme:</span>
                    <select id="blogDigColor" style="width: 100%; padding: 0.25rem; font-family: 'Playfair Display', serif; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-weight: bold; font-size: 0.9rem; height: 1.8rem; outline: none; cursor: pointer;">
                        <option value="cyan" selected>Neon Cyan (Toxic Grid)</option>
                        <option value="lime">Toxic Lime (Matrix)</option>
                        <option value="pink">Hot Fuchsia (Cyberpunk)</option>
                        <option value="amber">Amber Gold (Vintage LED)</option>
                        <option value="purple">Quantum Purple (Dark Space)</option>
                    </select>
                </div>

                <!-- Format Select -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <span style="font-weight: bold; font-size: 0.85rem;">Time Format:</span>
                    <select id="blogDigFormat" style="width: 100%; padding: 0.25rem; font-family: 'Playfair Display', serif; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-weight: bold; font-size: 0.9rem; height: 1.8rem; outline: none; cursor: pointer;">
                        <option value="12h" selected>12-Hour (AM / PM)</option>
                        <option value="24h">24-Hour (Military)</option>
                    </select>
                </div>

                <!-- Speed Slider -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                        <span>Time Multiplier:</span>
                        <span id="blogDigSpeedVal" style="color: var(--primary-color);">1x</span>
                    </div>
                    <input type="range" id="blogDigSpeed" min="1" max="500" step="5" value="1" style="width: 100%;">
                </div>

                <!-- Glow Slider -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                        <span>Neon Glow Blur:</span>
                        <span id="blogDigGlowVal" style="color: var(--primary-color);">20px</span>
                    </div>
                    <input type="range" id="blogDigGlow" min="0" max="30" step="2" value="20" style="width: 100%;">
                </div>

                <div style="font-size: 0.8rem; font-family: 'Courier Prime', monospace; background: rgba(0,0,0,0.05); padding: 0.5rem; border-radius: 4px; border: 1px dashed var(--news-border); margin-top: 0.5rem; text-align: center;">
                    <span id="blogDigStatus">Time: --:--:--</span>
                </div>
            </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--news-muted); margin-top: 1.5rem; text-indent: 0; text-align: center;">
            Explore the codebase and run standalone project builds via: 
            <a href="https://github.com/shubhamkrshandilya/clock-seven-segment" target="_blank" rel="noopener noreferrer" style="font-weight: bold; color: var(--primary-color);">shubhamkrshandilya/clock-seven-segment</a>
        </p>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
const blogDigitalSketch = (p) => {
    let currentFormat = '12h';
    let customTime = 0;
    let numberSegments = [];
    
    let colorSelect, formatSelect, speedSlider, glowSlider;
    
    let activeColor = '#06b6d4';
    let glowColorStr = 'rgba(6, 182, 212, 0.7)';
    let inactiveColor = 'rgba(255, 255, 255, 0.03)';
    let waveOffset = 0;
    
    let canvasW = 420;
    let canvasH = 320;
    
    p.setup = () => {
        p.createCanvas(canvasW, canvasH);
        
        colorSelect = document.getElementById('blogDigColor');
        formatSelect = document.getElementById('blogDigFormat');
        speedSlider = document.getElementById('blogDigSpeed');
        glowSlider = document.getElementById('blogDigGlow');
        
        if (colorSelect) {
            colorSelect.addEventListener('change', function() {
                updateGlowColor(this.value);
            });
        }
        if (formatSelect) {
            formatSelect.addEventListener('change', function() {
                currentFormat = this.value;
            });
        }
        
        customTime = Date.now();
        initializeBitmasks();
        updateGlowColor('cyan');
    };
    
    p.draw = () => {
        p.background('#07090e');
        drawHudGrid();
        
        let dt = p.deltaTime;
        let speedMult = speedSlider ? parseFloat(speedSlider.value) : 1;
        const speedText = document.getElementById('blogDigSpeedVal');
        if (speedText) speedText.textContent = speedMult + "x";
        
        customTime += dt * speedMult;
        
        let timeObj = new Date(customTime);
        let ms = timeObj.getMilliseconds();
        let sec = timeObj.getSeconds();
        let min = timeObj.getMinutes();
        let hr = timeObj.getHours();
        
        let displayHr = hr;
        let isPm = hr >= 12;
        if (currentFormat === '12h') {
            displayHr = hr % 12;
            if (displayHr === 0) displayHr = 12;
        }
        
        let hrStr = ("0" + displayHr).slice(-2);
        let minStr = ("0" + min).slice(-2);
        let secStr = ("0" + sec).slice(-2);
        
        let glow = glowSlider ? parseFloat(glowSlider.value) : 20;
        const glowText = document.getElementById('blogDigGlowVal');
        if (glowText) glowText.textContent = glow + "px";
        
        let thickness = 8;
        
        let xStart = 20;
        let yStart = canvasH / 2 - 45;
        let digitScale = 42;
        let spacing = 52;
        
        draw7SegmentDigit(xStart, yStart, hrStr[0], digitScale, thickness, glow);
        draw7SegmentDigit(xStart + spacing, yStart, hrStr[1], digitScale, thickness, glow);
        drawBlinkingColon(xStart + spacing * 2 + 8, yStart, sec, ms, glow);
        
        let xMin = xStart + spacing * 2 + 24;
        draw7SegmentDigit(xMin, yStart, minStr[0], digitScale, thickness, glow);
        draw7SegmentDigit(xMin + spacing, yStart, minStr[1], digitScale, thickness, glow);
        drawBlinkingColon(xMin + spacing * 2 + 8, yStart, sec, ms, glow);
        
        let xSec = xMin + spacing * 2 + 24;
        draw7SegmentDigit(xSec, yStart, secStr[0], digitScale, thickness, glow);
        draw7SegmentDigit(xSec + spacing, yStart, secStr[1], digitScale, thickness, glow);
        
        if (currentFormat === '12h') {
            drawAmPmIndicators(xSec + spacing * 2 + 10, yStart, isPm, thickness, glow);
        }
        
        drawCalendarStrip(timeObj);
        updateHUD(timeObj);
    };
    
    function updateGlowColor(val) {
        if (val === 'cyan') {
            activeColor = '#06b6d4';
            glowColorStr = 'rgba(6, 182, 212, 0.7)';
        } else if (val === 'lime') {
            activeColor = '#10b981';
            glowColorStr = 'rgba(16, 185, 129, 0.7)';
        } else if (val === 'pink') {
            activeColor = '#ec4899';
            glowColorStr = 'rgba(236, 72, 153, 0.7)';
        } else if (val === 'amber') {
            activeColor = '#f59e0b';
            glowColorStr = 'rgba(245, 158, 11, 0.7)';
        } else if (val === 'purple') {
            activeColor = '#8b5cf6';
            glowColorStr = 'rgba(139, 92, 246, 0.7)';
        }
    }
    
    function draw7SegmentDigit(x, y, digitChar, scaleSize, thickness, glow) {
        let digit = parseInt(digitChar);
        if (isNaN(digit)) digit = 0;
        let mask = numberSegments[digit];
        let hLen = scaleSize;
        let vLen = scaleSize;
        let offset = thickness / 2;
        
        drawBevelSegment(x + offset, y, hLen, thickness, true, mask[0], glow);
        drawBevelSegment(x + hLen + offset, y + offset, vLen, thickness, false, mask[1], glow);
        drawBevelSegment(x + hLen + offset, y + vLen + offset * 2, vLen, thickness, false, mask[2], glow);
        drawBevelSegment(x + offset, y + vLen * 2 + offset * 2, hLen, thickness, true, mask[3], glow);
        drawBevelSegment(x - offset, y + vLen + offset * 2, vLen, thickness, false, mask[4], glow);
        drawBevelSegment(x - offset, y + offset, vLen, thickness, false, mask[5], glow);
        drawBevelSegment(x + offset, y + vLen + offset, hLen, thickness, true, mask[6], glow);
    }
    
    function drawBevelSegment(x, y, len, thickness, isHorizontal, isActive, glow) {
        p.push();
        if (isActive) {
            p.fill(activeColor);
            p.drawingContext.shadowBlur = glow;
            p.drawingContext.shadowColor = glowColorStr;
        } else {
            p.fill(inactiveColor);
            p.drawingContext.shadowBlur = 0;
        }
        p.noStroke();
        p.beginShape();
        if (isHorizontal) {
            p.vertex(x + thickness / 2, y);
            p.vertex(x + len - thickness / 2, y);
            p.vertex(x + len, y + thickness / 2);
            p.vertex(x + len - thickness / 2, y + thickness);
            p.vertex(x + thickness / 2, y + thickness);
            p.vertex(x, y + thickness / 2);
        } else {
            p.vertex(x + thickness / 2, y);
            p.vertex(x + thickness, y + thickness / 2);
            p.vertex(x + thickness, y + len - thickness / 2);
            p.vertex(x + thickness / 2, y + len);
            p.vertex(x, y + len - thickness / 2);
            p.vertex(x, y + thickness / 2);
        }
        p.endShape(p.CLOSE);
        p.pop();
    }
    
    function drawBlinkingColon(x, y, sec, ms, glow) {
        p.push();
        let isLit = Math.floor(ms / 250) % 2 === 0;
        if (isLit) {
            p.fill(activeColor);
            p.drawingContext.shadowBlur = glow;
            p.drawingContext.shadowColor = glowColorStr;
        } else {
            p.fill(inactiveColor);
            p.drawingContext.shadowBlur = 0;
        }
        p.noStroke();
        p.ellipse(x, y + 25, 6, 6);
        p.ellipse(x, y + 65, 6, 6);
        p.pop();
    }
    
    function drawAmPmIndicators(x, y, isPm, thickness, glow) {
        p.push();
        p.noStroke();
        
        if (!isPm) {
            p.fill(activeColor);
            p.drawingContext.shadowBlur = glow;
            p.drawingContext.shadowColor = glowColorStr;
        } else {
            p.fill(inactiveColor);
            p.drawingContext.shadowBlur = 0;
        }
        p.rect(x, y + 5, 16, 8, 2);
        
        if (isPm) {
            p.fill(activeColor);
            p.drawingContext.shadowBlur = glow;
            p.drawingContext.shadowColor = glowColorStr;
        } else {
            p.fill(inactiveColor);
            p.drawingContext.shadowBlur = 0;
        }
        p.rect(x, y + 25, 16, 8, 2);
        p.pop();
    }
    
    function drawCalendarStrip(timeObj) {
        let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let dateString = days[timeObj.getDay()] + "  |  " + months[timeObj.getMonth()] + " " + ("0" + timeObj.getDate()).slice(-2) + ", " + timeObj.getFullYear();
        
        p.push();
        p.stroke('rgba(255,255,255,0.03)');
        p.strokeWeight(1);
        p.fill('rgba(255, 255, 255, 0.01)');
        p.rect(15, canvasH - 65, canvasW - 30, 32, 4);
        
        p.noStroke();
        p.fill(activeColor);
        p.drawingContext.shadowBlur = 8;
        p.drawingContext.shadowColor = glowColorStr;
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(10);
        p.textFont('Courier New');
        p.text(dateString, canvasW / 2, canvasH - 49);
        p.pop();
    }
    
    function drawHudGrid() {
        p.stroke('rgba(255, 255, 255, 0.01)');
        p.strokeWeight(1);
        for (let x = 0; x < canvasW; x += 20) {
            p.line(x, 0, x, canvasH);
        }
        for (let y = 0; y < canvasH; y += 20) {
            p.line(0, y, canvasW, y);
        }
        p.push();
        p.noFill();
        let c = p.color(activeColor);
        c.setAlpha(25);
        p.stroke(c);
        p.strokeWeight(1);
        p.beginShape();
        waveOffset += 0.05;
        for (let x = 0; x < canvasW; x += 10) {
            p.vertex(x, canvasH - 8 + p.sin(x * 0.03 + waveOffset) * 6);
        }
        p.endShape();
        p.pop();
    }
    
    function initializeBitmasks() {
        numberSegments = [
            [true, true, true, true, true, true, false],   // 0
            [false, true, true, false, false, false, false], // 1
            [true, true, false, true, true, false, true],   // 2
            [true, true, true, true, false, false, true],   // 3
            [false, true, true, false, false, true, true],  // 4
            [true, false, true, true, false, true, true],   // 5
            [true, false, true, true, true, true, true],    // 6
            [true, true, true, false, false, false, false], // 7
            [true, true, true, true, true, true, true],    // 8
            [true, true, true, true, false, true, true]     // 9
        ];
    }
    
    function updateHUD(timeObj) {
        const stats = document.getElementById('blogDigStatus');
        if (stats) {
            let pad = (num) => p.nf(num, 2);
            stats.textContent = `Time: ${pad(timeObj.getHours())}:${pad(timeObj.getMinutes())}:${pad(timeObj.getSeconds())}`;
        }
    }
};

new p5(blogDigitalSketch, 'blog-digital-canvas');
</script>
