const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')

app.use(express.static('dist/client'))
//查看当前环境
const env = process.env.NODE_ENV

if (env === 'development') {
  const { createServer: createViteServer } = require('vite')
  createViteServer({
    server: {
      middlewareMode: 'ssr'
    }
  }).then((vite) => {
    // app.use(vite.middlewares)
    app.get('*', async (req, res) => {
      console.log('req.url', req.url)
      let template = fs.readFileSync('index.html', 'utf-8')

      template = await vite.transformIndexHtml(req.url, template)

      const { render } = await vite.ssrLoadModule('src/server-entry.jsx')
      const html = await render(req.url)
      console.log(html)
      const responseHtml = template.replace('<!--APP_HTML-->', html)
      res.set('Content-Type', 'text/html')
      res.set('status', 200).send(responseHtml)
    })
    app.listen(8080).on('listening', () => {
      console.log('server is listening on http://localhost:8080')
    })
  })
} else {
  const template = fs.readFileSync('dist/client/index.html', 'utf-8')

  app.get('*', async (req, res) => {
    const render = require('dist/server/server-entry').render
    const context = {}
    const html = await render(req.url, context)

    if (context.url) {
      res.redirect(301, context.url)
    }

    const responseHtml = template.replace('<!--APP_HTML-->', html)
    res.set('status', 200).send(responseHtml)
  })
  app.listen(8080)
}
