---
layout: newspaper
title: "Creative Coding: The Math of Fractals"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Mathematics Series"
section: "Chaos Theory Branch"
division: "Applied Mathematics"
author: "Shubham Kumar"
volume: "I"
issue: "10"
date: 2026-07-12 03:00:00 +0530
tags: [Math, Fractals, Chaos Theory, p5.js, Creative Coding, Education]
weather: "High resolution Mandelbrot iterations rendering"
ticker_index: "Mandelbrot: z_next = z^2 + c | Julia: c is constant | Perlin sway"
price: "10 Credits"
---

Many natural patterns possess a striking geometric quality: the jagged contour of a mountain range, the branch splits of a winter tree, the detailed nodes of a Romanesco broccoli, or the outline of a coastline. In standard Euclidean geometry, objects have integer dimensions—a line is 1D, a plane is 2D, and a solid is 3D. But natural shapes exist in between, displaying **fractional dimensions**.

These shapes are called **fractals**: self-similar mathematical curves that repeat their detailed structures recursively at infinitely smaller scales.

To showcase these concepts, we overhauled a creative coding project into a browser-based **Interactive Fractal & Chaos Theory Suite**. In this lesson, we study the mathematics behind three iconic fractal systems: boolean logic landscapes, recursive growth, and complex plane orbits.

<div class="newspaper-clipping">
    <h3>The Chaos Glossary</h3>
    <ul>
        <li><strong>Self-Similarity</strong>: A property where a small part of an object looks identical or similar to the whole.</li>
        <li><strong>Recursion</strong>: A process where a function calls itself, breaking a problem into smaller instances.</li>
        <li><strong>Complex Number</strong>: A number in the form a + bi, where i² = -1. Represents coordinates on a 2D plane.</li>
        <li><strong>Perlin Noise</strong>: A gradient noise algorithm generating smooth, natural random transitions.</li>
    </ul>
</div>

## 1. Bitwise Landscapes (Boolean Grids)

The original iteration of this project investigated how binary logic operations (like AND, OR, XOR) produce geometric structures when mapped to coordinate pixels. 

Computers store integers in binary bits. When we evaluate the bitwise XOR (`^`) or AND (`&`) of coordinates x and y, the resulting integers repeat at powers-of-two boundaries. By plotting random points ($x, y$) colored by their logic outcomes:

$$\text{Point}_1 = (x \lor y, x \land y)$$
$$\text{Point}_2 = (x \land y, x \oplus y)$$

We reveal a grid of self-similar rectangles. This demonstrates that boolean logic gates naturally form fractal patterns when evaluated over 2D spans.

---

## 2. Recursive Trees (Organic Geometry)

A recursive branching tree is a classic geometric fractal. We define a function `branch(length, theta)` that draws a straight line representing the trunk, translates to the tip, and then calls itself twice at opposing angles ($\theta$ and $-\theta$) with a scaled-down branch length ($L_{next} = r \cdot L$):

$$x_{next} = x + L \cdot \cos(\theta)$$
$$y_{next} = y - L \cdot \sin(\theta)$$

To make the tree look organic, we simulate wind gusts. Rather than using simple random values (which create jerky movements), we query **Perlin Noise** to add a smooth, continuous angular sway offset to the branch rotation angles:

$$\theta_{sway} = \theta + \text{Noise}(t)$$

---

## 3. The Mandelbrot & Julia Sets

The most famous fractals in mathematics exist in the complex plane. We define a simple iterative quadratic formula:

$$z_{n+1} = z_n^2 + c$$

Where $z$ and $c$ are complex numbers. We map every pixel $(x, y)$ to a complex coordinate. We start at $z_0 = 0$ and iterate the formula. If the magnitude of $z$ escapes to infinity ($|z| > 2$), the point is outside the set. The number of iterations it takes to escape determines the pixel's color.

*   **Mandelbrot Set**: We vary $c$ (each pixel has its own coordinate $c$) and start with $z_0 = 0$.
*   **Julia Set**: We keep $c$ constant for the entire grid, and vary the starting position $z_0$ based on each pixel's coordinate. 

By dragging your mouse across the canvas, you change the constant $c$, morphing the Julia set through infinite geometric configurations.

---

<!-- Dynamic p5.js Interactive Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.01); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase;">Interactive Fractal & Chaos Suite</h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Select a mode, adjust parameters, and watch complex math shapes form. Drag your mouse inside the Julia canvas to morph the equations.
        </p>

        <!-- Main Layout Split -->
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; align-items: flex-start; text-align: left;">
            
            <!-- Canvas Container -->
            <div id="blog-fractal-canvas" style="width: 420px; height: 420px; border-radius: 12px; overflow: hidden; border: 1px solid var(--news-border); position: relative; background: #0a0c10;"></div>

            <!-- Controls Panel -->
            <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 1rem; padding: 0.5rem;">
                <!-- Mode Select -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <span style="font-weight: bold; font-size: 0.85rem;">Fractal Model:</span>
                    <select id="blogModeSelect" style="width: 100%; padding: 0.25rem; font-family: 'Playfair Display', serif; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-weight: bold; font-size: 0.9rem; height: 1.8rem; outline: none; cursor: pointer;">
                        <option value="bitwise" selected>Bitwise Landscape</option>
                        <option value="tree">Recursive Tree (Swaying)</option>
                        <option value="mandelbrot">Mandelbrot Complex Set</option>
                        <option value="julia">Julia Dynamic Set</option>
                    </select>
                </div>

                <!-- Bitwise Sliders -->
                <div id="blogBitwiseControls" style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                            <span>Points per Frame:</span>
                            <span id="blogBitwisePointsVal" style="color: var(--primary-color);">1000</span>
                        </div>
                        <input type="range" id="blogBitwisePointsSlider" min="200" max="4000" step="100" value="1000" style="width: 100%;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                            <span>Color Intensity:</span>
                            <span id="blogBitwiseColorVal" style="color: var(--primary-color);">128</span>
                        </div>
                        <input type="range" id="blogBitwiseColorSlider" min="30" max="255" step="5" value="128" style="width: 100%;">
                    </div>
                </div>

                <!-- Tree Sliders -->
                <div id="blogTreeControls" style="display: none; flex-direction: column; gap: 0.75rem;">
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                            <span>Branch Angle:</span>
                            <span id="blogTreeAngleVal" style="color: var(--primary-color);">30°</span>
                        </div>
                        <input type="range" id="blogTreeAngleSlider" min="5" max="90" step="1" value="30" style="width: 100%;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                            <span>Length Scaling:</span>
                            <span id="blogTreeScaleVal" style="color: var(--primary-color);">0.68</span>
                        </div>
                        <input type="range" id="blogTreeScaleSlider" min="0.50" max="0.80" step="0.01" value="0.68" style="width: 100%;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                            <span>Recursion Depth:</span>
                            <span id="blogTreeDepthVal" style="color: var(--primary-color);">8</span>
                        </div>
                        <input type="range" id="blogTreeDepthSlider" min="4" max="10" step="1" value="8" style="width: 100%;">
                    </div>
                </div>

                <!-- Mandelbrot / Julia Sliders -->
                <div id="blogComplexControls" style="display: none; flex-direction: column; gap: 0.75rem;">
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                            <span>Iterations Limit:</span>
                            <span id="blogIterationsVal" style="color: var(--primary-color);">50</span>
                        </div>
                        <input type="range" id="blogIterationsSlider" min="15" max="120" step="5" value="50" style="width: 100%;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 0.8rem;">
                            <span>Zoom:</span>
                            <span id="blogZoomVal" style="color: var(--primary-color);">1.0x</span>
                        </div>
                        <input type="range" id="blogZoomSlider" min="0.5" max="10.0" step="0.5" value="1.0" style="width: 100%;">
                    </div>
                    <div id="blogJuliaOnly" style="display: none; flex-direction: column; gap: 0.25rem; font-size: 0.8rem; color: var(--news-muted); font-style: italic;">
                        <i class="fas fa-mouse-pointer"></i> Drag your mouse/finger on the canvas to morph Julia constants!
                    </div>
                </div>

                <div style="font-size: 0.8rem; font-family: 'Courier Prime', monospace; background: rgba(0,0,0,0.05); padding: 0.5rem; border-radius: 4px; border: 1px dashed var(--news-border); margin-top: 0.5rem; text-align: center;">
                    <span id="blogFpsStats">FPS: -- | Mode: BITWISE</span>
                </div>
            </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--news-muted); margin-top: 1.5rem; text-indent: 0; text-align: center;">
            Explore the full codebase and run local builds via the repository: 
            <a href="https://github.com/shubhamkrshandilya/fractal" target="_blank" rel="noopener noreferrer" style="font-weight: bold; color: var(--primary-color);">shubhamkrshandilya/fractal</a>
        </p>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
const blogFractalSketch = (p) => {
    let modeSelect, bitwisePointsSlider, bitwiseColorSlider;
    let treeAngleSlider, treeScaleSlider, treeDepthSlider;
    let iterationsSlider, zoomSlider;
    
    let currentMode = 'bitwise';
    let pixelScale = 1;
    let isInteracting = false;
    let interactionTimer = 0;
    
    let windAngle = 0;
    let canvasW = 420;
    let canvasH = 420;
    
    let primaryColor = '#d4a574';
    let textDark = '#1c1a17';
    let textMuted = '#5c5246';
    let bgCard = '#f4edd8';
    
    function f(t) {
        return 0.05 * Math.pow(t, 3) - 0.6 * Math.pow(t, 2) + 3 * t + 20;
    }
    
    p.setup = () => {
        p.createCanvas(canvasW, canvasH);
        p.pixelDensity(1);
        
        updateThemeColors();
        
        modeSelect = document.getElementById('blogModeSelect');
        bitwisePointsSlider = document.getElementById('blogBitwisePointsSlider');
        bitwiseColorSlider = document.getElementById('blogBitwiseColorSlider');
        treeAngleSlider = document.getElementById('blogTreeAngleSlider');
        treeScaleSlider = document.getElementById('blogTreeScaleSlider');
        treeDepthSlider = document.getElementById('blogTreeDepthSlider');
        iterationsSlider = document.getElementById('blogIterationsSlider');
        zoomSlider = document.getElementById('blogZoomSlider');
        
        if (modeSelect) {
            modeSelect.addEventListener('change', function() {
                currentMode = this.value;
                toggleControls();
                p.background(10);
            });
        }
        
        const inputs = document.querySelectorAll('#blogTreeControls input, #blogBitwiseControls input, #blogComplexControls input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                isInteracting = true;
                interactionTimer = p.millis();
            });
        });
        
        p.background(10);
    };
    
    p.draw = () => {
        updateThemeColors();
        
        if (isInteracting) {
            pixelScale = 3;
            if (p.millis() - interactionTimer > 350) {
                isInteracting = false;
                pixelScale = 1;
                p.background(10);
            }
        }
        
        if (currentMode === 'bitwise') {
            drawBitwise();
        } else if (currentMode === 'tree') {
            drawTree();
        } else if (currentMode === 'mandelbrot') {
            drawMandelbrot();
        } else if (currentMode === 'julia') {
            drawJulia();
        }
        
        updateStats();
    };
    
    function toggleControls() {
        const bitwise = document.getElementById('blogBitwiseControls');
        const tree = document.getElementById('blogTreeControls');
        const complex = document.getElementById('blogComplexControls');
        const juliaOnly = document.getElementById('blogJuliaOnly');
        
        bitwise.style.display = 'none';
        tree.style.display = 'none';
        complex.style.display = 'none';
        juliaOnly.style.display = 'none';
        
        if (currentMode === 'bitwise') {
            bitwise.style.display = 'flex';
        } else if (currentMode === 'tree') {
            tree.style.display = 'flex';
        } else if (currentMode === 'mandelbrot') {
            complex.style.display = 'flex';
        } else if (currentMode === 'julia') {
            complex.style.display = 'flex';
            juliaOnly.style.display = 'flex';
        }
    }
    
    function drawBitwise() {
        let nPoints = bitwisePointsSlider ? parseInt(bitwisePointsSlider.value) : 1000;
        let colorLimit = bitwiseColorSlider ? parseInt(bitwiseColorSlider.value) : 128;
        
        p.strokeWeight(1);
        for (let i = 0; i < nPoints; i++) {
            let x = p.random(0, canvasW);
            let y = p.random(0, canvasH);
            let val = (x ^ y);
            
            p.stroke(val % colorLimit, (x & y) % 180, (x | y) % 255, 120);
            p.point(x | y, x & y);
            p.point(x & y, x ^ y);
        }
    }
    
    function drawTree() {
        p.background(10);
        
        let angleVal = treeAngleSlider ? parseFloat(treeAngleSlider.value) : 30;
        let scaleVal = treeScaleSlider ? parseFloat(treeScaleSlider.value) : 0.68;
        let depth = treeDepthSlider ? parseInt(treeDepthSlider.value) : 8;
        
        let theta = p.radians(angleVal);
        windAngle += 0.015;
        let windSway = p.map(p.noise(windAngle), 0, 1, -0.15, 0.15);
        
        p.push();
        p.translate(canvasW / 2, canvasH - 20);
        p.stroke(212, 165, 116);
        p.strokeWeight(depth + 1);
        
        let initialLen = 95;
        p.line(0, 0, 0, -initialLen);
        p.translate(0, -initialLen);
        
        branch(initialLen * scaleVal, theta, depth - 1, scaleVal, windSway);
        p.pop();
    }
    
    function branch(len, theta, d, scaleVal, windSway) {
        if (d <= 0 || len < 4) return;
        
        p.strokeWeight(d + 0.8);
        if (d <= 3) {
            p.stroke(56, 161, 105, 180);
        } else {
            p.stroke(212, 165, 116, 220);
        }
        
        p.push();
        p.rotate(theta + windSway);
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
        branch(len * scaleVal, theta, d - 1, scaleVal, windSway);
        p.pop();
        
        p.push();
        p.rotate(-theta + windSway);
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
        branch(len * scaleVal, theta, d - 1, scaleVal, windSway);
        p.pop();
    }
    
    function drawMandelbrot() {
        let maxIt = iterationsSlider ? parseInt(iterationsSlider.value) : 50;
        let zoom = zoomSlider ? parseFloat(zoomSlider.value) : 1.0;
        
        p.loadPixels();
        
        let cxOffset = -0.5;
        let cyOffset = 0.0;
        
        for (let x = 0; x < canvasW; x += pixelScale) {
            for (let y = 0; y < canvasH; y += pixelScale) {
                let a = p.map(x, 0, canvasW, -2.0 / zoom + cxOffset, 1.0 / zoom + cxOffset);
                let b = p.map(y, 0, canvasH, -1.5 / zoom + cyOffset, 1.5 / zoom + cyOffset);
                
                let ca = a;
                let cb = b;
                let zx = 0.0;
                let zy = 0.0;
                let n = 0;
                
                while (n < maxIt) {
                    let zx2 = zx * zx;
                    let zy2 = zy * zy;
                    if (zx2 + zy2 > 4.0) break;
                    
                    let nextZx = zx2 - zy2 + ca;
                    let nextZy = 2.0 * zx * zy + cb;
                    zx = nextZx;
                    zy = nextZy;
                    n++;
                }
                
                let col = getPaletteColor(n, maxIt);
                setPixelGroup(x, y, col);
            }
        }
        p.updatePixels();
    }
    
    function drawJulia() {
        let maxIt = iterationsSlider ? parseInt(iterationsSlider.value) : 50;
        let zoom = zoomSlider ? parseFloat(zoomSlider.value) : 1.0;
        
        let cr = -0.7;
        let ci = 0.27;
        
        if (p.mouseX >= 0 && p.mouseX <= canvasW && p.mouseY >= 0 && p.mouseY <= canvasH) {
            cr = p.map(p.mouseX, 0, canvasW, -1.5, 1.5);
            ci = p.map(p.mouseY, 0, canvasH, -1.5, 1.5);
        }
        
        p.loadPixels();
        for (let x = 0; x < canvasW; x += pixelScale) {
            for (let y = 0; y < canvasH; y += pixelScale) {
                let a = p.map(x, 0, canvasW, -1.5 / zoom, 1.5 / zoom);
                let b = p.map(y, 0, canvasH, -1.5 / zoom, 1.5 / zoom);
                
                let zx = a;
                let zy = b;
                let n = 0;
                
                while (n < maxIt) {
                    let zx2 = zx * zx;
                    let zy2 = zy * zy;
                    if (zx2 + zy2 > 4.0) break;
                    
                    let nextZx = zx2 - zy2 + cr;
                    let nextZy = 2.0 * zx * zy + ci;
                    zx = nextZx;
                    zy = nextZy;
                    n++;
                }
                
                let col = getPaletteColor(n, maxIt);
                setPixelGroup(x, y, col);
            }
        }
        p.updatePixels();
    }
    
    function setPixelGroup(x, y, col) {
        for (let px = 0; px < pixelScale; px++) {
            for (let py = 0; py < pixelScale; py++) {
                let sx = x + px;
                let sy = y + py;
                if (sx < canvasW && sy < canvasH) {
                    let idx = 4 * (sx + sy * canvasW);
                    p.pixels[idx] = col[0];
                    p.pixels[idx+1] = col[1];
                    p.pixels[idx+2] = col[2];
                    p.pixels[idx+3] = 255;
                }
            }
        }
    }
    
    function getPaletteColor(n, maxIt) {
        if (n === maxIt) return [10, 12, 16];
        let norm = n / maxIt;
        let r = Math.round(p.map(Math.sin(norm * p.PI * 2), -1, 1, 50, 230));
        let g = Math.round(p.map(Math.cos(norm * p.PI), -1, 1, 30, 100));
        let b = Math.round(p.map(Math.sin(norm * p.PI + p.HALF_PI), -1, 1, 150, 255));
        return [r, g, b];
    }
    
    function updateStats() {
        const stats = document.getElementById('blogFpsStats');
        if (stats) {
            stats.textContent = `FPS: ${Math.round(p.frameRate())} | MODE: ${currentMode.toUpperCase()} ${isInteracting ? '(FAST PREVIEW)' : ''}`;
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

new p5(blogFractalSketch, 'blog-fractal-canvas');
</script>
