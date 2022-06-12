import Login from './Login'
import { createRoot, Root } from 'react-dom/client'
function createLogin(el: any) {
  const node = document.createElement('div')
  let root: Root | null = null
  return {
    destroy: () => {
      root!.unmount()
    },
    create: () => {
      root = createRoot(node)
      document.body.appendChild(node)
      root!.render(el)
    }
  }
}

export default createLogin(<Login />)
