import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { update } from './update'
var Excel = require('exceljs');
const path = require('path');
const fs = require('fs');

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    width: 1600,
		height: 800,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: false,
      //contextIsolation: true,
    },
  })
  mainWindow = win

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.setMenuBarVisibility(false)
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // Apply electron-updater
  update(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

/*******************************************
 * Read Excel...
 *******************************************/

let mainWindow = null;

let file_to_open = "";

ipcMain.handle('dialog:openFile', readExcel)
ipcMain.handle('dialog:getFiles', getFiles)

ipcMain.on('choice', (event, donnees) => {
  console.log("+++++++++++++++++++++") 
  console.log(donnees) // affiche "données à envoyer"
  file_to_open = donnees;
  mainWindow.setTitle(file_to_open)
  console.log("+++++++++++++++++++++") 

})

function getFiles(p1, p2, p3) {

	console.log("getFiles")
	
	let files1 = fromDir(app.getPath("documents"), ".xlsx");
	let files2 = fromDir(app.getPath("downloads"), ".xlsx");
	let files = [...files1, ...files2];
	// var unixtime_ms = new Date().getTime();
    // while(new Date().getTime() < unixtime_ms + 5000) {}
	return files.map((f) => {
		let stat = fs.lstatSync(f);
		return {
			fullName: f,
			ts: stat.mtime,
			name: path.basename(f),
			directory: path.parse(f).dir
		}
	})
}

function fromDir(startPath, filter) {
	
	console.log(startPath)
	let excels = [];
	
    if (!fs.existsSync(startPath)) {
		// console.log("no dir ", startPath);
        return;
    }
	
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
		// console.log(files[i])
		var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory() && !files[i].startsWith(".") && filename.toLowerCase().search("node_modules")==-1 && filename.toLowerCase().search("vendor")==-1 && filename.toLowerCase().search("var/cache")==-1) {
			let tmp = fromDir(filename, filter); //recurse
			excels.push(...tmp);
        } else if (filename.endsWith(filter) && filename.toLowerCase().search("programmation")!=-1 && filename.toLowerCase().search('amiens')!=-1) {
			// console.log('-- found: ', filename);
			excels.push(filename);
        };
    };

	return excels;
};

async function readExcel() {

	// console.log(file)
	// console.log(p1)
	// console.log(p2)
	// console.log(p3)
	// const { canceled, filePaths } = await dialog.showOpenDialog()
	// if (canceled) {
	// 	console.log("cancel")
	// 	file = filePaths[0];
	// } else {
	// 	console.log("ok")
	// 	file = null;
	// }
	// let re = [];
		
		var wb = new Excel.Workbook();
		// var path = require('path');
		// var filePath = '/home/frc/Documents/AMIENS-Programmation.xlsx';
    console.log("°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°")
    console.log(`file_to_open=${file_to_open}`)
    console.log("°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°")
	
		const re = await wb.xlsx.readFile(file_to_open).then(function () {
	
		var sh = wb.getWorksheet("Programmation");

		let result = [];
		for (let i = 1; i <= sh.rowCount; i++) {
			if (sh.getRow(i).getCell(1).value && sh.getRow(i).getCell(1).value !=="GRN") {

				result.push(
					sh.getRow(i).values

				);
			}
		}
	
			return result;
		});

		// re = fromDir('/home/frc', '.xlsx')
	
		return re;
	// }

}
