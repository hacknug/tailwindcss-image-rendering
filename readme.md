# Tailwind CSS Image Rendering Plugin

This plugin adds utilities to use `image-rendering` with Tailwind CSS.

## Installation

Add this plugin to your project:

```bash
# Install using pnpm
pnpm install --save-dev tailwindcss-image-rendering

# Install using npm
npm install --save-dev tailwindcss-image-rendering

# Install using yarn
yarn add -D tailwindcss-image-rendering
```

## Usage

```js
// tailwind.config.js
{
  theme: {},  // no options to configure
  variants: { // all the following default to ['responsive']
    imageRendering: ['responsive'],
  },
  plugins: [
    require('tailwindcss-image-rendering'), // no options to configure
  ],
}
```

```css
.rendering-auto { image-rendering: auto; }
.rendering-crisp-edges { image-rendering: crisp-edges; }
.rendering-pixelated { image-rendering: pixelated; }
```
