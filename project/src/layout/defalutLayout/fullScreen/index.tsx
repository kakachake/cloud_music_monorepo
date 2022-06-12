import FullScreen from './FullScreen'
import { createRoot, Root } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '../../../redux/store'
function createFullScreen(el: any) {
  const node = document.createElement('div')
  node.className = 'fullScreen'
  let root: Root | null = null
  return {
    destroy: () => {
      root!.unmount()
    },
    create: () => {
      root = createRoot(node)
      document.body.appendChild(node)
      if (node.requestFullscreen) {
        node.requestFullscreen()
      }
      document.onfullscreenchange = function () {
        if (!document.fullscreenElement) {
          root!.unmount()
        }
      }
      root!.render(el)
    }
  }
}

export default createFullScreen(
  <Provider store={store}>
    <FullScreen />
  </Provider>
)
