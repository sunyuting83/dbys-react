const { override ,addWebpackAlias } = require('customize-cra');
const path = require("path")
 
module.exports = override( 
  addWebpackAlias({ //路径别名
    '@': path.resolve(__dirname, 'src'),
  }),
  (config)=>{ //暴露webpack的配置 config ,evn
    // 去掉打包生产map 文件
    // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
    if(process.env.NODE_ENV==="production") {
      config.externals = {
        react: "window.React",
        'react-dom': "window.ReactDOM",
        Swiper: "window.Swiper",
        iScroll: "window.JRoll",
        'react-router-dom':"window.ReactRouterDOM",
        'hls.js': "window.Hls",
        'dplayer': 'window.DPlayer',
        'react-dplayer': 'window.ReactDPlayer'
      },
      config.devtool=false
    }
    config.externals = {
      react: "window.React",
      "react-dom": "window.ReactDOM",
      Swiper: "window.Swiper",
      iScroll: "window.JRoll",
      'react-router-dom':"window.ReactRouterDOM",
      'hls.js': "window.Hls",
      'dplayer': 'window.DPlayer',
      'react-dplayer': 'window.ReactDPlayer'
    }
    return config
  }
);