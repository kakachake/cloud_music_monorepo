import { FC, useEffect, useState } from 'react'

interface CountDownProps {
  onEnd: () => void
  time: number
}

const CountDown: FC<CountDownProps> = ({ time, onEnd }) => {
  const [count, setCount] = useState(time)
  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 1) {
        setCount((count) => {
          return count - 1
        })
      } else {
        clearInterval(timer)
        onEnd && onEnd()
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [count, time, onEnd])
  return <div>{count.toString()}s</div>
}

export default CountDown
