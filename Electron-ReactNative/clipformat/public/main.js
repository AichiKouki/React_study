//Electronの実行に必要なモジュールを取り込む
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
//Electronのライフサイクルを定義
let mainWindow //メインウィンドウを表す変数

//ウィンドウを作成してコンテンツを読み込む
function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // 環境変数 ELECTRON_START_URL が定義されていればそれを使う。なければ index.html を使う。
  const startUrl = process.env.ELECTRON_START_URL || url.format({//読み込むコンテンツを指定。index.htmlを読み込む
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  })
  mainWindow.loadURL(startUrl)

  // 開発中のみ開発者ツールを表示
  if (process.env.ELECTRON_START_URL) {
    mainWindow.webContents.openDevTools()
  }

  //ウィンドウが閉じる時の処理
  mainWindow.on('closed', _ => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', _ => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', _ => {
  if (mainWindow === null) {
    createWindow()
  }
})
