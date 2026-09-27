---
layout: newspaper
title: "System Architecture: The Anatomy of an O(1) LRU Cache"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Computer Systems Edition"
section: "Memory Systems Branch"
division: "Computer Science"
author: "Shubham Kumar"
volume: "I"
issue: "23"
date: 2026-09-27 21:30:00 +0530
tags: [Computer Science, System Design, Data Structures, Caching, LRU Cache, p5.js, Education]
weather: "High-frequency cache hits bypassing disk I/O latency bottlenecks"
ticker_index: "LRU: HashMap + DoublyLinkedList | Lookup: O(1) | Insertion: O(1) | Eviction: O(1)"
price: "10 Credits"
---

In modern computing, memory is a hierarchy of extreme contrasts. A CPU L1 cache register responds in **0.5 nanoseconds**, while main system RAM takes roughly **100 nanoseconds**, and fetching a database record from an SSD or network takes upwards of **10,000,000 nanoseconds**.

To prevent high-performance operating systems, web browsers, and distributed databases from grinding to a halt, engineers rely on a foundational principle: **The Principle of Locality**.

Programs tend to reuse data and instructions they have referenced recently (**Temporal Locality**). Because fast memory is scarce and expensive, systems deploy a cache. But when the cache fills up, a critical question arises: *Which record should be discarded to make room for new data?*

The industry standard answer is the **Least Recently Used (LRU) Cache**: a design that evicts the item that has sat untouched for the longest time.

<div class="newspaper-clipping">
    <h3>The Caching Glossary</h3>
    <ul>
        <li><strong>Cache Hit</strong>: The requested key exists in the cache, returning immediately in $\mathcal{O}(1)$ time.</li>
        <li><strong>Cache Miss</strong>: The key is absent, forcing an expensive fetch from secondary storage or a database.</li>
        <li><strong>Eviction Policy</strong>: The algorithmic rule used to discard old items when the cache reaches maximum capacity.</li>
        <li><strong>Doubly Linked List (DLL)</strong>: A linear sequence of nodes where each node contains pointers to both its predecessor (`prev`) and successor (`next`), enabling $\mathcal{O}(1)$ arbitrary node removal.</li>
        <li><strong>Hash Map</strong>: An associative array mapping keys to memory pointers in $\mathcal{O}(1)$ average time.</li>
    </ul>
</div>

---

## 1. The Algorithmic Dilemma: Why Naive Approaches Fail

To build an LRU cache, we need two core operations:
1. `get(key)`: Retrieve value and mark as most recently used.
2. `put(key, value)`: Insert key-value pair, evicting the least recently used entry if full.

Both operations must execute in strictly **constant time: $\mathcal{O}(1)$**.

Why do single data structures fail?
* **A Pure Hash Map**: Provides $\mathcal{O}(1)$ lookups, but maps have no inherent order. Finding the oldest item requires scanning all entries: an unacceptable **$\mathcal{O}(n)$** operation.
* **An Array or Queue**: Maintains order, but finding a key requires linear search **$\mathcal{O}(n)$**, and moving an item to the front requires shifting elements: **$\mathcal{O}(n)$**.
* **A Singly Linked List**: Allows fast insertion, but removing an arbitrary node requires finding its predecessor, which takes **$\mathcal{O}(n)$** traversal time.

---

## 2. The Architectural Masterpiece: Hash Map + Doubly Linked List

The solution is an elegant hybrid of two data structures working in unison:

```
  [ Hash Map ]
  Key "A" ===> [ Node A ] <====== (Pointer Resolution in O(1))
  Key "B" ===> [ Node B ]
  Key "C" ===> [ Node C ]

  [ Doubly Linked List (Temporal Ordering) ]
  HEAD (MRU) <-> [ Node C ] <-> [ Node A ] <-> [ Node B ] <-> TAIL (LRU)
  (Most Recent)                                              (Next to Evict)
```

1. **The Doubly Linked List** stores the actual data nodes ordered by recency of use:
   * The **Head** always points to the **Most Recently Used (MRU)** item.
   * The **Tail** always points to the **Least Recently Used (LRU)** item.
2. **The Hash Map** maps each `Key` directly to the `Node Pointer` in the list.

### Executing `get(key)` in $\mathcal{O}(1)$:
1. Query the Hash Map. If absent $\to$ return -1 (Cache Miss).
2. If present $\to$ retrieve the node pointer directly.
3. Splice the node out of its current position by updating its neighbors:
   $$\text{node.prev.next} = \text{node.next}, \quad \text{node.next.prev} = \text{node.prev}$$
4. Re-attach the node directly after the dummy `Head` (marking it as MRU). Return value.

### Executing `put(key, value)` in $\mathcal{O}(1)$:
1. If the key already exists: update its value and promote it to `Head`.
2. If the key is new:
   * If `cache.size == capacity`: Extract the node at `Tail.prev` (the LRU node). Delete it from the list and delete its key from the Hash Map in $\mathcal{O}(1)$!
   * Instantiate a new node, insert it at `Head.next`, and register it in the Hash Map.

```
 Operation Complexity:
 get(key):        O(1)
 put(key, val):   O(1)
 Eviction:        O(1)
 Overall Space:   O(Capacity)
```

---

<!-- Dynamic p5.js Interactive Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.02); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">
            Interactive O(1) LRU Cache Architecture Simulator
        </h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Watch the Hash Map and Doubly Linked List collaborate in real time. Access existing keys to promote them to the Head (MRU), and overflow capacity (4 slots) to trigger instant eviction at the Tail (LRU).
        </p>

        <!-- Canvas Container -->
        <div id="lru-canvas-container" style="width: 100%; height: 420px; border-radius: 8px; overflow: hidden; border: 1px solid var(--news-border); margin-bottom: 1.5rem; position: relative; background: #06090e;"></div>

        <!-- Interactive Controls HUD -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 820px; margin: 0 auto; padding: 0.5rem; text-align: left;">
            
            <!-- Action Bar -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
                
                <!-- Put Controls -->
                <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                    <input type="text" id="lru-key-input" placeholder="Key (e.g. A)" maxlength="3" style="width: 85px; padding: 0.45rem 0.65rem; font-family: 'Courier Prime', monospace; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-size: 0.95rem; outline: none; text-transform: uppercase;">
                    <input type="number" id="lru-val-input" placeholder="Val" min="1" max="999" style="width: 85px; padding: 0.45rem 0.65rem; font-family: 'Courier Prime', monospace; border: 1px solid var(--news-border); background: var(--news-bg); color: var(--news-ink); border-radius: 4px; font-size: 0.95rem; outline: none;">
                    
                    <button id="lru-put-btn" style="padding: 0.5rem 1.15rem; font-family: 'Playfair Display', serif; font-weight: bold; background: var(--news-ink); color: var(--news-bg); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                        put(k, v)
                    </button>
                    <button id="lru-get-btn" style="padding: 0.5rem 1.15rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        get(k)
                    </button>
                </div>

                <!-- Simulation Presets -->
                <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
                    <button id="lru-traffic-btn" style="padding: 0.5rem 0.9rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Simulate Traffic (Puts/Gets)
                    </button>
                    <button id="lru-reset-btn" style="padding: 0.5rem 0.9rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Clear Cache
                    </button>
                </div>
            </div>

            <!-- Telemetry Badges -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-family: 'Courier Prime', monospace; font-size: 0.82rem; border-top: 1px dashed var(--news-border); padding-top: 1rem;">
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Capacity: </span><strong style="color: var(--primary-color);">4 Slots</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Cache Hits: </span><strong id="lru-tel-hits" style="color: #48bb78;">0</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Cache Misses: </span><strong id="lru-tel-misses" style="color: #e53e3e;">0</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Evictions: </span><strong id="lru-tel-evictions" style="color: #ed8936;">0</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Last Action: </span><strong id="lru-tel-action" style="color: #3182ce;">Ready</strong>
                </div>
            </div>

        </div>
    </div>
</div>

---

## 3. Real-World Systems Utilizing LRU Caches

* **Linux Kernel Page Cache**: Virtual memory management in the Linux kernel uses a variation of the LRU algorithm (the **Active/Inactive list split**) to decide which 4KB physical RAM pages to flush to swap space when RAM runs low.
* **Redis & Memcached**: The world's most popular in-memory key-value stores provide explicit `allkeys-lru` and `volatile-lru` eviction flags, allowing distributed backend microservices to cache database queries without running out of RAM.
* **Web Browsers**: Your browser caches DNS resolutions, HTTP responses, CSS stylesheets, and image assets using an LRU cache so visiting back-pages loads instantaneously.

<!-- p5.js CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>

<script>
const lruSketch = (p) => {
    const capacity = 4;
    let cacheMap = new Map(); // Key -> Node
    let head = { key: "HEAD", val: "MRU", prev: null, next: null };
    let tail = { key: "TAIL", val: "LRU", prev: null, next: null };

    let hits = 0;
    let misses = 0;
    let evictions = 0;
    let lastAction = "Initialized";

    p.setup = () => {
        const container = document.getElementById('lru-canvas-container');
        const w = container ? container.clientWidth : 800;
        const h = container ? container.clientHeight : 420;
        const canvas = p.createCanvas(w, h);
        canvas.parent('lru-canvas-container');

        head.next = tail;
        tail.prev = head;

        // UI Linkages
        const keyInput = document.getElementById('lru-key-input');
        const valInput = document.getElementById('lru-val-input');

        const putBtn = document.getElementById('lru-put-btn');
        if (putBtn) {
            putBtn.addEventListener('click', () => {
                let k = (keyInput.value || "").trim().toUpperCase();
                let v = parseInt(valInput.value) || 10;
                if (k) {
                    put(k, v);
                    keyInput.value = "";
                    valInput.value = "";
                }
            });
        }

        const getBtn = document.getElementById('lru-get-btn');
        if (getBtn) {
            getBtn.addEventListener('click', () => {
                let k = (keyInput.value || "").trim().toUpperCase();
                if (k) {
                    get(k);
                    keyInput.value = "";
                }
            });
        }

        const trafficBtn = document.getElementById('lru-traffic-btn');
        if (trafficBtn) {
            trafficBtn.addEventListener('click', runSimulatedTraffic);
        }

        const resetBtn = document.getElementById('lru-reset-btn');
        if (resetBtn) resetBtn.addEventListener('click', clearCache);

        // Preload initial entries
        put("A", 100);
        put("B", 200);
        put("C", 300);
    };

    function clearCache() {
        cacheMap.clear();
        head.next = tail;
        tail.prev = head;
        hits = 0;
        misses = 0;
        evictions = 0;
        lastAction = "Cache Cleared";
        updateHUD();
    }

    function removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    function addNodeToHead(node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    function get(key) {
        if (!cacheMap.has(key)) {
            misses++;
            lastAction = "get('" + key + "') ❌ Cache Miss";
            updateHUD();
            return -1;
        }

        hits++;
        let node = cacheMap.get(key);
        removeNode(node);
        addNodeToHead(node);
        lastAction = "get('" + key + "') ✨ Cache Hit -> Promoted to MRU";
        updateHUD();
        return node.val;
    }

    function put(key, value) {
        if (cacheMap.has(key)) {
            let node = cacheMap.get(key);
            node.val = value;
            removeNode(node);
            addNodeToHead(node);
            lastAction = "put('" + key + "', " + value + ") -> Updated & Promoted";
        } else {
            if (cacheMap.size >= capacity) {
                // Evict LRU node (tail.prev)
                let lruNode = tail.prev;
                removeNode(lruNode);
                cacheMap.delete(lruNode.key);
                evictions++;
                lastAction = "put('" + key + "') -> Evicted LRU ['" + lruNode.key + "']";
            } else {
                lastAction = "put('" + key + "', " + value + ") -> Inserted at MRU";
            }

            let newNode = { key: key, val: value, prev: null, next: null };
            addNodeToHead(newNode);
            cacheMap.set(key, newNode);
        }
        updateHUD();
    }

    function runSimulatedTraffic() {
        let actions = [
            () => put("D", 400),
            () => get("A"),
            () => put("E", 500),
            () => get("B"),
            () => get("E"),
            () => put("F", 600)
        ];

        let delay = 0;
        for (let act of actions) {
            setTimeout(act, delay);
            delay += 550;
        }
    }

    function updateHUD() {
        const hitEl = document.getElementById('lru-tel-hits');
        const missEl = document.getElementById('lru-tel-misses');
        const evictEl = document.getElementById('lru-tel-evictions');
        const actEl = document.getElementById('lru-tel-action');

        if (hitEl) hitEl.textContent = hits;
        if (missEl) missEl.textContent = misses;
        if (evictEl) evictEl.textContent = evictions;
        if (actEl) actEl.textContent = lastAction;
    }

    p.windowResized = () => {
        const container = document.getElementById('lru-canvas-container');
        if (container) {
            p.resizeCanvas(container.clientWidth, container.clientHeight);
        }
    };

    p.draw = () => {
        p.background(6, 9, 14);

        // 1. Draw Top Tier: Hash Map Lookups
        drawHashMapTier(p.width * 0.15, 60);

        // 2. Draw Bottom Tier: Doubly Linked List Order
        drawLinkedListTier(110, 240);
    };

    function drawHashMapTier(startX, startY) {
        p.noStroke();
        p.fill(220, 160);
        p.textSize(11);
        p.textFont("Courier Prime, monospace");
        p.textAlign(p.LEFT, p.TOP);
        p.text("HASH MAP TABLE (Key -> Pointer)", startX - 20, startY - 26);

        let boxW = 85;
        let boxH = 46;
        let spacing = 15;
        let i = 0;

        let entries = Array.from(cacheMap.entries());

        for (let [k, node] of entries) {
            let bx = startX + i * (boxW + spacing);
            let by = startY;

            p.stroke(49, 130, 206);
            p.strokeWeight(1.5);
            p.fill(16, 24, 40);
            p.rect(bx, by, boxW, boxH, 4);

            p.noStroke();
            p.fill(255);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(12);
            p.text("'" + k + "'", bx + boxW / 2, by + 14);

            p.fill(49, 130, 206);
            p.textSize(10);
            p.text("&Node_" + k, bx + boxW / 2, by + 32);

            i++;
        }

        if (entries.length === 0) {
            p.fill(100);
            p.text("[Empty Map]", startX + 30, startY + 20);
        }
    }

    function drawLinkedListTier(startX, startY) {
        p.noStroke();
        p.fill(220, 160);
        p.textSize(11);
        p.textFont("Courier Prime, monospace");
        p.textAlign(p.LEFT, p.TOP);
        p.text("DOUBLY LINKED LIST (MRU -> LRU Temporal Ordering)", startX - 20, startY - 30);

        // Gather nodes from head to tail
        let listNodes = [];
        let curr = head;
        while (curr) {
            listNodes.push(curr);
            curr = curr.next;
        }

        let nodeW = 80;
        let nodeH = 65;
        let spacing = (p.width - startX * 2 - nodeW * listNodes.length) / Math.max(1, listNodes.length - 1);
        spacing = p.constrain(spacing, 18, 45);

        for (let i = 0; i < listNodes.length; i++) {
            let n = listNodes[i];
            let nx = startX + i * (nodeW + spacing);
            let ny = startY;

            // Box styling
            if (n === head) {
                p.stroke(72, 187, 120);
                p.fill(16, 35, 25);
            } else if (n === tail) {
                p.stroke(229, 62, 62);
                p.fill(35, 18, 20);
            } else {
                p.stroke(236, 201, 75);
                p.fill(25, 28, 42);
            }

            p.strokeWeight(1.5);
            p.rect(nx, ny, nodeW, nodeH, 6);

            // Node Text
            p.noStroke();
            p.fill(255);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(12);
            p.textFont("Courier Prime, monospace");

            if (n === head || n === tail) {
                p.text(n.key, nx + nodeW / 2, ny + 20);
                p.fill(160);
                p.textSize(10);
                p.text("(" + n.val + ")", nx + nodeW / 2, ny + 42);
            } else {
                p.text("Key: '" + n.key + "'", nx + nodeW / 2, ny + 20);
                p.fill(236, 201, 75);
                p.textSize(11);
                p.text("Val: " + n.val, nx + nodeW / 2, ny + 42);
            }

            // Draw bidirectional arrows to next node
            if (i < listNodes.length - 1) {
                let arrowStartX = nx + nodeW;
                let arrowEndX = nx + nodeW + spacing;
                let arrowY = ny + nodeH / 2;

                // next arrow (forward ->)
                p.stroke(49, 130, 206, 180);
                p.strokeWeight(1.5);
                p.line(arrowStartX + 2, arrowY - 6, arrowEndX - 2, arrowY - 6);
                p.line(arrowEndX - 6, arrowY - 10, arrowEndX - 2, arrowY - 6);

                // prev arrow (backward <-)
                p.stroke(237, 137, 54, 180);
                p.line(arrowStartX + 2, arrowY + 6, arrowEndX - 2, arrowY + 6);
                p.line(arrowStartX + 6, arrowY + 10, arrowStartX + 2, arrowY + 6);
            }
        }
    }
};

new p5(lruSketch, 'lru-canvas-container');
</script>
