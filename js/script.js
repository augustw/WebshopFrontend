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
            	controller : 'pagesController'
            });
    });

    app.controller('mainController', function($scope) {
    	//product-item hoover "show more"

    	$scope.showProductPage = function($productItem) {
        		$scope.productItem = $productItem;
        		
        }
    });
    // create the controller and inject Angular's $scope
    app.controller('startController', function($scope, $http) {
    			//alert($scope.getData());
    			
    			$http({
    			method:'GET',
    			url:'http://83.255.163.37/webshopbackend/product/getpopular'})
    			.then(function(response) {
    				$scope.productAllPopular = response.data;
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

    app.controller('pagesController', function($scope) { //hantering av produktsidan
        $scope.amount = 1; //antal varor
    	
    	$scope.$watch('amount', function(){ //antal varor kan aldrig vara mindre än 0
    		if ($scope.amount < 0) {
    			$scope.amount = 0;
    		}
    	});

    }); // end aboutController
