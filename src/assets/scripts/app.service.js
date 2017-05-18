angular
  .module('AppService', [])
  .service('AppService', AppService)

  function AppService($http) {
    var vm = this
    var uri = 'https://devparana.stamplayapp.com/api/cobject/v1'

    vm.retrieveEvents = retrieveEvents
    vm.retrievePosts = retrievePosts

    function retrieveEvents() {
      return $http({
        url: `${uri}/events`,
        method: 'GET'
      })
    }

    function retrievePosts() {
      return $http({
        url: `${uri}/posts`,
        method: 'GET'
      })
    }
  }
