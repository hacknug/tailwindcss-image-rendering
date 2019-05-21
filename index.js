var _ = require('lodash')
var flatten = require('flat')

module.exports = function () {
  return function ({
    addUtilities, addComponents, addBase, addVariant,
    e, prefix, theme, variants, config,
  }) {
    const buildObjectFromTheme = themeKey => {
      const buildObject = ([ modifier, value ]) => [ modifier, { [themeKey]: value } ]
      const themeEntries = Object.entries(theme(themeKey, {})).map(entry => buildObject(entry))
      return _.fromPairs(themeEntries)
    }

    const pluginUtilities = {
        rendering: {
          'auto': { imageRendering: 'auto' },
          // 'smooth': { imageRendering: 'smooth' },
          // 'high-quality': { imageRendering: 'high-quality' },
          'crisp-edges': { imageRendering: 'crisp-edges' },
          'pixelated': { imageRendering: 'pixelated' },
        },
    }

    Object.entries(pluginUtilities)
      .filter(([ modifier, values ]) => !_.isEmpty(values))
      .forEach(([ modifier, values ]) => {
        const variantName = Object.keys(Object.entries(values)[0][1])[0]
        const utilities = flatten(
          { [`.${e(`bg-${modifier}`)}`]: values },
          { delimiter: '-', maxDepth: 2 },
        )

        addUtilities(utilities, variants(variantName, ['responsive']))
      })
  }
}
