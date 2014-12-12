(function (module) {
  module.factory('BuildModel', ['$http', function ($http) {
  	var get = function (stream, build) {
	    return $http.get('http://msl-svr222:8081/job/'+ stream +'/'+ build +'/api/json').then(function (response) {
        return extractBuildName(response.data);
      });
	  };

    var getAll = function (stream) {
      return $http.get('http://msl-svr222:8081/job/'+ stream +'/api/json').then(function (response) {
        return extractBuildName(response.data);
      });
    };

    var getLast = function (stream) {
      return get(stream, 'lastBuild')
    };

    var extractBuildName = function (data) {
      var fullname = data.fullDisplayName.toString();
      data.name = fullname.substring(0, fullname.indexOf('#'));
      return data;
    };

    return {
      Get: get,
      GetAll: getAll,
      GetLast: getLast
    };
  }]);
}(angular.module('monitor.shared.models')));