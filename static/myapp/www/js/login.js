var app = angular.module("starter");
app.controller("loginController",function($scope,$http,$state,$rootScope){


    $rootScope.isLogin = false;
   // $scope.required = true;


  $scope.login = function(loginUser){
      //console.log(loginUser);

      $http.post("/login",loginUser)
       .then(function(success){

           if(success.data.success == false){
              console.log(success.data.success);
               console.log(success.data.message);
               console.log(success)
           }
           else{
           //console.log("success" ,success);
           //console.log(success.data.message) ;
           localStorage.setItem("firebaseToken",success.data.data.firebaseToken);
            $rootScope.userData = success.data.data.firebaseToken;

            // if($rootScope.getData == null){

            //     $state.go("dashboard.createCompany")
            // }
            // else{
            //     $state.go("dashboard.showCompany")
            // }



     //   $state.go("dashboard")
     $state.go("dashboard");


       }
       }),
       function(err){
           console.log('err',err);
       }


  }
})


