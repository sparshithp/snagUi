var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
	  console.log(req.cookies.auth);
	  var category = req.params.category;
	  request.get({
	    url:     'http://localhost:8080/featuredItems/items',
	    method: 'GET'
	  }, function(error, response, body){
	    if(response.statusCode == 200){
	      console.log(body);
	      var bodyJson = JSON.parse(body);
	      res.render('home2', {
	        items: bodyJson.items,
	        token: req.cookies.auth
	      });

	    }
	  });
	  
	});

router.get('/profile', function(req, res, next) {

	  request.get({
	    url:     'http://localhost:8080/api/users/profile',
	    method: 'GET',
	    headers: { 
	        'x-access-token': req.cookies.auth
	      }
	  }, function(error, response, body){
	    if(response.statusCode == 200){
	      var bodyJson = JSON.parse(body);
	      console.log(bodyJson.user);
	      res.render('profile', {
	        user: bodyJson.user,
	        token: req.cookies.auth
	      });

	    }
	  });
	  
	});

router.post('/editProfile', function(req, res, next) {

	  request.post({
	    url:     'http://localhost:8080/api/users/editProfile',
	    method: 'POST',
	    json:    {
	        name: req.body.name,
	        phone: req.body.phone,
	        city: req.body.city,
	        area: req.body.area,
	        zip: req.body.zip,
	        streetAddress: req.body.streetAddress,
	        token: req.cookies.auth
	      }
	  }, function(error, response, body){
	    if(response.statusCode == 200){
	    	 return res.redirect('profile');

	    }
	  });
	  
});

router.get('/login', function(req, res){
	console.log(req.cookies.auth);
	var token =req.cookies.auth;
	res.render('login', {
		token: token
      });
});

router.post('/placeOrder', isAuthenticated, function(req, res){
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

router.get('/checkout', isAuthenticated, function(req, res){
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
        cart: respJson.cart,
        token: req.cookies.auth
      });
    }
  });
});

router.get('/cart', isAuthenticated, function(req, res){
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
        cart: respJson.cart,
        token: req.cookies.auth
      });
    }
  });
});

router.get('/logout', function(req, res){
  res.clearCookie("auth");
  return res.redirect('/login');
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
        items: bodyJson.items,
        token: req.cookies.auth
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
      request.get({
    	    url:     'http://localhost:8080/featuredItems/items',
    	    method: 'GET'
    	  }, function(error2, response2, body2){
	    	    if(response2.statusCode == 200){
	    	      var bodyJson = JSON.parse(body2);
	    	      res.render('home2', {
	    	        items: bodyJson.items,
	    	        token: token
	    	      });
	    	    }
    	  });
    }else {
    	res.redirect('/login');
    }
  });
});

router.post('/signUp', function(req, res){
	  console.log(req.body);
	  request.post({
	    url:     'http://localhost:8080/signUp',
	    method: 'POST',
	    json:    {
	      name : req.body.name,
	      email: req.body.email,
	      password: req.body.password,
	      phone: req.body.phone,
	      streetAddress: req.body.streetAddress,
	      area: req.body.area,
	      city: req.body.city,
	      zip: req.body.zip
	      
	    }
	  }, function(error, response, body){
	    if(error || !response){
	      return res.render('404');
	    }
	    if(response.statusCode == 200){
	      var token = body.token;
	      res.cookie('auth',token);
	      request.get({
	    	    url:     'http://localhost:8080/featuredItems/items',
	    	    method: 'GET'
	    	  }, function(error2, response2, body2){
		    	    if(response2.statusCode == 200){
		    	      var bodyJson = JSON.parse(body2);
		    	      res.render('home2', {
		    	        items: bodyJson.items,
		    	        token: token
		    	      });
		    	    }
	    	  });
	    }else if(response.statusCode == 400){
	    	return res.render('error', {
	    		messageHeading : body.messageHeading,
	    		message2 : body.message2,
	    		error : "Sign Up Error !!",
	    		token : null
	    	});
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
