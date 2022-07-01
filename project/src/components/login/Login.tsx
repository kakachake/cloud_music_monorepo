import { CloseOutlined } from '@ant-design/icons'
import { FC, FunctionComponent, useState } from 'react'
import style from './Login.module.css'
import createLogin from '../login/index'
import QrCodeLogin from './qrCodeLogin/QrCodeLogin'
import { PhoneLogin } from './phoneLogin/PhoneLogin'

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [loginType, setLoginType] = useState<'qrCode' | 'phone'>('phone')
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
        {loginType === 'qrCode' ? (
          <div>
            <QrCodeLogin handleClose={handleClose} />
          </div>
        ) : (
          <PhoneLogin handleClose={handleClose} />
        )}

        {/* <div className=''>手机号登录</div> */}
      </div>
    </div>
  )
}

export default Login
