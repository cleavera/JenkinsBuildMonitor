(function (module) {
  module.factory('StreamResource', ['$http', 'Persistance', function ($http, Persistance) {
    return {
      Get: function () {
      	var server = Persistance.Get('server');

        return $http.get(server + '/api/json');
      }
    };
  }]);
}(angular.module('monitor.shared.models')));