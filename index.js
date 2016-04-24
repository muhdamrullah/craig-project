// index.js start of file
var express = require('express')
    , cors = require('cors');
var multer = require('multer'),
        bodyParser = require('body-parser'),
        path = require('path');
var oxfordEmotion = require("node-oxford-emotion")('')
var fs = require('fs')

var app = new express();
app.use(bodyParser.json());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index');
});

// index.js continued
app.post('/', multer({ dest: './uploads/'}).single('imgFile'), function(req,res){
        console.log(req.body); //form fields
        console.log(req.file);
        console.log(req.file.path);
        var imageUrl = '<hosting-url>' + req.file.filename;
        var emotion = oxfordEmotion.recognize("url", imageUrl, function(data) {
            console.log(data);
            var expression = data[0];
            console.log(expression);
            res.json(expression);
            });
        res.status(204).end();
});

app.use(express.static(__dirname + '/uploads'));

var port = 10000;
app.listen( port, function(){ console.log('listening on port '+port); } );
