var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var MongoClient = require('mongodb').MongoClient
var Server = require('mongodb').Server;

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var mongoclient = new MongoClient(new Server('localhost',27017,{'native_parser':true}));
var db = mongoclient.db('genius');

app.get('/', function(req,res) {
	console.log("test")
	db.collection('users').findOne({},function(err,doc){
		if(err) throw err;
		console.log(doc)
		res.send(doc);
	});
});

mongoclient.open(function(err, mongoclient) {});
