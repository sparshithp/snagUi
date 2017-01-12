var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  console.log(req.cookies.auth);
  res.render('home', { title: 'Express' });
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/placeOrder', function(req, res){
  console.log(req.body);
  request.post({
    url:     'http://localhost:8080/api/order/create',
    method: 'POST',
    json:    {
      notes: req.body.notes,
      paymentMode: req.body.paymentMode,
      deliverySlot: req.body.deliverySlot,
      token: req.cookies.auth
    }
  }, function(error, response, body){
    if(response.statusCode == 200){
      return res.redirect('home');
    }
  });
});

router.get('/checkout', function(req, res){
  request.get({
    url:     'http://localhost:8080/api/users/viewCart',
    method: 'GET',
    headers: { //We can define headers too
      'x-access-token': req.cookies.auth
    }
  }, function(error, response, body){
    if(response.statusCode == 200){
      var respJson = JSON.parse(body);
      console.log(respJson.cart);
      res.render('checkout',{
        cart: respJson.cart
      });
    }
  });
});

router.get('/cart', function(req, res){
  request.get({
    url:     'http://localhost:8080/api/users/viewCart',
    method: 'GET',
    headers: { //We can define headers too
      'x-access-token': req.cookies.auth
    }
  }, function(error, response, body){
    if(response.statusCode == 200){
      var respJson = JSON.parse(body);
      console.log(respJson.cart);
      res.render('cart',{
        cart: respJson.cart
      });
    }
  });
});

router.get('/logout', function(req, res){
  res.clearCookie("auth");
  res.render('home');
});

router.post('/addToCart', function(req, res){
  console.log(req.body);
  var itemId = req.body.itemId;
  var qty = req.body.qty;
  var variantId = req.body.variant;
  request.post({
    url:     'http://localhost:8080/api/users/addToCart',
    method: 'POST',
    json:    {
      itemId: itemId,
      quantity: qty,
      variantId: variantId,
      token: req.cookies.auth
    }
  }, function(error, response, body){
    if(response.statusCode == 200){
      res.redirect('back');
    }
  });
});

router.get('/category/:category', function(req, res){
  var category = req.params.category;
  request.get({
    url:     'http://localhost:8080/items/listByCategory/chocolates',
    method: 'GET'
  }, function(error, response, body){
    if(response.statusCode == 200){
      console.log(body);
      var bodyJson = JSON.parse(body);
      res.render('categoryItems', {
        items: bodyJson.items
      });

    }
  });
});


router.post('/login', function(req, res){
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  request.post({
    url:     'http://localhost:8080/login',
    method: 'POST',
    json:    {
      email: email,
      password: password
    }
  }, function(error, response, body){
    if(error || !response){
      return res.render('404');
    }
    if(response.statusCode == 200){
      var token = body.token;
      res.cookie('auth',token);
      res.render('home');
    }
  });
});

function isAuthenticated(req, res, next) {

  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (!req.cookies.auth || res.statusCode == 401)
    return res.redirect('/login');
  return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
}

module.exports = router;
