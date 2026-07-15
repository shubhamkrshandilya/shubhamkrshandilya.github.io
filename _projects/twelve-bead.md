---
title: Twelve Bead (Baro Guti)
description: A browser-based recreation of the traditional South Asian strategic board game built with p5.js. Features minimax AI, full move-validation, and responsive 3D glass bead aesthetics.
image: /assets/images/projects/twelve-bead.png
tags: [p5.js, Creative Coding, Board Games, Minimax AI, JavaScript]
github: https://github.com/shubhamkrshandilya/twelve-bead
date: 2021-10-29
---

## Overview

**Twelve Bead (Baro Guti)** is a traditional 2-player abstract strategy board game popular in rural South Asia, particularly Bangladesh and India. Similar to Alquerque, checkers, and Lau Kata Kati, the game revolves around tactical movement, positional traps, and leap captures. 

I overhauled this project from an incomplete Java Processing sketch into a fully playable, premium web application using **p5.js**.

## Key Features

- **Dynamic Turn Loop State Machine**: Seamlessly manages turns, scoring, visual highlights, and board states.
- **Move Validation Engine**: Mathematically validates adjacent slides and capture jumps along horizontal, vertical, and quadrant diagonal axes using linear vector slope matching `(dr1 === dr2 && dc1 === dc2)`.
- **Positional Heuristic AI**: Integrated a minimax algorithm search engine with alpha-beta pruning that searches 3 steps deep to select optimal moves.
- **Premium Styling & Shading**: 3D-glossy marble and obsidian bead aesthetics overlaying a custom mahogany wood growth ring canvas design.
- **Responsive Controls**: Fully compatible with mouse-drags, clicks, and mobile touch inputs.

## Technical Implementation

The application is written in vanilla ES6 JavaScript utilizing the **p5.js** library for high-speed canvas drawing. The board representation uses a coordinate graph structure of 25 nodes where edge connectivity determines the legality of slides and double-distance jump vectors.

## Technologies Used

- **p5.js** for canvas graphics rendering and user interface elements
- **ES6 JavaScript** for game engine state machines and event handling
- **HTML5 & CSS3** for modern glassmorphic layout controls and responsive panels
- **Minimax Tree Search** for the intelligent AI player decisions

## What I Learned

This project provided a great exploration of:
- Translating linear board layouts into discrete graph connections.
- Applying vector checks to determine straight-line jump vectors.
- Implementing alpha-beta minimax search algorithms inside a real-time web environment.
- Optimizing rendering calculations for smooth, low-latency mobile device play.
