(function (angular) {
  angular.module('monitor.shared.models', []);
  angular.module('monitor.shared.services', []);
  angular.module('monitor.shared', [
    'monitor.shared.models',
    'monitor.shared.services'
  ]);
  angular.module('monitor', []);
}(angular));