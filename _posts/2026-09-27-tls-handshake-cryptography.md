---
layout: newspaper
title: "Computer Science: The Anatomy of TLS 1.3 vs TLS 1.2 Handshakes"
newspaper_title: "The Developer's Post"
newspaper_tagline: "Explaining Technology Through the Art of Storytelling"
edition: "Computer Systems Edition"
section: "Cryptography & Networks Branch"
division: "Computer Science"
author: "Shubham Kumar"
volume: "I"
issue: "20"
date: 2026-09-27 22:00:00 +0530
tags: [Computer Science, Networking, Cryptography, Security, TLS, p5.js, Education]
weather: "ECDHE key exchange negotiating symmetric AES-256 session over public fiber"
ticker_index: "TLS 1.3: 1-RTT handshake | TLS 1.2: 2-RTT legacy | Diffie-Hellman: S = g^(ab) mod p | Perfect Forward Secrecy"
price: "10 Credits"
---

Every millisecond of every day, billions of devices transmit credit card numbers, confidential passwords, and private messages across the open internet. The underlying physical medium—submarine fiber optic cables, cell towers, and public coffee shop Wi-Fi routers—is completely accessible to anyone with network sniffing hardware.

How can two strangers who have never met—your web browser in New Delhi and a web server in California—communicate with airtight secrecy across an untrusted wire without a third party eavesdropping?

The answer is **Transport Layer Security (TLS)**, the cryptographic backbone powering **HTTPS**. In this edition, we explore how modern **TLS 1.3** slashed latency in half compared to **TLS 1.2**, and how both protocols utilize the elegant mathematical machinery of **Elliptic-Curve Diffie-Hellman Ephemeral (ECDHE)** to defend your data against interception.

<div class="newspaper-clipping">
    <h3>The Cryptographic Glossary</h3>
    <ul>
        <li><strong>Symmetric Encryption (AES-GCM / ChaCha20)</strong>: Uses the same secret key to encrypt and decrypt data. Blazing fast, but requires both parties to already possess the shared key.</li>
        <li><strong>Asymmetric Encryption (RSA / ECC)</strong>: Uses a keypair (Public Key to encrypt, Private Key to decrypt). Solves key distribution, but is too computationally heavy for bulk data streaming.</li>
        <li><strong>Diffie-Hellman Key Exchange (ECDHE)</strong>: A mathematical protocol allowing two parties to derive a shared secret over an insecure channel without transmitting the secret itself.</li>
        <li><strong>Perfect Forward Secrecy (PFS)</strong>: A security guarantee ensuring that even if a server's long-term private key is compromised in the future, past encrypted sessions remain unbreakable.</li>
        <li><strong>Round-Trip Time (RTT)</strong>: The duration required for a data packet to travel from client to server and back again. Reducing RTT is the holy grail of web performance.</li>
    </ul>
</div>

---

## 1. The Diffie-Hellman Mathematical Miracle

Invented by Whitfield Diffie and Martin Hellman in 1976 (and modernized via Elliptic Curves), Diffie-Hellman solves the ancient **Key Distribution Problem**.

Imagine Alice (the browser) and Bob (the server) want to agree on a secret key without Eve (an eavesdropper) discovering it:

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

Prior to 2018, the internet ran on **TLS 1.2** (defined in RFC 5246). TLS 1.2 was robust, but it suffered from two key drawbacks: high connection latency (**2 full round trips** before sending application data) and backwards-compatible support for obsolete, dangerous ciphers (such as static RSA key exchange and RC4).

In 2018, the IETF ratified **TLS 1.3** (RFC 8446). It fundamentally revamped the handshake architecture:

| Feature / Metric | Legacy TLS 1.2 | Modern TLS 1.3 |
| :--- | :--- | :--- |
| **Handshake Latency** | **2-RTT** (2 full round trips) | **1-RTT** (50% faster, 0-RTT resumption) |
| **Key Exchange** | RSA, DHE, ECDHE | **ECDHE only** (Mandates Forward Secrecy) |
| **Key Share Timing** | Negotiated in 2nd flight (`ClientKeyExchange`) | Speculatively sent in 1st flight (`ClientHello`) |
| **Handshake Encryption** | Plaintext until `ChangeCipherSpec` | **Encrypted immediately** after `ServerHello` |
| **Outlawed Ciphers** | Supported RC4, MD5, SHA-1, CBC mode, static RSA | **Removed all legacy ciphers**; only AEAD allowed |
| **Allowed AEAD Ciphers** | AES-CBC, AES-GCM | **AES-128-GCM, AES-256-GCM, ChaCha20-Poly1305** |

```
       TLS 1.2 Handshake (2-RTT)                         TLS 1.3 Handshake (1-RTT)
   Client                      Server               Client                      Server
     |                            |                   |                            |
     |--------- ClientHello ----->|                   |-- ClientHello + KeyShare ->|
     |                            |                   |   (e.g., Curve25519 g^a)   |
     |<-------- ServerHello ------|                   |<-- ServerHello + KeyShare -|
     |<-------- Certificate ------|                   |    (g^b) + EncryptedExts   |
     |<---- ServerKeyExchange ----|                   |    + Cert + Finished       |
     |<----- ServerHelloDone -----|                   |                            |
     |                            |                   |=== HTTP App Data (GET) ===>|
     |---- ClientKeyExchange ---->|                   |<== HTTP App Data (Resp) ===|
     |---- [ChangeCipherSpec] --->|
     |--------- Finished -------->|
     |                            |
     |<--- [ChangeCipherSpec] ----|
     |<-------- Finished ---------|
     |                            |
     |=== HTTP App Data (GET) ===>|
     |<== HTTP App Data (Resp) ===|
```

Notice the crucial difference: in **TLS 1.3**, the client speculatively assumes the server supports popular elliptic curves (like Curve25519 or secp256r1) and bundles its key share $g^a$ directly inside the `ClientHello`. The server answers with its key share $g^b$, immediately derives the symmetric key, and encrypts its certificate and `Finished` message in the very same response packet!

---

<!-- Dynamic p5.js Interactive Section -->
<div class="newspaper-wide">
    <div class="newspaper-clipping" style="border: 2px solid var(--news-border); background: rgba(0,0,0,0.02); text-align: center; padding: 2rem 1.5rem; margin-top: 2rem;">
        <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;">
            Interactive TLS 1.3 vs TLS 1.2 Protocol Simulator
        </h3>
        <p style="text-indent: 0; font-size: 0.95rem; color: var(--news-muted); margin-bottom: 1.5rem;">
            Toggle between TLS 1.3 (1-RTT) and TLS 1.2 (2-RTT). Watch real-time packet byte streams, RTT progression, fiber-optic photons, and verify how eavesdropper Eve is thwarted.
        </p>

        <!-- Canvas Container -->
        <div id="tls-canvas-container" style="width: 100%; height: 460px; border-radius: 8px; overflow: hidden; border: 1px solid var(--news-border); margin-bottom: 1.5rem; position: relative; background: #06090e;"></div>

        <!-- Interactive Controls HUD -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 860px; margin: 0 auto; padding: 0.5rem; text-align: left;">
            
            <!-- Step Buttons & Action Bar -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
                
                <div style="display: flex; gap: 0.65rem; flex-wrap: wrap; align-items: center;">
                    <!-- TLS Version Selector -->
                    <label for="tls-version-select" style="font-family: 'Courier Prime', monospace; font-size: 0.88rem; font-weight: bold;">Protocol:</label>
                    <select id="tls-version-select" style="padding: 0.45rem 0.75rem; font-family: 'Courier Prime', monospace; font-size: 0.85rem; font-weight: bold; background: var(--news-bg); color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        <option value="tls13" selected>TLS 1.3 (Modern 1-RTT)</option>
                        <option value="tls12">TLS 1.2 (Legacy 2-RTT)</option>
                    </select>

                    <button id="tls-next-btn" style="padding: 0.5rem 1.25rem; font-family: 'Playfair Display', serif; font-weight: bold; background: var(--news-ink); color: var(--news-bg); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                        ▶ Next Step
                    </button>
                    <button id="tls-auto-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Auto Play
                    </button>
                    <button id="tls-reset-btn" style="padding: 0.5rem 1rem; font-family: 'Playfair Display', serif; font-weight: bold; background: transparent; color: var(--news-ink); border: 1px solid var(--news-border); border-radius: 4px; cursor: pointer;">
                        Reset
                    </button>
                </div>

                <!-- Handshake Phase Indicator -->
                <div style="font-family: 'Courier Prime', monospace; font-size: 0.88rem; background: rgba(0,0,0,0.05); padding: 0.4rem 0.75rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Step: </span><strong id="tls-step-name" style="color: var(--primary-color);">0: Idle</strong>
                </div>
            </div>

            <!-- Packet Inspection HUD Card -->
            <div style="background: rgba(0,0,0,0.03); border: 1px dashed var(--news-border); border-radius: 6px; padding: 1rem;">
                <div style="font-weight: bold; font-size: 0.88rem; margin-bottom: 0.35rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                    <span>Wire Packet Record Inspection:</span>
                    <span id="tls-cipher-suite" style="color: #3182ce; font-family: 'Courier Prime', monospace; font-size: 0.8rem;">TLS_AES_256_GCM_SHA384</span>
                </div>
                <div id="tls-packet-details" style="font-family: 'Courier Prime', monospace; font-size: 0.82rem; color: var(--news-ink); line-height: 1.5; margin-bottom: 0.5rem;">
                    Click "Next Step" to begin handshake negotiation.
                </div>
                <!-- Hex & Header dump -->
                <div style="background: #0d1117; color: #58a6ff; padding: 0.5rem 0.75rem; border-radius: 4px; font-family: 'Courier Prime', monospace; font-size: 0.75rem; overflow-x: auto; white-space: nowrap;" id="tls-hex-dump">
                    RECORD: Type=0x16 (Handshake) | Ver=0x0303 (TLS 1.2 compat) | Length=0x0000 | Payload=[None]
                </div>
            </div>

            <!-- Telemetry Badges -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-family: 'Courier Prime', monospace; font-size: 0.82rem; border-top: 1px dashed var(--news-border); padding-top: 1rem;">
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Latency: </span><strong id="tls-rtt-meter" style="color: #3182ce;">0.0 RTT</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Client Priv (a): </span><strong id="tls-priv-a" style="color: #ecc94b;">0x7F2A</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Server Priv (b): </span><strong id="tls-priv-b" style="color: #ed8936;">0x3E91</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Derived Key (S): </span><strong id="tls-shared-s" style="color: #e53e3e;">None</strong>
                </div>
                <div style="background: rgba(0,0,0,0.05); padding: 0.35rem 0.65rem; border: 1px solid var(--news-border); border-radius: 4px;">
                    <span>Eve Wiretap: </span><strong id="tls-eve-status" style="color: #ecc94b;">Passive Sniffing</strong>
                </div>
            </div>

        </div>
    </div>
</div>

---

## 3. Why Perfect Forward Secrecy Matters

Imagine an intelligence agency or malicious actor recording petabytes of encrypted internet traffic passing through submarine fiber cables today. 

Under the old **static RSA key exchange** (prevalent in early SSL and TLS versions), if the private RSA key of a bank or government server were stolen, compromised, or subpoenaed five years later, the attacker could retroactively decrypt **every single past historical session** ever recorded from that server!

With **ECDHE (Ephemeral Diffie-Hellman)**:
1. The private keys $a$ and $b$ are generated purely in RAM for that single connection.
2. Once the symmetric session key is derived, $a$ and $b$ are erased from memory with zeroing instructions.
3. Even if the server hardware is physically confiscated by an adversary in the future, past communications remain mathematically impervious to decryption.

This is why **TLS 1.3 completely eradicated static RSA key exchange**, mandating ephemeral Diffie-Hellman by law of the protocol.

<!-- p5.js CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>

<script>
const tlsSketch = (p) => {
    let mode = "tls13"; // "tls13" or "tls12"
    let currentStep = 0;
    let autoPlaying = false;
    let autoTimer = 0;

    let clientX, serverX, nodeY;
    let particles = [];
    let packetParticles = [];

    let packet = {
        active: false,
        fromX: 0,
        toX: 0,
        progress: 0,
        label: "",
        sublabel: "",
        color: [72, 187, 120],
        isEncrypted: false,
        sizeBytes: "384 B"
    };

    let clientPriv = "0x7F2A";
    let serverPriv = "0x3E91";
    let sharedSecret = "None";
    let isEncrypted = false;
    let eveIntercepting = false;

    // TLS 1.3 Steps: 4 total (1-RTT)
    const tls13Steps = [
        {
            name: "1: ClientHello + KeyShare (g^a)",
            rtt: "0.5 RTT",
            cipher: "TLS_AES_256_GCM_SHA384",
            from: "client",
            label: "ClientHello + KeyShare",
            sub: "Curves: X25519 (g^a)",
            size: "512 B",
            encrypted: false,
            color: [49, 130, 206],
            details: "<strong>Flight 1:</strong> Client initiates handshake. Proposes modern AEAD cipher suites and speculatively sends its Curve25519 public key share $g^a$. Eve captures $g^a$ but cannot solve discrete logarithm for $a$.",
            hex: "16 03 01 02 00 01 00 01 fc 03 03 [ClientRandom: 32B] [CipherSuites: AES_GCM] [KeyShare: Curve25519 (g^a)]"
        },
        {
            name: "2: ServerHello + KeyShare (g^b) + Cert + Finished",
            rtt: "1.0 RTT",
            cipher: "TLS_AES_256_GCM_SHA384",
            from: "server",
            label: "ServerHello + KeyShare + Cert",
            sub: "EncryptedExtensions + Finished",
            size: "1,420 B",
            encrypted: false, // ServerHello header is plaintext, inner extensions encrypted
            color: [237, 137, 54],
            details: "<strong>Flight 2:</strong> Server selects AES-256-GCM, returns key share $g^b$, and derives shared secret $S = (g^a)^b = g^{ab}$. The server's Certificate and Handshake Finished are already encrypted with the newly derived handshake key!",
            hex: "16 03 03 00 7a 02 [ServerRandom: 32B] [KeyShare: g^b] {EncryptedExtensions, Cert, CertVerify, Finished}"
        },
        {
            name: "3: Handshake Finished (Encrypted Verify)",
            rtt: "1.0 RTT",
            cipher: "TLS_AES_256_GCM_SHA384",
            from: "client",
            label: "Client Finished",
            sub: "HMAC verify_data",
            size: "96 B",
            encrypted: true,
            color: [72, 187, 120],
            details: "<strong>Handshake Complete in 1-RTT:</strong> Client computes $S = (g^b)^a = g^{ab}$, derives application traffic keys, verifies server authenticity, and sends authenticated Finished message. Zero round trips wasted!",
            hex: "17 03 03 00 34 [AEAD Ciphertext: 8c f2 a1 90 e4 d8 7b ... auth_tag: 16B]"
        },
        {
            name: "4: Application Data (HTTP GET)",
            rtt: "1.5 RTT",
            cipher: "TLS_AES_256_GCM_SHA384",
            from: "client",
            label: "GET /index.html",
            sub: "Encrypted AES-256-GCM",
            size: "820 B",
            encrypted: true,
            color: [159, 122, 234],
            details: "<strong>Secure Transport:</strong> Full bidirectional HTTP/2 or HTTP/3 stream begins. Plaintext data is authenticated and encrypted. Eve sees only opaque pseudorandom noise.",
            hex: "17 03 03 03 34 [Encrypted HTTP Frame: 47 45 54 20 ... IV=0x01 Tag=0x9A]"
        }
    ];

    // TLS 1.2 Steps: 5 total (2-RTT)
    const tls12Steps = [
        {
            name: "1: ClientHello (Propose Ciphers)",
            rtt: "0.5 RTT",
            cipher: "Negotiating (TLS 1.2)",
            from: "client",
            label: "ClientHello",
            sub: "Ciphers, ClientRandom",
            size: "256 B",
            encrypted: false,
            color: [49, 130, 206],
            details: "<strong>Flight 1 (TLS 1.2):</strong> Client sends ClientHello listing supported ciphers, compression methods, and 32-byte ClientRandom $R_c$. No key share is sent yet!",
            hex: "16 03 03 00 e0 01 00 00 dc 03 03 [ClientRandom: 32B] [SessionID: 0] [32 Cipher Suites: RSA, DHE, ECDHE]"
        },
        {
            name: "2: ServerHello + Cert + ServerKeyExchange + Done",
            rtt: "1.0 RTT",
            cipher: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
            from: "server",
            label: "ServerHello + Cert + ECDHE",
            sub: "ServerHelloDone",
            size: "2,150 B",
            encrypted: false,
            color: [237, 137, 54],
            details: "<strong>Flight 2 (TLS 1.2):</strong> Server chooses cipher suite, provides ServerRandom $R_s$, sends unencrypted Certificate, sends ECDHE parameters ($g^b$) signed by RSA key, and concludes with `ServerHelloDone`.",
            hex: "16 03 03 01 80 02 [ServerRandom] | 0b [Cert] | 0c [ServerKeyExchange: g^b + Sig] | 0e [ServerHelloDone]"
        },
        {
            name: "3: ClientKeyExchange + [ChangeCipherSpec] + Finished",
            rtt: "1.5 RTT",
            cipher: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
            from: "client",
            label: "ClientKeyExchange + Finished",
            sub: "ECDHE g^a + [CCS]",
            size: "310 B",
            encrypted: false,
            color: [236, 201, 75],
            details: "<strong>Flight 3 (TLS 1.2):</strong> Client sends its public key share $g^a$, derives Pre-Master Secret $S = g^{ab}$, emits `ChangeCipherSpec` signal, and sends encrypted Finished message (verify_data).",
            hex: "16 03 03 00 46 10 [ClientKeyExchange: g^a] | 14 03 03 00 01 01 [ChangeCipherSpec] | 16 03 03 00 28 [Finished]"
        },
        {
            name: "4: [ChangeCipherSpec] + Finished",
            rtt: "2.0 RTT",
            cipher: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
            from: "server",
            label: "[ChangeCipherSpec] + Finished",
            sub: "Handshake Complete (2-RTT)",
            size: "128 B",
            encrypted: true,
            color: [72, 187, 120],
            details: "<strong>Flight 4 (TLS 1.2):</strong> Server computes Pre-Master Secret, verifies Finished digest, sends `ChangeCipherSpec` and its own encrypted Finished message. Handshake concludes after **two full round trips (2-RTT)**.",
            hex: "14 03 03 00 01 01 [ChangeCipherSpec] | 16 03 03 00 28 [Encrypted Server Finished: 36 8a bc 11 ...]"
        },
        {
            name: "5: Application Data (HTTP GET)",
            rtt: "2.5 RTT",
            cipher: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
            from: "client",
            label: "GET /index.html",
            sub: "Encrypted AES-256-GCM",
            size: "820 B",
            encrypted: true,
            color: [159, 122, 234],
            details: "<strong>Application Data Transferred:</strong> Only now, at 2.5 RTT from the start of connection, can the client transmit the HTTP request. TLS 1.3 is twice as fast to reach this milestone!",
            hex: "17 03 03 03 34 [AES-GCM Ciphertext: 5f a2 99 e0 c4 ... AuthTag: 16B]"
        }
    ];

    p.setup = () => {
        const container = document.getElementById('tls-canvas-container');
        const w = container ? container.clientWidth : 800;
        const h = container ? container.clientHeight : 460;
        const canvas = p.createCanvas(w, h);
        canvas.parent('tls-canvas-container');

        // Fiber optic background ambient photons
        for (let i = 0; i < 24; i++) {
            particles.push({
                x: p.random(0, p.width),
                speed: p.random(0.5, 2.0),
                size: p.random(1.5, 3.5),
                alpha: p.random(30, 100)
            });
        }

        // Link Controls
        const verSelect = document.getElementById('tls-version-select');
        if (verSelect) {
            verSelect.addEventListener('change', (e) => {
                mode = e.target.value;
                resetHandshake();
            });
        }

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
        packetParticles = [];
        sharedSecret = "None";
        isEncrypted = false;
        eveIntercepting = false;
        autoPlaying = false;

        const autoBtn = document.getElementById('tls-auto-btn');
        if (autoBtn) {
            autoBtn.textContent = "Auto Play";
            autoBtn.style.color = "var(--news-ink)";
        }

        updateHUD();
    }

    function advanceStep() {
        const steps = mode === "tls13" ? tls13Steps : tls12Steps;
        if (currentStep >= steps.length) {
            resetHandshake();
            return;
        }

        currentStep++;
        const stepData = steps[currentStep - 1];

        packet.active = true;
        packet.progress = 0;
        packet.label = stepData.label;
        packet.sublabel = stepData.sub;
        packet.sizeBytes = stepData.size;
        packet.color = stepData.color;
        packet.isEncrypted = stepData.encrypted;

        if (stepData.from === "client") {
            packet.fromX = clientX;
            packet.toX = serverX;
        } else {
            packet.fromX = serverX;
            packet.toX = clientX;
        }

        // Key Derivation logic
        if (mode === "tls13") {
            if (currentStep >= 2) {
                sharedSecret = "0x89C4...D10B";
                isEncrypted = true;
            }
        } else {
            // TLS 1.2
            if (currentStep >= 4) {
                sharedSecret = "0x5E81...F92A";
                isEncrypted = true;
            }
        }

        updateHUD();
    }

    function updateHUD() {
        const steps = mode === "tls13" ? tls13Steps : tls12Steps;
        const stepNameEl = document.getElementById('tls-step-name');
        const packetDetEl = document.getElementById('tls-packet-details');
        const cipherEl = document.getElementById('tls-cipher-suite');
        const hexEl = document.getElementById('tls-hex-dump');
        const rttEl = document.getElementById('tls-rtt-meter');
        const sharedEl = document.getElementById('tls-shared-s');
        const eveStatusEl = document.getElementById('tls-eve-status');

        if (currentStep === 0) {
            if (stepNameEl) stepNameEl.textContent = "0: Idle / Ready";
            if (packetDetEl) packetDetEl.innerHTML = "Click <strong>Next Step</strong> or <strong>Auto Play</strong> to initiate the handshake over the public network.";
            if (cipherEl) cipherEl.textContent = mode === "tls13" ? "TLS_AES_256_GCM_SHA384" : "Negotiating...";
            if (hexEl) hexEl.textContent = "RECORD: Type=0x16 (Handshake) | Ver=0x0303 | Length=0x0000 | Payload=[None]";
            if (rttEl) rttEl.textContent = "0.0 RTT";
            if (sharedEl) {
                sharedEl.textContent = "None (Unshared)";
                sharedEl.style.color = "#e53e3e";
            }
            if (eveStatusEl) {
                eveStatusEl.textContent = "Passive Sniffing";
                eveStatusEl.style.color = "#ecc94b";
            }
            return;
        }

        const info = steps[currentStep - 1];
        if (stepNameEl) stepNameEl.textContent = info.name;
        if (packetDetEl) packetDetEl.innerHTML = info.details;
        if (cipherEl) cipherEl.textContent = info.cipher;
        if (hexEl) hexEl.textContent = info.hex;
        if (rttEl) rttEl.textContent = info.rtt;

        if (sharedEl) {
            sharedEl.textContent = sharedSecret;
            sharedEl.style.color = isEncrypted ? "#48bb78" : "#e53e3e";
        }

        if (eveStatusEl) {
            if (info.encrypted) {
                eveStatusEl.textContent = "Ciphertext Blocked ❌";
                eveStatusEl.style.color = "#e53e3e";
            } else {
                eveStatusEl.textContent = "Intercepting Cleartext ⚠️";
                eveStatusEl.style.color = "#ecc94b";
            }
        }
    }

    p.draw = () => {
        p.background(6, 9, 14);

        clientX = p.width * 0.16;
        serverX = p.width * 0.84;
        nodeY = p.height * 0.52;

        // Auto play timer
        if (autoPlaying) {
            autoTimer++;
            if (autoTimer > 120) {
                autoTimer = 0;
                advanceStep();
            }
        }

        // Draw RTT progress gauge at top of canvas
        drawRTTGauge();

        // Ambient Fiber Optic Photons
        p.stroke(49, 130, 206, 40);
        p.strokeWeight(1);
        for (let pt of particles) {
            pt.x += pt.speed;
            if (pt.x > p.width) pt.x = 0;
            p.fill(56, 178, 172, pt.alpha);
            p.noStroke();
            p.ellipse(pt.x, nodeY + p.sin(pt.x * 0.03) * 6, pt.size, pt.size);
        }

        // Network transmission line
        p.stroke(255, 255, 255, 30);
        p.strokeWeight(2.5);
        p.line(clientX, nodeY, serverX, nodeY);

        // Center Wire Tap point
        let midX = (clientX + serverX) / 2;
        p.fill(229, 62, 62, 15);
        p.stroke(229, 62, 62, 80);
        p.strokeWeight(1);
        p.ellipse(midX, nodeY, 14, 14);

        // Draw Eve Wiretap Antenna & Scanner
        drawEve(midX, nodeY - 95);

        // Draw in-flight packet & particle emission
        if (packet.active) {
            packet.progress += 0.022;
            if (packet.progress >= 1.0) {
                packet.progress = 1.0;
            }

            let curX = p.lerp(packet.fromX, packet.toX, packet.progress);
            let packetY = nodeY;

            // Trigger Eve scan pulse when passing center
            if (p.abs(curX - midX) < 30) {
                eveIntercepting = true;
            } else {
                eveIntercepting = false;
            }

            // Packet trail particles
            if (p.frameCount % 2 === 0) {
                packetParticles.push({
                    x: curX,
                    y: packetY + p.random(-4, 4),
                    life: 25,
                    col: packet.color
                });
            }

            // Render particles
            for (let i = packetParticles.length - 1; i >= 0; i--) {
                let pp = packetParticles[i];
                pp.life--;
                let alpha = (pp.life / 25) * 120;
                p.noStroke();
                p.fill(pp.col[0], pp.col[1], pp.col[2], alpha);
                p.ellipse(pp.x, pp.y, 4, 4);
                if (pp.life <= 0) packetParticles.splice(i, 1);
            }

            // Packet outer glow
            p.fill(packet.color[0], packet.color[1], packet.color[2], 50);
            p.noStroke();
            p.ellipse(curX, packetY, 44, 44);

            // Packet chassis
            p.fill(16, 24, 40);
            p.stroke(packet.color[0], packet.color[1], packet.color[2]);
            p.strokeWeight(2);
            p.rect(curX - 32, packetY - 18, 64, 36, 6);

            // Packet Header & Lock
            p.fill(packet.color[0], packet.color[1], packet.color[2]);
            p.noStroke();
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(9);
            p.textFont("Courier Prime, monospace");
            let iconText = packet.isEncrypted ? "🔒 AEAD" : "📜 TLS";
            p.text(iconText, curX, packetY - 6);

            // Size badge
            p.fill(180);
            p.textSize(8);
            p.text(packet.sizeBytes, curX, packetY + 8);

            // Packet text banner below
            p.fill(240);
            p.textSize(10);
            p.text(packet.label, curX, packetY + 28);
            p.fill(160);
            p.textSize(8.5);
            p.text(packet.sublabel, curX, packetY + 41);
        }

        // Draw Client and Server Nodes
        drawClientNode(clientX, nodeY);
        drawServerNode(serverX, nodeY);
    };

    function drawRTTGauge() {
        let gaugeY = 32;
        let leftX = p.width * 0.15;
        let rightX = p.width * 0.85;

        p.stroke(255, 255, 255, 25);
        p.strokeWeight(3);
        p.line(leftX, gaugeY, rightX, gaugeY);

        let totalRTT = mode === "tls13" ? 1.5 : 2.5;
        let numTicks = mode === "tls13" ? 3 : 5;

        for (let i = 0; i <= numTicks; i++) {
            let tx = p.map(i, 0, numTicks, leftX, rightX);
            let val = (i * 0.5).toFixed(1) + " RTT";

            p.stroke(255, 255, 255, 60);
            p.strokeWeight(1.5);
            p.line(tx, gaugeY - 5, tx, gaugeY + 5);

            p.noStroke();
            p.fill(160);
            p.textAlign(p.CENTER, p.TOP);
            p.textSize(9);
            p.textFont("Courier Prime, monospace");
            p.text(val, tx, gaugeY + 8);
        }

        // Current RTT marker pin
        let steps = mode === "tls13" ? tls13Steps : tls12Steps;
        let curRTTVal = 0;
        if (currentStep > 0 && currentStep <= steps.length) {
            curRTTVal = parseFloat(steps[currentStep - 1].rtt);
        }
        let pinX = p.map(curRTTVal, 0, totalRTT, leftX, rightX);

        p.fill(49, 130, 206);
        p.noStroke();
        p.ellipse(pinX, gaugeY, 10, 10);
        p.fill(255);
        p.ellipse(pinX, gaugeY, 4, 4);

        // Protocol Mode Pill
        p.fill(mode === "tls13" ? p.color(72, 187, 120, 30) : p.color(237, 137, 54, 30));
        p.stroke(mode === "tls13" ? p.color(72, 187, 120) : p.color(237, 137, 54));
        p.strokeWeight(1);
        p.rect(p.width / 2 - 65, 8, 130, 18, 9);

        p.noStroke();
        p.fill(240);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(9.5);
        p.textFont("Playfair Display, serif");
        p.text(mode === "tls13" ? "TLS 1.3 Handshake (1-RTT)" : "TLS 1.2 Handshake (2-RTT)", p.width / 2, 16);
    }

    function drawClientNode(x, y) {
        // Laptop Chassis
        p.stroke(49, 130, 206);
        p.strokeWeight(2);
        p.fill(16, 24, 40);
        p.rect(x - 38, y - 48, 76, 56, 8);

        // Screen
        p.fill(isEncrypted ? p.color(72, 187, 120, 60) : p.color(49, 130, 206, 60));
        p.rect(x - 32, y - 42, 64, 44, 4);

        // Screen status content
        p.fill(255);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(8);
        p.textFont("Courier Prime, monospace");
        p.text(isEncrypted ? "AES-GCM" : "INIT", x, y - 20);

        // Keyboard base
        p.stroke(49, 130, 206, 120);
        p.strokeWeight(1);
        p.fill(25, 35, 55);
        p.rect(x - 46, y + 10, 92, 9, 3);

        // Node labels
        p.noStroke();
        p.fill(240);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(12);
        p.textFont("Playfair Display, serif");
        p.text("Client (Browser)", x, y + 26);

        p.fill(160);
        p.textSize(9);
        p.textFont("Courier Prime, monospace");
        p.text("Priv a: " + clientPriv, x, y + 43);
    }

    function drawServerNode(x, y) {
        // Server Rack Chassis
        p.stroke(237, 137, 54);
        p.strokeWeight(2);
        p.fill(25, 20, 16);
        p.rect(x - 35, y - 52, 70, 78, 6);

        // Server rack units & blinking LEDs
        for (let i = 0; i < 3; i++) {
            let slotY = y - 42 + i * 23;
            p.stroke(60);
            p.strokeWeight(1);
            p.line(x - 28, slotY, x + 28, slotY);

            p.noStroke();
            let ledColor = (p.frameCount % 40 < 20) ? p.color(72, 187, 120) : p.color(49, 130, 206);
            if (isEncrypted) ledColor = p.color(72, 187, 120);
            p.fill(ledColor);
            p.ellipse(x + 20, slotY - 6, 4.5, 4.5);
        }

        // Node labels
        p.noStroke();
        p.fill(240);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(12);
        p.textFont("Playfair Display, serif");
        p.text("Web Server", x, y + 32);

        p.fill(160);
        p.textSize(9);
        p.textFont("Courier Prime, monospace");
        p.text("Priv b: " + serverPriv, x, y + 49);
    }

    function drawEve(x, y) {
        // Wire tap line down to network cable
        p.stroke(229, 62, 62, eveIntercepting ? 200 : 70);
        p.strokeWeight(eveIntercepting ? 1.5 : 1);
        p.drawingContext.setLineDash([3, 3]);
        p.line(x, y + 24, x, nodeY);
        p.drawingContext.setLineDash([]);

        // Radar scanner ping wave when intercepting
        if (eveIntercepting) {
            let pulseRad = (p.frameCount * 2) % 36 + 18;
            p.noFill();
            p.stroke(229, 62, 62, p.map(pulseRad, 18, 54, 180, 0));
            p.strokeWeight(1.5);
            p.ellipse(x, y, pulseRad * 2, pulseRad * 2);
        }

        // Eavesdropper Avatar
        p.fill(229, 62, 62, eveIntercepting ? 45 : 20);
        p.stroke(229, 62, 62, 180);
        p.strokeWeight(1.5);
        p.ellipse(x, y, 42, 42);

        // Eye symbol
        p.noFill();
        p.stroke(229, 62, 62, 240);
        p.strokeWeight(1.5);
        p.arc(x, y, 22, 14, 0, p.PI);
        p.arc(x, y, 22, 14, p.PI, p.TWO_PI);
        p.fill(229, 62, 62);
        p.ellipse(x, y, 6, 6);

        // Labels
        p.noStroke();
        p.fill(229, 62, 62);
        p.textAlign(p.CENTER, p.BOTTOM);
        p.textSize(10);
        p.textFont("Courier Prime, monospace");
        p.text("Eavesdropper (Eve)", x, y - 26);

        p.fill(160);
        p.textSize(8.5);
        if (isEncrypted) {
            p.fill(72, 187, 120);
            p.text("Ciphertext: Cannot Decrypt", x, y + 36);
        } else {
            p.fill(236, 201, 75);
            p.text(currentStep > 0 ? "Intercepting Cleartext g^x" : "Sniffer Passive", x, y + 36);
        }
    }
};

new p5(tlsSketch, 'tls-canvas-container');
</script>
