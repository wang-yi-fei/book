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
//var bodyParser=require('body-parser');
//app.use(bodyParser.json());
function bodyParser() {
    return function (req, res, next) {
        var result = '';
        req.on('data', function (data) {
            result += data;
        });
        req.on('end', function () {
            if (result) {
                req.body = JSON.parse(result)
            }
            next();
        })
    }
}
app.use(bodyParser());


app.use(express.static(path.resolve('node_modules')));
app.listen(3000);
//访问/返回主页
app.get('/', function (req, res) {
    res.sendFile('./bookstore.html', {root: __dirname})
});
app.delete('/book/:id', function (req, res) {
    //我们需要获得最新的要删除的图书的id
    var bookid = req.params.id;
    console.log(bookid);
    books = books.filter(function (item) {
        return item.id != bookid
    });
    res.send({'success': '删除成功'});
});
app.post('/book/:id', function (req, res) {
    var book = req.body;     //请求体对象
    console.log(book);
    books.push(book);
    res.send({'success': 'ok'})
});
app.get('/book', function (req, res) {
    res.send(books);
});
app.put('/book/:id', function (req, res) {
    var bookid = req.params.id;
    var book = req.body;//改后的那一本书
    books=books.map(function (item) {
        if (item.id == bookid) {
            //说明找到 返回修改内容
            return book;
        }
        return item;
    });
    res.send({'success':'ok'})
});


//function static(p){
//    return function (req,res,next) {
//        //console.log(p);
//        //console.log(req.path);
//        var filePath=path.join(p,req.path);
//        var exist=fs.existsSync(filePath);
//        if(exist){
//            fs.createReadStream(filePath).pipe(res)
//        }else{
//            next();
//        }
//    };
//}
//app.use(static(path.resolve('node_modules')));