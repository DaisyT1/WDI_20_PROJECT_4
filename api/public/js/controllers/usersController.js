angular.module('project4')
  .controller('UsersController', UsersController);

  UsersController.$inject = ["$http", "User"]
  function UsersController($http, User){

    var self = this;
    this.all = [];
    this.newUser = {};
    this.getUsers = getUsers;
    this.checkCookie = checkCookie;

  function getUsers(){
    $http
    .get("http://localhost:3000/users").then(function(response){
    self.all = response.data.users;
      // console.log(self)
      // console.log(self.all[0].locations[0])
    });
  }

  function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length,c.length);
          }
      }
      return "";
  }

  function checkCookie() {
    var user_id=getCookie("user_id");
    if (user_id!="" && user_id != null) {
          // alert("Yo " + user_id);
      return user_id;
      console.log(user_id)
    } else {

    }
  }

  // function checkIfAlreadyAUser(id){
  //   if (id IS NOT IN THE DB){
  //   $http.post("http://localhost:3000/users" , self.SOMETHING).then(function(response){
  //       self.newUser.push(SOMETHING);
  //       self.newUser = {};
  //       console.log(self)
  //     });
  //   }
  // }

  function currentUser(){

  }

  // checkCookie()
  getUsers();
}