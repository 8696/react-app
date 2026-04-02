module.exports = {
  presets: [
    'react-app'
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        fileName: true,
        meaninglessFileNames: ['index', 'styles'],
        pure: true
      }
    ]
  ]
}

