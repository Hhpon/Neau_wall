let mongoose = require('mongoose');/*连接数据库*/

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });

let articleSchema = new mongoose.Schema({
    content: String,
    nickname: String,
    kindof: String
})

module.exports = mongoose.model('blog', articleSchema);/*别人能访问到*/