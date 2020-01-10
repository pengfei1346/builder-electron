var ws = null;
function wsinit(wsUrl) {
	ws = new WebSocket(wsUrl);

	ws.onopen = function() {
		setInterval(() => {
			if (ws) {
				ws.send(JSON.stringify({
					no:  '0',
					type: 1
				}))
			}
		}, 3000);
		message("系统消息：建立连接成功");
	}

	ws.onmessage = function(event) {
		if(JSON.parse(event.data) != '1') {
			mainWindow.webContents.send("danmu",event.data);
		}
	}

	ws.onerror = function() {
		message("系统消息：" + wsUrl + "连接失败，请手动关闭窗口并稍后再试");
	}

	ws.onclose = function (e) {
		message("系统消息：websocket 断开: " + e.code + '=' + e.reason);
	}
}

function wsReload() {
	var wsUrl = getWsUrl();
	if (ws) ws.close();
	wsinit(wsUrl);
}
