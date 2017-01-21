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
	        token: req.cookies.auth,
	        welcomeTip: req.cookies.welcomeTip
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
	        token: req.cookies.auth,
	        welcomeTip: req.cookies.welcomeTip
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
		token: token,
        welcomeTip: req.cookies.welcomeTip
      });
});

router.post('/placeOrder', isAuthenticated, function(req, res){
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

router.post('/addQtyUpdate', isAuthenticated, function(req, res){
	var quantity = parseInt(req.body.quantity) + 1;
	  request.post({
	    url:     'http://localhost:8080/api/users/updateCart',
	    method: 'POST',
	    json:    {
	      itemId: req.body.itemId,
	      variantId: req.body.variantId,
	      quantity: quantity,
	      action: "add",
	      token: req.cookies.auth
	    }
	  }, function(error, response, body){
	    if(response.statusCode == 200){
	      return res.redirect('checkout');
	    }
	  });
});

router.post('/minusQtyUpdate', isAuthenticated, function(req, res){
	if(parseInt(req.body.quantity) > 1){
		var quantity = parseInt(req.body.quantity) - 1;
	}else{
		var quantity = parseInt(req.body.quantity) ;
	}
	  request.post({
	    url:     'http://localhost:8080/api/users/updateCart',
	    method: 'POST',
	    json:    {
	      itemId: req.body.itemId,
	      variantId: req.body.variantId,
	      quantity: quantity,
	      action: "add",
	      token: req.cookies.auth
	    }
	  }, function(error, response, body){
	    if(response.statusCode == 200){
	      return res.redirect('/checkout');
	    }
	  });
});

router.post('/removeItemUpdate', isAuthenticated, function(req, res){
	
	var quantity = parseInt(req.body.quantity) ;
	  request.post({
	    url:     'http://localhost:8080/api/users/updateCart',
	    method: 'POST',
	    json:    {
	      itemId: req.body.itemId,
	      variantId: req.body.variantId,
	      quantity: quantity,
	      action: "remove",
	      token: req.cookies.auth
	    }
	  }, function(error, response, body){
	    if(response.statusCode == 200){
	      return res.redirect('/checkout');
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
        token: req.cookies.auth,
        welcomeTip: req.cookies.welcomeTip
      });
    }
  });
});



router.get('/myOrders', isAuthenticated, function(req, res){
	  request.get({
	    url:     'http://localhost:8080/api/order/listForUser',
	    method: 'GET',
	    headers: { //We can define headers too
	      'x-access-token': req.cookies.auth
	    }
	  }, function(error, response, body){
	    if(response.statusCode == 200){
	      var respJson = JSON.parse(body);
	      console.log(respJson.orders);
	      if(respJson.orders.length == 0){
	    	  res.render('myOrders',{
	  	    	orders: respJson.orders,
	  	    	moneySaved: respJson.moneySaved,
	  	        token: req.cookies.auth,
	  	        welcomeTip: req.cookies.welcomeTip
	  	      });
	      }else{
	    	  res.render('myOrders',{
	    		  orders: respJson.orders,
	    		  moneySaved: respJson.moneySaved,
	    		  token: req.cookies.auth,
	    		  welcomeTip: req.cookies.welcomeTip
	    	  });
	      }
	    }
	  });
});

router.get('/logout', function(req, res){
  res.clearCookie("auth");
  res.clearCookie("welocmeTip");
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
      token: req.cookies.auth,
      welcomeTip: req.cookies.welcomeTip
    }
  }, function(error, response, body){
    if(response.statusCode == 200){
      res.redirect('back');
    }
  });
});

router.get('/category/:category/:page', function(req, res){
  var category = req.params.category;
  var page = req.params.page;
  console.log(page);
  request.get({
    url:     'http://localhost:8080/items/listByCategory/chocolates/'+page,
    method: 'GET'
  }, function(error, response, body){
    if(response.statusCode == 200){
      var bodyJson = JSON.parse(body);
      console.log(bodyJson);
      res.render('categoryItems', {
        items: bodyJson.items,
        token: req.cookies.auth,
        welcomeTip: req.cookies.welcomeTip,
        category: category,
        totalItems: bodyJson.totalItems
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
      var welcomeTip = body.welcomeTip;
      res.cookie('auth',token);
      res.cookie('welcomeTip', welcomeTip);
      console.log(welcomeTip);
      request.get({
    	    url:     'http://localhost:8080/featuredItems/items',
    	    method: 'GET'
    	  }, function(error2, response2, body2){
	    	    if(response2.statusCode == 200){
	    	      var bodyJson = JSON.parse(body2);
	    	      res.render('home2', {
	    	        items: bodyJson.items,
	    	        token: token,
	    	        welcomeTip: welcomeTip
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
	      var welcomeTip = body.welcomeTip;
	      res.cookie('auth',token);
	      res.cookie('welcomeTip', body.welcomeTip);
	      request.get({
	    	    url:     'http://localhost:8080/featuredItems/items',
	    	    method: 'GET'
	    	  }, function(error2, response2, body2){
		    	    if(response2.statusCode == 200){
		    	      var bodyJson = JSON.parse(body2);
		    	      res.render('home2', {
		    	        items: bodyJson.items,
		    	        token: token,
		    	        welcomeTip: welcomeTip
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
