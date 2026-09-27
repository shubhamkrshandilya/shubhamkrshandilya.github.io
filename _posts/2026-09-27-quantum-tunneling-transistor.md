---
layout: newspaper
title: "Quantum Mechanics: Barrier Tunneling & Sub-Nanometer Transistors"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Physics Series"
section: "Quantum Branch"
division: "Quantum Physics & Electronics"
author: "Shubham Kumar"
volume: "I"
issue: "17"
date: 2026-09-27 14:00:00 +0530
tags: [Quantum Mechanics, Physics, Semiconductors, p5.js, Creative Coding, Education]
weather: "Schrödinger probability wavepacket penetrating 2nm dielectric barrier"
ticker_index: "Transmission: T = [1 + V₀² sinh²(κL) / (4E(V₀-E))]⁻¹ | Decay constant: κ = √(2m(V₀-E))/ℏ | Gate leakage"
price: "10 Credits"
---

For over half a century, the semiconductor industry has obeyed Gordon Moore's famous empirical prediction: the number of transistors packed onto a microchip doubles roughly every two years. Today's commercial fabrication facilities etch gates measuring less than **3 nanometers** across—a distance spanning merely a dozen silicon atoms.

However, at these atomic dimensions, the classical Newtonian paradigm of electricity ceases to operate. 

Engineers face a strange and inescapable physical phenomenon: **Quantum Tunneling**. If a potential barrier is thin enough, an electron with insufficient kinetic energy to cross the barrier does not bounce back as a classical billiard ball would. Instead, its probability wave leaks through the forbidden zone and materializes on the opposite side, creating parasitic gate leakage currents that threaten the future of silicon computing.

<div class="newspaper-clipping">
    <h3>The Quantum Dictionary</h3>
    <ul>
        <li><strong>Wave Function ($\psi$)</strong>: A complex-valued mathematical description of the quantum state of a particle. Its squared magnitude $|\psi(x)|^2$ represents probability density.</li>
        <li><strong>Potential Barrier ($V_0$)</strong>: A localized region of electrostatic potential energy opposing the motion of charged particles.</li>
        <li><strong>Evanescent Wave</strong>: An exponentially decaying, non-propagating wave mode that penetrates into a classically forbidden energetic zone.</li>
        <li><strong>Transmission Coefficient ($T$)</strong>: The probability that an incident particle will successfully traverse and emerge beyond a potential barrier.</li>
    </ul>
</div>

---

## 1. Classical Billiards vs. Quantum Probability

Imagine throwing a tennis ball against a brick wall. If the ball has kinetic energy $E$ and the wall requires energy $V_0$ to summit, classical mechanics provides an unambiguous outcome:

$$\begin{cases}
E < V_0 \implies \text{Ball bounces backward with 100\% certainty } (R = 1, T = 0) \\
E \ge V_0 \implies \text{Ball flies over the wall } (R = 0, T = 1)
\end{cases}$$

In the subatomic domain, however, Louis de Broglie showed that particles possess a dual wave nature with wavelength $\lambda = h/p$. An electron is not a localized hard sphere, but a **wave packet** governed by the **Time-Independent Schrödinger Equation**:

$$-\frac{\hbar^2}{2m} \frac{d^2\psi(x)}{dx^2} + V(x)\psi(x) = E\psi(x)$$

Where $\hbar = \frac{h}{2\pi}$ is the reduced Planck constant, $m$ is electron effective mass, and $V(x)$ is the potential energy profile:

$$V(x) = \begin{cases} 0 & x < 0 \quad (\text{Region I}) \\ V_0 & 0 \le x \le L \quad (\text{Region II: Barrier}) \\ 0 & x > L \quad (\text{Region III}) \end{cases}$$

---

## 2. The Mathematics of Evanescent Decay

Let an electron wave packet of energy $E < V_0$ arrive from the left ($x < 0$).

### Region I ($x < 0$, Incoming & Reflected Waves)
Because $V(x) = 0$, the wave number is purely real: $k_1 = \frac{\sqrt{2mE}}{\hbar}$.
$$\psi_I(x) = A e^{i k_1 x} + B e^{-i k_1 x}$$

### Region II ($0 \le x \le L$, Inside the Barrier)
Rearranging Schrödinger's equation inside the barrier where $E < V_0$:
$$\frac{d^2\psi_{II}(x)}{dx^2} = \frac{2m(V_0 - E)}{\hbar^2} \psi_{II}(x) = \kappa^2 \psi_{II}(x)$$

Where $\kappa$ is the **decay constant**:
$$\kappa = \frac{\sqrt{2m(V_0 - E)}}{\hbar}$$

Because $\kappa^2 > 0$, the solution does not oscillate with sines or cosines. Instead, it becomes an **evanescent exponential decay**:
$$\psi_{II}(x) = C e^{-\kappa x} + D e^{\kappa x}$$

Even though the probability density drops exponentially with distance, if the barrier thickness $L$ is sufficiently small ($\sim 1\text{ to }3\text{ nm}$), $\psi_{II}(L)$ remains distinctly non-zero at the exit face!

### Region III ($x > L$, Transmitted Wave)
$$\psi_{III}(x) = F e^{i k_1 x}$$

Matching the boundary conditions (demanding that both $\psi(x)$ and its derivative $\frac{d\psi}{dx}$ be continuous at $x = 0$ and $x = L$) yields the exact analytical **Transmission Coefficient ($T$)**:

$$T = \frac{|\psi_{\text{transmitted}}|^2}{|\psi_{\text{incident}}|^2} = \left[ 1 + \frac{V_0^2 \sinh^2(\kappa L)}{4E(V_0 - E)} \right]^{-1}$$

For macroscopic barriers ($\kappa L \gg 1$), $\sinh(\kappa L) \approx \frac{1}{2}e^{\kappa L}$, simplifying to the exponential tunneling rule:

$$T \approx 16 \frac{E}{V_0}\left(1 - \frac{E}{V_0}\right) \exp(-2\kappa L)$$

```
  Incident Wave Ψ(x)          Decaying Tail (e^-κx)        Transmitted Wave (T)
     /\    /\    /\               \
    /  \  /  \  /  \               \                  /\    /\
   /    \/    \/    \               \_______         /  \  /  \
 --------------------|=======================|----------------------
      Region I (x<0) |  Barrier (0 < x < L)  |   Region III (x>L)
```

---

<!-- Dynamic p5.js Interactive Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.02); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">
            Quantum Tunneling & Semiconductor Barrier Laboratory
        </h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Toggle between Classical particle bounce and Quantum wave packet tunneling. Adjust barrier thickness and energy to observe evanescent wave leakage.
        </p>

        <!-- Canvas Container -->
        <div id="quantum-canvas-container" style="width: 100%; height: 420px; border-radius: 8px; overflow: hidden; border: 1px solid var(--news-border); margin-bottom: 1.5rem; position: relative; background: #06090e;"></div>

        <!-- Interactive Controls HUD -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 820px; margin: 0 auto; padding: 0.5rem; text-align: left;">
            
            <!-- Sliders Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem;">
                
                <!-- Simulation Mode -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <span style="font-weight: bold; font-size: 0.88rem;">Physical Regime:</span>
                    <select id="qt-mode-select" style="width: 100%; padding: 0.35rem; font-family: 'Playfair Display', serif; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-weight: bold; font-size: 0.9rem; outline: none; cursor: pointer;">
                        <option value="quantum" selected>Quantum Wave Packet (Tunneling)</option>
                        <option value="classical">Classical Particle (Hard Collision)</option>
                    </select>
                </div>

                <!-- Electron Energy E -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Electron Energy (E):</span>
                        <span id="qt-e-val" style="color: var(--primary-color);">2.20 eV</span>
                    </div>
                    <input type="range" id="qt-e-slider" min="0.5" max="4.5" step="0.05" value="2.20" style="width: 100%;">
                </div>

                <!-- Barrier Height V0 -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Barrier Height (V₀):</span>
                        <span id="qt-v0-val" style="color: #e53e3e;">3.00 eV</span>
                    </div>
                    <input type="range" id="qt-v0-slider" min="1.0" max="5.0" step="0.1" value="3.00" style="width: 100%;">
                </div>

                <!-- Barrier Width L -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Barrier Thickness (L):</span>
                        <span id="qt-l-val" style="color: #805ad5;">2.0 nm</span>
                    </div>
                    <input type="range" id="qt-l-slider" min="0.5" max="4.0" step="0.1" value="2.0" style="width: 100%;">
                </div>
            </div>

            <!-- Action Buttons & Telemetry Bar -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; border-top: 1px dashed var(--news-border); padding-top: 1rem;">
                
                <div style="display: flex; gap: 0.75rem;">
                    <button id="qt-fire-btn" style="padding: 0.5rem 1.25rem; font-family: 'Playfair Display', serif; font-weight: bold; background: var(--news-ink); color: var(--news-bg); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                        ⚡ Fire Wavepacket
                    </button>
                    <button id="qt-reset-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Reset
                    </button>
                </div>

                <!-- Telemetry Badges -->
                <div style="display: flex; flex-wrap: wrap; gap: 0.85rem; font-family: 'Courier Prime', monospace; font-size: 0.82rem;">
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Transmission (T): </span><strong id="qt-tel-t" style="color: #48bb78;">14.2%</strong>
                    </div>
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Reflection (R): </span><strong id="qt-tel-r" style="color: #ed8936;">85.8%</strong>
                    </div>
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Decay Depth (κ⁻¹): </span><strong id="qt-tel-decay" style="color: #3182ce;">0.31 nm</strong>
                    </div>
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Gate Leakage: </span><strong id="qt-tel-leak" style="color: #e53e3e;">Active</strong>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

---

## 3. Real-World Engineering Applications

* **Sub-3nm Transistor Leakage**: In modern CPU microarchitectures, gate oxides (like Hafnium Dioxide) are engineered with high dielectric constants ($\kappa$) specifically to widen the physical barrier thickness without sacrificing capacitance, suppressing quantum leakage.
* **Flash Memory & EEPROMs**: Solid-state drives write and erase data by purposely applying an electric field to induce **Fowler-Nordheim Tunneling**, pushing electrons through an insulating oxide into a floating gate where they remain trapped for years.
* **Scanning Tunneling Microscopy (STM)**: By positioning a sharp metallic tip fractions of a nanometer from a conductive surface and measuring the resulting tunneling current, physicists can map individual atoms on atomic crystal lattices.

<!-- p5.js CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>

<script>
const quantumSketch = (p) => {
    let mode = 'quantum';
    let E = 2.20;
    let V0 = 3.00;
    let L = 2.0;

    let isFlying = false;
    let animTime = 0.0;
    let animSpeed = 0.07;

    let barrierStartX, barrierEndX;
    let electron = { x: 50, y: 0, vx: 0, bounced: false };

    const sigma = 35;
    let transmission = 0.142;
    let reflection = 0.858;
    let decayLen = 0.31;

    p.setup = () => {
        const container = document.getElementById('quantum-canvas-container');
        const w = container ? container.clientWidth : 800;
        const h = container ? container.clientHeight : 420;
        const canvas = p.createCanvas(w, h);
        canvas.parent('quantum-canvas-container');

        // UI Linkages
        const modeSelect = document.getElementById('qt-mode-select');
        if (modeSelect) {
            modeSelect.addEventListener('change', (e) => {
                mode = e.target.value;
                resetSimulation();
            });
        }

        const eSlider = document.getElementById('qt-e-slider');
        if (eSlider) {
            eSlider.addEventListener('input', (e) => {
                E = parseFloat(e.target.value);
                document.getElementById('qt-e-val').textContent = E.toFixed(2) + " eV";
                calculateCoefficients();
            });
        }

        const v0Slider = document.getElementById('qt-v0-slider');
        if (v0Slider) {
            v0Slider.addEventListener('input', (e) => {
                V0 = parseFloat(e.target.value);
                document.getElementById('qt-v0-val').textContent = V0.toFixed(2) + " eV";
                calculateCoefficients();
            });
        }

        const lSlider = document.getElementById('qt-l-slider');
        if (lSlider) {
            lSlider.addEventListener('input', (e) => {
                L = parseFloat(e.target.value);
                document.getElementById('qt-l-val').textContent = L.toFixed(1) + " nm";
                calculateCoefficients();
            });
        }

        const fireBtn = document.getElementById('qt-fire-btn');
        if (fireBtn) {
            fireBtn.addEventListener('click', fireElectron);
        }

        const resetBtn = document.getElementById('qt-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetSimulation);
        }

        calculateCoefficients();
        resetSimulation();
    };

    function calculateCoefficients() {
        if (E >= V0) {
            transmission = 1.0;
            reflection = 0.0;
            decayLen = 99.0;
        } else {
            // κ = sqrt(2m(V0 - E))/hbar in scaled units
            let kappa = p.sqrt(V0 - E) * 2.8;
            decayLen = 1.0 / (kappa || 1);
            let sinhTerm = Math.sinh(kappa * L);
            let denom = 1.0 + (V0 * V0 * sinhTerm * sinhTerm) / (4.0 * E * (V0 - E));
            transmission = 1.0 / denom;
            reflection = 1.0 - transmission;
        }

        const tEl = document.getElementById('qt-tel-t');
        const rEl = document.getElementById('qt-tel-r');
        const dEl = document.getElementById('qt-tel-decay');
        const lkEl = document.getElementById('qt-tel-leak');

        if (tEl) tEl.textContent = (transmission * 100).toFixed(1) + "%";
        if (rEl) rEl.textContent = (reflection * 100).toFixed(1) + "%";
        if (dEl) dEl.textContent = (decayLen * 0.4).toFixed(2) + " nm";
        if (lkEl) {
            if (transmission > 0.05) {
                lkEl.textContent = "High Leakage";
                lkEl.style.color = "#e53e3e";
            } else if (transmission > 0.001) {
                lkEl.textContent = "Marginal Leakage";
                lkEl.style.color = "#ecc94b";
            } else {
                lkEl.textContent = "Insulated";
                lkEl.style.color = "#48bb78";
            }
        }
    }

    p.windowResized = () => {
        const container = document.getElementById('quantum-canvas-container');
        if (container) {
            p.resizeCanvas(container.clientWidth, container.clientHeight);
        }
    };

    p.draw = () => {
        p.background(6, 9, 14);

        let barrierPixelWidth = L * 45;
        barrierStartX = p.width / 2 - barrierPixelWidth / 2;
        barrierEndX = p.width / 2 + barrierPixelWidth / 2;

        // Draw background voltage grid
        drawGrid();

        // Draw potential barrier
        drawBarrier(barrierPixelWidth);

        // Update motion
        if (isFlying) {
            animTime += animSpeed;
        }

        if (mode === 'classical') {
            drawClassicalParticle();
        } else {
            drawQuantumWavePacket();
        }
    };

    function drawGrid() {
        p.stroke(255, 255, 255, 8);
        p.strokeWeight(1);
        for (let x = 0; x < p.width; x += 40) {
            p.line(x, 0, x, p.height);
        }
        for (let y = 0; y < p.height; y += 40) {
            p.line(0, y, p.width, y);
        }

        // Zero baseline
        let baselineY = p.height * 0.72;
        p.stroke(255, 255, 255, 30);
        p.line(0, baselineY, p.width, baselineY);

        p.noStroke();
        p.fill(255, 120);
        p.textSize(10);
        p.textFont("Courier Prime, monospace");
        p.text("POTENTIAL BASELINE (V = 0)", 15, baselineY - 8);
    }

    function drawBarrier(bw) {
        let baselineY = p.height * 0.72;
        let barrierHeightPx = p.map(V0, 0, 5.0, 0, p.height * 0.45);
        let energyHeightPx = p.map(E, 0, 5.0, 0, p.height * 0.45);

        // Draw barrier rectangle
        p.noStroke();
        p.fill(229, 62, 62, 35);
        p.rect(barrierStartX, baselineY - barrierHeightPx, bw, barrierHeightPx);

        p.stroke(229, 62, 62, 140);
        p.strokeWeight(2);
        p.line(barrierStartX, baselineY, barrierStartX, baselineY - barrierHeightPx);
        p.line(barrierStartX, baselineY - barrierHeightPx, barrierEndX, baselineY - barrierHeightPx);
        p.line(barrierEndX, baselineY - barrierHeightPx, barrierEndX, baselineY);

        // Barrier Label
        p.noStroke();
        p.fill(229, 62, 62, 200);
        p.textAlign(p.CENTER, p.BOTTOM);
        p.textSize(11);
        p.textFont("Courier Prime, monospace");
        p.text("BARRIER V₀ = " + V0.toFixed(2) + " eV", (barrierStartX + barrierEndX) / 2, baselineY - barrierHeightPx - 6);

        // Energy line indicator
        p.stroke(49, 130, 206, 120);
        p.strokeWeight(1);
        p.drawingContext.setLineDash([5, 5]);
        p.line(0, baselineY - energyHeightPx, p.width, baselineY - energyHeightPx);
        p.drawingContext.setLineDash([]);

        p.fill(49, 130, 206, 200);
        p.textAlign(p.LEFT, p.BOTTOM);
        p.text("ELECTRON ENERGY E = " + E.toFixed(2) + " eV", 15, baselineY - energyHeightPx - 6);
    }

    function drawClassicalParticle() {
        let baselineY = p.height * 0.72;
        let energyHeightPx = p.map(E, 0, 5.0, 0, p.height * 0.45);
        let cy = baselineY - energyHeightPx;

        if (isFlying) {
            if (!electron.bounced) {
                electron.x += electron.vx;
                if (E < V0 && electron.x >= barrierStartX - 10) {
                    electron.bounced = true;
                    electron.vx = -electron.vx;
                } else if (electron.x >= p.width - 20) {
                    isFlying = false;
                }
            } else {
                electron.x += electron.vx;
                if (electron.x <= 30) {
                    isFlying = false;
                }
            }
        }

        // Draw particle
        p.fill(212, 165, 116);
        p.stroke(255, 235, 200);
        p.strokeWeight(2);
        p.ellipse(electron.x, cy, 18, 18);

        // Particle speed vector
        if (isFlying) {
            p.stroke(212, 165, 116, 180);
            p.line(electron.x, cy, electron.x + electron.vx * 4, cy);
        }
    }

    function drawQuantumWavePacket() {
        let baselineY = p.height * 0.72;
        let energyHeightPx = p.map(E, 0, 5.0, 0, p.height * 0.45);
        let cy = baselineY - energyHeightPx;

        let packetX = 60 + animTime * 120;
        let packetAmp = 38;

        p.noFill();

        // 1. Incident Wave Packet (Left Region)
        if (packetX < barrierStartX + 60) {
            p.stroke(72, 187, 120, 220);
            p.strokeWeight(2.5);
            p.beginShape();
            for (let x = 10; x <= barrierStartX; x += 2) {
                let dist = x - packetX;
                let envelope = p.exp(-(dist * dist) / (2 * sigma * sigma));
                let wave = p.sin(0.35 * x - animTime * 8);
                let y = cy + wave * packetAmp * envelope;
                p.vertex(x, y);
            }
            p.endShape();
        }

        // 2. Wave Packet Split when hitting barrier
        if (packetX >= barrierStartX - 20) {
            let splitTime = animTime - (barrierStartX - 60) / 120;

            // Reflected Wave Packet (traveling left)
            let reflX = barrierStartX - splitTime * 120;
            p.stroke(237, 137, 54, 200);
            p.strokeWeight(2.2);
            p.beginShape();
            for (let x = 10; x <= barrierStartX; x += 2) {
                let dist = x - reflX;
                let envelope = p.exp(-(dist * dist) / (2 * sigma * sigma));
                let wave = p.sin(-0.35 * x - animTime * 8);
                let y = cy + wave * packetAmp * p.sqrt(reflection) * envelope;
                p.vertex(x, y);
            }
            p.endShape();

            // Evanescent Wave Inside Barrier
            p.stroke(128, 90, 213, 220);
            p.strokeWeight(2.2);
            p.beginShape();
            for (let x = barrierStartX; x <= barrierEndX; x += 2) {
                let depth = (x - barrierStartX) / (barrierEndX - barrierStartX);
                let decayFactor = p.exp(-depth * (L / (decayLen * 0.4)));
                let wave = p.sin(animTime * 6);
                let y = cy + wave * packetAmp * decayFactor * 0.8;
                p.vertex(x, y);
            }
            p.endShape();

            // Transmitted Wave Packet (traveling right)
            let transX = barrierEndX + splitTime * 120;
            p.stroke(72, 187, 120, 200);
            p.strokeWeight(2.2);
            p.beginShape();
            for (let x = barrierEndX; x <= p.width - 10; x += 2) {
                let dist = x - transX;
                let envelope = p.exp(-(dist * dist) / (2 * sigma * sigma));
                let wave = p.sin(0.35 * x - animTime * 8);
                let y = cy + wave * packetAmp * p.sqrt(transmission) * envelope;
                p.vertex(x, y);
            }
            p.endShape();
        }
    }

    function fireElectron() {
        isFlying = true;
        animTime = 0.0;
        electron.x = 50;
        electron.vx = p.sqrt(E) * 4.5;
        electron.bounced = false;
    }

    function resetSimulation() {
        isFlying = false;
        animTime = 0.0;
        electron.x = 50;
        electron.vx = 0;
        electron.bounced = false;
    }
};

new p5(quantumSketch, 'quantum-canvas-container');
</script>
