var express = require('express');
var bodyParser = require('body-Parser');/*express的中间键，把传给http的文本转换为对象供路由调用*/
var Article = require('./db.js');/*链接数据库*/

var app = express();

app.use(express.static('public'));/*可以访问位于public文件夹的文件*/
app.use(bodyParser.json());

app.post('/article', function (req, res) {
    console.log(req.body);
    var content = req.body.content/*把内容从对象中拿出来*/
    var showname = req.body.showname
    var selected = req.body.selected
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
    console.log(req.query);
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

// app.post('/getArticle', function (req, res) {
//     console.log(req.body);
//     let kindof = req.body.kindof;
//     if (kindof === '全部') {
//         Article.find(function (err, doc) {
//             res.json(doc)
//         })
//         return;
//     }
//     console.log('111')
//     Article.find({ kindof: kindof }, function (err, doc) {
//         res.json(doc)
//     })
// })

app.listen(3000, function () {
    console.log('服务器正在监听3000端口！')
})