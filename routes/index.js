var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/login', function(req, res){
  res.render('login');
});

router.get('/checkout', function(req, res){
  res.render('checkout');
});

router.get('/cart', function(req, res){
  res.render('cart');
});

router.post('/login', function(req, res){
  console.log(req.body);
  res.render('home');
});

module.exports = router;
