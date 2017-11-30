// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    {{#postcss}}
    "postcss-salad": {
      browser: ['> 0.1%', 'iOS 7'],
      features: {
        rem: false,
        autoprefixer: ['> 0.1%', 'iOS 7']
      }
    },
    "postcss-center": {},
    "postcss-pxtorem": {
      rootValue: 75,
      selectorBlackList: ['mint', 'msgbox', 'mt', 'picker', 'swipe', 'cube'],
      propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing', 'width', 'height', 'margin', 'padding', 'border', 'margin-top', 'margin-left', 'margin-bottom', 'margin-right', 'left', 'right', 'top', 'bottom', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'border-radius'],
      mediaQuery: true
    }
    {{/postcss}}
  }
}
