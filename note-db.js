let mongoose = require('mongoose');/*连接数据库*/

let env = process.env.NODE_ENV || 'development'
let dbUrl = 'mongodb://127.0.0.1:27017/neauWall'

if (env === 'development') {
    dbUrl = 'mongodb://127.0.0.1/neauWall'
}

mongoose.connect(dbUrl, { useNewUrlParser: true });

let contentSchema = new mongoose.Schema({
    income: String,
    date: String,
    use: String
})

module.exports = mongoose.model('note', contentSchema);/*别人能访问到*/