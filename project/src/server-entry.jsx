import * as React from 'react'
import * as ReactDomServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

//render提供url，返回html字符串
export function render(url, context) {
  // <StaticRouter> 用于在 node.js 中渲染 React Router Web 应用程序
  return ReactDomServer.renderToString(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  )
}
