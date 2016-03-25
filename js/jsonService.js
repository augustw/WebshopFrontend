var app = angular.module("webshopApp", []);
app.service("jsonService", function($http, $q) {
	var deferred = $q.defer(); //promise att använda senare?

	$http.get('http://83.255.163.37/backendsandvik/api/machine').then(function(data){
		deferred.resolve(data);
	});
	this.getAllSale = function (){
		return deferred.promise;
	}
});