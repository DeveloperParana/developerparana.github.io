angular
  .module('AppController', [])
  .controller('AppController', AppController)

  AppController.$inject = ['AppService']

  function AppController(AppService) {
    var vm = this

    AppService
      .retrievePosts()
      .then(data => {
        vm.posts = data.data.data
      })

    AppService
      .retrieveEvents()
      .then(data => {
        vm.events = data.data.data
      })
  }
