// 引入electron并创建一个Browserwindow
const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron')

const { ipcMain } = require('electron')
const path = require('path')
const url = require('url')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
// const icon = require('./src/assets/icon')
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

function createWindow() {
  //创建浏览器窗口,宽高自定义具体大小你开心就好
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 1000,
    minHeight: 600,
    titleBarStyle: 'hidden',
    // icon: icon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      // 官网似乎说是默认false，但是这里必须设置contextIsolation
      contextIsolation: false
    }
  })

  /*
   * 加载应用-----  electron-quick-start中默认的加载入口
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  */
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'build/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )
  // 加载应用----适用于 react 项目
  // mainWindow.loadURL('http://localhost:3000/')

  // 打开开发者工具，默认不打开
  mainWindow.webContents.openDevTools()

  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('')
  tray = new Tray(icon)
  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')
  // 注意: 你的 contextMenu, Tooltip 和 Title 代码需要写在这里!
})

ipcMain.on('window-close', function () {
  mainWindow.close()
})
// 你可以在这个脚本中续写或者使用require引入独立的js文件.

ipcMain.on('window-minimize', function () {
  if (mainWindow.isMinimized()) {
    mainWindow.restore()
  } else {
    mainWindow.minimize()
  }
})
// 你可以在这个脚本中续写或者使用require引入独立的js文件.

ipcMain.on('window-maximize', function () {
  if (mainWindow.isMaximized()) {
    mainWindow.restore()
  } else {
    mainWindow.maximize()
  }
})
// 你可以在这个脚本中续写或者使用require引入独立的js文件.
