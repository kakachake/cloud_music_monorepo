import React, { useEffect } from 'react'

import style from './App.module.css'

import DefaultLayout from './layout/defalutLayout/DefalutLayout'
import store from './redux/store'
import { getUserInfo } from './redux/user/slice'
function App() {
  useEffect(() => {
    store.dispatch(getUserInfo())
  })
  return (
    <div className={style.wrapper}>
      <DefaultLayout />
    </div>
  )
}

export default App
