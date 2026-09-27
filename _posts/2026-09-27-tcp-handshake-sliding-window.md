---
layout: newspaper
title: "Computer Science: TCP 3-Way Handshake & Sliding Window Flow Control"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Computer Systems Edition"
section: "Networking & Transport Architecture"
division: "Computer Science"
author: "Shubham Kumar"
volume: "I"
issue: "24"
date: 2026-09-27 21:00:00 +0530
tags: [Computer Science, Networking, TCP/IP, Protocols, Flow Control, p5.js, Education]
weather: "Packets streaming through IP routers with adaptive sliding window byte buffer tracking"
ticker_index: "TCP: SYN -> SYN-ACK -> ACK | Sliding Window: rwnd buffer tracking | Cumulative ACKs prevent receiver overrun"
price: "10 Credits"
---

The physical Internet is a wild, unpredictable landscape. The underlying **Internet Protocol (IP)** layer offers only *best-effort datagram delivery*: packets can take divergent geographic routes, arrive out of order, get duplicated by faulty switches, or be discarded without notice when intermediate router buffers overflow.

If application developers had to manually handle retransmissions, duplicate detection, and receiver buffer overflows for every file download or database query, software development would collapse under sheer complexity.

Enter the **Transmission Control Protocol (TCP)**, codified in 1981 by Vint Cerf and Bob Kahn in **RFC 793**. TCP wraps the unreliable packet-switched wilderness of IP in an abstraction of an **in-order, error-checked, reliable bidirectional byte stream**.

In this edition, we examine two core pillars of TCP mechanics:
1. **The 3-Way Handshake**: Why two rounds of communication are mathematically insufficient to establish connection state.
2. **Sliding Window Flow Control**: How sender and receiver synchronize dynamic buffer capacities without choking or stalling the connection.

<div class="newspaper-clipping">
    <h3>The Transport Layer Glossary</h3>
    <ul>
        <li><strong>Socket Pair</strong>: The unique 4-tuple defining a TCP connection: <code>(Source IP, Source Port, Dest IP, Dest Port)</code>.</li>
        <li><strong>ISN (Initial Sequence Number)</strong>: A 32-bit random counter chosen by each endpoint to number outgoing bytes, mitigating spoofing attacks and cross-session packet crosstalk.</li>
        <li><strong>Cumulative ACK</strong>: An acknowledgment indicating that the receiver has successfully received all bytes up to sequence number $N - 1$, and expects byte $N$ next.</li>
        <li><strong>rwnd (Receive Window)</strong>: The amount of free buffer space the receiver advertises in every TCP header, preventing the sender from overflowing its memory.</li>
        <li><strong>Round-Trip Time (RTT)</strong>: The end-to-end network latency elapsed between transmitting a packet and receiving its corresponding acknowledgment.</li>
    </ul>
</div>

---

## 1. Why a 3-Way Handshake? (Why Not 2-Way?)

A common interview and systems design question asks: *Why does TCP require 3 messages to open a connection instead of 2?*

```
       3-Way Handshake Protocol (RFC 793)
   Client                                  Server
   (CLOSED)                               (LISTEN)
      |                                       |
      |--------- 1. SYN (SEQ=X) ------------->|  (SYN-RECEIVED)
      |                                       |
      |<-------- 2. SYN-ACK (SEQ=Y, ACK=X+1) -|
      |                                       |
 (ESTABLISHED)                                |
      |--------- 3. ACK (SEQ=X+1, ACK=Y+1) -->|  (ESTABLISHED)
      |                                       |
```

### The Peril of the Delayed Duplicate SYN
Suppose TCP used a simple **2-Way Handshake** (`Client sends SYN` $\to$ `Server sends ACK`, and connection is open).

Imagine a client on a high-latency wireless link sends a `SYN` request. Due to transient router congestion, the packet gets delayed in network buffers for 30 seconds. The client's timer expires, giving up and re-trying on a new connection.

Minutes later, that delayed original `SYN` packet finally arrives at the server. Under a 2-way handshake:
1. The server would receive the stale `SYN`, believe the client wants to open a brand-new connection, allocate memory buffers, and immediately transition its state to `ESTABLISHED`.
2. The server would reply with an `ACK`.
3. But the client has already moved on! It ignores the unexpected `ACK`.
4. The server is left holding a **half-open ghost connection**, leaking resources indefinitely.

With a **3-Way Handshake**, the server's `SYN-ACK` challenges the client to confirm:
* *"I received your request for sequence number $X$. My sequence number is $Y$. Please confirm byte $Y+1$."*
* The client, seeing an outdated sequence number, immediately sends an abort **RST (Reset)** flag, destroying the bogus server state.
* The connection is only activated when both parties have bidirectionally synchronized sequence numbers!

---

## 2. Sliding Window Flow Control

Once a connection is established, how fast should the sender transmit data? 

If the sender transmits too slowly (e.g. *Stop-and-Wait*: send 1 packet, wait for ACK, send next packet), transmission throughput drops to near zero across transatlantic links:

$$\text{Throughput}_{\text{Stop-and-Wait}} = \frac{\text{Packet Size}}{\text{RTT}}$$

If a packet is $1,460\text{ bytes}$ and RTT is $100\text{ ms}$, throughput is limited to a pitiful $14.6\text{ KB/s}$, regardless of whether you have a $10\text{ Gbps}$ fiber link!

To maximize throughput, TCP utilizes a **Sliding Window Protocol**. The sender is allowed to transmit a continuous pipeline of multiple packets into the network without waiting for intermediate ACKs:

```
 Sender Buffer:
 [ 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 ]
 |-----------|   |---------------|   |-----------------------------|
  Acked Bytes        In-Flight          Allowed Window (rwnd)          Cannot Send Yet
  (Done)             (Awaiting ACK)     (Usable to send now)           (Blocked)
                 ^                   ^
             Left Edge           Right Edge
```

### The Window Slide Mechanics
1. **Window Size ($W = \text{rwnd}$)**: The receiver includes a 16-bit `Window Size` field in every return packet, indicating available free buffer bytes.
2. **Transmission**: The sender may transmit bytes from `Left Edge` up to `Left Edge + rwnd`.
3. **Sliding**: When an `ACK` arrives acknowledging byte segment $K$, the `Left Edge` instantly snaps forward to $K+1$. This rightward slide reveals new available slots in the buffer, allowing the sender to pipeline new bytes immediately.
4. **Zero Window Probing**: If the receiver's application process is slow at reading data from the socket, `rwnd` shrinks to `0`. The sender stops transmitting and periodically emits 1-byte *Zero Window Probes* until the receiver process drains its buffer and re-advertises a non-zero window.

---

<!-- Interactive p5.js Simulation Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.02); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">
            Interactive TCP Handshake & Sliding Window Simulator
        </h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Experience the transport layer in action. Step through the 3-Way Handshake, or switch to Sliding Window mode to stream packets, simulate dropped frames, and observe dynamic flow control.
        </p>

        <!-- Canvas Container -->
        <div id="tcp-canvas-container" style="width: 100%; height: 480px; border-radius: 8px; overflow: hidden; border: 1px solid var(--news-border); margin-bottom: 1.5rem; position: relative; background: #06090e;"></div>

        <!-- Controls HUD -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 860px; margin: 0 auto; padding: 0.5rem; text-align: left;">
            
            <!-- Controls Bar -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
                
                <div style="display: flex; gap: 0.65rem; flex-wrap: wrap; align-items: center;">
                    <!-- Mode Selector -->
                    <label for="tcp-mode-select" style="font-family: 'Courier Prime', monospace; font-size: 0.88rem; font-weight: bold;">Mode:</label>
                    <select id="tcp-mode-select" style="padding: 0.45rem 0.75rem; font-family: 'Courier Prime', monospace; font-size: 0.85rem; font-weight: bold; background: var(--news-bg); color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        <option value="handshake" selected>1. 3-Way Handshake</option>
                        <option value="window">2. Sliding Window (Flow Control)</option>
                    </select>

                    <button id="tcp-step-btn" style="padding: 0.5rem 1.25rem; font-family: 'Playfair Display', serif; font-weight: bold; background: var(--news-ink); color: var(--news-bg); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                        ▶ Next Step / Send
                    </button>
                    
                    <button id="tcp-drop-btn" style="display: none; padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: #e53e3e; color: #fff; border: 1px solid #c53030; border-radius: 4px; cursor: pointer;">
                        💥 Drop Next Packet
                    </button>

                    <button id="tcp-auto-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Auto Stream
                    </button>
                    
                    <button id="tcp-reset-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Reset
                    </button>
                </div>

                <!-- Window Size Slider (Visible in Window Mode) -->
                <div id="tcp-window-slider-group" style="display: none; align-items: center; gap: 0.5rem; font-family: 'Courier Prime', monospace; font-size: 0.85rem;">
                    <span>Window (rwnd):</span>
                    <input type="range" id="tcp-window-slider" min="2" max="6" value="4" style="cursor: pointer; width: 90px;">
                    <strong id="tcp-window-val" style="color: #3182ce;">4 Pkts</strong>
                </div>

            </div>

            <!-- Packet Inspection HUD Card -->
            <div style="background: rgba(0,0,0,0.03); border: 1px dashed var(--news-border); border-radius: 6px; padding: 1rem;">
                <div style="font-weight: bold; font-size: 0.88rem; margin-bottom: 0.35rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                    <span>TCP Segment Header Telemetry:</span>
                    <span id="tcp-flags-badge" style="color: #3182ce; font-family: 'Courier Prime', monospace; font-size: 0.8rem; background: rgba(49,130,206,0.1); padding: 0.2rem 0.5rem; border-radius: 3px;">FLAGS: [NONE]</span>
                </div>
                <div id="tcp-details-text" style="font-family: 'Courier Prime', monospace; font-size: 0.82rem; color: var(--news-ink); line-height: 1.5; margin-bottom: 0.5rem;">
                    Click "Next Step" to begin the TCP 3-Way Handshake sequence.
                </div>
                <!-- Raw TCP Segment Frame -->
                <div style="background: #0d1117; color: #58a6ff; padding: 0.5rem 0.75rem; border-radius: 4px; font-family: 'Courier Prime', monospace; font-size: 0.75rem; overflow-x: auto; white-space: nowrap;" id="tcp-frame-dump">
                    TCP: SrcPort=54122 | DstPort=443 | SeqNum=0 | AckNum=0 | DataOffset=5 | WindowSize=65535
                </div>
            </div>

            <!-- Telemetry Badges -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-family: 'Courier Prime', monospace; font-size: 0.82rem; border-top: 1px dashed var(--news-border); padding-top: 1rem;">
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Client State: </span><strong id="tcp-client-state" style="color: #ecc94b;">CLOSED</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Server State: </span><strong id="tcp-server-state" style="color: #3182ce;">LISTEN</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>In-Flight Pkts: </span><strong id="tcp-inflight-count" style="color: #ed8936;">0</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Cumulative ACK: </span><strong id="tcp-cum-ack" style="color: #48bb78;">0</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Network Status: </span><strong id="tcp-net-status" style="color: #48bb78;">Optimal</strong>
                </div>
            </div>

        </div>
    </div>
</div>

---

## 3. TCP vs UDP: The Transport Layer Trade-Off

TCP guarantees absolute reliability, order, and congestion fairness, but these guarantees carry real-world penalties:
* **Connection Latency**: 1 RTT for TCP 3-Way Handshake before any application payload can pass.
* **Head-of-Line (HoL) Blocking**: If packet #3 is dropped by a router, packets #4, #5, and #6 must wait in the receiver's TCP buffer and cannot be delivered to the application until packet #3 is retransmitted and acknowledged.

For latency-critical applications like live multiplayer gaming, video conferencing (WebRTC), and DNS lookups, the overhead of TCP is prohibitive. These protocols choose **UDP (User Datagram Protocol)**, which strips away handshakes, sliding windows, and retransmissions in favor of lightweight, unordered packet delivery.

In modern HTTP/3, the industry achieved the ultimate synthesis: building **QUIC** on top of UDP to combine the encryption speed of TLS 1.3, multiplexed streams without Head-of-Line blocking, and congestion control without legacy operating system kernel bottlenecks.

<!-- p5.js CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>

<script>
const tcpSketch = (p) => {
    let mode = "handshake"; // "handshake" or "window"
    let handshakeStep = 0; // 0: CLOSED, 1: SYN, 2: SYN-ACK, 3: ACK (ESTABLISHED)
    let autoStreaming = false;
    let autoTimer = 0;

    let clientX, serverX, routerX, nodeY;
    let particles = [];

    // Handshake Sequence variables
    const clientISN = 1000;
    const serverISN = 5000;

    // Sliding window variables
    let windowSize = 4;
    const totalPackets = 16;
    let packets = []; // Array of { id, state: 'unacked'|'inflight'|'acked'|'dropped' }
    let windowLeft = 0; // Cumulative ACK pointer
    let activeFlights = []; // Array of moving packets on wire
    let dropNextPacket = false;

    p.setup = () => {
        const container = document.getElementById('tcp-canvas-container');
        const w = container ? container.clientWidth : 800;
        const h = container ? container.clientHeight : 480;
        const canvas = p.createCanvas(w, h);
        canvas.parent('tcp-canvas-container');

        // Fiber optic ambient background pulses
        for (let i = 0; i < 20; i++) {
            particles.push({
                x: p.random(0, p.width),
                speed: p.random(0.7, 2.2),
                size: p.random(1.5, 3.5),
                alpha: p.random(30, 90)
            });
        }

        initBuffers();
        bindUI();
        updateHUD();
    };

    function initBuffers() {
        packets = [];
        for (let i = 0; i < totalPackets; i++) {
            packets.push({
                id: i,
                state: "unacked", // 'unacked', 'inflight', 'acked'
                payload: "DATA #" + i
            });
        }
        windowLeft = 0;
        activeFlights = [];
        handshakeStep = 0;
        dropNextPacket = false;
    }

    function bindUI() {
        const modeSelect = document.getElementById('tcp-mode-select');
        const dropBtn = document.getElementById('tcp-drop-btn');
        const sliderGroup = document.getElementById('tcp-window-slider-group');
        const slider = document.getElementById('tcp-window-slider');
        const sliderVal = document.getElementById('tcp-window-val');

        if (modeSelect) {
            modeSelect.addEventListener('change', (e) => {
                mode = e.target.value;
                initBuffers();
                if (mode === "window") {
                    if (dropBtn) dropBtn.style.display = "inline-block";
                    if (sliderGroup) sliderGroup.style.display = "flex";
                } else {
                    if (dropBtn) dropBtn.style.display = "none";
                    if (sliderGroup) sliderGroup.style.display = "none";
                }
                updateHUD();
            });
        }

        if (slider) {
            slider.addEventListener('input', (e) => {
                windowSize = parseInt(e.target.value);
                if (sliderVal) sliderVal.textContent = windowSize + " Pkts";
            });
        }

        const stepBtn = document.getElementById('tcp-step-btn');
        if (stepBtn) {
            stepBtn.addEventListener('click', handleStepAction);
        }

        if (dropBtn) {
            dropBtn.addEventListener('click', () => {
                dropNextPacket = true;
                dropBtn.textContent = "⚠️ Dropping Next!";
                setTimeout(() => {
                    if (dropBtn) dropBtn.textContent = "💥 Drop Next Packet";
                }, 3000);
            });
        }

        const autoBtn = document.getElementById('tcp-auto-btn');
        if (autoBtn) {
            autoBtn.addEventListener('click', () => {
                autoStreaming = !autoStreaming;
                autoBtn.textContent = autoStreaming ? "Pause Stream" : "Auto Stream";
                autoBtn.style.color = autoStreaming ? "#48bb78" : "var(--news-ink)";
            });
        }

        const resetBtn = document.getElementById('tcp-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                initBuffers();
                autoStreaming = false;
                if (autoBtn) {
                    autoBtn.textContent = "Auto Stream";
                    autoBtn.style.color = "var(--news-ink)";
                }
                updateHUD();
            });
        }
    }

    function handleStepAction() {
        if (mode === "handshake") {
            advanceHandshake();
        } else {
            sendNextWindowPacket();
        }
    }

    function advanceHandshake() {
        if (handshakeStep >= 3) {
            handshakeStep = 0; // Reset
            updateHUD();
            return;
        }

        handshakeStep++;

        if (handshakeStep === 1) {
            // Client sends SYN (SEQ=1000)
            activeFlights.push({
                type: "SYN",
                dir: 1, // client -> server
                fromX: clientX,
                toX: serverX,
                progress: 0,
                seq: clientISN,
                ack: 0,
                flags: "SYN=1, ACK=0",
                color: [49, 130, 206]
            });
        } else if (handshakeStep === 2) {
            // Server sends SYN-ACK (SEQ=5000, ACK=1001)
            activeFlights.push({
                type: "SYN-ACK",
                dir: -1, // server -> client
                fromX: serverX,
                toX: clientX,
                progress: 0,
                seq: serverISN,
                ack: clientISN + 1,
                flags: "SYN=1, ACK=1",
                color: [237, 137, 54]
            });
        } else if (handshakeStep === 3) {
            // Client sends ACK (SEQ=1001, ACK=5001)
            activeFlights.push({
                type: "ACK",
                dir: 1, // client -> server
                fromX: clientX,
                toX: serverX,
                progress: 0,
                seq: clientISN + 1,
                ack: serverISN + 1,
                flags: "SYN=0, ACK=1",
                color: [72, 187, 120]
            });
        }

        updateHUD();
    }

    function sendNextWindowPacket() {
        // Find next eligible packet within the sender window
        let eligibleId = -1;
        for (let i = windowLeft; i < Math.min(windowLeft + windowSize, totalPackets); i++) {
            if (packets[i].state === "unacked") {
                eligibleId = i;
                break;
            }
        }

        if (eligibleId === -1) {
            // All window packets are either in flight or acked
            if (windowLeft >= totalPackets) {
                // Done with all packets! Reset
                initBuffers();
            }
            return;
        }

        packets[eligibleId].state = "inflight";

        let willDrop = dropNextPacket;
        if (willDrop) dropNextPacket = false;

        // Create in-flight packet from Client to Server
        activeFlights.push({
            type: "DATA",
            pktId: eligibleId,
            dir: 1,
            fromX: clientX,
            toX: serverX,
            progress: 0,
            dropped: willDrop,
            seq: clientISN + eligibleId * 100,
            ack: serverISN + 1,
            flags: "PSH=1, ACK=1",
            color: willDrop ? [229, 62, 62] : [49, 130, 206]
        });

        updateHUD();
    }

    p.windowResized = () => {
        const container = document.getElementById('tcp-canvas-container');
        if (container) {
            p.resizeCanvas(container.clientWidth, container.clientHeight);
        }
    };

    function updateHUD() {
        const clientStateEl = document.getElementById('tcp-client-state');
        const serverStateEl = document.getElementById('tcp-server-state');
        const flagsEl = document.getElementById('tcp-flags-badge');
        const detailsEl = document.getElementById('tcp-details-text');
        const frameDumpEl = document.getElementById('tcp-frame-dump');
        const inflightEl = document.getElementById('tcp-inflight-count');
        const cumAckEl = document.getElementById('tcp-cum-ack');
        const netStatusEl = document.getElementById('tcp-net-status');

        if (mode === "handshake") {
            if (handshakeStep === 0) {
                if (clientStateEl) clientStateEl.textContent = "CLOSED";
                if (serverStateEl) serverStateEl.textContent = "LISTEN";
                if (flagsEl) flagsEl.textContent = "FLAGS: [NONE]";
                if (detailsEl) detailsEl.innerHTML = "Click <strong>Next Step</strong> to send the initial <code>SYN</code> segment to port 443.";
                if (frameDumpEl) frameDumpEl.textContent = "TCP: SrcPort=54122 | DstPort=443 | SeqNum=0 | AckNum=0 | DataOffset=5 | WindowSize=65535";
            } else if (handshakeStep === 1) {
                if (clientStateEl) clientStateEl.textContent = "SYN-SENT";
                if (serverStateEl) serverStateEl.textContent = "LISTEN";
                if (flagsEl) flagsEl.textContent = "FLAGS: [SYN=1, ACK=0]";
                if (detailsEl) detailsEl.innerHTML = "<strong>Step 1 (SYN):</strong> Client generates random ISN (<code>1000</code>) and transmits SYN segment. Consumes 1 sequence number.";
                if (frameDumpEl) frameDumpEl.textContent = `TCP: SrcPort=54122 | DstPort=443 | SeqNum=${clientISN} | AckNum=0 | Flags=[SYN] | WindowSize=65535`;
            } else if (handshakeStep === 2) {
                if (clientStateEl) clientStateEl.textContent = "SYN-SENT";
                if (serverStateEl) serverStateEl.textContent = "SYN-RECEIVED";
                if (flagsEl) flagsEl.textContent = "FLAGS: [SYN=1, ACK=1]";
                if (detailsEl) detailsEl.innerHTML = "<strong>Step 2 (SYN-ACK):</strong> Server receives SYN, picks its own random ISN (<code>5000</code>), and acknowledges client's ISN+1 (<code>1001</code>).";
                if (frameDumpEl) frameDumpEl.textContent = `TCP: SrcPort=443 | DstPort=54122 | SeqNum=${serverISN} | AckNum=${clientISN + 1} | Flags=[SYN, ACK] | WindowSize=65535`;
            } else if (handshakeStep === 3) {
                if (clientStateEl) clientStateEl.textContent = "ESTABLISHED";
                if (serverStateEl) serverStateEl.textContent = "ESTABLISHED";
                if (flagsEl) flagsEl.textContent = "FLAGS: [SYN=0, ACK=1]";
                if (detailsEl) detailsEl.innerHTML = "<strong>Step 3 (ACK):</strong> Client confirms server's sequence number with <code>ACK=5001</code>. Both endpoints transition to <strong>ESTABLISHED</strong>!";
                if (frameDumpEl) frameDumpEl.textContent = `TCP: SrcPort=54122 | DstPort=443 | SeqNum=${clientISN + 1} | AckNum=${serverISN + 1} | Flags=[ACK] | WindowSize=65535`;
            }
            if (inflightEl) inflightEl.textContent = activeFlights.length;
            if (cumAckEl) cumAckEl.textContent = handshakeStep === 3 ? "Synced" : "0";
            if (netStatusEl) {
                netStatusEl.textContent = handshakeStep === 3 ? "Connected" : "Negotiating";
                netStatusEl.style.color = handshakeStep === 3 ? "#48bb78" : "#ecc94b";
            }
        } else {
            // Sliding Window mode
            if (clientStateEl) clientStateEl.textContent = "ESTABLISHED";
            if (serverStateEl) serverStateEl.textContent = "ESTABLISHED";
            if (inflightEl) inflightEl.textContent = activeFlights.length;
            if (cumAckEl) cumAckEl.textContent = "Byte #" + (windowLeft * 100);

            if (flagsEl) flagsEl.textContent = "FLAGS: [PSH, ACK]";
            if (detailsEl) {
                detailsEl.innerHTML = `<strong>Sliding Window:</strong> In-flight packets = <strong>${activeFlights.length}</strong> | Window slots used = <strong>${Math.min(windowLeft + windowSize, totalPackets) - windowLeft}</strong> | Cumulative ACK pointer = <strong>Byte #${windowLeft * 100}</strong>.`;
            }
            if (frameDumpEl) {
                frameDumpEl.textContent = `TCP: WindowSize=${windowSize * 1024}B | InFlight=${activeFlights.length} | LeftEdge=${windowLeft} | MaxSeq=${totalPackets}`;
            }
            if (netStatusEl) {
                let hasLoss = activeFlights.some(f => f.dropped);
                netStatusEl.textContent = hasLoss ? "Packet Loss Detected!" : "Optimal Throughput";
                netStatusEl.style.color = hasLoss ? "#e53e3e" : "#48bb78";
            }
        }
    }

    p.draw = () => {
        p.background(6, 9, 14);

        clientX = p.width * 0.16;
        serverX = p.width * 0.84;
        routerX = p.width * 0.5;
        nodeY = mode === "handshake" ? p.height * 0.52 : p.height * 0.58;

        // Auto Stream logic
        if (autoStreaming) {
            autoTimer++;
            if (mode === "handshake") {
                if (autoTimer > 110) {
                    autoTimer = 0;
                    advanceHandshake();
                }
            } else {
                if (autoTimer > 45) {
                    autoTimer = 0;
                    sendNextWindowPacket();
                }
            }
        }

        // Draw ambient photons
        p.stroke(49, 130, 206, 30);
        p.strokeWeight(1);
        for (let pt of particles) {
            pt.x += pt.speed;
            if (pt.x > p.width) pt.x = 0;
            p.fill(56, 178, 172, pt.alpha);
            p.noStroke();
            p.ellipse(pt.x, nodeY + p.sin(pt.x * 0.04) * 8, pt.size, pt.size);
        }

        // Draw transmission wire
        p.stroke(255, 255, 255, 30);
        p.strokeWeight(2.5);
        p.line(clientX, nodeY, serverX, nodeY);

        // Center IP Router / Switch
        drawRouter(routerX, nodeY);

        // In window mode, draw Buffer Arrays and Sliding Window frame on top
        if (mode === "window") {
            drawSlidingWindowUI();
        }

        // Update and draw active packets in flight
        updateAndDrawFlights();

        // Draw Endpoints
        drawClient(clientX, nodeY);
        drawServer(serverX, nodeY);
    };

    function drawSlidingWindowUI() {
        let startX = p.width * 0.14;
        let startY = 40;
        let cellW = (p.width * 0.72) / totalPackets;
        let cellH = 28;

        // Title
        p.fill(200);
        p.noStroke();
        p.textAlign(p.LEFT, p.BOTTOM);
        p.textSize(10);
        p.textFont("Courier Prime, monospace");
        p.text("SENDER BUFFER (PACKETS 0 - 15):", startX, startY - 8);

        // Draw buffer cells
        for (let i = 0; i < totalPackets; i++) {
            let cx = startX + i * cellW;

            // Fill color based on packet state
            if (i < windowLeft) {
                p.fill(72, 187, 120, 180); // Acked (Green)
            } else if (packets[i].state === "inflight") {
                p.fill(237, 137, 54, 200); // In Flight (Orange)
            } else if (i < windowLeft + windowSize) {
                p.fill(49, 130, 206, 100); // Can send (Blue)
            } else {
                p.fill(30, 41, 59, 140); // Cannot send yet (Dark Slate)
            }

            p.stroke(15, 23, 42);
            p.strokeWeight(1.5);
            p.rect(cx, startY, cellW - 2, cellH, 3);

            // Packet number inside cell
            p.fill(255);
            p.noStroke();
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(9);
            p.text("#" + i, cx + cellW / 2 - 1, startY + cellH / 2);
        }

        // Sliding Window Frame Overlay
        let winX = startX + windowLeft * cellW;
        let winW = Math.min(windowSize, totalPackets - windowLeft) * cellW - 2;

        p.noFill();
        p.stroke(236, 201, 75);
        p.strokeWeight(2.5);
        p.rect(winX - 2, startY - 3, winW + 4, cellH + 6, 5);

        // Window label
        p.fill(236, 201, 75);
        p.noStroke();
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(9);
        p.text(`Sliding Window Frame [rwnd = ${windowSize}]`, winX + winW / 2, startY + cellH + 6);
    }

    function updateAndDrawFlights() {
        for (let i = activeFlights.length - 1; i >= 0; i--) {
            let f = activeFlights[i];
            f.progress += 0.022;

            let curX = p.lerp(f.fromX, f.toX, f.progress);
            let curY = nodeY;

            // Packet dropped at router?
            if (f.dropped && f.progress >= 0.5) {
                // Animate packet disintegrating at router
                drawPacketDrop(curX, curY);
                // Trigger timeout retransmission in window mode after 35 frames
                setTimeout(() => {
                    packets[f.pktId].state = "unacked";
                    updateHUD();
                }, 1000);
                activeFlights.splice(i, 1);
                continue;
            }

            // Draw packet
            p.fill(f.color[0], f.color[1], f.color[2], 50);
            p.noStroke();
            p.ellipse(curX, curY, 36, 36);

            p.fill(16, 24, 40);
            p.stroke(f.color[0], f.color[1], f.color[2]);
            p.strokeWeight(2);
            p.rect(curX - 26, curY - 14, 52, 28, 4);

            p.fill(f.color[0], f.color[1], f.color[2]);
            p.noStroke();
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(9);
            p.textFont("Courier Prime, monospace");
            p.text(f.type + (f.pktId !== undefined ? " #" + f.pktId : ""), curX, curY - 4);

            p.fill(200);
            p.textSize(7.5);
            p.text("SEQ " + f.seq, curX, curY + 6);

            // Packet arrival
            if (f.progress >= 1.0) {
                if (mode === "window" && f.dir === 1) {
                    // Packet reached server! Server sends back ACK
                    let ackPktId = f.pktId;
                    activeFlights.push({
                        type: "ACK",
                        pktId: ackPktId,
                        dir: -1,
                        fromX: serverX,
                        toX: clientX,
                        progress: 0,
                        seq: serverISN + 1,
                        ack: f.seq + 100,
                        flags: "ACK=1",
                        color: [72, 187, 120]
                    });
                } else if (mode === "window" && f.dir === -1) {
                    // ACK reached Client! Slide the window forward
                    let ackedId = f.pktId;
                    packets[ackedId].state = "acked";

                    // Advance windowLeft to lowest unacked
                    while (windowLeft < totalPackets && packets[windowLeft].state === "acked") {
                        windowLeft++;
                    }
                }
                activeFlights.splice(i, 1);
                updateHUD();
            }
        }
    }

    function drawPacketDrop(x, y) {
        p.stroke(229, 62, 62);
        p.strokeWeight(2);
        p.line(x - 8, y - 8, x + 8, y + 8);
        p.line(x + 8, y - 8, x - 8, y + 8);

        p.noStroke();
        p.fill(229, 62, 62);
        p.textAlign(p.CENTER, p.BOTTOM);
        p.textSize(8.5);
        p.text("PACKET DROPPED!", x, y - 14);
    }

    function drawRouter(x, y) {
        p.stroke(100, 116, 139);
        p.strokeWeight(1.5);
        p.fill(30, 41, 59);
        p.ellipse(x, y, 38, 38);

        // Arrows cross
        p.stroke(148, 163, 184);
        p.line(x - 10, y, x + 10, y);
        p.line(x, y - 10, x, y + 10);

        p.noStroke();
        p.fill(160);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(8.5);
        p.textFont("Courier Prime, monospace");
        p.text("IP Router", x, y + 22);
    }

    function drawClient(x, y) {
        // Laptop Body
        p.stroke(49, 130, 206);
        p.strokeWeight(2);
        p.fill(16, 24, 40);
        p.rect(x - 36, y - 46, 72, 54, 8);

        p.fill(49, 130, 206, 40);
        p.rect(x - 30, y - 40, 60, 42, 4);

        // Screen status
        p.fill(255);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(8);
        p.textFont("Courier Prime, monospace");
        let state = mode === "handshake" ? 
            (handshakeStep === 0 ? "CLOSED" : (handshakeStep < 3 ? "SYN-SENT" : "ESTAB")) : "ESTAB";
        p.text(state, x, y - 19);

        // Base
        p.stroke(49, 130, 206, 100);
        p.fill(25, 35, 55);
        p.rect(x - 44, y + 8, 88, 9, 3);

        p.noStroke();
        p.fill(240);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(12);
        p.textFont("Playfair Display, serif");
        p.text("Client (Sender)", x, y + 24);

        p.fill(160);
        p.textSize(8.5);
        p.textFont("Courier Prime, monospace");
        p.text("ISN: " + clientISN, x, y + 41);
    }

    function drawServer(x, y) {
        // Server Rack
        p.stroke(237, 137, 54);
        p.strokeWeight(2);
        p.fill(25, 20, 16);
        p.rect(x - 34, y - 50, 68, 76, 6);

        for (let i = 0; i < 3; i++) {
            let slotY = y - 40 + i * 22;
            p.stroke(60);
            p.strokeWeight(1);
            p.line(x - 26, slotY, x + 26, slotY);

            p.noStroke();
            let ledCol = (p.frameCount % 30 < 15) ? p.color(72, 187, 120) : p.color(237, 137, 54);
            p.fill(ledCol);
            p.ellipse(x + 18, slotY - 5, 4, 4);
        }

        p.noStroke();
        p.fill(240);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(12);
        p.textFont("Playfair Display, serif");
        p.text("Server (Receiver)", x, y + 30);

        p.fill(160);
        p.textSize(8.5);
        p.textFont("Courier Prime, monospace");
        p.text("ISN: " + serverISN, x, y + 47);
    }
};

new p5(tcpSketch, 'tcp-canvas-container');
</script>
