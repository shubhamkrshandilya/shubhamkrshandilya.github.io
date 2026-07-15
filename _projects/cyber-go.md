---
layout: project
title: Cyber Go
description: A retro-futuristic browser-based implementation of the classic game of Go. Built with p5.js, featuring a 9x9 intersection board, automated liberty and capture evaluation, suicide prevention, Ko rule enforcement, and territory scoring.
image: /assets/images/projects/cyber-go.png
tags: [p5.js, Creative Coding, Board Games, Game Theory, JavaScript]
github: https://github.com/shubhamkrshandilya/p5js-games
demo: https://shubhamkrshandilya.github.io/p5js-games/go/index.html
date: 2022-07-20
---

## Overview

**Go** is an ancient two-player abstract strategy board game originating in China over 2,500 years ago. The goal is to surround more territory than the opponent using black and white stones. 

This project provides a premium digital implementation of the game on a standard 9x9 grid, reimagined with a high-end **retro-futuristic cyber-arcade aesthetic**. 

## Key Features

- **Automated Liberty Checker**: Computes stone liberties in real-time, instantly resolving capture states for connected groups of stones.
- **Suicide and Ko Rule Enforcement**: Prevents invalid placements according to formal Go tournament rules, including the Ko rule to block infinite loops.
- **Flood-Fill Territory Estimator**: Evaluates finished board configurations to calculate final scores, highlighting captured territories using flood-fill algorithms.
- **Glassmorphic Cyber-Arcade HUD**: Displays turn status, captured stone counters, and game states on a sleek, glowing translucent interface.
- **Responsive Mobile Play**: Adaptive canvas size adjustments and touch-sensitive coordinate mapping for mobile browser viewports.

## Technical Implementation

Built with modular ES6 JavaScript inside a **p5.js** canvas environment. The game engine uses an adjacency list structure representing the 9x9 board coordinates. When a stone is placed, the engine runs recursive flood-fill checks (Depth-First Search) to determine connected groups, calculate liberties, and trigger chain-reaction captures.

## Technologies Used

- **p5.js** for rendering the neon game grid and glowing glass stone aesthetics
- **ES6 JavaScript** for game loop management and DFS graph algorithms
- **HTML5 & CSS3** for glassmorphic control overlays and arcade HUD styles
- **Adjacency Graphs & Flood-Fill** for group connectivity and territory boundary scoring

## What I Learned

This project provided excellent hands-on experience in:
- Implementing advanced graph algorithms (connected components, DFS flood-fill) in a real-time web interface.
- Resolving edge cases in game rules (suicide prevention, Ko loop detection, and adjacent group updating).
- Designing neon vector drop-shadow glow overlays that perform efficiently on low-spec hardware.
- Structuring robust game state machine variables that handle turn-transitions, passes, and game-over conditions.
