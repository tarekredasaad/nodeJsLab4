var express = require('express');
var app = express();
var objs ={
    email:"",
    password : ""
}
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.bodyParser);
app.get('/home',function(req,res){
    res.send('hello world...')
    res.end()
})
app.get('/users/:userid/books/:bookid',function(req,res){
    res.send(req.params)
})
app.use('/game',function(req,res,next){
    objs.email = req.body.email
    objs.password = req.body.password
    console.log(req.body.email + req.url)
    console.log(objs)
    next()
})
app.set('view engine','html')
app.set('view engine','ejs')
app.get('signup',function(req,res){
    res.render('index')} )
app.post('/game',function(req,res){
    res.render('login', { name: req.body.email });
})
app.use('/login',function(req,res,next){
    if(req.body.email == objs.email && req.body.password == objs.password){
        next()
    }else{
        res.send('Invalid data')
    }
})
app.post('/login',function(req,res){
    
    res.render('index', { name: req.body.email });
})
app.get('/',function(req,res){

    var val = true
    // if(val){
    //     setTimeout(function(){
    //         res.redirect('home')
    //     },2000)
    // }else{
    //     setTimeout(function(){
    //         res.redirect('users/:userid/books/:bookid')
    //     },2000)
    // }
    res.render('home')
})
app.listen(3000,()=> console.log('http://localhost:3000'))