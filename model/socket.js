module.exports = {
	init : function (app) {
		var io = require('socket.io')(app);
		var mongodb = require("./mongodbConnector.js");

		mongodb.init();

		io.on('connection', function (socket) {
			console.log("connection");
			socket.on('page data', function (data) {
				console.log("page data");
				mongodb.getPageData(data, function (data) {
					socket.emit("page data", data);
				});
			});



			socket.on('save page', function (data) {
				mongodb.savePage(data, function (doc) {
					socket.emit("done save page", {pageId : data.pageId});
				});
			});

			socket.on('add sub page', function (data) {
				mongodb.addSubPage(data, function (doc) {
					socket.emit("done add sub page", {pageId : data.pageId});
				});
			});

			socket.emit('ready', {pageId:"top"});
		});
	},
};


