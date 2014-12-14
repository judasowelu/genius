var socket = new function () {
	this.socket = io('/');
	this.socket.on('ready', function (data) {
		console.log("ready");

		var path = location.pathname;
		if (path.indexOf("/") == 0) {
			path = path.replace("/", "");
		}
		path = path.split(".");
		path.splice(path.length-1, 0);
		path = path.join(".");

		console.log("location.pathname : " + location.pathname );
		if (path.indexOf(".page") > 0) {
			socket.socket.emit('page data', {pageId : path.replace(".page", "")});
		} else {
			socket.socket.emit('page data', data);
		}

	});

	this.socket.on('page data', function (data) {
		page.load(data);
	});

	this.socket.on('done add sub page', function (data) {
		location.reload();
	});

	this.socket.on('done save page', function (data) {
		location.reload();
	});

	this.savePage = function (data) {
		socket.socket.emit('save page', data);
	};

	this.addSubPage = function (subPageId) {
		socket.socket.emit('add sub page', {pageId : $("#pageId").val(), subPageId : subPageId});
	};

}
