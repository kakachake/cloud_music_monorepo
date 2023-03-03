Object.defineProperty(Event.prototype, 'path', {
  get() {
    return this.composedPath()
  }
})
export {}
