# Tailwind CSS Image Rendering Plugin

This plugin adds utilities to use image-rendering with Tailwind CSS.

## Installation

Add this plugin to your project:

```bash
# Install using npm
npm install --save-dev tailwindcss-image-rendering

# Install using yarn
yarn add -D tailwindcss-image-rendering
```

## Usage

```js
require('tailwindcss-image-rendering')(['responsive'])
```

```css
.rendering-auto { image-rendering: auto; }
.rendering-crisp-edges { image-rendering: crisp-edges; }
.rendering-pixelated { image-rendering: pixelated; }
```
