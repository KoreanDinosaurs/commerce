const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    'storybook-css-modules',
  ],

  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ]
    config.module.rules.push({
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            additionalData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
          },
        },
      ],
    })
    const rules = config.module.rules
    const fileLoaderRule = rules.find((rule) => rule.test.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/
    rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] })

    return config
  },
}
