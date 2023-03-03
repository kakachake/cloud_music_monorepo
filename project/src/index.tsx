import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.module.css'
import './assets/css/reset.css'
import './assets/css/transition.css'
import './assets/css/base.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store, { persistor } from './redux/store'
import { Provider } from 'react-redux'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { LoadingOutlined } from '@ant-design/icons'
import { beautifulConsole } from './utils/console'
import './polyfill/index'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
beautifulConsole('React Netease Music v1.0.0')
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={<div>loading</div>} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
