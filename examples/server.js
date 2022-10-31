const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const mutipart = require('connect-multiparty')
// const atob = require('atob')
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

app.use(express.static(__dirname, {
  setHeaders(res) {
    res.cookie('XSRF-TOKEN-D', Math.random().toString(16).slice(2))
  }
}))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

/** 

    // 用于将文件上传到指定文件
    app.use(mutipart({
    uploadDir: path.resolve(__dirname, 'accept-upload-file')
    }))
*/

const router = express.Router()

registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()

registerInterceptorRouter()

registerConfigRouter()

registerCancelRouter()

registerMoreRouter()

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

// ============ 接口 ==============================
function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: 'hello simple'
    })
  })
}

function registerBaseRouter() {
  router.get('/base/get', function (req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    console.log(req.body);
  })
}

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if(Math.random() > 0.5) {
      res.json({
        msg: 'hello world'
      })
    }else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: 'hello world'
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function (req, res) {
    res.json(req.query)
  })

  router.options('/extend/options', function(req, res) {
    res.json(req.query)
  })

  router.head('/extend/head', function(req, res) {
    console.log(req.query);
  })

  router.delete('/extend/delete', function(req, res) {
    console.log(req.query);
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'snake',
        age: 24
      }
    })
  })
}

function registerInterceptorRouter() {
  router.post('/interceptor/post', function(req, res) {
    res.json(req.body)
  })
}

function registerConfigRouter() {
  router.post('/config/post', function(req, res) {
    res.json(req.body)
  })
}

function registerCancelRouter() {
  router.get('/cancel/get', function(req, res) {
    setTimeout(() => {
      res.json(req.query)
    }, 1000)
  })

  router.post('/cancel/post', function(req, res) {
    res.json(req.body)
  })
}

function registerMoreRouter() {
  router.get('/more/get', function(req, res) {
    res.json(req.cookies)
  })
}