import { FC, useState } from 'react'

import store from '../../../redux/store'
import { getUserInfo } from '../../../redux/user/slice'
import { phoneLogin, sendVerifyCode } from '../../../service/api/login'
import CountDown from '../../CountDown'
import Toast from '../../Toast'
import style from './PhoneLogin.module.scss'
interface PhoneLoginProps {
  handleClose: () => void
}

export const PhoneLogin: FC<PhoneLoginProps> = ({ handleClose }) => {
  const [phone, setPhone] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [showCountDown, setShowCountDown] = useState<boolean>(false)

  const handleGetCode = () => {
    if (!phone || showCountDown) return
    console.log(phone)
    sendVerifyCode(phone).then((res: any) => {
      if (res.code === 200) {
        setShowCountDown(true)
        Toast.success('验证码发送成功')
      }
    })
  }

  const handleLogin = () => {
    console.log(phone, code)
    if (!phone || !code) {
      Toast.error('请输入手机号和验证码')
      return
    }
    phoneLogin({ phone, captcha: code })
      .then((res) => {
        if (res.code === 200) {
          localStorage.setItem('cookie', res.cookie)
          Toast.success('登陆成功')
          store.dispatch(getUserInfo())
          handleClose()
          //跳转到主页

          location.reload()
        } else {
          Toast.error(res.msg)
        }
      })
      .catch((err) => {
        console.log(err)

        Toast.error(err.response.data.msg)
      })
  }
  return (
    <div>
      <div className={style.title}>手机号登录以体验所有功能</div>
      <div className={style.form}>
        <div className={style.formItem}>
          <input
            onChange={(e) => setPhone(e.target.value)}
            type='text'
            placeholder='请输入手机号'
          />
        </div>
        <div className={style.formItem}>
          <input onChange={(e) => setCode(e.target.value)} type='text' placeholder='请输入密码' />
          <div onClick={handleGetCode} className={style.getCode}>
            {showCountDown ? (
              <CountDown
                onEnd={() => {
                  setShowCountDown(false)
                }}
                time={60}
              />
            ) : (
              '获取验证码'
            )}
          </div>
        </div>
      </div>
      <div onClick={handleLogin} className={style.loginBtn}>
        登录
      </div>
    </div>
  )
}
