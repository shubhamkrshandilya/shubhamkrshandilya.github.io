---
layout: newspaper
title: "Astrophysics: Light Bending & Black Hole Gravitational Lensing"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Astrophysics Series"
section: "Relativity Branch"
division: "Theoretical Physics"
author: "Shubham Kumar"
volume: "I"
issue: "15"
date: 2026-09-27 10:00:00 +0530
tags: [Physics, Astrophysics, General Relativity, Black Holes, p5.js, Education]
weather: "Extreme gravitational shear warping photon geodesics near event horizon"
ticker_index: "Schwarzschild radius: Rs = 2GM/c² | Photon sphere: 1.5 Rs | Relativistic deflection: α = 4GM/(c²b)"
price: "10 Credits"
---

When light travels through the cosmos, we instinctively imagine it following straight lines. For centuries, Euclidean geometry declared that a ray of light constitutes the very definition of a straight trajectory. However, in 1915, Albert Einstein published his **General Theory of Relativity**, overturning our fundamental understanding of space and time.

Mass does not merely exert an attractive pull across a void; rather, mass tells spacetime how to curve, and spacetime curvature tells light how to bend. 

When a ray of starlight grazes a massive object, such as a black hole, its path is deflected along a curved geometric track called a **null geodesic**. If the mass is dense enough, spacetime warps so steeply that background stars morph into luminous halos known as **Einstein Rings**, and photons can even become trapped in infinite orbits around a cosmic precipice.

<div class="newspaper-clipping">
    <h3>The Relativistic Glossary</h3>
    <ul>
        <li><strong>Schwarzschild Radius ($R_s$)</strong>: The radius defining the event horizon of a non-rotating, neutral black hole. Within this sphere, the escape velocity exceeds the speed of light.</li>
        <li><strong>Photon Sphere ($r_{ph} = 1.5 R_s$)</strong>: The spherical boundary where gravity is so intense that photons are forced into unstable circular orbits.</li>
        <li><strong>Null Geodesic</strong>: The shortest path between two points in curved four-dimensional spacetime traversed by massless particles (photons).</li>
        <li><strong>Einstein Ring</strong>: The optical circular deformation of light from a distant source into a complete ring due to symmetric gravitational lensing.</li>
        <li><strong>Impact Parameter ($b$)</strong>: The perpendicular distance between the unperturbed trajectory of an incoming particle and the center of mass.</li>
    </ul>
</div>

---

## 1. The Schwarzschild Metric & The Event Horizon

In classical Newtonian gravitation, light has no rest mass ($m = 0$), yet one can calculate a heuristic deflection by treating photons as corpuscular particles travelling at $c$. However, Newtonian physics underestimates the true deflection by exactly a factor of **two**, because it ignores the spatial curvature component of Einstein's field equations:

$$G_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}$$

Outside a spherically symmetric, non-rotating mass $M$, spacetime is uniquely described by the **Schwarzschild metric**:

$$ds^2 = -\left(1 - \frac{2GM}{c^2 r}\right) c^2 dt^2 + \left(1 - \frac{2GM}{c^2 r}\right)^{-1} dr^2 + r^2 (d\theta^2 + \sin^2\theta d\phi^2)$$

The coordinate singularity occurs where $g_{00} \to 0$ and $g_{rr} \to \infty$, marking the boundary known as the **Event Horizon**. Its radius is the Schwarzschild radius:

$$R_s = \frac{2GM}{c^2}$$

Any matter or radiation that crosses $R_s$ can never return to the observable universe, as all future-directed light cones tilt toward the central singularity at $r = 0$.

---

## 2. The Photon Sphere & Relativistic Deflection

For massless photons traversing the equatorial plane ($\theta = \pi/2$), the geodesic equation yields an effective potential:

$$\left(\frac{dr}{d\lambda}\right)^2 + V_{\text{eff}}(r) = \frac{1}{b^2}, \quad \text{where} \quad V_{\text{eff}}(r) = \frac{1}{r^2}\left(1 - \frac{R_s}{r}\right)$$

Where $b = L / E$ is the **impact parameter** (ratio of angular momentum to energy) and $\lambda$ is an affine parameter along the geodesic.

Taking the derivative with respect to $r$ reveals the critical radius where the effective potential reaches an unstable maximum:

$$\frac{d V_{\text{eff}}}{dr} = -\frac{2}{r^3} + \frac{3 R_s}{r^4} = 0 \implies r_{ph} = \frac{3}{2} R_s = 1.5 R_s$$

This is the **Photon Sphere**:
* If a photon's impact parameter satisfies $b < b_{crit} = \sqrt{27} \frac{R_s}{2} \approx 2.598 R_s$, the photon spirals inexorably across the event horizon and is **captured**.
* If $b = b_{crit}$, the photon circles the black hole indefinitely along an unstable orbit.
* If $b > b_{crit}$, the photon is strongly bent by gravity and **escapes**, deflecting into a new trajectory.

At large distances ($b \gg R_s$), Einstein's famous weak-field deflection formula holds:

$$\hat{\alpha} \approx \frac{4GM}{c^2 b} = \frac{2 R_s}{b}$$

$$\text{Deflection Angle: } \hat{\alpha}_{\text{Einstein}} = 2 \times \hat{\alpha}_{\text{Newton}}$$

---

## 3. Accretion Disks & Gravitational Lensing

When observed from afar, a black hole does not look like a flat black hole cut into the sky. Because light from the far side of the glowing accretion disk is bent up and over the singularity, an observer sees a luminous arched halo above and below the dark silhouette. Furthermore, background stars behind the singularity are duplicated into primary and secondary images:

$$r_{\text{image}} = \frac{r_{\text{source}} \pm \sqrt{r_{\text{source}}^2 + 4 R_{\text{shadow}}^2}}{2}$$

The apparent radius of the dark shadow cast on the sky is not $R_s$, but rather the enlarged gravitational shadow:

$$R_{\text{shadow}} = \sqrt{27} \frac{R_s}{2} \approx 2.6 R_s$$

---

<!-- Dynamic p5.js Interactive Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.02); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">
            Black Hole Gravitational Lensing & Geodesic Laboratory
        </h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Fire photon rays into the curved Schwarzschild spacetime on the left to measure geodesic deflection. Watch the relativistic gravitational lens and warped accretion disk on the right.
        </p>

        <!-- Canvas Container -->
        <div id="black-hole-canvas-container" style="width: 100%; height: 460px; border-radius: 8px; overflow: hidden; border: 1px solid var(--news-border); margin-bottom: 1.5rem; position: relative; background: #05070a;"></div>

        <!-- Interactive Controls HUD -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 820px; margin: 0 auto; padding: 0.5rem; text-align: left;">
            
            <!-- Sliders Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem;">
                
                <!-- Singularity Mass -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Black Hole Mass (M):</span>
                        <span id="bh-mass-val" style="color: var(--primary-color);">1.5 M₀</span>
                    </div>
                    <input type="range" id="bh-mass-slider" min="0.5" max="3.0" step="0.1" value="1.5" style="width: 100%;">
                </div>

                <!-- Launch Distance -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Launch Distance (X):</span>
                        <span id="bh-dist-val" style="color: var(--primary-color);">140 px</span>
                    </div>
                    <input type="range" id="bh-dist-slider" min="60" max="220" step="5" value="140" style="width: 100%;">
                </div>

                <!-- Impact Parameter (Offset) -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Impact Offset (b):</span>
                        <span id="bh-offset-val" style="color: var(--primary-color);">38 px</span>
                    </div>
                    <input type="range" id="bh-offset-slider" min="-100" max="100" step="2" value="38" style="width: 100%;">
                </div>

                <!-- Disk Inclination -->
                <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.88rem;">
                        <span>Disk Tilt Angle:</span>
                        <span id="bh-inc-val" style="color: var(--primary-color);">20°</span>
                    </div>
                    <input type="range" id="bh-inc-slider" min="0" max="80" step="2" value="20" style="width: 100%;">
                </div>
            </div>

            <!-- Action Buttons & Telemetry Bar -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; border-top: 1px dashed var(--news-border); padding-top: 1rem;">
                
                <div style="display: flex; gap: 0.75rem;">
                    <button id="bh-fire-btn" style="padding: 0.5rem 1.25rem; font-family: 'Playfair Display', serif; font-weight: bold; background: var(--news-ink); color: var(--news-bg); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                        ⚡ Fire Photon Beam
                    </button>
                    <button id="bh-clear-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Clear Paths
                    </button>
                </div>

                <!-- Telemetry Badges -->
                <div style="display: flex; flex-wrap: wrap; gap: 0.85rem; font-family: 'Courier Prime', monospace; font-size: 0.82rem;">
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Rs: </span><strong id="bh-tel-rs" style="color: var(--primary-color);">30 px</strong>
                    </div>
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Photon Sphere: </span><strong id="bh-tel-ps" style="color: #e53e3e;">45 px</strong>
                    </div>
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Deflection: </span><strong id="bh-tel-deflection" style="color: #3182ce;">0.0°</strong>
                    </div>
                    <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                        <span>Status: </span><strong id="bh-tel-status" style="color: #38a169;">Ready</strong>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

---

## 4. Key Takeaways for Observational Astronomy

1. **Light is Bent by Space Itself**: Photons follow geodesics in four-dimensional spacetime. Near a black hole, space is so severely warped that light can loop completely around the back of the singularity and strike your eyes.
2. **The Shadow is Larger than the Hole**: Due to gravitational bending, light originating near the event horizon cannot reach infinity unless it is aimed outwards; hence the black hole casts a dark silhouette of diameter $2 \times R_{\text{shadow}} \approx 5.2 R_s$, as observed by the **Event Horizon Telescope (EHT)** imaging M87* and Sagittarius A*.
3. **Cosmic Beacons**: Gravitational lensing acts as a natural cosmological telescope, magnifying the dim light of galaxies billions of light-years behind the lens.

<!-- p5.js CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>

<script>
const blackHoleSketch = (p) => {
    let mass = 1.5;
    let launchDist = 140;
    let launchOffset = 38;
    let diskInclination = 20;

    let leftCenter, rightCenter;
    let activePhotons = [];
    let rs = 30;
    let c = 5.0;
    let dt = 0.45;

    let stars = [];
    const numStars = 120;

    p.setup = () => {
        const container = document.getElementById('black-hole-canvas-container');
        const w = container ? container.clientWidth : 800;
        const h = container ? container.clientHeight : 460;
        const canvas = p.createCanvas(w, h);
        canvas.parent('black-hole-canvas-container');

        leftCenter = p.createVector(w / 4, h / 2);
        rightCenter = p.createVector((3 * w) / 4, h / 2);

        // UI Listeners
        const massSlider = document.getElementById('bh-mass-slider');
        if (massSlider) {
            massSlider.addEventListener('input', (e) => {
                mass = parseFloat(e.target.value);
                document.getElementById('bh-mass-val').textContent = mass.toFixed(1) + " M₀";
                updateConstants();
            });
        }

        const distSlider = document.getElementById('bh-dist-slider');
        if (distSlider) {
            distSlider.addEventListener('input', (e) => {
                launchDist = parseFloat(e.target.value);
                document.getElementById('bh-dist-val').textContent = launchDist.toFixed(0) + " px";
            });
        }

        const offsetSlider = document.getElementById('bh-offset-slider');
        if (offsetSlider) {
            offsetSlider.addEventListener('input', (e) => {
                launchOffset = parseFloat(e.target.value);
                document.getElementById('bh-offset-val').textContent = launchOffset.toFixed(0) + " px";
            });
        }

        const incSlider = document.getElementById('bh-inc-slider');
        if (incSlider) {
            incSlider.addEventListener('input', (e) => {
                diskInclination = parseFloat(e.target.value);
                document.getElementById('bh-inc-val').textContent = diskInclination.toFixed(0) + "°";
            });
        }

        const fireBtn = document.getElementById('bh-fire-btn');
        if (fireBtn) {
            fireBtn.addEventListener('click', firePhotonRay);
        }

        const clearBtn = document.getElementById('bh-clear-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                activePhotons = [];
                const defEl = document.getElementById('bh-tel-deflection');
                const stEl = document.getElementById('bh-tel-status');
                if (defEl) defEl.textContent = "0.0°";
                if (stEl) {
                    stEl.textContent = "Cleared";
                    stEl.style.color = "var(--news-ink)";
                }
            });
        }

        // Generate background star field
        for (let i = 0; i < numStars; i++) {
            stars.push({
                pos: p.createVector(p.random(-150, 150), p.random(-150, 150)),
                size: p.random(1.2, 3.2),
                brightness: p.random(140, 255)
            });
        }

        updateConstants();
    };

    function updateConstants() {
        rs = (p.width < 500 ? 13 : 20) * mass;
        const rsEl = document.getElementById('bh-tel-rs');
        const psEl = document.getElementById('bh-tel-ps');
        if (rsEl) rsEl.textContent = rs.toFixed(0) + " px";
        if (psEl) psEl.textContent = (1.5 * rs).toFixed(0) + " px";
    }

    p.windowResized = () => {
        const container = document.getElementById('black-hole-canvas-container');
        if (container) {
            const w = container.clientWidth;
            const h = container.clientHeight;
            p.resizeCanvas(w, h);
            leftCenter.set(w / 4, h / 2);
            rightCenter.set((3 * w) / 4, h / 2);
            updateConstants();
        }
    };

    p.draw = () => {
        p.background(7, 9, 14);

        leftCenter.x = p.width / 4;
        leftCenter.y = p.height / 2;
        rightCenter.x = (3 * p.width) / 4;
        rightCenter.y = p.height / 2;

        // Split-screen dividing vertical rule
        p.stroke(255, 255, 255, 25);
        p.strokeWeight(1);
        p.line(p.width / 2, 0, p.width / 2, p.height);

        // 1. Draw Trajectory Plane
        drawLeftPanel();

        // 2. Draw Observer Lensed View
        drawRightPanel();

        // 3. Update photon geodesics
        updatePhotons();
    };

    function drawLeftPanel() {
        p.push();
        p.translate(leftCenter.x, leftCenter.y);

        // Title
        p.noStroke();
        p.fill(220, 180);
        p.textSize(11);
        p.textFont("Courier Prime, monospace");
        p.textAlign(p.LEFT, p.TOP);
        p.text("TRAJECTORY PLANE (2D GEODESICS)", -p.width / 4 + 14, -p.height / 2 + 14);

        // Photon Sphere guide (1.5 Rs)
        p.stroke(245, 101, 101, 70);
        p.strokeWeight(1.2);
        p.noFill();
        p.drawingContext.setLineDash([4, 4]);
        p.ellipse(0, 0, rs * 3);
        p.drawingContext.setLineDash([]);

        // Event Horizon (Schwarzschild Radius)
        p.noStroke();
        p.fill(12, 14, 20);
        p.ellipse(0, 0, rs * 2);

        // Accretion halo glow
        for (let r = rs * 2; r < rs * 2.35; r += 1.5) {
            p.stroke(245, 101, 101, p.map(r, rs * 2, rs * 2.35, 45, 0));
            p.noFill();
            p.ellipse(0, 0, r);
        }

        // Singularity core
        p.fill(0);
        p.stroke(245, 101, 101, 220);
        p.strokeWeight(2);
        p.ellipse(0, 0, 8);

        // Draw photon beam trails
        for (let pt of activePhotons) {
            if (pt.trail.length > 1) {
                p.stroke(pt.color.r, pt.color.g, pt.color.b, 180);
                p.strokeWeight(2);
                p.noFill();
                p.beginShape();
                for (let pos of pt.trail) {
                    p.vertex(pos.x, pos.y);
                }
                p.endShape();
            }

            if (pt.active) {
                p.fill(pt.color.r, pt.color.g, pt.color.b);
                p.noStroke();
                p.ellipse(pt.pos.x, pt.pos.y, 6);
            }
        }

        // Launch pointer guide
        p.stroke(255, 255, 255, 40);
        p.strokeWeight(1);
        p.line(-launchDist, launchOffset, -launchDist + 35, launchOffset);
        p.fill(212, 165, 116);
        p.noStroke();
        p.ellipse(-launchDist, launchOffset, 5);

        p.pop();
    }

    function drawRightPanel() {
        p.push();
        p.translate(rightCenter.x, rightCenter.y);

        p.noStroke();
        p.fill(220, 180);
        p.textSize(11);
        p.textFont("Courier Prime, monospace");
        p.textAlign(p.LEFT, p.TOP);
        p.text("OBSERVER VIEW (GRAVITATIONAL LENS)", -p.width / 4 + 14, -p.height / 2 + 14);

        let shadowRadius = 2.6 * rs;

        // Background stars warped by Einstein deflection mapping
        p.noStroke();
        for (let star of stars) {
            let rSource = star.pos.mag();
            if (rSource < 6) continue;

            // Primary Einstein Image
            let rImage = (rSource + p.sqrt(rSource * rSource + 4 * shadowRadius * shadowRadius)) / 2;
            let scaleFactor = rImage / rSource;
            let imgPos = p5.Vector.mult(star.pos, scaleFactor);

            p.fill(star.brightness, 220);
            p.ellipse(imgPos.x, imgPos.y, star.size);

            // Secondary Einstein Image (Inner ring opposite reflection)
            let rImage2 = (-rSource + p.sqrt(rSource * rSource + 4 * shadowRadius * shadowRadius)) / 2;
            let scaleFactor2 = rImage2 / rSource;
            let imgPos2 = p5.Vector.mult(star.pos, -scaleFactor2);

            p.fill(star.brightness, 110);
            p.ellipse(imgPos2.x, imgPos2.y, star.size * 0.5);
        }

        // Accretion disk incandescent rings
        let diskMin = 3.0 * rs;
        let diskMax = 7.2 * rs;
        let incRad = p.radians(diskInclination);
        let cosInc = p.cos(incRad);

        for (let r = diskMin; r <= diskMax; r += 4) {
            let colorFactor = p.map(r, diskMin, diskMax, 0, 1);
            let ringCol = p.lerpColor(p.color(255, 170, 30), p.color(255, 60, 10), colorFactor);
            let alpha = p.map(p.sin(p.frameCount * 0.05 - r * 0.1), -1, 1, 90, 170);

            p.stroke(p.red(ringCol), p.green(ringCol), p.blue(ringCol), alpha);
            p.strokeWeight(1.4);
            p.noFill();

            p.beginShape(p.POINTS);
            for (let angle = 0; angle < p.TWO_PI; angle += 0.04) {
                let spinAngle = angle + p.frameCount * (0.018 / (r / rs));
                let sx = r * p.cos(spinAngle);
                let sy = r * p.sin(spinAngle) * cosInc;

                let rSource = p.sqrt(sx * sx + sy * sy);
                if (rSource < 6) continue;

                let rImage = (rSource + p.sqrt(rSource * rSource + 4 * shadowRadius * shadowRadius)) / 2;
                let px = sx * (rImage / rSource);
                let py = sy * (rImage / rSource);
                p.vertex(px, py);

                let rImage2 = (-rSource + p.sqrt(rSource * rSource + 4 * shadowRadius * shadowRadius)) / 2;
                let px2 = -sx * (rImage2 / rSource);
                let py2 = -sy * (rImage2 / rSource);
                p.vertex(px2, py2);
            }
            p.endShape();
        }

        // Central Einstein Shadow
        p.noStroke();
        p.fill(4, 5, 8);
        p.ellipse(0, 0, shadowRadius * 2);

        // Glowing boundary
        p.stroke(245, 101, 101, 170);
        p.strokeWeight(1.4);
        p.noFill();
        p.ellipse(0, 0, shadowRadius * 2 + 1);

        p.pop();
    }

    function firePhotonRay() {
        let newPhoton = {
            pos: p.createVector(-launchDist, launchOffset),
            vel: p.createVector(c, 0),
            trail: [p.createVector(-launchDist, launchOffset)],
            active: true,
            color: {
                r: p.random(200, 255),
                g: p.random(130, 220),
                b: p.random(60, 120)
            }
        };
        activePhotons.push(newPhoton);
        if (activePhotons.length > 12) {
            activePhotons.shift();
        }

        const stEl = document.getElementById('bh-tel-status');
        if (stEl) {
            stEl.textContent = "Tracking...";
            stEl.style.color = "#3182ce";
        }
    }

    function updatePhotons() {
        for (let pt of activePhotons) {
            if (!pt.active) continue;

            for (let step = 0; step < 4; step++) {
                let r2 = pt.pos.x * pt.pos.x + pt.pos.y * pt.pos.y;
                let r = p.sqrt(r2);

                if (r < rs) {
                    pt.active = false;
                    const stEl = document.getElementById('bh-tel-status');
                    if (stEl) {
                        stEl.textContent = "Captured";
                        stEl.style.color = "#e53e3e";
                    }
                    break;
                }

                if (pt.pos.x > p.width / 2 || pt.pos.y > p.height / 2 || pt.pos.y < -p.height / 2) {
                    pt.active = false;
                    let finalAngle = p.degrees(pt.vel.heading());
                    const defEl = document.getElementById('bh-tel-deflection');
                    const stEl = document.getElementById('bh-tel-status');
                    if (defEl) defEl.textContent = p.abs(finalAngle).toFixed(1) + "°";
                    if (stEl) {
                        stEl.textContent = "Escaped";
                        stEl.style.color = "#38a169";
                    }
                    break;
                }

                // General Relativity geodesic acceleration: force ~ -3 M L^2 / r^5
                let L = pt.pos.x * pt.vel.y - pt.pos.y * pt.vel.x;
                let f = (-3.0 * mass * 8.0 * L * L) / (r2 * r2 * r);
                let ax = f * pt.pos.x;
                let ay = f * pt.pos.y;

                pt.vel.x += ax * dt;
                pt.vel.y += ay * dt;

                // Maintain speed of light c
                let speed = pt.vel.mag();
                pt.vel.mult(c / speed);

                pt.pos.x += pt.vel.x * dt;
                pt.pos.y += pt.vel.y * dt;
            }

            pt.trail.push(p.createVector(pt.pos.x, pt.pos.y));
            if (pt.trail.length > 500) {
                pt.trail.shift();
            }
        }
    }
};

new p5(blackHoleSketch, 'black-hole-canvas-container');
</script>
