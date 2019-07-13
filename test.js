const _ = require('lodash')

const plugin = require('./index.js')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

// const defaultConfig = require('tailwindcss/defaultConfig')
const generatePluginCss = (testConfig = {}, pluginOptions = {}) => {
  const sandboxConfig = {
    theme: { screens: { 'sm': '640px' } },
    corePlugins: false,
    plugins: [ plugin(pluginOptions) ],
  }
  const postcssPlugins =[
    tailwindcss(_.merge(sandboxConfig, testConfig)),
  ]

  return postcss(postcssPlugins)
    .process('@tailwind utilities', { from: undefined })
    .then(result => result.css)
}

expect.extend({ toMatchCss: require('jest-matcher-css') })

test('generates default utilities and responsive variants', () => {
  const testConfig = {}
  const expectedCss = `
    .rendering-auto { image-rendering: auto }
    .rendering-crisp-edges { image-rendering: crisp-edges }
    .rendering-pixelated { image-rendering: pixelated }

    @media (min-width: 640px) {
      .sm\\:rendering-auto { image-rendering: auto }
      .sm\\:rendering-crisp-edges { image-rendering: crisp-edges }
      .sm\\:rendering-pixelated { image-rendering: pixelated }
    }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})

test('variants can be customized', () => {
  const testConfig = {
    variants: {
      imageRendering: ['hover'],
    },
  }
  const expectedCss = `
    .rendering-auto { image-rendering: auto }
    .rendering-crisp-edges { image-rendering: crisp-edges }
    .rendering-pixelated { image-rendering: pixelated }

    .hover\\:rendering-auto:hover { image-rendering: auto }
    .hover\\:rendering-crisp-edges:hover { image-rendering: crisp-edges }
    .hover\\:rendering-pixelated:hover { image-rendering: pixelated }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})
