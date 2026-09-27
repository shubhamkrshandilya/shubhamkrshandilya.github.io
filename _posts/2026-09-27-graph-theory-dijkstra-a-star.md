---
layout: newspaper
title: "Graph Theory: Shortest Paths with Dijkstra & A* Search"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Algorithms Series"
section: "Graph Theory Branch"
division: "Computer Science"
author: "Shubham Kumar"
volume: "I"
issue: "21"
date: 2026-09-27 20:30:00 +0530
tags: [Computer Science, Graph Theory, Algorithms, Pathfinding, p5.js, Education]
weather: "Priority queues expanding path frontiers through maze obstacles"
ticker_index: "Dijkstra: f(n) = g(n) | A* Search: f(n) = g(n) + h(n) | Admissible heuristic: h(n) ≤ h*(n)"
price: "10 Credits"
---

In 1956, twenty-six-year-old Dutch computer scientist **Edsger W. Dijkstra** was out shopping with his fiancée in Amsterdam. Pausing at a café terrace, he wondered: What is the fastest, cleanest way to calculate the shortest driving route between two cities on a map of the Netherlands?

Without pen or paper, in less than twenty minutes of mental concentration, Dijkstra designed the algorithm that would become the foundation of modern digital transit: **Dijkstra's Shortest Path Algorithm**.

Today, from satellite GPS navigation and Amazon warehouse robots to fiber optic packet routing and game AI pathfinding, finding the optimal path through a weighted network remains one of the most vital algorithmic problems in computer science.

<div class="newspaper-clipping">
    <h3>The Graph Lexicon</h3>
    <ul>
        <li><strong>Graph $G = (V, E)$</strong>: A collection of vertices (nodes) $V$ connected by pairwise edges $E$ with non-negative traversal weights $w(u, v) \ge 0$.</li>
        <li><strong>Greedy Relaxation</strong>: Updating the known shortest distance to a neighbor node if traveling through the current node yields a lower cost.</li>
        <li><strong>Priority Queue (Min-Heap)</strong>: A data structure that retrieves the unvisited node with the lowest tentative distance in $\mathcal{O}(\log V)$ time.</li>
        <li><strong>Heuristic Function $h(n)$</strong>: An estimate of the remaining travel cost from node $n$ to the target.</li>
        <li><strong>Admissibility</strong>: The mathematical guarantee that a heuristic never overestimates the true cost ($h(n) \le h^*(n)$), ensuring A* always returns the mathematically optimal shortest path.</li>
    </ul>
</div>

---

## 1. Dijkstra's Algorithm: Uniform Radial Search

Dijkstra's algorithm operates on a simple, greedy principle: maintain a set of tentative distances $d[v]$ for every vertex, initialized to $\infty$ (with $d[\text{start}] = 0$).

At each step:
1. Extract the unvisited vertex $u$ with the minimum tentative distance from a Priority Queue.
2. For each neighbor $v$ of $u$, perform **relaxation**:
   $$\text{if } d[u] + w(u, v) < d[v] \implies d[v] = d[u] + w(u, v)$$
3. Mark $u$ as visited. Repeat until the target vertex is reached.

```
 Algorithm Complexity (Binary Heap):
 Time:   O((|V| + |E|) log |V|)
 Space:  O(|V|)
```

### The Blindspot of Dijkstra
Dijkstra's algorithm is completely unbiased. Because it has no concept of where the target lies in physical space, it expands outwards uniformly in all directions like an expanding circle of water ripples. If the target is due East, Dijkstra will waste thousands of operations exploring uselessly to the North, South, and West before stumbling upon the destination!

---

## 2. A* Search: Directed Heuristic Intelligence

In 1968, Peter Hart, Nils Nilsson, and Bertram Raphael at the Stanford Research Institute were developing Shakey the Robot—the world's first mobile, intelligent robot. Shakey needed to navigate obstacle-strewn rooms in real-time, but Dijkstra was too slow.

They augmented Dijkstra by adding a **heuristic function $h(n)$**, giving birth to **A\* Search**:

$$f(n) = g(n) + h(n)$$

Where:
* $g(n)$ is the exact, known cost incurred so far from the start node to node $n$.
* $h(n)$ is the estimated heuristic distance from node $n$ to the destination target.
* $f(n)$ is the total estimated cost of the cheapest solution passing through $n$.

```
           [ Start ]
              |
              |   g(n): Exact cost traveled so far
              v
           [ Node n ]
              :
              :   h(n): Estimated straight-line heuristic distance
              v
           [ Goal ]
```

On a 2D grid, we frequently use the **Manhattan Distance** ($L_1$ norm) or **Euclidean Distance** ($L_2$ norm):

$$h_{\text{Manhattan}}(n) = |x_n - x_{\text{goal}}| + |y_n - y_{\text{goal}}|$$

Because $h(n)$ pulls the priority queue toward the goal, A* focuses its search into a directed beam, cutting the number of explored nodes by up to **80%** while guaranteeing the exact same shortest path!

---

<!-- Dynamic p5.js Interactive Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.02); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">
            Interactive Dijkstra vs A* Pathfinding Grid Laboratory
        </h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Click and drag on the grid to build obstacle walls. Toggle between Dijkstra and A* to see how heuristic foresight cuts search time in half.
        </p>

        <!-- Canvas Container -->
        <div id="pathfinding-canvas-container" style="width: 100%; height: 440px; border-radius: 8px; overflow: hidden; border: 1px solid var(--news-border); margin-bottom: 1.5rem; position: relative; background: #06090e; cursor: crosshair;"></div>

        <!-- Interactive Controls HUD -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 820px; margin: 0 auto; padding: 0.5rem; text-align: left;">
            
            <!-- Action Bar -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
                
                <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
                    <select id="pf-algo-select" style="padding: 0.45rem 0.85rem; font-family: 'Playfair Display', serif; font-weight: bold; background: var(--news-bg); color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer; font-size: 0.9rem;">
                        <option value="astar" selected>A* Search (Heuristic f = g + h)</option>
                        <option value="dijkstra">Dijkstra's (Pure Cost f = g)</option>
                    </select>

                    <button id="pf-run-btn" style="padding: 0.5rem 1.25rem; font-family: 'Playfair Display', serif; font-weight: bold; background: var(--news-ink); color: var(--news-bg); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                        ▶ Run Pathfinding
                    </button>

                    <button id="pf-maze-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Generate Maze
                    </button>

                    <button id="pf-clear-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Clear Walls
                    </button>
                </div>

                <!-- Legend -->
                <div style="display: flex; gap: 0.75rem; font-family: 'Courier Prime', monospace; font-size: 0.78rem;">
                    <span><strong style="color: #48bb78;">■</strong> Start</span>
                    <span><strong style="color: #e53e3e;">■</strong> Goal</span>
                    <span><strong style="color: #3182ce;">■</strong> Visited</span>
                    <span><strong style="color: #ecc94b;">■</strong> Path</span>
                </div>
            </div>

            <!-- Telemetry Badges -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-family: 'Courier Prime', monospace; font-size: 0.82rem; border-top: 1px dashed var(--news-border); padding-top: 1rem;">
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Algorithm: </span><strong id="pf-tel-algo" style="color: var(--primary-color);">A* Search</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Nodes Explored: </span><strong id="pf-tel-explored" style="color: #3182ce;">0</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Shortest Path Length: </span><strong id="pf-tel-pathlen" style="color: #ecc94b;">0 steps</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Search Status: </span><strong id="pf-tel-status" style="color: #48bb78;">Ready</strong>
                </div>
            </div>

        </div>
    </div>
</div>

---

## 3. Comparing Algorithm Performance

| Property | Breadth-First Search (BFS) | Dijkstra's Algorithm | A* Search Algorithm |
| :--- | :--- | :--- | :--- |
| **Edge Weights** | Unweighted ($w = 1$) | Any non-negative ($w \ge 0$) | Any non-negative ($w \ge 0$) |
| **Heuristic Function** | None | None ($h(n) = 0$) | Admissible $h(n) \le h^*(n)$ |
| **Search Space** | Uniform radial wavefront | Uniform radial wavefront | Directed elliptical cone |
| **Optimality** | Guaranteed (shortest hops) | Guaranteed (cheapest cost) | Guaranteed (if $h$ admissible) |
| **Typical Efficiency** | High memory overhead | Explores whole graph | Explores minimum necessary |

<!-- p5.js CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>

<script>
const pathfindingSketch = (p) => {
    const cols = 32;
    const rows = 18;
    let grid = [];
    let cellSize = 22;
    let offsetX = 0, offsetY = 0;

    let startNode = { x: 3, y: 9 };
    let goalNode = { x: 28, y: 9 };

    let algo = "astar";
    let isRunning = false;
    let openSet = [];
    let closedSet = [];
    let path = [];

    p.setup = () => {
        const container = document.getElementById('pathfinding-canvas-container');
        const w = container ? container.clientWidth : 800;
        const h = container ? container.clientHeight : 440;
        const canvas = p.createCanvas(w, h);
        canvas.parent('pathfinding-canvas-container');

        initGrid();

        // UI Linkages
        const algoSelect = document.getElementById('pf-algo-select');
        if (algoSelect) {
            algoSelect.addEventListener('change', (e) => {
                algo = e.target.value;
                document.getElementById('pf-tel-algo').textContent = algo === "astar" ? "A* Search" : "Dijkstra's";
                resetSearch();
            });
        }

        const runBtn = document.getElementById('pf-run-btn');
        if (runBtn) runBtn.addEventListener('click', startSearch);

        const mazeBtn = document.getElementById('pf-maze-btn');
        if (mazeBtn) mazeBtn.addEventListener('click', generateRandomMaze);

        const clearBtn = document.getElementById('pf-clear-btn');
        if (clearBtn) clearBtn.addEventListener('click', clearWalls);
    };

    function initGrid() {
        grid = [];
        for (let x = 0; x < cols; x++) {
            grid[x] = [];
            for (let y = 0; y < rows; y++) {
                grid[x][y] = {
                    x: x,
                    y: y,
                    isWall: false,
                    g: Infinity,
                    h: 0,
                    f: Infinity,
                    parent: null
                };
            }
        }
    }

    function clearWalls() {
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                grid[x][y].isWall = false;
            }
        }
        resetSearch();
    }

    function generateRandomMaze() {
        clearWalls();
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                if ((x === startNode.x && y === startNode.y) || (x === goalNode.x && y === goalNode.y)) continue;
                if (p.random() < 0.28) {
                    grid[x][y].isWall = true;
                }
            }
        }
        resetSearch();
    }

    function resetSearch() {
        isRunning = false;
        openSet = [];
        closedSet = [];
        path = [];

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                grid[x][y].g = Infinity;
                grid[x][y].h = 0;
                grid[x][y].f = Infinity;
                grid[x][y].parent = null;
            }
        }

        const expEl = document.getElementById('pf-tel-explored');
        const plEl = document.getElementById('pf-tel-pathlen');
        const stEl = document.getElementById('pf-tel-status');
        if (expEl) expEl.textContent = "0";
        if (plEl) plEl.textContent = "0 steps";
        if (stEl) {
            stEl.textContent = "Ready";
            stEl.style.color = "#48bb78";
        }
    }

    function startSearch() {
        resetSearch();
        isRunning = true;

        let start = grid[startNode.x][startNode.y];
        start.g = 0;
        start.h = algo === "astar" ? heuristic(start, grid[goalNode.x][goalNode.y]) : 0;
        start.f = start.g + start.h;

        openSet.push(start);

        const stEl = document.getElementById('pf-tel-status');
        if (stEl) {
            stEl.textContent = "Searching...";
            stEl.style.color = "#3182ce";
        }
    }

    function heuristic(a, b) {
        // Manhattan distance
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    p.windowResized = () => {
        const container = document.getElementById('pathfinding-canvas-container');
        if (container) {
            p.resizeCanvas(container.clientWidth, container.clientHeight);
        }
    };

    p.draw = () => {
        p.background(6, 9, 14);

        cellSize = p.min((p.width - 20) / cols, (p.height - 20) / rows);
        offsetX = (p.width - cols * cellSize) / 2;
        offsetY = (p.height - rows * cellSize) / 2;

        // Pathfinding step loop (advance 4 steps per frame for smooth animation)
        if (isRunning) {
            for (let step = 0; step < 3; step++) {
                stepPathfinding();
            }
        }

        // Draw grid cells
        p.stroke(255, 255, 255, 10);
        p.strokeWeight(1);

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                let cell = grid[x][y];
                let px = offsetX + x * cellSize;
                let py = offsetY + y * cellSize;

                if (cell.isWall) {
                    p.fill(35, 40, 55);
                } else if (x === startNode.x && y === startNode.y) {
                    p.fill(72, 187, 120);
                } else if (x === goalNode.x && y === goalNode.y) {
                    p.fill(229, 62, 62);
                } else if (isInPath(cell)) {
                    p.fill(236, 201, 75);
                } else if (closedSet.includes(cell)) {
                    p.fill(49, 130, 206, 120);
                } else if (openSet.includes(cell)) {
                    p.fill(72, 187, 120, 60);
                } else {
                    p.fill(14, 18, 26);
                }

                p.rect(px, py, cellSize, cellSize, 2);
            }
        }

        // Handle wall drawing via mouse drag
        if (p.mouseIsPressed && !isRunning) {
            let gx = Math.floor((p.mouseX - offsetX) / cellSize);
            let gy = Math.floor((p.mouseY - offsetY) / cellSize);
            if (gx >= 0 && gx < cols && gy >= 0 && gy < rows) {
                if (!(gx === startNode.x && gy === startNode.y) && !(gx === goalNode.x && gy === goalNode.y)) {
                    grid[gx][gy].isWall = true;
                }
            }
        }
    };

    p.touchMoved = () => {
        if (!isRunning) {
            let gx = Math.floor((p.mouseX - offsetX) / cellSize);
            let gy = Math.floor((p.mouseY - offsetY) / cellSize);
            if (gx >= 0 && gx < cols && gy >= 0 && gy < rows) {
                if (!(gx === startNode.x && gy === startNode.y) && !(gx === goalNode.x && gy === goalNode.y)) {
                    grid[gx][gy].isWall = true;
                }
                return false;
            }
        }
        return true;
    };

    function isInPath(cell) {
        return path.some(p => p.x === cell.x && p.y === cell.y);
    }

    function stepPathfinding() {
        if (openSet.length === 0) {
            isRunning = false;
            const stEl = document.getElementById('pf-tel-status');
            if (stEl) {
                stEl.textContent = "No Path Found! (Blocked)";
                stEl.style.color = "#e53e3e";
            }
            return;
        }

        // Find node with lowest f
        let lowestIndex = 0;
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i;
            }
        }

        let current = openSet.splice(lowestIndex, 1)[0];
        closedSet.push(current);

        // Update explored count
        const expEl = document.getElementById('pf-tel-explored');
        if (expEl) expEl.textContent = closedSet.length;

        // Check if reached goal
        if (current.x === goalNode.x && current.y === goalNode.y) {
            isRunning = false;
            reconstructPath(current);
            const stEl = document.getElementById('pf-tel-status');
            if (stEl) {
                stEl.textContent = "Goal Reached!";
                stEl.style.color = "#ecc94b";
            }
            return;
        }

        // Check 4-directional orthogonal neighbors
        const neighbors = [
            { x: current.x + 1, y: current.y },
            { x: current.x - 1, y: current.y },
            { x: current.x, y: current.y + 1 },
            { x: current.x, y: current.y - 1 }
        ];

        for (let n of neighbors) {
            if (n.x < 0 || n.x >= cols || n.y < 0 || n.y >= rows) continue;
            let neighbor = grid[n.x][n.y];

            if (neighbor.isWall || closedSet.includes(neighbor)) continue;

            let tentativeG = current.g + 1;

            if (tentativeG < neighbor.g) {
                neighbor.parent = current;
                neighbor.g = tentativeG;
                neighbor.h = algo === "astar" ? heuristic(neighbor, grid[goalNode.x][goalNode.y]) : 0;
                neighbor.f = neighbor.g + neighbor.h;

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    function reconstructPath(current) {
        path = [];
        let temp = current;
        while (temp) {
            path.push(temp);
            temp = temp.parent;
        }
        const plEl = document.getElementById('pf-tel-pathlen');
        if (plEl) plEl.textContent = path.length + " steps";
    }
};

new p5(pathfindingSketch, 'pathfinding-canvas-container');
</script>
