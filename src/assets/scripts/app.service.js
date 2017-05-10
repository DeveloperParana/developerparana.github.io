angular
  .module('AppService', [])
  .controller('AppService', AppService)

  AppService.$inject = ['$http']

  function AppService($http) {
    var vm = this
    var uri = ''

    vm.retrieveEvents = retrieveEvents

    function retrieveEvents() {
      return $http({

      })
    }
  }
