import dayjs from 'dayjs'

export function parseSecondToTime(second: number) {
  second = Math.floor(second)
  const hour = Math.floor(second / 3600)
  const minute = Math.floor((second - hour * 3600) / 60)
  const seconds = second - hour * 3600 - minute * 60

  return hour > 0 ? `${pad(hour)}:${pad(minute)}:${pad(seconds)}` : `${pad(minute)}:${pad(seconds)}`
}

//不够两位数的补0
export function pad(num: number) {
  return num < 10 ? '0' + num : num
}

//数字转换成万，亿
export function formatNumber(num: number) {
  if (!num) {
    return '0'
  }
  if (num < 10000) {
    return num
  } else if (num < 100000000) {
    return (num / 10000).toFixed(1) + '万'
  } else {
    return (num / 100000000).toFixed(2) + '亿'
  }
}

//dayjs 时间戳转换成时间
export function formatTime(time: number | string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function onDoubleClick() {
  let isClick = false
  let clickNum = 0
  return function ({
    singleClick,
    doubleClick
  }: {
    singleClick: () => void
    doubleClick: () => void
  }) {
    // 如果没有绑定双击函数，直接执行单击程序
    if (!doubleClick) {
      return singleClick && singleClick()
    }

    clickNum++
    // 毫秒内点击过后阻止执行定时器
    if (isClick) {
      return
    }
    isClick = true

    setTimeout(() => {
      // 超过1次都属于双击
      if (clickNum > 1) {
        doubleClick && doubleClick()
      } else {
        singleClick && singleClick()
      }
      clickNum = 0
      isClick = false
    }, 300)
  }
}

export const parseLrc = (lrc: string) => {
  if (!lrc) {
    return []
  }

  const lrcList = lrc.split('\n')

  const lrcArr: {
    lrc: string
    time: number
  }[] = []

  lrcList.forEach((item: string) => {
    const lyricExp = /^\[(\d{2}):(\d{2}).(\d*)\](.*)/
    const timeStr = item.match(lyricExp)
    const content = item.replace(/\[\d{2}:\d{2}\.\d*\]/g, '')

    if (timeStr) {
      const minute = +timeStr[1]
      const second = +timeStr[2]
      const millisecond = +timeStr[3]
      const totalTime = minute * 60 + second + millisecond / 1000

      lrcArr.push({
        lrc: content,
        time: totalTime
      })
    }
  })

  return lrcArr
}

//节流
export function throttle(fn: (...args: any) => void, delay: number) {
  let timer: any = null
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

//防抖
export function debounce(fn: (...args: any) => void, delay: number) {
  let timer: any = null
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function mainContentScroll(to: number) {
  const mainContent = document.querySelector('#mainContent')
  if (mainContent) {
    mainContent.scroll({
      top: to,
      behavior: 'smooth'
    })
  }
}

export function isScrollBottom(el: Element) {
  // 是否滚动到了底部
  const clientHeight = el.clientHeight
  const scrollTop = el.scrollTop
  const scrollHeight = el.scrollHeight

  if (scrollHeight - scrollTop - clientHeight < 1) {
    return true
  } else {
    return false
  }
}

// /n转br
export function n2br(str: string) {
  return str.replace(/\n/g, '<br/>')
}

// 分割/n
export function splitN(str: string) {
  if (!str) {
    return []
  }
  return str.split('\n')
}

export function parseBr(br: number) {
  switch (br) {
    case 1080:
      return '超清'
    case 720:
      return '高清'
    case 480:
      return '标清'
    case 240:
      return '流畅'
  }
  return ''
}
