---
layout: project
title: Advanced Scientific & Mathematical Simulations Suite
description: An interactive browser-based visual sandbox displaying complex mathematical transformations, wave interference, orbital mechanics, and signal processing models built using p5.js.
image: /assets/images/projects/p5js-simulations.png
tags: [p5.js, Creative Coding, Physics, Mathematics, Simulations, JavaScript]
github: https://github.com/shubhamkrshandilya/p5js-simulations
demo: https://shubhamkrshandilya.github.io/p5js-simulations/
date: 2022-06-15
---

## Overview

Modern web browsers are capable of running complex scientific computations and displaying them in real-time. This project is an interactive visual sandbox designed to demonstrate advanced concepts in mathematics, wave physics, orbital dynamics, and signal processing using the **p5.js** canvas environment.

## Key Simulations

The suite includes several high-fidelity simulation engines:

1. **MIMO Beamforming Array**: Visualizes constructive and destructive superposition of radio frequency (RF) wavefronts from multiple antenna elements with adjustable phase delays.
2. **Grand Tour Gravity Slingshot**: Simulates spacecraft planetary flybys, kinetic energy transfers, and gravitational pull using Runge-Kutta 4th Order (RK4) integration.
3. **Conformal Grid Warper**: Maps complex analysis holomorphic transformations (such as $z^2$, $e^z$, and $\sin(z)$) while preserving intersection angles on the complex plane.
4. **Quantum Tunneling Transistor**: Computes Schrödinger probability wave packet decay and transmission coefficients through sub-nanometer potential barriers.
5. **RF Signal Modulation (QAM)**: Simulates cell link capacity, constellations, and Bit Error Rates (BER) under additive white Gaussian noise (AWGN).
6. **Coriolis Space Habitat**: Compares straight-line trajectories in inertial frames side-by-side with fictitious force curvature in rotating reference cylinders.
7. **Kessler Debris Cascade**: Models orbital decay and collision chain-reactions of Keplerian satellite fragments in Low Earth Orbit (LEO).
8. **Strange Attractors (Lorenz 3D)**: Visualizes phase-space divergence and chaos theory using 3D differential equations.

## Technical Implementation

All models are written in native ES6 JavaScript utilizing **p5.js** for high-frequency drawing loops. Numerical integrations like Runge-Kutta (RK4) and Verlet integration are used to ensure stable physics loops. Complex mathematical operations are performed using custom vector algebra classes optimized for matrix transforms.

## Technologies Used

- **p5.js** for 2D/3D graphics, path tracing, and coordinate transformations
- **ES6 JavaScript** for physics integrations, signal processing algorithms, and event bindings
- **HTML5 & CSS3** for modern responsive HUD elements and telemetry layouts
- **Runge-Kutta Integration (RK4)** for high-accuracy gravitational orbit calculations

## What I Learned

This project provided deep experience in:
- Implementing numerical integration techniques (RK4) to maintain conservation of energy in orbital physics.
- Translating complex mathematical concepts (complex analysis conformal mappings, wave physics superposition, quantum wave probability) into intuitive visual representations.
- Optimizing CPU-intensive drawing routines to maintain 60fps when plotting hundreds of particles or complex waveforms.
- Designing responsive, high-contrast dashboards that lay out raw telemetry data alongside interactive controls.
