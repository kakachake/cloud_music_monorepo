const consoleSignatureStyle =
  'font-size: 16px;' +
  'background: linear-gradient(to right, #e66465, #9198e5);' +
  'color: white;' +
  'text-align: center;' +
  'padding: 10px 15px;' +
  'width: 100%;' +
  'border-radius: 20px;'

export const beautifulConsole = (str: string) => {
  console.log('%c' + str, consoleSignatureStyle)
}
