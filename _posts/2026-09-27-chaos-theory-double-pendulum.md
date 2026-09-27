---
layout: newspaper
title: "Chaos Theory: The Double Pendulum & Lagrangian Mechanics"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Mathematics Series"
section: "Chaos Theory Branch"
division: "Dynamical Systems"
author: "Shubham Kumar"
volume: "I"
issue: "16"
date: 2026-09-27 12:00:00 +0530
tags: [Math, Physics, Chaos Theory, Lagrangian Mechanics, p5.js, Education]
weather: "Extreme sensitivity to initial conditions detected in phase space"
ticker_index: "Lagrangian: L = T - V | Euler-Lagrange equations | Lyapunov exponent: Δθ(t) ~ Δθ₀ e^(λt)"
price: "10 Credits"
---

In the eighteenth century, Pierre-Simon Laplace famously posited that if an omniscient intellect knew the precise position and momentum of every particle in the universe, nothing would be uncertain; the future, just like the past, would be calculable with absolute certainty. This philosophy came to be known as **Laplacian determinism**.

Yet, nature holds a humble and devastating counterexample: the **double pendulum**. 

A double pendulum consists merely of one simple pendulum suspended from the bob of another. There is no quantum randomness, no Brownian thermal noise, and no external interference. The system is governed by strictly deterministic classical laws. Yet, release it from almost any high-energy configuration, and its motion rapidly becomes wildly unpredictable, displaying **deterministic chaos**.

<div class="newspaper-clipping">
    <h3>The Chaos Lexicon</h3>
    <ul>
        <li><strong>Lagrangian ($\mathcal{L}$)</strong>: The difference between the total kinetic energy ($T$) and potential energy ($V$) of a dynamic system: $\mathcal{L} = T - V$.</li>
        <li><strong>Generalized Coordinates</strong>: Independent geometric parameters (such as joint angles $\theta_1$ and $\theta_2$) that completely specify the configuration of a constrained mechanical system.</li>
        <li><strong>Deterministic Chaos</strong>: Irregular, non-repeating behavior arising from entirely deterministic mathematical laws without any random stochastic inputs.</li>
        <li><strong>Lyapunov Exponent ($\lambda$)</strong>: A quantitative measure of the rate of exponential separation between infinitesimally close trajectories in phase space.</li>
    </ul>
</div>

---

## 1. Why Newtonian Vectors Fail: Enter Joseph-Louis Lagrange

Attempting to model a double pendulum using Newton's second law ($\mathbf{F} = m\mathbf{a}$) requires tracking Cartesian coordinate vectors ($x_1, y_1, x_2, y_2$) while resolving internal constraint tension forces along the rigid rods. The algebra quickly collapses into an intractable web of constraint vectors.

In 1788, Italian-French mathematician Joseph-Louis Lagrange devised a much more elegant formulation: **Analytical Mechanics**. Instead of computing invisible constraint forces, Lagrange proved that the true trajectory of any system minimizes the action integral:

$$S = \int_{t_1}^{t_2} \mathcal{L}(q_i, \dot{q}_i, t) \, dt$$

The motion of the system is governed by the celebrated **Euler-Lagrange equations**:

$$\frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{\theta}_i}\right) - \frac{\partial \mathcal{L}}{\partial \theta_i} = 0, \quad \text{for } i \in \{1, 2\}$$

---

## 2. Deriving the Equations of Motion

Let the two rods have lengths $L_1, L_2$ and point masses $m_1, m_2$, with angles $\theta_1, \theta_2$ measured from the downward vertical.

```
          (Pivot) (0,0)
             \
              \ L1, θ1
               \
               (m1) [x1, y1]
                 \
                  \ L2, θ2
                   \
                   (m2) [x2, y2]
```

The Cartesian coordinates of the masses are:

$$\begin{aligned}
x_1 &= L_1 \sin\theta_1, & y_1 &= -L_1 \cos\theta_1 \\
x_2 &= L_1 \sin\theta_1 + L_2 \sin\theta_2, & y_2 &= -L_1 \cos\theta_1 - L_2 \cos\theta_2
\end{aligned}$$

The total kinetic energy $T$ is the sum of the kinetic energies of both masses:

$$T = \frac{1}{2}m_1 (\dot{x}_1^2 + \dot{y}_1^2) + \frac{1}{2}m_2 (\dot{x}_2^2 + \dot{y}_2^2)$$

$$T = \frac{1}{2}(m_1 + m_2) L_1^2 \dot{\theta}_1^2 + \frac{1}{2}m_2 L_2^2 \dot{\theta}_2^2 + m_2 L_1 L_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2)$$

The potential energy $V$ relative to the pivot ($y = 0$) is:

$$V = m_1 g y_1 + m_2 g y_2 = -(m_1 + m_2) g L_1 \cos\theta_1 - m_2 g L_2 \cos\theta_2$$

Subtracting $V$ from $T$ gives the Lagrangian $\mathcal{L} = T - V$. Evaluating the Euler-Lagrange derivatives yields a system of two coupled, highly non-linear second-order differential equations for the angular accelerations $\alpha_1 = \ddot{\theta}_1$ and $\alpha_2 = \ddot{\theta}_2$:

$$\ddot{\theta}_1 = \frac{-g(2m_1 + m_2)\sin\theta_1 - m_2 g \sin(\theta_1 - 2\theta_2) - 2\sin(\theta_1 - \theta_2)m_2(L_2 \dot{\theta}_2^2 + L_1 \dot{\theta}_1^2 \cos(\theta_1 - \theta_2))}{L_1 [2m_1 + m_2 - m_2 \cos(2\theta_1 - 2\theta_2)]}$$

$$\ddot{\theta}_2 = \frac{2\sin(\theta_1 - \theta_2)\left[(m_1 + m_2) L_1 \dot{\theta}_1^2 + g(m_1 + m_2)\cos\theta_1 + m_2 L_2 \dot{\theta}_2^2 \cos(\theta_1 - \theta_2)\right]}{L_2 [2m_1 + m_2 - m_2 \cos(2\theta_1 - 2\theta_2)]}$$

Notice the denominators! The denominator contains a terms of the form $(2m_1 + m_2 - m_2 \cos(2\theta_1 - 2\theta_2))$, which pulsates dynamically as the angles sweep past each other, introducing extreme non-linear cross-coupling between the two arms.

---

## 3. The Butterfly Effect & The Lyapunov Exponent

The hallmark of chaos is extreme sensitivity to initial conditions. If we launch two identical double pendulums (Pendulum A in green and Pendulum B in pink) side-by-side with an initial angle offset as tiny as **$0.01^\circ$**, their trajectory separation $\Delta\theta(t)$ grows exponentially:

$$\|\Delta\mathbf{\theta}(t)\| \approx \|\Delta\mathbf{\theta}_0\| \, e^{\lambda t}$$

Where $\lambda > 0$ is the **maximal Lyapunov exponent**. For the first several oscillations, the two pendulums appear perfectly synchronized. But once the exponential term $e^{\lambda t}$ overwhelms the initial microscopic difference, the pink and green trails split catastrophically, tracing completely uncorrelated regions of phase space.

---

<!-- Dynamic p5.js Interactive Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.02); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">
            Dual Double-Pendulum Chaotic Phase Sandbox
        </h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Drag the pendulums with your mouse to set the release angles. Watch how a microscopic offset of 0.01° causes the green and pink trails to violently diverge.
        </p>

        <!-- Canvas Container -->
        <div id="pendulum-canvas-container" style="width: 100%; height: 460px; border-radius: 8px; overflow: hidden; border: 1px solid var(--news-border); margin-bottom: 1.5rem; position: relative; background: #06090e; cursor: grab;"></div>

        <!-- Interactive Controls HUD -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 820px; margin: 0 auto; padding: 0.5rem; text-align: left;">
            
            <!-- Sliders Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem;">
                
                <!-- Arm Length 1 -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Upper Arm (L₁):</span>
                        <span id="dp-l1-val" style="color: var(--primary-color);">115 px</span>
                    </div>
                    <input type="range" id="dp-l1-slider" min="60" max="180" step="5" value="115" style="width: 100%;">
                </div>

                <!-- Arm Length 2 -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Lower Arm (L₂):</span>
                        <span id="dp-l2-val" style="color: var(--primary-color);">115 px</span>
                    </div>
                    <input type="range" id="dp-l2-slider" min="60" max="180" step="5" value="115" style="width: 100%;">
                </div>

                <!-- Gravity Scale -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Gravity (g):</span>
                        <span id="dp-g-val" style="color: var(--primary-color);">9.8 m/s²</span>
                    </div>
                    <input type="range" id="dp-g-slider" min="1.0" max="25.0" step="0.5" value="9.8" style="width: 100%;">
                </div>

                <!-- Initial Divergence Offset -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Divergence Offset (Δθ):</span>
                        <span id="dp-offset-val" style="color: #ed64a6;">0.010°</span>
                    </div>
                    <input type="range" id="dp-offset-slider" min="0.001" max="0.100" step="0.001" value="0.010" style="width: 100%;">
                </div>
            </div>

            <!-- Action Buttons & Telemetry Bar -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; border-top: 1px dashed var(--news-border); padding-top: 1rem;">
                
                <div style="display: flex; gap: 0.75rem;">
                    <button id="dp-reset-btn" style="padding: 0.5rem 1.25rem; font-family: 'Playfair Display', serif; font-weight: bold; background: var(--news-ink); color: var(--news-bg); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                        🔄 Release From 90°
                    </button>
                    <button id="dp-pause-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Pause / Resume
                    </button>
                </div>

                <!-- Telemetry Badges -->
                <div style="display: flex; flex-wrap: wrap; gap: 0.85rem; font-family: 'Courier Prime', monospace; font-size: 0.82rem;">
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Pendulum A: </span><strong style="color: #48bb78;">Green</strong>
                    </div>
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Pendulum B: </span><strong style="color: #ed64a6;">Pink (+Δθ)</strong>
                    </div>
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Tip Separation: </span><strong id="dp-tel-separation" style="color: #ecc94b;">0.0 px</strong>
                    </div>
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>State: </span><strong id="dp-tel-state" style="color: #48bb78;">Simulating</strong>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

---

## 4. Philosophical & Scientific Implications

1. **Determinism ≠ Predictability**: Even when a system is completely deterministic (no randomness in the differential equations), long-term numerical predictability is physically impossible because infinite precision would be required to measure the initial conditions.
2. **Weather Forecasting**: Edward Lorenz discovered the atmospheric attractor while studying coupled convection equations identical in structure to non-linear oscillators. This is the root cause of why weather forecasts cannot reliably predict beyond 10-14 days.
3. **The Topology of Chaos**: Despite the wild unpredictability of the double pendulum, its motion is confined to an energy surface in four-dimensional phase space $(\theta_1, \theta_2, \omega_1, \omega_2)$, sculpting a beautiful, self-similar fractal geometry.

<!-- p5.js CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>

<script>
const doublePendulumSketch = (p) => {
    let L1 = 115;
    let L2 = 115;
    let M1 = 15.0;
    let M2 = 15.0;
    let g = 9.8;
    let divergenceOffset = 0.010;

    let theta1_A = Math.PI / 2;
    let theta2_A = Math.PI / 2;
    let omega1_A = 0.0;
    let omega2_A = 0.0;

    let theta1_B = Math.PI / 2;
    let theta2_B = Math.PI / 2;
    let omega1_B = 0.0;
    let omega2_B = 0.0;

    let trailHistoryA = [];
    let trailHistoryB = [];
    const maxTrailLen = 320;

    let isDraggingBob1 = false;
    let isDraggingBob2 = false;
    let isSimulating = true;

    p.setup = () => {
        const container = document.getElementById('pendulum-canvas-container');
        const w = container ? container.clientWidth : 800;
        const h = container ? container.clientHeight : 460;
        const canvas = p.createCanvas(w, h);
        canvas.parent('pendulum-canvas-container');

        // Link Sliders
        const l1Slider = document.getElementById('dp-l1-slider');
        if (l1Slider) {
            l1Slider.addEventListener('input', (e) => {
                L1 = parseInt(e.target.value);
                document.getElementById('dp-l1-val').textContent = L1 + " px";
                resetSimulation();
            });
        }

        const l2Slider = document.getElementById('dp-l2-slider');
        if (l2Slider) {
            l2Slider.addEventListener('input', (e) => {
                L2 = parseInt(e.target.value);
                document.getElementById('dp-l2-val').textContent = L2 + " px";
                resetSimulation();
            });
        }

        const gSlider = document.getElementById('dp-g-slider');
        if (gSlider) {
            gSlider.addEventListener('input', (e) => {
                g = parseFloat(e.target.value);
                document.getElementById('dp-g-val').textContent = g.toFixed(1) + " m/s²";
            });
        }

        const offsetSlider = document.getElementById('dp-offset-slider');
        if (offsetSlider) {
            offsetSlider.addEventListener('input', (e) => {
                divergenceOffset = parseFloat(e.target.value);
                document.getElementById('dp-offset-val').textContent = divergenceOffset.toFixed(3) + "°";
                resetSimulation();
            });
        }

        const resetBtn = document.getElementById('dp-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                isSimulating = true;
                resetSimulation();
            });
        }

        const pauseBtn = document.getElementById('dp-pause-btn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                isSimulating = !isSimulating;
                const st = document.getElementById('dp-tel-state');
                if (st) {
                    st.textContent = isSimulating ? "Simulating" : "Paused";
                    st.style.color = isSimulating ? "#48bb78" : "#ecc94b";
                }
            });
        }

        resetSimulation();
    };

    p.windowResized = () => {
        const container = document.getElementById('pendulum-canvas-container');
        if (container) {
            p.resizeCanvas(container.clientWidth, container.clientHeight);
        }
    };

    p.draw = () => {
        p.background(6, 9, 14);

        let originX = p.width / 2;
        let originY = p.height / 2.35;

        // Draw blueprint polar guide lines
        drawBlueprintGrid(originX, originY);

        // Run sub-stepped numerical integration
        if (isSimulating && !isDraggingBob1 && !isDraggingBob2) {
            let substeps = 5;
            let dt = 0.045;
            for (let i = 0; i < substeps; i++) {
                solvePhysicsSubstep(dt);
            }
        }

        // Compute Bob coordinates for Pendulum A (Green)
        let x1_A = originX + L1 * p.sin(theta1_A);
        let y1_A = originY + L1 * p.cos(theta1_A);
        let x2_A = x1_A + L2 * p.sin(theta2_A);
        let y2_A = y1_A + L2 * p.cos(theta2_A);

        // Compute Bob coordinates for Pendulum B (Pink)
        let x1_B = originX + L1 * p.sin(theta1_B);
        let y1_B = originY + L1 * p.cos(theta1_B);
        let x2_B = x1_B + L2 * p.sin(theta2_B);
        let y2_B = y1_B + L2 * p.cos(theta2_B);

        // Update trail records
        if (isSimulating && !isDraggingBob1 && !isDraggingBob2) {
            trailHistoryA.push(p.createVector(x2_A, y2_A));
            trailHistoryB.push(p.createVector(x2_B, y2_B));

            if (trailHistoryA.length > maxTrailLen) trailHistoryA.shift();
            if (trailHistoryB.length > maxTrailLen) trailHistoryB.shift();
        }

        // 1. Draw glowing chaotic trails
        drawTrail(trailHistoryB, p.color(237, 100, 166)); // Neon Pink
        drawTrail(trailHistoryA, p.color(72, 187, 120));  // Neon Green

        // 2. Draw Pendulum B (Faint wireframe)
        p.stroke(237, 100, 166, 50);
        p.strokeWeight(1.5);
        p.line(originX, originY, x1_B, y1_B);
        p.line(x1_B, y1_B, x2_B, y2_B);
        p.fill(237, 100, 166, 70);
        p.noStroke();
        p.ellipse(x1_B, y1_B, 8, 8);
        p.ellipse(x2_B, y2_B, 12, 12);

        // 3. Draw Pendulum A (Solid primary wireframe)
        p.stroke(72, 187, 120, 220);
        p.strokeWeight(3.0);
        p.line(originX, originY, x1_A, y1_A);
        p.line(x1_A, y1_A, x2_A, y2_A);

        // Pivot Joints
        p.fill(6, 9, 14);
        p.stroke(72, 187, 120, 240);
        p.strokeWeight(2);
        p.ellipse(x1_A, y1_A, 12, 12);
        p.fill(72, 187, 120);
        p.ellipse(x2_A, y2_A, 16, 16);

        // Anchor Pivot
        p.fill(240);
        p.noStroke();
        p.ellipse(originX, originY, 8, 8);

        // Update separation distance
        let sep = p.dist(x2_A, y2_A, x2_B, y2_B);
        const sepEl = document.getElementById('dp-tel-separation');
        if (sepEl) {
            sepEl.textContent = sep.toFixed(1) + " px";
            if (sep > 60) {
                sepEl.style.color = "#e53e3e";
            } else if (sep > 10) {
                sepEl.style.color = "#ecc94b";
            } else {
                sepEl.style.color = "#48bb78";
            }
        }
    };

    function drawBlueprintGrid(cx, cy) {
        p.stroke(255, 255, 255, 8);
        p.strokeWeight(0.5);
        p.noFill();

        p.ellipse(cx, cy, L1 * 2);
        p.ellipse(cx, cy, (L1 + L2) * 2);

        for (let a = 0; a < p.TWO_PI; a += p.PI / 6) {
            p.line(cx, cy, cx + p.cos(a) * (L1 + L2), cy + p.sin(a) * (L1 + L2));
        }
    }

    function drawTrail(history, col) {
        p.noFill();
        for (let i = 1; i < history.length; i++) {
            let progress = i / history.length;
            p.stroke(p.red(col), p.green(col), p.blue(col), progress * 150);
            p.strokeWeight(p.lerp(0.6, 2.4, progress));
            p.line(history[i - 1].x, history[i - 1].y, history[i].x, history[i].y);
        }
    }

    function resetSimulation() {
        omega1_A = 0.0;
        omega2_A = 0.0;
        omega1_B = 0.0;
        omega2_B = 0.0;

        theta1_A = Math.PI / 2;
        theta2_A = Math.PI / 2;

        theta1_B = theta1_A;
        theta2_B = theta2_A + p.radians(divergenceOffset);

        trailHistoryA = [];
        trailHistoryB = [];

        const st = document.getElementById('dp-tel-state');
        if (st) {
            st.textContent = "Simulating";
            st.style.color = "#48bb78";
        }
    }

    function solvePhysicsSubstep(dt) {
        let alpha1_A = getAlpha1(theta1_A, theta2_A, omega1_A, omega2_A);
        let alpha2_A = getAlpha2(theta1_A, theta2_A, omega1_A, omega2_A);
        omega1_A += alpha1_A * dt;
        omega2_A += alpha2_A * dt;
        theta1_A += omega1_A * dt;
        theta2_A += omega2_A * dt;

        let alpha1_B = getAlpha1(theta1_B, theta2_B, omega1_B, omega2_B);
        let alpha2_B = getAlpha2(theta1_B, theta2_B, omega1_B, omega2_B);
        omega1_B += alpha1_B * dt;
        omega2_B += alpha2_B * dt;
        theta1_B += omega1_B * dt;
        theta2_B += omega2_B * dt;
    }

    function getAlpha1(t1, t2, w1, w2) {
        let num1 = -g * (2 * M1 + M2) * p.sin(t1);
        let num2 = -M2 * g * p.sin(t1 - 2 * t2);
        let num3 = -2 * p.sin(t1 - t2) * M2 * (w2 * w2 * L2 + w1 * w1 * L1 * p.cos(t1 - t2));
        let den = L1 * (2 * M1 + M2 - M2 * p.cos(2 * t1 - 2 * t2));
        return (num1 + num2 + num3) / den;
    }

    function getAlpha2(t1, t2, w1, w2) {
        let num1 = 2 * p.sin(t1 - t2);
        let num2 = (w1 * w1 * L1 * (M1 + M2)) + g * (M1 + M2) * p.cos(t1) + (w2 * w2 * L2 * M2 * p.cos(t1 - t2));
        let den = L2 * (2 * M1 + M2 - M2 * p.cos(2 * t1 - 2 * t2));
        return (num1 * num2) / den;
    }

    p.mousePressed = () => {
        let originX = p.width / 2;
        let originY = p.height / 2.35;

        let x1 = originX + L1 * p.sin(theta1_A);
        let y1 = originY + L1 * p.cos(theta1_A);
        let x2 = x1 + L2 * p.sin(theta2_A);
        let y2 = y1 + L2 * p.cos(theta2_A);

        if (p.dist(p.mouseX, p.mouseY, x2, y2) < 24) {
            isDraggingBob2 = true;
            isSimulating = false;
        } else if (p.dist(p.mouseX, p.mouseY, x1, y1) < 24) {
            isDraggingBob1 = true;
            isSimulating = false;
        }
    };

    p.mouseDragged = () => {
        let originX = p.width / 2;
        let originY = p.height / 2.35;

        if (isDraggingBob1) {
            theta1_A = p.atan2(p.mouseX - originX, p.mouseY - originY);
            theta1_B = theta1_A;
            omega1_A = 0;
            omega1_B = 0;
            trailHistoryA = [];
            trailHistoryB = [];
        } else if (isDraggingBob2) {
            let x1 = originX + L1 * p.sin(theta1_A);
            let y1 = originY + L1 * p.cos(theta1_A);
            theta2_A = p.atan2(p.mouseX - x1, p.mouseY - y1);
            theta2_B = theta2_A + p.radians(divergenceOffset);
            omega2_A = 0;
            omega2_B = 0;
            trailHistoryA = [];
            trailHistoryB = [];
        }
    };

    p.mouseReleased = () => {
        if (isDraggingBob1 || isDraggingBob2) {
            isDraggingBob1 = false;
            isDraggingBob2 = false;
            isSimulating = true;
        }
    };

    p.touchStarted = () => {
        p.mousePressed();
        return !isDraggingBob1 && !isDraggingBob2;
    };

    p.touchMoved = () => {
        if (isDraggingBob1 || isDraggingBob2) {
            p.mouseDragged();
            return false;
        }
        return true;
    };

    p.touchEnded = () => {
        p.mouseReleased();
        return true;
    };
};

new p5(doublePendulumSketch, 'pendulum-canvas-container');
</script>
