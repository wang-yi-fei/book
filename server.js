var express = require('express'),
    path = require('path'),
    fs = require('fs');
var app = express();
var books = [
    {name: 'nodejs', price: 20, count: 1, id: 1},
    {name: 'haha', price: 50, count: 1, id: 2},
    {name: 'heihei', price: 30, count: 1, id: 3},
    {name: 'xixi', price: 80, count: 1, id: 4}
];
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(express.static(path.resolve('node_modules')));
app.listen(3000);
//访问/返回主页
app.get('/', function (req, res) {
    res.sendFile('./bookstore.html', {root: __dirname})
});
app.delete('/book/:id', function (req, res) {
    var bookid = req.params.id;
    console.log(bookid);
    books = books.filter(function (item) {
        return item.id != bookid
    });
    res.send({'success': '删除成功'});
});
app.post('/book/:id', function (req, res) {
    var book = req.body;
    console.log(book);
    books.push(book);
    res.send({'success': 'ok'})
});
app.get('/book', function (req, res) {
    res.send(books);
});
app.put('/book/:id', function (req, res) {
    var bookid = req.params.id;
    var book = req.body;
    books=books.map(function (item) {
        if (item.id == bookid) {
            return book;
        }
        return item;
    });
    res.send({'success':'ok'})
});
