import { useRef } from 'react'

//实现单击双击
export const useClick = (
  {
    clickFn,
    doubleFn
  }: {
    clickFn: (...args: any[]) => void
    doubleFn: (...args: any[]) => void
  },
  delay = 200
) => {
  const timer = useRef<any>()
  function _click(this: any, ...args: any[]) {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      clickFn.call(this, ...args)
    }, delay)
  }
  function _doubleClick(this: any, ...args: any[]) {
    clearTimeout(timer.current)
    doubleFn.call(this, ...args)
  }
  return [_click, _doubleClick]
}
