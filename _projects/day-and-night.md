---
title: Day & Night Observatory
description: An interactive astronomical solar cycle simulator. Built with p5.js, featuring color stop gradient interpolations, polar sun/moon coordinates, ambient hills shading, and aurora borealis rendering.
image: /assets/images/projects/day-night.jpg
tags: [p5.js, Creative Coding, Astronomy, Physics, JavaScript]
github: https://github.com/shubhamkrshandilya/day-and-night
date: 2021-12-14
---

## Overview

Modeling day/night atmospheric transitions requires complex color math and ambient shading logic. This project overhauls a basic asset-dependent sunset sketch into an interactive, self-contained **Procedural Solar Cycle & Day/Night Transition Visualizer** running 100% on vector coordinates.

## Key Features

- **Multi-Stop Color Interpolation**: Shaders interpolate sky background bands across five primary day/night stops (Midnight, Dawn, Noon, Dusk, Midnight) using `lerpColor()` vertical gradients.
- **Dual Orbit Mechanics**: Calculates opposite $180^\circ$ phase-shifted solar and lunar coordinate locations using polar-to-cartesian conversions:
  - `x = R_x · cos(θ)`
  - `y = R_y · sin(θ)`
- **Ambient Lighting Shading**: Dynamically shades mountain silhouetted trees and hills using cosine time mappings (e.g., darker at midnight, fully lit at noon).
- **Interactive Scenery Elements**: A procedural cabin window lights up with a warm orange neon glow during nightfall and turns off during daytime.
- **Weather Atmosphere Themes**: 
  - **Northern Lights**: Floating neon green/teal wave bands drawn with curved Bézier vertex lines.
  - **Starry Cluster**: Twinkling background stars that fade out as dawn approaches.
  - **Deep Forest Fog**: Falling rain particle vectors accompanied by a thick white mist overlay.

## Technical Implementation

Built with vanilla ES6 JavaScript and the **p5.js** canvas framework. In order to bypass browser local file loading locks (CORS) under `file://`, the application replaces all external image asset reads with procedural polygon drawings. An auto-orbit time scroller cycles through `0.0` to `24.0` hours, controlling the celestial angles and light intensities.

## Technologies Used

- **p5.js** for coordinate vectors, curved curves drawing, and linear color interpolation
- **ES6 JavaScript** for particles updating loops and state selectors
- **HTML5 & CSS3** for glassmorphic sidebar panel layouts
- **Polar-to-Cartesian Math** for orbiting trajectories

## What I Learned

This project provided valuable experience in:
- Mapping multi-stop gradient color transitions across a continuous numerical scroller.
- Working with ambient light scalar factors to shade layered graphics dynamically.
- Designing self-contained procedural vector art structures to eliminate CORS asset loading dependencies.
- Modeling atmospheric states (aurora, rain, fog) using mathematical equations.
