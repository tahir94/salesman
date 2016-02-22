
var app = angular.module("starter");



//var formList = [];
app.controller("signUpController",function($scope,$http,$state){
   
   
  
  
  // formList.push($scope.user);

   $scope.submit = function(user){
  console.log(user);
    
       $http.post("/signUp",user)
                        .then(
                            function (success) {
                                //if (success.data.message) {
                                   // $scope.showMsg("This user name is not available!")
                               // }
                               $state.go("login")
                            },
                            function (err) {
                                console.log(err);
                            });
                     //   $state.go("login")
   
            


        }

    });
    