(function (module) {
  module.run(['$timeout', 'BuildNotificationService', function ($timeout, BuildNotificationService) {
    var go = function () {
      $timeout(function () {
        BuildNotificationService.Notifications();
        go();
      }, 10000);
    };

    go();
  }]);
}(angular.module('monitor.background')));