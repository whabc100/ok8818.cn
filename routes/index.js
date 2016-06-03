



var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user').user;
mongoose.connect('mongodb://localhost/register');

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { title: 'index' });
});

/*register*/
router.get('/register', function(req, res) {
     res.render('register', { title: '注册' });
});

/*login*/
router.get('/login', function(req, res) {
 	 res.render('login', { title: '登陆' });
});

/*logout*/
router.get('/logout', function(req, res) {
  	res.render('logout', { title: '登出' });
});

/*homepage*/
router.get('/homepage', function(req, res) {
    res.render('homepage', { title: 'homepage' });
});

/*register*/
router.post('/register', function(req, res) {
    var query_doc = {userid: req.body.userid, password: req.body.password};
    (function(){
        user.count(query_doc, function(err, doc){
            if(doc == 0){                //This name havs never been registered!
                console.log(query_doc.userid + ": register success in " + new Date());
                var newUser= new user(query_doc);
                newUser.save(function(error) {
                    if(error) {
                        console.log(error);
                        res.render('register_fail', { title: '注册失败' });
                    } else {
                        console.log('saved OK!');
                        res.render('register_success', { title: '注册成功' });
                    }
                    
                });
                //res.render('homepage', { title: 'homepage' });
            }else{
                console.log(query_doc.userid + ": register failed in " + new Date());
                res.render('register_fail', { title: '注册失败' });
                //res.redirect('/');
            }
        });
    })(query_doc);
});

/*login=>hompage*/
router.post('/homepage', function(req, res) {
    var query_doc = {userid: req.body.userid, password: req.body.password};
    (function(){
        user.count(query_doc, function(err, doc){
            if(doc == 1){
                console.log(query_doc.userid + ": login success in " + new Date());
                res.render('homepage', { title: 'homepage' });
            }else{
                console.log(query_doc.userid + ": login failed in " + new Date());
                res.render('login_fail', { title: '登陆失败' });
                //res.redirect('/');
            }
        });
    })(query_doc);
});

module.exports = router;