import { useCallback, useEffect, useRef } from 'react'
import { isScrollBottom } from '../utils'

export const useScrollBottomMore = (
  cb: (curPage: number) => Promise<any>,
  {
    curPage,
    setCurPage
  }: {
    curPage: number
    setCurPage: (curPage: number) => void
  },
  deps: any[] = []
) => {
  const isLock = useRef(false)
  const scrollAddPage = useCallback(() => {
    const mainContent = document.querySelector('#mainContent')
    const isBottom = isScrollBottom(mainContent!)
    console.log('isBottom', isBottom)

    if (isBottom && !isLock.current) {
      isLock.current = true
      console.log(curPage)

      cb(curPage + 1).finally(() => {
        isLock.current = false
      })
      setCurPage(curPage + 1)
    }
  }, [cb])
  useEffect(() => {
    console.log(deps)

    const mainContent = document.querySelector('#mainContent')
    mainContent?.addEventListener('scroll', scrollAddPage)
    scrollAddPage()
    return () => {
      mainContent?.removeEventListener('scroll', scrollAddPage)
    }
  }, [scrollAddPage, ...deps])
}
