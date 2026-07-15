---
title: Cyberpunk LED Chronometer
description: A procedural digital 7-segment display clock simulator simulating LED glow scattering. Built with p5.js, featuring color presets, glow blur adjustments, and responsive calendar telemetry.
image: /assets/images/projects/seven-segment.png
tags: [p5.js, Creative Coding, Electronics, Physics, JavaScript]
github: https://github.com/shubhamkrshandilya/clock-seven-segment
date: 2020-11-18
---

## Overview

Seven-segment displays are electronic components used to display decimal digits by lighting combinations of seven segments. This project overhauls a basic binary segment switch script into an interactive **Cyberpunk 7-Segment LED Chronometer** simulating physical neon light scattering.

## Key Features

- **Procedural Segment Rendering**: Draws segments as **bevelled hexagons** with angled tips to mimic physical hardware screens.
- **Neon Glow Physics**: Uses the HTML5 Canvas shadow API (`shadowBlur` and `shadowColor`) to simulate realistic photons scattering around active glowing segments. Inactive segments are drawn as faint, ghosted grids.
- **Multiple Color Presets**: Switch display colors dynamically (Neon Cyan, Toxic Lime, Hot Fuchsia, Amber Gold, or Quantum Purple).
- **Time Accelerator Slider**: Accelerates virtual time (up to 1000x) via a range slider to watch dates increment and segments transition.
- **HUD Blueprint Ticker**: Integrates a background blueprint coordinate grid with an animated **sine-wave oscilloscope ticker** showing the passage of seconds.
- **Calendar Strip**: Displays procedurally aligned dates (DD/MM/YYYY) and days of the week.

## Technical Implementation

The application is written in ES6 JavaScript with the **p5.js** canvas framework. Individual digits are parsed into separate arrays representing segment active states `[A, B, C, D, E, F, G]`. Active states draw beveled coordinate hexagons, while inactive states draw with zero shadow to look like deactivated hardware bulbs.

## Technologies Used

- **p5.js** for canvas rendering, blueprint overlays, and color mappings
- **ES6 JavaScript** for digit array bitmasking and custom clock accumulators
- **HTML5 & CSS3** for modern glassmorphic dashboard panel layouts
- **HTML5 Canvas Shadow API** for neon glow blurs

## What I Learned

This project provided valuable experience in:
- Implementing boolean bitmasks to translate integer states into visual layouts.
- Working with shadow blurs and styling to represent realistic physics-based light scattering.
- Creating procedural polygon layouts (beveled hexagons) with thickness and scale calculations.
- Integrating secondary data feeds (calendar strings) into a uniform layout.
