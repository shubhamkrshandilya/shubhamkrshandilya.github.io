---
layout: newspaper
title: "Game Theory: Solving Twelve Bead"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Applied Mathematics Series"
section: "Game Theory Column"
division: "Applied Mathematics"
author: "Shubham Kumar"
volume: "I"
issue: "11"
date: 2026-07-12 04:00:00 +0530
tags: [Math, Game Theory, AI, p5.js, Minimax, Board Games]
weather: "Deep minimax alpha-beta pruning trees scanning"
ticker_index: "Minimax: Maximizer vs Minimizer | Vector check: dr1 == dr2 && dc1 == dc2 | Baro Guti"
price: "10 Credits"
---

How do computers learn to play games? While modern systems use reinforcement learning to master complex environments like Go or chess, classic strategic board games can be solved using fundamental **Graph Theory** and **Tree Search Algorithms**.

In this column, we analyze **Baro Guti (Twelve Beads)**, a traditional abstract strategy board game from South Asia, and explore how to build a mathematical coordinate model and an intelligent AI opponent using the **Minimax Algorithm**.

<div class="newspaper-clipping">
    <h3>The Minimax Dictionary</h3>
    <ul>
        <li><strong>Graph</strong>: A collection of nodes (vertices) connected by lines (edges) representing valid pathways.</li>
        <li><strong>Heuristic</strong>: A scoring function that estimates the value of a board state without searching to the absolute end of the game.</li>
        <li><strong>Pruning</strong>: Deleting search tree branches that are guaranteed to result in suboptimal outcomes, saving processor time.</li>
    </ul>
</div>

## 1. Modeling the Board as a Coordinate Graph

In twelve-bead, the board consists of **25 intersection nodes** laid out in a 5x5 grid:

$$\text{Index} = r \times 5 + c \quad (r, c \in [0, 4])$$

A slide move is only legal if the starting node $A$ and destination node $B$ are connected by a line. We represent these pathways mathematically:
*   **Horizontal / Vertical**: $|r_A - r_B| = 1$ or $|c_A - c_B| = 1$.
*   **Diagonal**: Valid only if at least one of the nodes is a diagonal center intersection:
    $$\text{Centers} = \{(1,1), (1,3), (3,1), (3,3), (2,2)\}$$

---

## 2. Vector Capture Jumps

To capture an opponent's bead, a player must jump over it in a straight line into a vacant node immediately behind it. 

To model this, we check three nodes: the start node $A$, the middle node $B$ (containing the opponent's bead), and the landing node $C$. The jump is valid if and only if the direction vector from $A \to B$ matches the vector from $B \to C$ exactly:

$$\Delta r_1 = r_B - r_A, \quad \Delta c_1 = c_B - c_A$$
$$\Delta r_2 = r_C - r_B, \quad \Delta c_2 = c_C - c_B$$
$$\Delta r_1 = \Delta r_2 \quad \text{and} \quad \Delta c_1 = \Delta c_2$$

This simple vector slope validation handles horizontal, vertical, and diagonal jumps across the entire board.

---

## 3. The Minimax Search Engine

To build the AI opponent, we implement a **Minimax Search Tree**. The engine models the game as a tree of possible future moves. The AI (Max) attempts to maximize its score, while assuming the human player (Min) will make moves to minimize it.

```
       [AI Turn (Max)]          Level 0
          /        \
     [Move 1]    [Move 2]       Level 1 (Human Turn - Min)
      /    \      /    \
    [-10]  [+5]  [+20] [-5]     Level 2 (Evaluated Leaves)
```

In the tree above, the AI chooses **Move 2** because it guarantees a score of at least `-5` (better than `-10`). To speed up computation, we use **Alpha-Beta Pruning** to stop scanning branches that are already worse than previously discovered paths.

---

<!-- Playable Game Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.01); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase;">Playable Twelve Bead Canvas</h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Play against a friend locally or challenge the Minimax AI. Click a bead to select, then click a highlighted node to move or capture.
        </p>

        <!-- Main Layout Split -->
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; align-items: flex-start; text-align: left;">
            
            <!-- Canvas Container -->
            <div id="blog-guti-canvas" style="width: 420px; height: 420px; border-radius: 12px; overflow: hidden; border: 1px solid var(--news-border); position: relative; background: #1a120b;"></div>

            <!-- Controls Panel -->
            <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 1rem; padding: 0.5rem;">
                
                <!-- Turn Info -->
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.05); padding: 0.5rem 0.75rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span style="font-weight: bold; font-size: 0.85rem;" id="blogGutiTurnText">LIGHT TURN (WHITE)</span>
                    <div id="blogGutiTurnBadge" style="width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid #fff; background: #f1f5f9;"></div>
                </div>

                <!-- Scores -->
                <div style="display: flex; gap: 0.5rem;">
                    <div style="flex: 1; text-align: center; padding: 0.5rem; background: rgba(0,0,0,0.03); border: 1px solid var(--news-border); border-radius: 4px;">
                        <span style="font-size: 0.7rem; font-weight: bold; color: var(--news-muted);">White Beads</span>
                        <div id="blogGutiWhiteScore" style="font-size: 1.4rem; font-weight: bold; margin-top: 0.15rem;">12</div>
                    </div>
                    <div style="flex: 1; text-align: center; padding: 0.5rem; background: rgba(0,0,0,0.03); border: 1px solid var(--news-border); border-radius: 4px;">
                        <span style="font-size: 0.7rem; font-weight: bold; color: var(--news-muted);">Black Beads</span>
                        <div id="blogGutiBlackScore" style="font-size: 1.4rem; font-weight: bold; margin-top: 0.15rem;">12</div>
                    </div>
                </div>

                <!-- Mode Select -->
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <span style="font-weight: bold; font-size: 0.85rem;">Opponent Selection:</span>
                    <select id="blogGutiMode" style="width: 100%; padding: 0.25rem; font-family: 'Playfair Display', serif; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-weight: bold; font-size: 0.9rem; height: 1.8rem; outline: none; cursor: pointer;">
                        <option value="pvp" selected>Player vs Player (Local)</option>
                        <option value="pve_easy">Player vs AI (Easy)</option>
                        <option value="pve_hard">Player vs AI (Hard - Minimax)</option>
                    </select>
                </div>

                <!-- Actions -->
                <button id="blogGutiReset" style="width: 100%; padding: 0.5rem; font-family: 'Playfair Display', serif; font-weight: bold; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); cursor: pointer; border-radius: 4px; margin-top: 0.5rem;">
                    Reset Game Board
                </button>

                <div style="font-size: 0.8rem; font-family: 'Courier Prime', monospace; background: rgba(0,0,0,0.05); padding: 0.5rem; border-radius: 4px; border: 1px dashed var(--news-border); margin-top: 0.5rem; text-align: center;">
                    <span id="blogGutiStatus">Select a bead to start.</span>
                </div>
            </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--news-muted); margin-top: 1.5rem; text-indent: 0; text-align: center;">
            Explore the codebase and run standalone project builds via: 
            <a href="https://github.com/shubhamkrshandilya/twelve-bead" target="_blank" rel="noopener noreferrer" style="font-weight: bold; color: var(--primary-color);">shubhamkrshandilya/twelve-bead</a>
        </p>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
const blogGutiSketch = (p) => {
    let boardState = [];
    let nodes = [];
    let selectedNodeIdx = -1;
    let currentTurn = 'white';
    let gameMode = 'pvp';
    let active = true;
    
    let canvasW = 420;
    let canvasH = 420;
    let margin = 50;
    let cellSize;
    let nodeRadius = 12;
    let primaryColor = '#d4a574';
    
    p.setup = () => {
        p.createCanvas(canvasW, canvasH);
        cellSize = (canvasW - 2 * margin) / 4;
        
        const resetBtn = document.getElementById('blogGutiReset');
        if (resetBtn) resetBtn.onclick = resetGame;
        
        const modeSelect = document.getElementById('blogGutiMode');
        if (modeSelect) {
            modeSelect.onchange = function() {
                gameMode = this.value;
                resetGame();
            };
        }
        
        initBoard();
    };
    
    p.draw = () => {
        drawBoardTexture();
        drawGridLines();
        drawNodes();
        drawPieces();
        checkGameEnd();
        
        if (active && currentTurn === 'black' && gameMode.startsWith('pve')) {
            p.noLoop();
            setTimeout(triggerAIMove, 500);
        }
    };
    
    function initBoard() {
        nodes = [];
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                nodes.push({
                    r: r,
                    c: c,
                    x: margin + c * cellSize,
                    y: margin + r * cellSize
                });
            }
        }
        
        boardState = [];
        for (let i = 0; i < 25; i++) {
            if (i < 12) boardState.push(1);
            else if (i === 12) boardState.push(0);
            else boardState.push(2);
        }
        
        selectedNodeIdx = -1;
        currentTurn = 'white';
        active = true;
        p.loop();
        updateUI();
    }
    
    function resetGame() {
        initBoard();
    }
    
    function drawBoardTexture() {
        p.background('#1a120b');
        p.noFill();
        p.stroke(40, 25, 15, 120);
        p.strokeWeight(1.5);
        for (let r = 40; r < canvasW * 1.5; r += 20) {
            p.ellipse(canvasW / 2, canvasH / 2, r, r);
        }
        p.stroke('#2d1a0f');
        p.strokeWeight(8);
        p.rect(0, 0, canvasW, canvasH, 12);
    }
    
    function drawGridLines() {
        p.stroke(primaryColor);
        p.strokeWeight(3);
        
        for (let r = 0; r < 5; r++) {
            let y = margin + r * cellSize;
            p.line(margin, y, canvasW - margin, y);
        }
        for (let c = 0; c < 5; c++) {
            let x = margin + c * cellSize;
            p.line(x, margin, x, canvasW - margin);
        }
        
        p.line(margin, margin, canvasW - margin, canvasW - margin);
        p.line(canvasW - margin, margin, margin, canvasW - margin);
        
        let mid = canvasW / 2;
        p.line(margin, mid, mid, margin);
        p.line(mid, margin, canvasW - margin, mid);
        p.line(canvasW - margin, mid, mid, canvasW - margin);
        p.line(mid, canvasW - margin, margin, mid);
    }
    
    function drawNodes() {
        p.noStroke();
        for (let i = 0; i < 25; i++) {
            let n = nodes[i];
            if (selectedNodeIdx === i) {
                p.fill('rgba(212, 165, 116, 0.4)');
                p.ellipse(n.x, n.y, nodeRadius * 2.8, nodeRadius * 2.8);
            }
            if (selectedNodeIdx !== -1 && boardState[i] === 0) {
                if (isValidSlide(selectedNodeIdx, i) || isValidCapture(selectedNodeIdx, i)) {
                    p.fill('rgba(56, 161, 105, 0.5)');
                    p.ellipse(n.x, n.y, nodeRadius * 2, nodeRadius * 2);
                }
            }
            p.fill('#2d1a0f');
            p.ellipse(n.x, n.y, 6, 6);
        }
    }
    
    function drawPieces() {
        for (let i = 0; i < 25; i++) {
            let type = boardState[i];
            if (type === 0) continue;
            let n = nodes[i];
            
            p.push();
            p.translate(n.x, n.y);
            p.noStroke();
            
            if (type === 1) {
                p.fill(0, 0, 0, 60);
                p.ellipse(1.5, 2, nodeRadius * 2, nodeRadius * 2);
                p.fill('#f8fafc');
                p.ellipse(0, 0, nodeRadius * 2, nodeRadius * 2);
                p.fill(226, 232, 240, 100);
                p.ellipse(0, 0, nodeRadius * 1.8, nodeRadius * 1.8);
                p.fill(255, 255, 255, 200);
                p.ellipse(-nodeRadius*0.3, -nodeRadius*0.3, nodeRadius*0.5, nodeRadius*0.35);
            } else {
                p.fill(0, 0, 0, 100);
                p.ellipse(1.5, 2, nodeRadius * 2, nodeRadius * 2);
                p.fill('#78350f');
                p.ellipse(0, 0, nodeRadius * 2, nodeRadius * 2);
                p.fill('#0f172a');
                p.ellipse(0, 0, nodeRadius * 1.7, nodeRadius * 1.7);
                p.fill(255, 255, 255, 120);
                p.ellipse(-nodeRadius*0.25, -nodeRadius*0.25, nodeRadius*0.4, nodeRadius*0.25);
            }
            p.pop();
        }
    }
    
    p.mousePressed = () => {
        if (!active) return;
        if (currentTurn === 'black' && gameMode.startsWith('pve')) return;
        
        let clicked = -1;
        for (let i = 0; i < 25; i++) {
            let d = p.dist(p.mouseX, p.mouseY, nodes[i].x, nodes[i].y);
            if (d < 22) {
                clicked = i;
                break;
            }
        }
        if (clicked === -1) return;
        
        let activePiece = (currentTurn === 'white') ? 1 : 2;
        if (boardState[clicked] === activePiece) {
            selectedNodeIdx = clicked;
            document.getElementById('blogGutiStatus').textContent = `Bead selected at node ${clicked}.`;
            return;
        }
        
        if (selectedNodeIdx !== -1 && boardState[clicked] === 0) {
            if (isValidSlide(selectedNodeIdx, clicked)) {
                executeMove(selectedNodeIdx, clicked, null);
            } else {
                let mid = isValidCapture(selectedNodeIdx, clicked);
                if (mid !== null) {
                    executeMove(selectedNodeIdx, clicked, mid);
                }
            }
        }
    };
    
    function areConnected(idx1, idx2) {
        let n1 = nodes[idx1];
        let n2 = nodes[idx2];
        if (n1.r === n2.r && p.abs(n1.c - n2.c) === 1) return true;
        if (n1.c === n2.c && p.abs(n1.r - n2.r) === 1) return true;
        if (p.abs(n1.r - n2.r) === 1 && p.abs(n1.c - n2.c) === 1) {
            const centers = [6, 8, 12, 16, 18];
            if (centers.includes(idx1) || centers.includes(idx2)) return true;
        }
        return false;
    }
    
    function isValidSlide(from, to) {
        if (boardState[to] !== 0) return false;
        return areConnected(from, to);
    }
    
    function isValidCapture(from, to) {
        if (boardState[to] !== 0) return null;
        let nF = nodes[from];
        let nT = nodes[to];
        let rD = nT.r - nF.r;
        let cD = nT.c - nF.c;
        
        // Enforce straight leaps of exactly 2 steps distance
        if ((p.abs(rD) === 2 && cD === 0) || 
            (p.abs(cD) === 2 && rD === 0) || 
            (p.abs(rD) === 2 && p.abs(cD) === 2)) {
            
            let mR = nF.r + rD / 2;
            let mC = nF.c + cD / 2;
            let mid = mR * 5 + mC;
            if (areConnected(from, mid) && areConnected(mid, to)) {
                let opponent = (currentTurn === 'white') ? 2 : 1;
                if (boardState[mid] === opponent) return mid;
            }
        }
        return null;
    }
    
    function executeMove(from, to, mid) {
        let val = boardState[from];
        boardState[from] = 0;
        boardState[to] = val;
        if (mid !== null) boardState[mid] = 0;
        
        selectedNodeIdx = -1;
        currentTurn = (currentTurn === 'white') ? 'black' : 'white';
        updateUI();
    }
    
    function updateUI() {
        let w = 0, b = 0;
        for (let i = 0; i < 25; i++) {
            if (boardState[i] === 1) w++;
            if (boardState[i] === 2) b++;
        }
        
        document.getElementById('blogGutiWhiteScore').textContent = w;
        document.getElementById('blogGutiBlackScore').textContent = b;
        
        const turnText = document.getElementById('blogGutiTurnText');
        const turnBadge = document.getElementById('blogGutiTurnBadge');
        if (turnText && turnBadge) {
            if (currentTurn === 'white') {
                turnText.textContent = "LIGHT TURN (WHITE)";
                turnBadge.style.background = '#f1f5f9';
                turnBadge.style.borderColor = '#fff';
            } else {
                turnText.textContent = "DARK TURN (BLACK)";
                turnBadge.style.background = '#0f172a';
                turnBadge.style.borderColor = primaryColor;
            }
        }
        document.getElementById('blogGutiStatus').textContent = (currentTurn === 'white') ? "Waiting for White move..." : "Waiting for Black move...";
    }
    
    function checkGameEnd() {
        let w = 0, b = 0;
        for (let i = 0; i < 25; i++) {
            if (boardState[i] === 1) w++;
            if (boardState[i] === 2) b++;
        }
        if ((w === 0 || b === 0) && active) {
            active = false;
            let winner = (w === 0) ? "Dark Beads (Black)" : "Light Beads (White)";
            document.getElementById('blogGutiStatus').textContent = `GAME OVER. ${winner} wins!`;
            p.fill('rgba(12, 14, 18, 0.85)');
            p.rect(0, 0, canvasW, canvasH, 12);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(24);
            p.fill(primaryColor);
            p.text("VICTORY SECURED", canvasW/2, canvasH/2 - 15);
            p.textSize(12);
            p.fill('#f1f5f9');
            p.text(`${winner} captured all forces.`, canvasW/2, canvasH/2 + 15);
        }
    }
    
    function triggerAIMove() {
        if (!active || currentTurn !== 'black') return;
        let move = null;
        if (gameMode === 'pve_easy') {
            move = getRandomMove();
        } else if (gameMode === 'pve_hard') {
            move = getMinimaxMove();
        }
        if (move) {
            executeMove(move.from, move.to, move.capture);
        } else {
            currentTurn = 'white';
            updateUI();
        }
        p.loop();
    }
    
    function getAllMoves(player) {
        let moves = [];
        let captures = [];
        for (let i = 0; i < 25; i++) {
            if (boardState[i] !== player) continue;
            for (let t = 0; t < 25; t++) {
                if (boardState[t] !== 0) continue;
                let mid = getCaptureMid(i, t, player);
                if (mid !== null) {
                    captures.push({ from: i, to: t, capture: mid });
                }
                if (areConnected(i, t)) {
                    moves.push({ from: i, to: t, capture: null });
                }
            }
        }
        return captures.length > 0 ? captures : moves;
    }
    
    function getCaptureMid(from, to, player) {
        let nF = nodes[from];
        let nT = nodes[to];
        let rD = nT.r - nF.r;
        let cD = nT.c - nF.c;
        
        // Enforce straight leaps of exactly 2 steps distance
        if ((p.abs(rD) === 2 && cD === 0) || 
            (p.abs(cD) === 2 && rD === 0) || 
            (p.abs(rD) === 2 && p.abs(cD) === 2)) {
            
            let mR = nF.r + rD / 2;
            let mC = nF.c + cD / 2;
            let mid = mR * 5 + mC;
            if (areConnected(from, mid) && areConnected(mid, to)) {
                let opponent = (player === 1) ? 2 : 1;
                if (boardState[mid] === opponent) return mid;
            }
        }
        return null;
    }
    
    function getRandomMove() {
        let moves = getAllMoves(2);
        if (moves.length === 0) return null;
        return p.random(moves);
    }
    
    function getMinimaxMove() {
        let bestVal = -Infinity;
        let bestMove = null;
        let moves = getAllMoves(2);
        if (moves.length === 0) return null;
        moves.sort((a,b) => (b.capture !== null) - (a.capture !== null));
        for (let move of moves) {
            let oldFrom = boardState[move.from];
            let oldTo = boardState[move.to];
            let oldCap = move.capture !== null ? boardState[move.capture] : 0;
            
            boardState[move.from] = 0;
            boardState[move.to] = 2;
            if (move.capture !== null) boardState[move.capture] = 0;
            
            let val = minimax(boardState, 3, -Infinity, Infinity, false);
            
            boardState[move.from] = oldFrom;
            boardState[move.to] = oldTo;
            if (move.capture !== null) boardState[move.capture] = oldCap;
            
            if (val > bestVal) {
                bestVal = val;
                bestMove = move;
            }
        }
        return bestMove;
    }
    
    function minimax(state, depth, alpha, beta, isMax) {
        let w = 0, b = 0;
        for (let i = 0; i < 25; i++) {
            if (state[i] === 1) w++;
            if (state[i] === 2) b++;
        }
        if (depth === 0 || w === 0 || b === 0) return evaluateState(w, b);
        
        if (isMax) {
            let maxEval = -Infinity;
            let moves = getAllMoves(2);
            if (moves.length === 0) return evaluateState(w, b);
            for (let move of moves) {
                let oldF = state[move.from];
                let oldT = state[move.to];
                let oldC = move.capture !== null ? state[move.capture] : 0;
                state[move.from] = 0;
                state[move.to] = 2;
                if (move.capture !== null) state[move.capture] = 0;
                
                let score = minimax(state, depth-1, alpha, beta, false);
                
                state[move.from] = oldF;
                state[move.to] = oldT;
                if (move.capture !== null) state[move.capture] = oldC;
                
                maxEval = p.max(maxEval, score);
                alpha = p.max(alpha, score);
                if (beta <= alpha) break;
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            let moves = getAllMoves(1);
            if (moves.length === 0) return evaluateState(w, b);
            for (let move of moves) {
                let oldF = state[move.from];
                let oldT = state[move.to];
                let oldC = move.capture !== null ? state[move.capture] : 0;
                state[move.from] = 0;
                state[move.to] = 1;
                if (move.capture !== null) state[move.capture] = 0;
                
                let score = minimax(state, depth-1, alpha, beta, true);
                
                state[move.from] = oldF;
                state[move.to] = oldT;
                if (move.capture !== null) state[move.capture] = oldC;
                
                minEval = p.min(minEval, score);
                beta = p.min(beta, score);
                if (beta <= alpha) break;
            }
            return minEval;
        }
    }
    
    function evaluateState(w, b) {
        let score = (b - w) * 100;
        for (let i = 0; i < 25; i++) {
            if (boardState[i] === 2) {
                if (i === 12) score += 8;
                else if ([6,8,16,18].includes(i)) score += 3;
            } else if (boardState[i] === 1) {
                if (i === 12) score -= 8;
                else if ([6,8,16,18].includes(i)) score -= 3;
            }
        }
        score += p.random(-2, 2);
        return score;
    }
};

new p5(blogGutiSketch, 'blog-guti-canvas');
</script>
