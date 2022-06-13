import { createRoot, Root } from 'react-dom/client'
import Toast from './Toast'
import { globalControl } from './useQueue'

const createDispatchToast = () => {
  const toastEl = document.createElement('div')
  document.body.appendChild(toastEl)
  toastEl.id = 'toast'
  let toastRoot: Root | null = null

  toastRoot = createRoot(toastEl)
  toastRoot.render(<Toast />)

  return {
    showToast: (message: string, type: string) => {
      globalControl.add({
        message,
        type
      })
    },
    hideToast: () => {
      if (toastRoot) {
        toastRoot.unmount()
        toastRoot = null
      }
    }
  }
}

const dispatchToast = createDispatchToast()

export default {
  success: (message: string) => dispatchToast.showToast(message, 'success'),
  error: (message: string) => dispatchToast.showToast(message, 'error'),
  warning: (message: string) => dispatchToast.showToast(message, 'warning')
}
