module.exports = function (variants) {
  return function ({ addUtilities }) {
    addUtilities(
      {
        // Image Rendering
        'rendering-auto': { imageRendering: 'auto' },
        // 'rendering-smooth': { imageRendering: 'smooth' },
        // 'rendering-high-quality': { imageRendering: 'high-quality' },
        'rendering-crisp-edges': { imageRendering: 'crisp-edges' },
        'rendering-pixelated': { imageRendering: 'pixelated' },
      },
      variants
    )
  }
}
