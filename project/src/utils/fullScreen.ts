//获取当前全屏状态
export function isFullScreen() {
  const document = window.document as any
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  )
}

export function enterFullScreen(el: any) {
  const rfs =
    el.requestFullscreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen
  if (rfs) {
    rfs.call(el)
  }
}

// 退出全屏
export function exitFullScreen() {
  const document = window.document as any
  const cfs =
    document.cancelFullScreen ||
    document.mozCancelFullScreen ||
    document.msExitFullscreen ||
    document.webkitExitFullscreen ||
    document.exitFullscreen

  if (cfs) {
    // typeof cfs != "undefined" && cfs
    cfs.call(document)
  }
}
