const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mutipart = require('connect-multiparty')
const atob = require('atob')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const path = require('path')

require('./server2')

const app = express()
const complier = webpack(WebpackConfig)

app.use(webpackDevMiddleware(complier, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(complier))

// app.use(express.static(__dirname, {
//   setHeaders(res) {
//     res.cookie('XSRF-TOKEN-D', Math.random().toString(16).slice(2))
//   }
// }))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/** 
    app.use(cookieParser())

    // 用于将文件上传到指定文件
    app.use(mutipart({
    uploadDir: path.resolve(__dirname, 'accept-upload-file')
    }))
*/

const router = express.Router()

registerSimpleRouter()

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

// ============ 路由 ==============================
function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: 'hello world'
    })
  })
}
