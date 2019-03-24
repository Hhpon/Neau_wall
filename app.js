var express = require('express');
var bodyParser = require('body-parser');/*express的中间键，把传给http的文本转换为对象供路由调用*/
var Article = require('./db.js');/*链接数据库*/
var Note = require('./note-db.js');/*链接数据库*/

var app = express();

app.use(express.static('lrw'));/*可以访问位于public文件夹的文件*/
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});

app.post('/article', function (req, res) {
    let showContent = req.body;
    Article.create(showContent, function (err, doc) {
        if (err) {
            res.end('no');
        } else {
            console.log(doc);
            res.end('ok');
        }
    })
})

app.get('/getArticle', function (req, res) {/*获取数据库中的内容*/
    let kindof = req.query.value;
    if (kindof === '全部') {
        Article.find(function (err, doc) {
            res.json(doc)
        })
        return;
    }
    Article.find({ kindof: kindof }, function (err, doc) {
        res.json(doc)
    })
})

app.post('/note',function(req,res){
    let showNote = req.body;
    Note.create(showNote, function (err, doc) {
        if (err) {
            res.end('no');
        } else {
            console.log(doc);
            res.end('ok');
        }
    })
})


app.get('/getNote', function (req, res) {
    Note.find(function (err, doc) {
        res.json(doc)
    })
})

app.listen(3005, function () {
    console.log('服务器正在监听3005端口！')
})