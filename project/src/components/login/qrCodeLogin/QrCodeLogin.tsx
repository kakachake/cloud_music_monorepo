import { FunctionComponent, useEffect, useState } from 'react'
import style from './QrCodeLogin.module.css'
import Toast from '../../Toast'
import {
  getQRCodeKey,
  getQRCodeImage,
  checkQRCodeStatus,
  checkLoginStatus
} from '../../../service/api/login'

import qrCodeTipImage from '../../../assets/img/qrCodeSuggest.png'
import store from '../../../redux/store'
import { getUserInfo } from '../../../redux/user/slice'

interface QrCodeLoginProps {
  handleClose: () => void
}

enum QRCodeStatus {
  //二维码加载
  LOADING = 404,
  //等待扫码
  WAITING = 801,
  //授权中
  AUTHORIZING = 802,
  //登录成功
  SUCCESS = 803,
  //二维码失效或已过期
  FAIL = 800
}

let timer: NodeJS.Timer | null = null
const QrCodeLogin: FunctionComponent<QrCodeLoginProps> = ({ handleClose }) => {
  const [qrState, setQrState] = useState<QRCodeStatus>(QRCodeStatus.LOADING)
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState('')
  const getQrImg = () => {
    setQrState(QRCodeStatus.LOADING)
    getQRCodeKey().then((res: any) => {
      if (res.code === 200) {
        const qrCodeKey = res.data.unikey
        getQRCodeImage(qrCodeKey)
          .then((res: any) => {
            if (res.code === 200) {
              const qrCodeImageUrl = res.data.qrimg
              setQrCodeImageUrl(qrCodeImageUrl)
              //开始监听状态
              checkStatus(qrCodeKey)
            }
          })
          .catch(() => {
            setQrState(QRCodeStatus.FAIL)
            // getQrImg()
          })
      }
    })
  }

  const checkStatus = (qrCodeKey: string) => {
    if (timer) {
      clearInterval(timer)
    }
    setQrState(QRCodeStatus.WAITING)

    timer = setInterval(() => {
      checkQRCodeStatus(qrCodeKey).then((res: any) => {
        if (res.code === 800) {
          clearInterval(timer!)
          setQrState(QRCodeStatus.FAIL)
        }
        if (res.code === 802) {
          setQrState(QRCodeStatus.AUTHORIZING)
        }
        if (res.code === 803) {
          // 这一步会返回cookie
          clearInterval(timer!)

          setQrState(QRCodeStatus.SUCCESS)
          localStorage.setItem('cookie', res.cookie)
          Toast.success('登陆成功')
          store.dispatch(getUserInfo())
          handleClose()
          location.reload()
        }
      })
    }, 2000)
  }

  useEffect(() => {
    getQrImg()
    return () => {
      clearInterval(timer!)
    }
  }, [])
  return (
    <div className={style.qrCodeLogin}>
      <h2>扫码登录以体验所有功能</h2>
      <div
        onClick={getQrImg}
        className={`${style.qrCodeImg} ${qrState !== QRCodeStatus.FAIL ? style.qrCodeActive : ''}`}
      >
        {(qrState === QRCodeStatus.WAITING ||
          qrState === QRCodeStatus.FAIL ||
          qrState === QRCodeStatus.AUTHORIZING) && (
          <div>
            <img className={style.qrCodeImage} src={qrCodeImageUrl} alt='' />
            <img className={style.qrCodeTipsImage} src={qrCodeTipImage} alt='' />
          </div>
        )}
        {qrState === QRCodeStatus.LOADING && (
          <div className={style.qrCodeLoading}>二维码加载中...</div>
        )}
        {qrState === QRCodeStatus.FAIL && (
          <div className={style.qrCodeFail}>
            <span>二维码已失效</span>
            <button>点击刷新</button>
          </div>
        )}
      </div>
      <div className={style.tips}>
        使用
        <a href='https://music.163.com/'>网易云音乐app</a>
        扫码登录
      </div>
    </div>
  )
}

export default QrCodeLogin
