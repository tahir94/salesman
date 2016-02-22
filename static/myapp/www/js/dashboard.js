var app = angular.module("starter");
app.constant("firebaseRef", "https://abc12345.firebaseio.com");
app.controller("dashboardController", function ($interval, $location, firebaseRef, $scope, $state, $q, $http, $rootScope, $firebaseArray) {

  var token = localStorage.getItem("firebaseToken");
  firebaseRef = new Firebase(firebaseRef);
  $scope.notifications = $firebaseArray(firebaseRef.child(token));

  $scope.showNotification = function (notification) {
    $scope.notification = notification;
    $scope.saveNotification();
    $state.go("dashboard.notifications")
  };
  $scope.saveNotification = function () {
    if ($scope.notifications.length) {
      angular.forEach($scope.notifications, function (val) {
        $http.post("/addOrders", val).then(function (success) {
          $scope.notifications.$remove(val);
        }, function (error) {
          console.log(error)
        })
      });
    }
    $http.get("/getOrders/" + token).then(function (success) {
      $scope.mongoNotifications = success.data;
      console.log(success)
    }, function (error) {
      console.log(error)
    })
  };
  $scope.saveNotification();

  /*

   $scope.positions = [{
   lat: 43.07493,
   lng: -89.381388
   }];

   $scope.$on('mapInitialized', function(event, map) {
   $scope.map = map;
   });

   $scope.centerOnMe= function(){
   $scope.positions = [];


   $ionicLoading.show({
   template: 'Loading...'
   });


   navigator.geolocation.getCurrentPosition(function(position) {
   var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   $scope.positions.push({lat: pos.k,lng: pos.B});
   console.log(pos);
   $scope.map.setCenter(pos);
   $ionicLoading.hide();
   });

   };
   */


  $scope.isLoggedIn = true;
  $scope.abc = false;

  $scope.signOut = function () {
    localStorage.removeItem("firebaseToken");
    $state.go("login")
  };


  $http.get("getCompany/" + token).then(function (data) {

      console.log('my data is ', data);
      $scope.abc = true;

      if (data.data == "") {
        $state.go("dashboard.createCompany");
      }
      else {
        $state.go("dashboard.showCompany");
      }

      $scope.getData = data.data;


      //     console.log("hello to get company",$rootScope.getData);

      //     $scope.showCompany = data
      //     console.log("show company!! " +$scope.showCompany)
    }, function (err) {

      console.log(err)
    }
  )


  $scope.addCompany = function (comData) {
    comData.firebaseToken = token;
    $http.post("/createCompany", comData)

      .then(function (data) {
        console.log(comData, token)
        console.log(data)
        console.log(data.data)
        $scope.companyData = data.data.companyName;
        //   data.$loaded(function(){
        //       console.log(data.companyName)
        //   })


      }, function (err) {
        console.log("Error : ", err)
      })


    $state.go("dashboard.showCompany");


    //$scope.company = $scope.companyData;
    // $http.get("/showCompany").then(function(datas){
    //     console.log(datas)

    // },function(err){
    //     console.log(err)
    // })


  }


// $http.get("/showCompany").then(function(data){
//
//     if(data){
//         console.log(data)
//     }
//
// },function(error){
//     console.log(error)
// })

  $scope.saleman = {firebaseToken: token};


  $scope.submitUser = function (saleman) {
    console.log(saleman);
    $http.post("/salesman", saleman)
      .then(function (success) {
        console.log(success);
      }, function (err) {
        console.log(err);
      });

    $state.go("dashboard.showCompany")
  };

  $scope.showSalesman = function () {
    $http.get("/getSalesman/" + token).then(function (data) {
      $scope.showData = data.data;
      console.log("data getting successfully ", data);
    }, function (error) {
      console.log("can't get data ", error);
    })

  };


  // $scope.isUser = true;


});









