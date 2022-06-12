import { CloseOutlined } from '@ant-design/icons'
import { FunctionComponent } from 'react'
import style from './Login.module.css'
import createLogin from '../login/index'
import QrCodeLogin from './qrCodeLogin/QrCodeLogin'

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const handleClose = () => {
    createLogin.destroy()
  }
  return (
    <div className={style.LoginWrap}>
      <div className={style.loginContent}>
        <div className={style.loginHeader}>
          <div onClick={handleClose} className={style.loginClose}>
            <CloseOutlined />
          </div>
        </div>
        <div className={style.loginTitle}>
          <div className={style.qrCodeLogin}>
            <QrCodeLogin handleClose={handleClose} />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Login
