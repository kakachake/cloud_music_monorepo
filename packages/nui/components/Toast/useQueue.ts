import { useState } from 'react'

// toast标识符计数器
let tid = 0

export let globalControl: any = null

interface ToastType {
  _tid: string
  type: string
  duration: number
  message: string
}

// 默认配置
const defaultOption = {
  duration: 3000
}
export const useQueue = () => {
  const [queue, setQueue] = useState<ToastType[]>([])
  const add = (item: Omit<ToastType, '_tid'> | ToastType) => {
    const _tid = getName()

    const toastItem: ToastType = Object.assign({ _tid }, defaultOption, item)
    setQueue((v) => [...v, toastItem])

    setTimeout(() => remove(toastItem._tid), toastItem.duration)
  }
  const remove = (tid: string) => {
    setQueue((v) => v.filter((el) => el._tid !== tid))
  }
  const getName = () => `__toast_id_${++tid}`
  const control = {
    add,
    remove
  }
  globalControl = control
  return [queue]
}
