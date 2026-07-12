---
layout: newspaper
title: "Sub-Space Signals: Fourier Wave Synthesis"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Mathematics Series"
section: "Trigonometry Branch"
division: "Applied Mathematics"
author: "Shubham Kumar"
volume: "I"
issue: "9"
date: 2026-07-12 08:00:00 +0530
tags: [Math, Fourier Series, Trigonometry, Waves, p5.js, Education]
weather: "High frequency harmonics interfering with sub-space comms"
ticker_index: "Fourier sum: sin((2n-1)x)/(2n-1) for square wave | Series approximation"
price: "10 Credits"
---

Sub-space transmitters operating at the edge of the galaxy communicate by sending electromagnetic pulses across lightyears. To pierce through intense cosmic dust interference, these transmitters must send flat, crisp square wave pulses. However, physical antennas can only generate smooth, undulating sine waves. 

To bridge this barrier, engineers rely on one of the most stunning mathematical insights ever conceived: **Fourier's Theorem**. 

Fourier proved that any periodic wave, no matter how complex or sharp-edged (like a square, triangle, or sawtooth wave), can be built by summing up an infinite series of basic, smooth sine waves of increasing frequencies and decreasing amplitudes.

<div class="newspaper-clipping">
    <h3>The Signal Dictionary</h3>
    <ul>
        <li><strong>Sine Wave</strong>: A smooth, periodic mathematical curve representing a single frequency.</li>
        <li><strong>Fourier Series</strong>: An expansion of a periodic function into a sum of sines and cosines.</li>
        <li><strong>Harmonics</strong>: Integer multiples of a fundamental frequency.</li>
        <li><strong>Gibbs Phenomenon</strong>: The ringing overshoot that occurs when approximating sharp jumps (discontinuities) with a finite sum.</li>
    </ul>
</div>

## The Trigonometric Sum

Suppose we want to synthesize a square wave of amplitude A and frequency f. A square wave flips instantly between +A and -A, producing a sharp vertical wall. 

Fourier proved that we can construct this shape by starting with a fundamental sine wave at frequency f, and then adding only **odd harmonics** (3f, 5f, 7f, ...) with scaling amplitudes:

Square(t) = (4/π) · [ sin(ωt) + (1/3)·sin(3ωt) + (1/5)·sin(5ωt) + (1/7)·sin(7ωt) + ... ]

```
  Wave Component Frequencies:
  1st Term:  ~ sin(x)         (Fundamental)
  3rd Term:  ~ (1/3)*sin(3x)  (Adds steepness)
  5th Term:  ~ (1/5)*sin(5x)  (Flattens the peak)
```

As we sum more terms (harmonics), the vertical edges of our approximation steepen and the peaks flatten, closer approaching a perfect square wave.

---

## Sawtooth and Triangle Series

By changing the amplitude scales and harmonic terms, we can synthesize other periodic shapes:

### 1. Sawtooth Wave (Linear Ramp)
Contains both odd and even harmonics, summing all frequencies with alternating signs:
Sawtooth(t) = (2/π) · [ sin(ωt) - (1/2)·sin(2ωt) + (1/3)·sin(3ωt) - (1/4)·sin(4ωt) + ... ]

### 2. Triangle Wave (Symmetric Slopes)
Contains only odd harmonics, but the amplitudes decrease much faster (1/n²), leading to rapid convergence with very few terms:
Triangle(t) = (8/π²) · [ sin(ωt) - (1/9)·sin(3ωt) + (1/25)·sin(5ωt) - (1/49)·sin(7ωt) + ... ]

---

<!-- Dynamic p5.js Interactive Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.01); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase;">Fourier Wave Synthesis Sandbox</h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Select a target signal waveform and adjust the number of harmonics (N). Watch rotating vector epicycles sum sine waves to build the signal.
        </p>

        <!-- Canvas Container -->
        <div id="fourier-canvas-container" style="width: 100%; height: 360px; border-radius: 12px; overflow: hidden; border: 1px solid var(--news-border); margin-bottom: 1.5rem; position: relative;"></div>

        <!-- Controls HUD -->
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px; margin: 0 auto; padding: 0.5rem;">
            <!-- Selects & Sliders -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1.5rem; width: 100%;">
                <!-- Wave Select -->
                <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem;">
                    <span style="font-weight: bold; font-size: 0.9rem;">Target Waveform:</span>
                    <select id="waveTypeSelect" style="width: 100%; padding: 0.25rem; font-family: 'Playfair Display', serif; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-weight: bold; font-size: 0.9rem; height: 1.8rem; outline: none; cursor: pointer;">
                        <option value="square" selected>Square Wave</option>
                        <option value="sawtooth">Sawtooth Wave</option>
                        <option value="triangle">Triangle Wave</option>
                    </select>
                </div>

                <!-- Number of Terms N -->
                <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem;">
                    <div style="width: 100%; display: flex; justify-content: space-between; font-weight: bold; font-size: 0.9rem;">
                        <span>Harmonic Terms (N):</span>
                        <span id="nVal" style="color: var(--primary-color);">4 Terms</span>
                    </div>
                    <input type="range" id="nSlider" min="1" max="15" step="1" value="4" style="width: 100%;" oninput="document.getElementById('nVal').textContent = this.value + (this.value == 1 ? ' Term' : ' Terms')">
                </div>
            </div>
            
            <!-- Telemetry Output -->
            <div id="fourierResultText" style="font-style: italic; font-size: 0.95rem; text-align: center; font-weight: bold; color: var(--news-muted); min-height: 1.5rem; margin-top: 0.5rem;">
                Adding harmonic terms builds sharper wave peaks.
            </div>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
const fourierSketch = (p) => {
    let waveTypeSelect, nSlider;
    
    let timeAngle = 0;
    let waveHistory = [];
    
    let primaryColor = '#d4a574';
    let textDark = '#1c1a17';
    let textMuted = '#5c5246';
    let bgCard = '#f4edd8';
    
    let epicycleX = 180;
    let waveStartX = 340;
    
    p.setup = () => {
        console.log("p5 setup starting (fourier)");
        const container = document.getElementById('fourier-canvas-container');
        const w = container ? (container.clientWidth || 750) : 750;
        const h = container ? (container.clientHeight || 360) : 360;
        p.createCanvas(w, h);
        
        updateThemeColors();
        
        waveTypeSelect = document.getElementById('waveTypeSelect');
        nSlider = document.getElementById('nSlider');
        
        if (waveTypeSelect) {
            waveTypeSelect.addEventListener('change', () => {
                waveHistory = []; // Reset history on wave change
            });
        }
    };
    
    p.draw = () => {
        updateThemeColors();
        p.background(bgCard);
        
        let type = waveTypeSelect ? waveTypeSelect.value : 'square';
        let nTerms = nSlider ? parseInt(nSlider.value) : 4;
        
        // Draw baseline center divider
        p.stroke(textMuted);
        p.strokeWeight(0.5);
        p.line(0, p.height / 2, p.width, p.height / 2);
        
        let cx = epicycleX;
        let cy = p.height / 2;
        
        let prevX = cx;
        let prevY = cy;
        
        p.noFill();
        
        // Draw epicycles
        for (let i = 0; i < nTerms; i++) {
            let r = 0;
            let freq = 0;
            let phase = 0;
            
            if (type === 'square') {
                let n = 2 * i + 1; // odd harmonics
                r = 65 * (4 / p.PI) * (1 / n);
                freq = n;
                phase = timeAngle * freq;
            } else if (type === 'sawtooth') {
                let n = i + 1; // all harmonics
                r = 55 * (2 / p.PI) * (p.pow(-1, n) / n);
                freq = n;
                phase = timeAngle * freq;
            } else if (type === 'triangle') {
                let n = 2 * i + 1; // odd harmonics
                r = 75 * (8 / (p.PI * p.PI)) * (p.pow(-1, i) / (n * n));
                freq = n;
                phase = timeAngle * freq;
            }
            
            let nextX = prevX + r * p.cos(phase);
            let nextY = prevY + r * p.sin(phase);
            
            // Draw circle outline
            p.stroke(textMuted);
            p.strokeWeight(0.5);
            p.ellipse(prevX, prevY, r * 2);
            
            // Draw circle radius line
            p.stroke(textDark);
            p.strokeWeight(1.2);
            p.line(prevX, prevY, nextX, nextY);
            
            prevX = nextX;
            prevY = nextY;
        }
        
        // Save the generated wave trace height
        waveHistory.unshift(prevY - cy);
        if (waveHistory.length > p.width - waveStartX) {
            waveHistory.pop();
        }
        
        // Draw connecting vector line to the scrolling wave start
        p.stroke('#dd6b20');
        p.strokeWeight(1.5);
        p.line(prevX, prevY, waveStartX, cy + waveHistory[0]);
        
        // Draw tip dot
        p.fill('#dd6b20');
        p.noStroke();
        p.ellipse(prevX, prevY, 6, 6);
        
        // Draw scrolling wave trace
        p.noFill();
        p.stroke(primaryColor);
        p.strokeWeight(2.5);
        p.beginShape();
        for (let j = 0; j < waveHistory.length; j++) {
            p.vertex(waveStartX + j, cy + waveHistory[j]);
        }
        p.endShape();
        
        timeAngle -= 0.035; // increment time angle
        
        updateHUD(type, nTerms);
    };
    
    function updateHUD(type, nTerms) {
        const hud = document.getElementById('fourierResultText');
        if (hud) {
            let formula = "";
            if (type === 'square') {
                formula = "Fourier terms: only odd harmonics (n = 1, 3, 5, ...) with amplitude ∝ 1/n";
            } else if (type === 'sawtooth') {
                formula = "Fourier terms: all harmonics (n = 1, 2, 3, ...) with amplitude ∝ (-1)ⁿ/n";
            } else if (type === 'triangle') {
                formula = "Fourier terms: only odd harmonics (n = 1, 3, 5, ...) with amplitude ∝ (-1)ⁱ/n² (Rapid convergence)";
            }
            hud.innerHTML = `
                Waveform: <strong>${type.toUpperCase()}</strong> | 
                Harmonics Summed: <span style="color: var(--primary-color);">${nTerms}</span> <br>
                <span style="font-size: 0.85rem; color: var(--news-muted);">${formula}</span>
            `;
        }
    }
    
    function updateThemeColors() {
        const styles = getComputedStyle(document.body);
        primaryColor = styles.getPropertyValue('--primary-color').trim() || '#d4a574';
        textDark = styles.getPropertyValue('--news-ink').trim() || '#1c1a17';
        textMuted = styles.getPropertyValue('--news-muted').trim() || '#5c5246';
        bgCard = styles.getPropertyValue('--news-bg').trim() || '#f4edd8';
    }
};

new p5(fourierSketch, 'fourier-canvas-container');
</script>
