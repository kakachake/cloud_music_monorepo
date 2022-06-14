import { FC, useEffect, useRef } from 'react'
import lazyLoadGif from '../../assets/img/lazyLoad.gif'

interface LazyLoadProps {
  placeholder?: React.ReactNode
  src: string
  className?: string
  threshold?: number
}

const defaults = {
  placeholder:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
  threshold: 0
}

const LazyImg: FC<LazyLoadProps> = (props) => {
  //合并默认值并取出
  const { placeholder = '', src = '' } = { ...defaults, ...props }
  const elementRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement
          image.src = src
          observer.unobserve(image)
        }
      })
    })
    if (elementRef.current) {
      observer.observe(elementRef.current)
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])
  return <img ref={elementRef} src={lazyLoadGif}></img>
}

export default LazyImg
