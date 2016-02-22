var app = angular.module("starter");
app.controller("productsController",function($scope,$http,$state){
    
    var token = localStorage.getItem("firebaseToken");
    $http.get("/getProduct/"+token).then(function(success){
    $scope.getData = success.data;
    console.log("getting data !!! " ,$scope.getData);
    console.log(success);
    
    
 },function(error){
    console.log(error);
  });
  $scope.product = {firebaseToken : token}
   $scope.submitProducts = function(product){
        console.log("my products ",product);
        $http.post("/product",product)
        .then(function(success){
            console.log(success);
        $state.go("dashboard.showCompany")
        },function(error){
            console.log(error);
        })
        
    }  
     
     
 });
 
 
 