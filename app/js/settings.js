const electron = require("electron").remote;
const { dialog } = electron;

function message(msg) {
	dialog.showMessageBox({
		message: msg
	});
}

var mainWindow = null

var options = [0, 0, 0, 0, 0];

window.addEventListener("beforeunload", event => {
	if (mainWindow) {
		const options = {
			type   : "warning",
			title  : "[Warning]",
			message: "弹幕窗口处于开启状态，无法退出控制面板！"
		};
		electron.dialog.showMessageBox(electron.getCurrentWindow(), options);
		event.returnValue = false;
	}
});
