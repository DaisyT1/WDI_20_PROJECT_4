angular.module('project4')
  .controller('UsersController', UsersController);

  UsersController.$inject = ["$http", "User"]
  function UsersController($http, User){

    var self = this;
    this.all = [];
    this.getUsers = getUsers;
    this.hello = '3rgsDhGHZxZ9sB9DQWQfuf';
    console.log(this.hello)

  function getUsers(){
    $http
    .get("http://localhost:3000/users").then(function(response){
    self.all = response.data.users;
      console.log(self)
      console.log(self.all[0].locations[0])
    });
  }

  // User.query(function(data){
  //   self.all = data.users;
  // });

  getUsers();
}