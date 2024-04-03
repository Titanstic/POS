const { MSICreator } = require('electron-wix-msi');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './out/mula_dashboard-win32-x64');
const OUT_DIR = path.resolve(__dirname, './windows_installer');

const  msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    description: "This is mula dashboard app",
    exe: "mula_dashboard",
    appIconPath: path.resolve(__dirname,'./images/favicon.ico'),
    name: "Mula Dashboard",
    manufacturer: "Axra Inc",
    version: "1.0.0",

    ui:{
        chooseDirectory: true
    }
})

msiCreator.iconPath = path.resolve(__dirname, './images/favicon.ico');

msiCreator.create().then(function() {
    msiCreator.compile();
})

