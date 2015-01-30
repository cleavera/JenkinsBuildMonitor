(function (module) {
  module.factory('BuildResource', ['$http', 'Persistance', function ($http, Persistance) {
  	var get = function (stream, build) {
      var server = Persistance.Get('server');
      
	    return $http.get(server + '/job/'+ stream +'/'+ build +'/api/json').then(function (response) {
        return extractBuildName(response.data);
      });
	  };

    var getAll = function (stream) {
      var server = Persistance.Get('server');

      return $http.get(server + '/job/'+ stream +'/api/json').then(function (response) {
        return extractBuildName(response.data);
      });
    };

    var getLast = function (stream) {
      return get(stream, 'lastBuild')
    };

    var extractBuildName = function (data) {
      var fullname = data.fullDisplayName.toString();
      data.name = fullname.substring(0, fullname.indexOf('#') - 1);
      return data;
    };

    return {
      Get: get,
      GetAll: getAll,
      GetLast: getLast
    };
  }]);
}(angular.module('monitor.shared.models')));