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
    .bg-rendering-auto { image-rendering: auto }
    .bg-rendering-crisp-edges { image-rendering: crisp-edges }
    .bg-rendering-pixelated { image-rendering: pixelated }

    @media (min-width: 640px) {
      .sm\\:bg-rendering-auto { image-rendering: auto }
      .sm\\:bg-rendering-crisp-edges { image-rendering: crisp-edges }
      .sm\\:bg-rendering-pixelated { image-rendering: pixelated }
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
    .bg-rendering-auto { image-rendering: auto }
    .bg-rendering-crisp-edges { image-rendering: crisp-edges }
    .bg-rendering-pixelated { image-rendering: pixelated }

    .hover\\:bg-rendering-auto:hover { image-rendering: auto }
    .hover\\:bg-rendering-crisp-edges:hover { image-rendering: crisp-edges }
    .hover\\:bg-rendering-pixelated:hover { image-rendering: pixelated }
  `

  return generatePluginCss(testConfig).then(css => expect(css).toMatchCss(expectedCss))
})
