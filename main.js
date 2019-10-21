const { app, BrowserWindow, Menu, ipcMain  } = require("electron");
const path = require("path");
const url = require("url");
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sBetaApi = kc.makeApiClient(k8s.AppsV1beta1Api);

// Path to index.html
const indexPath = path.join(__dirname, `/dist/index.html`);
// Main window
let mainWindow

app.on('ready', createWindow)

// Get Namespaces List
ipcMain.on('getNamespacesListRequest', (event) => {
  console.log("Getting namespaces")
  k8sApi.listNamespace(true).then(response => {
    event.reply('getNamespacesListResponse', response.body)
  });
});

// Get Pod List
ipcMain.on('getPodListRequest',(event, ...args) => {
  console.log('getPodListRequest received');
  var namespace = args[0]
  console.log("Get pod list for namespace " + namespace)
  k8sApi.listNamespacedPod(namespace,'true').then((response) => {
    event.reply('getPodListResponse',response.body.items);
  });
});

// Get Deployment List
ipcMain.on('getDeploymentListRequest',(event, ...args) => {
  console.log('getDeploymentListRequest received '+args);
  var namespace = args[0]
  console.log("Get deployment list for namespace " + namespace)
  k8sBetaApi.listNamespacedDeployment(namespace,'true').then((response) => {
    event.reply('getDeploymentListResponse', response.body.items);
  });
});

// Get Deployment by name
ipcMain.on('getNamespacedDeploymentByNameRequest',(event, ...args) => {
  console.log('getNamespacedDeploymentByNameRequest received');

  var namespace = args[1]
  console.log(namespace)
  var name = args[0]
  console.log(name)
  console.log("Get deployment " + name +" for namespace " + namespace)
  try {
    k8sBetaApi.readNamespacedDeployment(name, namespace, 'true').then((response) => {
      event.reply('getNamespacedDeploymentByNameResponse', response.body);
    });
  } catch(e) {
    console.log(e.meesgae)
  }
});

// Get Service List
ipcMain.on('getServiceListRequest',(event, ...args) => {
  console.log('getServiceListRequest received '+args);
  var namespace = args[0]
  console.log("Get service list for namespace " + namespace)
  k8sApi.listNamespacedService(namespace,'true').then((response) => {
    event.reply('getServiceListResponse', response.body.items);
  });
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // load the dist folder from Angular
  mainWindow.loadURL(
    url.format({
      pathname: indexPath,
      protocol: "file:",
      slashes: true
    })
  );

  // The following is optional and will open the DevTools:
  mainWindow.webContents.openDevTools()

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function reloadWindow(window) {
  window.reload();
  mainWindow.loadURL(
    url.format({
      pathname: indexPath,
      protocol: "file:",
      slashes: true
    })
  );
}

const template = [
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
          reloadWindow(focusedWindow)
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('http://electron.atom.io') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  const name = app.getName()
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
  // Edit menu.
  template[1].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  )
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
