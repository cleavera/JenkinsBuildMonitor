(function (module) {
  module.factory('StreamModel', ['$http', function ($http) {
    return {
      Get: function () {
        return $http.get('http://msl-svr222:8081/api/json');
      }
    };
  }]);
}(angular.module('monitor.shared.models')));