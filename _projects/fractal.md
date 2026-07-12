---
title: Interactive Fractal & Chaos Suite
description: A high-performance browser-based creative coding suite visualizing recursive geometry, Perlin noise swaying trees, and real-time morphing Mandelbrot and Julia complex planes.
image: /assets/images/projects/fractal-suite.jpg
tags: [p5.js, Creative Coding, Mathematics, Chaos Theory, JavaScript]
github: https://github.com/shubhamkrshandilya/fractal
date: 2022-05-08
---

## Overview

Fractals represent curves with fractional, non-integer dimensions that display self-similarity across infinite scales. This project overhauls a basic pixel-scatter script into a comprehensive **Interactive Fractal & Chaos Theory Suite**. It includes multiple rendering engines exploring organic wind forces, complex number iteration orbits, and binary logic table geometries.

## Key Features

- **Four Visual Modes**:
  - **Bitwise Landscapes**: Explores boolean AND/OR/XOR pixel coordinate grids.
  - **Recursive Tree**: Generates organic branching networks.
  - **Mandelbrot Set**: Renders complex numbers escaping $z_{n+1} = z_n^2 + c$ boundaries.
  - **Julia Set**: Interactively morphs complex constants using mouse-movement vectors on the canvas.
- **Organic Wind sway**: Combines 1D Perlin noise gradients with recursive branching matrices to animate natural branch swaying.
- **Dynamic Resolution Optimization**: Employs pixel-scale rendering step controls (low-res during slider interactions and mouse drags, full-res when static) to guarantee a responsive 60fps environment.
- **Dark Glassmorphic UI**: Dashboard containing custom slider widgets and mathematical formula info boards.

## Technical Implementation

Built with vanilla ES6 JavaScript and the **p5.js** canvas environment. The complex sets utilize low-level pixel array modifications (`loadPixels`/`updatePixels`) to optimize iterating over 260,000 coordinate pixels up to 150 times per frame.

## Technologies Used

- **p5.js** for visual canvas loops and trigonometry matrices
- **Vanilla JavaScript (ES6)** for optimization loops and event bindings
- **Perlin Noise** algorithms for natural wind animations
- **CSS Grid & Flexbox** for styling glassmorphic sidebar layout control panels

## What I Learned

This project provided deep insights into:
- Bypassing browser rendering bottlenecks by writing optimized inline loops.
- Working with complex numbers and coordinate transformation math.
- Blending mechanical geometric rules with natural gradient noise forces to simulate organic behavior.
- Designing reactive UX systems that adapt rendering resolution to client input states.
