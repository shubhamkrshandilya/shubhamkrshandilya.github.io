---
title: Mechanical & Celestial Chronograph Suite
description: A high-end interactive browser chronometer simulating gear train tooth ratios and day-night astronomical orbits. Built with p5.js, featuring continuous sweep, stopwatch dials, and time speed controls.
image: /assets/images/projects/chronograph-suite.png
tags: [p5.js, Creative Coding, Horology, Physics, JavaScript]
github: https://github.com/shubhamkrshandilya/p5js-clock
date: 2021-10-22
---

## Overview

A chronograph is a specific type of watch that combines classic timekeeping with independent stopwatches. This project overhauls a basic analog second-hand sketch into a premium **Mechanical & Celestial Chronograph Suite** exploring the physics of gear tooth mesh ratios and polar coordinate orbital mappings.

## Key Features

- **Three Aesthetic Themes**:
  - **Steampunk Brass**: Features interlocking gears rotating at synchronized mechanical velocity ratios.
  - **Celestial Astronomy**: Twinkling stars backdrop with a 24-hour day/night sun/moon orbit disc.
  - **Modern Onyx**: Minimalist watch face with neon cyan, purple, and fuchsia circular progress arcs.
- **Interlocking Gear Simulation**: Simulates escape wheel and mainspring wheel cog teeth meshing in the background.
- **Speed Time Slider**: Accelerates virtual time (up to 500x) so users can watch gear trains and day/night cycles orbit in fast motion.
- **Continuous Sweep vs Ticking**: Instantly switch second-hand movements between smooth sweep (mechanical automatic) and stepping ticks (quartz).
- **Stopwatch Sub-dial**: Fully operational bottom sub-dial with split lap displays in the sidebar.

## Technical Implementation

Built using vanilla ES6 JavaScript and the **p5.js** canvas environment. Rather than fetching local clock parameters directly, the application runs a customizable virtual clock epoch. The speed slider scales the frame rate delta times (`deltaTime`) before adding them to the custom epoch, allowing smooth time acceleration.

## Technologies Used

- **p5.js** for coordinate translations, trigonometry orbits, and gear teeth drawing shapes
- **ES6 JavaScript** for clock state tracking and event bindings
- **HTML5 & CSS3** for modern glassmorphic dashboard panel overlays
- **Polar-to-Cartesian Math** for rotating pointer hand coordinates:
  - `x = R · cos(θ)`
  - `y = R · sin(θ)`

## What I Learned

This project provided valuable experience in:
- Coordinating multiple visual states and drawing matrices under a central controller.
- Modeling physical machine linkages (meshed cogs) using synchronous rotation equations.
- Structuring modular theme layouts that dynamically swap color assets, fonts, and render functions.
- Running time-accumulators independent of native system clocks.
