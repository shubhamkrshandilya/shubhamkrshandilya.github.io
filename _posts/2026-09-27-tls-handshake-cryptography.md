---
layout: newspaper
title: "Computer Science: The Anatomy of a TLS 1.3 Handshake"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Computer Systems Edition"
section: "Cryptography & Networks Branch"
division: "Computer Science"
author: "Shubham Kumar"
volume: "I"
issue: "20"
date: 2026-09-27 20:00:00 +0530
tags: [Computer Science, Networking, Cryptography, Security, TLS, p5.js, Education]
weather: "ECDHE key exchange negotiating symmetric AES-256 session over public fiber"
ticker_index: "TLS 1.3: 1-RTT handshake | Diffie-Hellman: S = g^(ab) mod p | Perfect Forward Secrecy (PFS)"
price: "10 Credits"
---

Every millisecond of every day, billions of devices transmit credit card numbers, confidential passwords, and private messages across the open internet. The underlying physical medium—submarine fiber optic cables, cell towers, and public coffee shop Wi-Fi routers—is completely accessible to anyone with network sniffing hardware.

How can two strangers who have never met—your web browser in New Delhi and a web server in California—communicate with airtight secrecy across an untrusted wire without a third party eavesdropping?

The answer is **Transport Layer Security (TLS)**, the cryptographic backbone powering **HTTPS**. In this edition, we explore how modern **TLS 1.3** accomplishes secure key exchange in a single round-trip, using the elegant mathematical machinery of **Elliptic-Curve Diffie-Hellman Ephemeral (ECDHE)**.

<div class="newspaper-clipping">
    <h3>The Cryptographic Glossary</h3>
    <ul>
        <li><strong>Symmetric Encryption (AES-GCM)</strong>: Uses the same secret key to encrypt and decrypt data. Blazing fast, but requires both parties to already possess the shared key.</li>
        <li><strong>Asymmetric Encryption</strong>: Uses a keypair (Public Key to encrypt, Private Key to decrypt). Solves key distribution, but is too computationally heavy for bulk data.</li>
        <li><strong>Diffie-Hellman Key Exchange</strong>: A mathematical protocol allowing two parties to derive a shared secret over an insecure channel without transmitting the secret itself.</li>
        <li><strong>Perfect Forward Secrecy (PFS)</strong>: A security guarantee ensuring that even if a server's long-term private key is compromised in the future, past encrypted sessions remain unbreakable.</li>
        <li><strong>Round-Trip Time (RTT)</strong>: The time required for a packet to travel from client to server and back again.</li>
    </ul>
</div>

---

## 1. The Diffie-Hellman Mathematical Miracle

Invented by Whitfield Diffie and Martin Hellman in 1976 (and modernized via Elliptic Curves), Diffie-Hellman solves the ancient **Key Distribution Problem**.

Imagine Alice (the browser) and Bob (the server) want to agree on a secret color without Eve (an eavesdropper) discovering it:

1. Alice and Bob publicly agree on a generator base $g$ and a large prime modulus $p$. Eve sees both $g$ and $p$.
2. Alice picks a random private secret number $a$. She computes her public key:
   $$A = g^a \pmod p$$
   Alice sends $A$ across the wire to Bob.
3. Bob picks a random private secret number $b$. He computes his public key:
   $$B = g^b \pmod p$$
   Bob sends $B$ across the wire to Alice.
4. Now, both parties compute the shared secret $S$:
   * Alice calculates: $S = B^a \pmod p = (g^b)^a = g^{ab} \pmod p$
   * Bob calculates: $S = A^b \pmod p = (g^a)^b = g^{ab} \pmod p$

$$\text{Alice and Bob now possess identical secret: } S = g^{ab} \pmod p$$

What about Eve? Eve intercepted $g, p, A = g^a$, and $B = g^b$. To compute $S$, she must deduce $a$ or $b$. But computing $a = \log_g(A) \pmod p$ is the **Discrete Logarithm Problem**—a computational challenge that would take the world's most powerful supercomputers billions of years to crack when $p$ is sufficiently large!

```
 Alice (Browser)                     Insecure Wire                      Bob (Server)
 [Secret: a]                       [Public: g, p]                     [Secret: b]
      |                                   |                                |
      |-------- Send Public A (g^a) ----->|------------------------------->|
      |<------- Send Public B (g^b) ------|<-------------------------------|
      |                                   |                                |
  Compute:                            Eve sees:                        Compute:
  S = B^a = g^(ab)                   (g, p, A, B)                      S = A^b = g^(ab)
  [Shared Secret S]                 [Cannot find S!]                   [Shared Secret S]
```

---

## 2. The Evolution: TLS 1.2 vs TLS 1.3

Prior to 2018, the internet ran on **TLS 1.2**, which required **two full round trips (2-RTT)** before any encrypted application data (HTTP request) could be sent:

* **TLS 1.2 (2-RTT)**: Client Hello $\to$ Server Hello $\to$ Client Key Exchange $\to$ Finished $\to$ HTTP Request.
* **TLS 1.3 (1-RTT)**: Merged the key share directly into the very first packet! The client guesses the server's preferred cryptographic curve and sends its ECDHE public key in the `ClientHello`. The server responds with its own key share, and *immediately* begins sending encrypted data in the same flight.

```
       TLS 1.2 (2-RTT = Slower)                        TLS 1.3 (1-RTT = 50% Faster)
   Client                  Server                  Client                  Server
     |                        |                      |                        |
     |------ ClientHello ---->|                      |-- ClientHello + Key -->|
     |<----- ServerHello -----|                      |   Share (g^a)          |
     |<----- Certificate -----|                      |<-- ServerHello + Key --|
     |--- ClientKeyExchange ->|                      |    Share (g^b) + Cert  |
     |<------ Finished -------|                      |                        |
     |                        |                      |=== Encrypted Data ====>|
     |=== Encrypted Data ====>|                      |<== Encrypted Data =====|
```

TLS 1.3 also outlawed obsolete algorithms: RSA key exchange (which lacked Forward Secrecy), RC4, MD5, SHA-1, and CBC-mode ciphers, enforcing authenticated encryption algorithms like **AES-256-GCM** and **ChaCha20-Poly1305**.

---

<!-- Dynamic p5.js Interactive Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.02); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">
            Interactive TLS 1.3 Handshake & Cryptographic Packet Simulator
        </h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Step through the 1-RTT handshake protocol. Watch packets traverse the untrusted wire between Client and Server while Eve attempts to eavesdrop on the key exchange.
        </p>

        <!-- Canvas Container -->
        <div id="tls-canvas-container" style="width: 100%; height: 420px; border-radius: 8px; overflow: hidden; border: 1px solid var(--news-border); margin-bottom: 1.5rem; position: relative; background: #06090e;"></div>

        <!-- Interactive Controls HUD -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 820px; margin: 0 auto; padding: 0.5rem; text-align: left;">
            
            <!-- Step Buttons & Action Bar -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
                
                <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
                    <button id="tls-next-btn" style="padding: 0.5rem 1.25rem; font-family: 'Playfair Display', serif; font-weight: bold; background: var(--news-ink); color: var(--news-bg); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                        ▶ Next Handshake Step
                    </button>
                    <button id="tls-auto-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Auto Play
                    </button>
                    <button id="tls-reset-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Reset Handshake
                    </button>
                </div>

                <!-- Handshake Phase Indicator -->
                <div style="font-family: 'Courier Prime', monospace; font-size: 0.88rem; background: rgba(0,0,0,0.05); padding: 0.4rem 0.75rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Step: </span><strong id="tls-step-name" style="color: var(--primary-color);">0: Uninitialized</strong>
                </div>
            </div>

            <!-- Packet Inspection HUD Card -->
            <div style="background: rgba(0,0,0,0.03); border: 1px dashed var(--news-border); border-radius: 6px; padding: 1rem;">
                <div style="font-weight: bold; font-size: 0.88rem; margin-bottom: 0.35rem; display: flex; justify-content: space-between;">
                    <span>Wire Packet Inspection:</span>
                    <span id="tls-cipher-suite" style="color: #3182ce; font-family: 'Courier Prime', monospace; font-size: 0.8rem;">TLS_AES_256_GCM_SHA384</span>
                </div>
                <div id="tls-packet-details" style="font-family: 'Courier Prime', monospace; font-size: 0.82rem; color: var(--news-ink); line-height: 1.5;">
                    Click "Next Handshake Step" to initiate client TCP connection and send ClientHello with ephemeral key share.
                </div>
            </div>

            <!-- Telemetry Badges -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-family: 'Courier Prime', monospace; font-size: 0.82rem; border-top: 1px dashed var(--news-border); padding-top: 1rem;">
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Client Priv (a): </span><strong id="tls-priv-a" style="color: #ecc94b;">0x7F2A</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Server Priv (b): </span><strong id="tls-priv-b" style="color: #ed8936;">0x3E91</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Derived Key (S): </span><strong id="tls-shared-s" style="color: #e53e3e;">None (Unshared)</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Channel Security: </span><strong id="tls-chan-sec" style="color: #e53e3e;">Insecure</strong>
                </div>
            </div>

        </div>
    </div>
</div>

---

## 3. Why Perfect Forward Secrecy Matters

Imagine an intelligence agency recording petabytes of encrypted internet traffic passing through backbone cables today. 

Under the old **static RSA key exchange** (used in SSL 3.0 and early TLS), if the agency were to steal or subpoena the server's private RSA key five years in the future, they could retroactively decrypt **every single past session** ever recorded on that server!

With **ECDHE (Ephemeral Diffie-Hellman)**, the private keys $a$ and $b$ are generated randomly in memory for that single session and destroyed immediately after the session key is derived. Even if the server is physically confiscated decades later, past conversations remain mathematically impossible to decrypt.

<!-- p5.js CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>

<script>
const tlsSketch = (p) => {
    let currentStep = 0;
    const maxSteps = 4;
    let autoPlaying = false;
    let autoTimer = 0;

    let clientX, serverX, nodeY;
    let packet = {
        active: false,
        fromX: 0,
        toX: 0,
        progress: 0,
        label: "",
        color: [72, 187, 120]
    };

    let clientPriv = "0x7F2A";
    let serverPriv = "0x3E91";
    let sharedSecret = "None";
    let isEncrypted = false;

    p.setup = () => {
        const container = document.getElementById('tls-canvas-container');
        const w = container ? container.clientWidth : 800;
        const h = container ? container.clientHeight : 420;
        const canvas = p.createCanvas(w, h);
        canvas.parent('tls-canvas-container');

        // Link Controls
        const nextBtn = document.getElementById('tls-next-btn');
        if (nextBtn) nextBtn.addEventListener('click', advanceStep);

        const autoBtn = document.getElementById('tls-auto-btn');
        if (autoBtn) {
            autoBtn.addEventListener('click', () => {
                autoPlaying = !autoPlaying;
                autoBtn.textContent = autoPlaying ? "Pause Auto" : "Auto Play";
                autoBtn.style.color = autoPlaying ? "#48bb78" : "var(--news-ink)";
            });
        }

        const resetBtn = document.getElementById('tls-reset-btn');
        if (resetBtn) resetBtn.addEventListener('click', resetHandshake);

        resetHandshake();
    };

    p.windowResized = () => {
        const container = document.getElementById('tls-canvas-container');
        if (container) {
            p.resizeCanvas(container.clientWidth, container.clientHeight);
        }
    };

    function resetHandshake() {
        currentStep = 0;
        packet.active = false;
        packet.progress = 0;
        sharedSecret = "None";
        isEncrypted = false;
        autoPlaying = false;

        const autoBtn = document.getElementById('tls-auto-btn');
        if (autoBtn) {
            autoBtn.textContent = "Auto Play";
            autoBtn.style.color = "var(--news-ink)";
        }

        updateHUD();
    }

    function advanceStep() {
        if (currentStep >= maxSteps) {
            resetHandshake();
            return;
        }

        currentStep++;
        packet.active = true;
        packet.progress = 0;

        if (currentStep === 1) {
            // Step 1: Client Hello + Key Share
            packet.fromX = clientX;
            packet.toX = serverX;
            packet.label = "ClientHello + KeyShare (g^a)";
            packet.color = [49, 130, 206];
        } else if (currentStep === 2) {
            // Step 2: Server Hello + Key Share + Cert
            packet.fromX = serverX;
            packet.toX = clientX;
            packet.label = "ServerHello + KeyShare (g^b) + Cert";
            packet.color = [237, 137, 54];
        } else if (currentStep === 3) {
            // Step 3: Key derivation + Handshake Finished
            sharedSecret = "0x89C4...D10B";
            isEncrypted = true;
            packet.fromX = clientX;
            packet.toX = serverX;
            packet.label = "Handshake Finished (Encrypted)";
            packet.color = [72, 187, 120];
        } else if (currentStep === 4) {
            // Step 4: Full Encrypted Application Data
            packet.fromX = clientX;
            packet.toX = serverX;
            packet.label = "GET /index.html (AES-256-GCM)";
            packet.color = [159, 122, 234];
        }

        updateHUD();
    }

    function updateHUD() {
        const stepNameEl = document.getElementById('tls-step-name');
        const packetDetEl = document.getElementById('tls-packet-details');
        const sharedEl = document.getElementById('tls-shared-s');
        const chanSecEl = document.getElementById('tls-chan-sec');

        if (stepNameEl) {
            const names = [
                "0: Uninitialized",
                "1: ClientHello (1-RTT Key Share)",
                "2: ServerHello & Key Agreement",
                "3: Session Keys Derived",
                "4: Secure Application Data Flowing"
            ];
            stepNameEl.textContent = names[currentStep];
        }

        if (packetDetEl) {
            if (currentStep === 0) {
                packetDetEl.innerHTML = "Click <strong>Next Handshake Step</strong> to start. Client generates random private ephemeral secret <em>a</em>.";
            } else if (currentStep === 1) {
                packetDetEl.innerHTML = "<strong>Flight 1:</strong> Client proposes cipher suites (TLS_AES_256_GCM_SHA384) and proactively transmits public key share $g^a$ using curve X25519. Eve sees $g^a$ but cannot infer $a$.";
            } else if (currentStep === 2) {
                packetDetEl.innerHTML = "<strong>Flight 2:</strong> Server sends its own key share $g^b$ and digital certificate. Server immediately computes shared secret $S = (g^a)^b = g^{ab}$. All subsequent server messages are already encrypted!";
            } else if (currentStep === 3) {
                packetDetEl.innerHTML = "<strong>Key Computed:</strong> Client receives $g^b$ and computes $S = (g^b)^a = g^{ab}$. Both parties derive identical AES-256 session keys. Handshake complete in exactly <strong>1 Round Trip (1-RTT)</strong>!";
            } else if (currentStep === 4) {
                packetDetEl.innerHTML = "<strong>Secure Communication:</strong> Plaintext HTTP requests are encrypted into authenticated ciphertext with AES-256-GCM. Eve observes only high-entropy pseudorandom bytes.";
            }
        }

        if (sharedEl) {
            sharedEl.textContent = sharedSecret;
            sharedEl.style.color = isEncrypted ? "#48bb78" : "#e53e3e";
        }

        if (chanSecEl) {
            chanSecEl.textContent = isEncrypted ? "AES-256-GCM Secure (PFS)" : "Plaintext / Negotiating";
            chanSecEl.style.color = isEncrypted ? "#48bb78" : "#e53e3e";
        }
    }

    p.draw = () => {
        p.background(6, 9, 14);

        clientX = p.width * 0.18;
        serverX = p.width * 0.82;
        nodeY = p.height * 0.45;

        // Auto play timer
        if (autoPlaying) {
            autoTimer++;
            if (autoTimer > 100) {
                autoTimer = 0;
                advanceStep();
            }
        }

        // Draw network transmission line
        p.stroke(255, 255, 255, 25);
        p.strokeWeight(2);
        p.line(clientX, nodeY, serverX, nodeY);

        // Draw Eavesdropper Eve in the center
        drawEve(p.width / 2, nodeY - 70);

        // Draw Client and Server Nodes
        drawClientNode(clientX, nodeY);
        drawServerNode(serverX, nodeY);

        // Draw in-flight packet animation
        if (packet.active) {
            packet.progress += 0.025;
            if (packet.progress >= 1.0) {
                packet.progress = 1.0;
            }

            let curX = p.lerp(packet.fromX, packet.toX, packet.progress);
            let packetY = nodeY;

            // Packet halo glow
            p.fill(packet.color[0], packet.color[1], packet.color[2], 80);
            p.noStroke();
            p.ellipse(curX, packetY, 32, 32);

            // Packet body
            p.fill(packet.color[0], packet.color[1], packet.color[2]);
            p.stroke(255);
            p.strokeWeight(1.5);
            p.rect(curX - 22, packetY - 12, 44, 24, 6);

            // Packet icon/symbol
            p.fill(6, 9, 14);
            p.noStroke();
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(10);
            p.textFont("Courier Prime, monospace");
            p.text(isEncrypted ? "🔒 DATA" : "📄 TLS", curX, packetY);

            // Packet Label
            p.fill(240);
            p.textSize(11);
            p.text(packet.label, curX, packetY + 28);
        }
    };

    function drawClientNode(x, y) {
        // Laptop/Client chassis
        p.stroke(49, 130, 206);
        p.strokeWeight(2);
        p.fill(16, 24, 40);
        p.rect(x - 38, y - 45, 76, 55, 8);

        // Screen
        p.fill(isEncrypted ? p.color(72, 187, 120, 60) : p.color(49, 130, 206, 60));
        p.rect(x - 32, y - 40, 64, 45, 4);

        // Base keyboard
        p.fill(25, 35, 55);
        p.rect(x - 45, y + 10, 90, 8, 3);

        // Labels
        p.noStroke();
        p.fill(240);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(13);
        p.textFont("Playfair Display, serif");
        p.text("Client (Browser)", x, y + 25);

        p.fill(160);
        p.textSize(10);
        p.textFont("Courier Prime, monospace");
        p.text("Priv: " + clientPriv, x, y + 44);
    }

    function drawServerNode(x, y) {
        // Server Rack
        p.stroke(237, 137, 54);
        p.strokeWeight(2);
        p.fill(25, 20, 16);
        p.rect(x - 35, y - 50, 70, 75, 6);

        // Server rack slots & blinking LEDs
        for (let i = 0; i < 3; i++) {
            let slotY = y - 40 + i * 22;
            p.stroke(60);
            p.strokeWeight(1);
            p.line(x - 28, slotY, x + 28, slotY);

            p.noStroke();
            p.fill(p.frameCount % 30 < 15 ? p.color(72, 187, 120) : p.color(49, 130, 206));
            p.ellipse(x + 20, slotY - 6, 4, 4);
        }

        // Labels
        p.noStroke();
        p.fill(240);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(13);
        p.textFont("Playfair Display, serif");
        p.text("Server (HTTPS)", x, y + 32);

        p.fill(160);
        p.textSize(10);
        p.textFont("Courier Prime, monospace");
        p.text("Priv: " + serverPriv, x, y + 51);
    }

    function drawEve(x, y) {
        // Wire tap line down to transmission medium
        p.stroke(229, 62, 62, 80);
        p.strokeWeight(1);
        p.drawingContext.setLineDash([3, 3]);
        p.line(x, y + 24, x, nodeY);
        p.drawingContext.setLineDash([]);

        // Eavesdropper Avatar
        p.fill(229, 62, 62, 25);
        p.stroke(229, 62, 62, 180);
        p.strokeWeight(1.5);
        p.ellipse(x, y, 42, 42);

        // Eye symbol
        p.noFill();
        p.stroke(229, 62, 62, 220);
        p.strokeWeight(1.5);
        p.arc(x, y, 22, 14, 0, p.PI);
        p.arc(x, y, 22, 14, p.PI, p.TWO_PI);
        p.fill(229, 62, 62);
        p.ellipse(x, y, 6, 6);

        // Label
        p.noStroke();
        p.fill(229, 62, 62);
        p.textAlign(p.CENTER, p.BOTTOM);
        p.textSize(10);
        p.textFont("Courier Prime, monospace");
        p.text("Eavesdropper (Eve)", x, y - 26);

        p.fill(160);
        p.textSize(9);
        p.text(isEncrypted ? "Ciphertext Blocked ❌" : "Sniffing Public g^a, g^b", x, y + 36);
    }
};

new p5(tlsSketch, 'tls-canvas-container');
</script>
