const path = require('path')

module.exports = {
  webpack (config, options) {
    // ailias
    config.resolve.alias['@'] = __dirname

    // image
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 100000,
            fallback: {
              loader: 'file-loader',
              options: { publicPath: '/_next/static/images', outputPath: 'static/images' }
              // options: { outputPath: 'static/images' }
            }
          },
        },
        // {
        //   loader: "markdown-loader",
        // }
        // 画像が読み込めなくなる...
        // { 
        //   loader: 'sass-resources-loader',
        //   options: {
        //     resources: './styles/index.global.scss'
        //   }
        // }
      ]
    })

    // Module not found: Can't resolve 'fs' #7755
    // https://github.com/vercel/next.js/issues/7755
    // Fixes npm packages that depend on `fs` module
    // if (!options.isServer) {
    //   config.node = {
    //     fs: 'empty'
    //   }
    // }
    return config
  },
}