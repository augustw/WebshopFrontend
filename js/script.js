var app = angular.module('webshopApp', ['ngRoute', 'ngMaterial']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : './pages/start.html',
                controller  : 'startController'
            })

            // route for the about page
            .when('/products', {
                templateUrl : './pages/product.html',
                controller  : 'productsController'
            })

            // route for the contact page
            .when('/about', {
                templateUrl : './pages/about.html',
                controller  : 'aboutController'
            })

            .when('/product-page', {
            	templateUrl : './pages/product-page.html',
            	controller : 'productPageController'
            })

            .when('/shopping-cart', {
            	templateUrl : './pages/shopping-cart.html',
            	controller : 'cartController'
            });//semikolon för sista
    });

    app.controller('mainController', function($scope) {
    	//product-item hoover "show more"
    	$scope.arrCartItems = []; //array som håller alla items som lagts till i shopping-cart
    	$scope.totalPrice = 0;

    	//productItem.id, productItem.name, productItem.imageurl, productPrice.value, quantity
    	$scope.addToCart = function($id, $name, $imageurl, $price, $quantity) {
    		var matchFound = false;
    		
    		
	    		for (var i = 0; i < $scope.arrCartItems.length; i++) {
	    			if ($id == $scope.arrCartItems[i].id) { //om item redan finns i shopping-cart
	    				matchFound = true; //matching hittades i arrayen
	    				cartGetTotal(); //när antal läggs till så måste totalpriset uppdateras
	    				$scope.arrCartItems[i].quantity += $quantity; //om den redan finns, lägg till på antal
	    				break; //avsluta loopen
	    			}
	    		}

    		if (matchFound == false) { //om matchning hittades i loopen
    			addCartItem(); //lägg till item i shopping-cart
    			cartGetTotal(); //räkna med item i totalsumman
    		}
    		
    		function addCartItem() {
    		$scope.arrCartItems.push({
		    			"id" : $id,
		    			"name" : $name,
		    			"imageurl" : $imageurl,
		    			"price" : $price,
		    			"quantity" : $quantity
		    });
    		}
    		function cartGetTotal() {
    			$scope.totalPrice += $price * $quantity;
    		}

    	
    	} //end addtocart

    	$scope.showProductPage = function($productItem) {
        		$scope.productItem = $productItem;
        		
        }
    });
    // create the controller and inject Angular's $scope
    app.controller('startController', function($scope, $http) {
    			//alert($scope.getData());
    			
    			$http({
    			method:'GET',
    			url:'http://83.255.163.37/webshopbackend/product/getallsale'})
    			.then(function(response) {
    				$scope.productAllSale = response.data;
    			});
    	
    }); //end startController

    app.controller('productsController', function($scope, $http) {
        $http({
    		method:'GET',
    		url:'http://83.255.163.37/webshopbackend/product/getcategoryproduct'})
    		.then(function(response) {
    			$scope.categoryAll = response.data;

    		});


    }); //end productsController

    app.controller('aboutController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo, about.';
    }); // end aboutController

    app.controller('productPageController', function($scope) { //hantering av produktsidan
        $scope.quantity = 1; //antal varor
    	if ($scope.productItem.sale > 0) {
    		$scope.productPrice = {sale:true,value:$scope.productItem.price - $scope.productItem.price * $scope.productItem.sale};

    	} else {
    		$scope.productPrice = {sale:false, value: $scope.productItem.price};
    	}
    	$scope.$watch('quantity', function(){ //antal varor kan aldrig vara mindre än 0
    		if ($scope.quantity < 0) {
    			$scope.quantity = 0;
    		}
    	});

    }); // end aboutController

    //shopping-cart
    app.controller('cartController', function($scope) {
    	//code

    });//end cartcontroller

    app.filter('noDecimal', function() { //avrundar 
    	return function (input) {
    		return Math.round(input);
    	};
    });
