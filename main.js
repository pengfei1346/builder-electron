const electron = require("electron");
const { app, BrowserWindow } = electron;

let panelWindow;

function createPanel() {

	panelWindow = new BrowserWindow({
		width         : 400,
		minWidth      : 400,
		height        : 440,
		minHeight     : 500,
		fullscreenable: false,
		title         : "Mimi Danmaku Panel",
		webPreferences: {
			nodeIntegration: true
		}
	});

	panelWindow.loadFile("app/panel.html");

	//panelWindow.setPosition(0, 0, true);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	panelWindow.on("closed", function() {
		panelWindow = null;
	});
}
app.on("ready", function () {
	createPanel()
	// initSocket();
});

app.on("window-all-closed", function() {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function() {
	if (panelWindow === null) {
		createPanel();
	}
});

// function initSocket() {
// 	const socket = new Websocket(config.websocketServerUrl, helpers.getClientId())
// 	socket.onMessage = function (event) {
// 		try {
// 			const received_msg = JSON.parse(event.data);
// 			mainWindow.webContents.send('new-message', received_msg);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}
//
// 	socket.onClose = function (event) {
// 		socket.connect();
// 	}
//
// 	socket.connect();
// }

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = true;
