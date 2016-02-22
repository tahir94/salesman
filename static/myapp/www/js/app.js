// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase','ngMap'])

.run(function($ionicPlatform) {



  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      //Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      //for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

    alert("App ready");
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})


.config(function($stateProvider, $urlRouterProvider,$httpProvider){


$stateProvider


    .state('login', {
       url : '/login',
       templateUrl : 'templates/login.html',
       controller  : "loginController",
       resolve     : {
           user : function getUserId(){
               if(localStorage.getItem("firebaseToken")){
                $state.go("dashboard")
               }
           }
       }

    })


    .state('signUp', {
      url : '/signUp',
       templateUrl : 'templates/signUp/signUp.html',
       controller  : "signUpController",
        resolve    : {
           user : function getUserId(){
               if(localStorage.getItem("firebaseToken")){
                $state.go("dashboard")
               }
           }
       }
    })


    .state("dashboard",{
        url:"/dashboard",


        templateUrl : "templates/dashboard.html",
         controller : "dashboardController",





    })

    .state("dashboard.home",{
        url: "/home",
        isLoggedIn : true ,

         resolve:{
            abcd:function aa()
            {
                if(!localStorage.getItem("firebaseToken"))
                {
                    $state.go("login");
                }
            },
            },
            views : {
           "dashboard-Content": {
               templateUrl : "templates/home.html",

           }
       }

    })


    .state("dashboard.createCompany",{
        url: "/createCompany",
        views : {
           "dashboard-Content": {
               templateUrl : "templates/company.html",

           }
       },

    })
     .state("dashboard.showCompany",{
        url:"/showCompany",
        views : {
            "dashboard-Content":{
                templateUrl : "templates/showCompany.html"
            }
        }

    })
    .state("dashboard.createUser",{
        url:"/createUser",
        views : {
            "dashboard-Content":{
                templateUrl : "templates/createUser.html"
            }
        }

    })
     .state("dashboard.getCompany",{
        url:"/getCompany",
        views : {
            "dashboard-Content":{
                templateUrl : "templates/getCompany.html"
            }
        }

    })
    .state("dashboard.salesman",{
        url:"/salesman",
        views : {
            "dashboard-Content":{
                templateUrl : "templates/salesman.html"
            }
        }

    })
    .state("dashboard.products",{
        url:"/products",
        views : {
            "dashboard-Content":{
                templateUrl : "templates/products.html",
                controller : "productsController",
            }
        }

    })
  .state("dashboard.notifications",{
    url:"/view_Notification",
    views : {
      "dashboard-Content":{
        templateUrl : "templates/notification/notification.html"
      }
    }

  })


    $urlRouterProvider.otherwise('/login')


 })

//  .factory("httpInterceptros",function(){
//      return{
//          request : function(config){
//              var firebaseToken = localStorage.getItem("firebaseToken");
//              if(firebaseToken){
//                  config.url = config.url + "?firebaseToekn=" + firebaseToken;
//              }
//              return config;
//          }
//      }
//  })
