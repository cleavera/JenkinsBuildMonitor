(function (module) {
  module.directive('serverConfig', ['Persistance', function (Persistance) {
    function link(scope) {
      var server = Persistance.Get('Server') || '';

      scope.model = server;

      scope.$watch('model', function(value){
        Persistance.Save('Server', value);
      });
    }

    return {
      link: link,
      scope: {},
      templateUrl: 'server-config/template.html'
    };
  }]);
}(angular.module('monitor.action')));