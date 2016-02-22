angular.module("starter")
.controller("homeController",function($scope,$http){
    
   console.log("welcome to home"); 
   console.log("abcd")
   $scope.name = "tahir";
   
   
   $scope.me = function(){
       alert("hello")
       console.log("helllosss")
   }
 
   });