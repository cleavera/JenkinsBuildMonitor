(function (module) {
  module.factory('BuildNotificationService', ['MapperService', 'BuildResource', 'Persistance', 'BuildModel', function (map, BuildResource, Persistance, BuildModel) {
    var model = {},
      streams = Persistance.Get('SubscribedStreams') || [];

    var notifications = function (title, status, blame) {
      chrome.notifications.create('', {
        type: 'basic', 
        iconUrl: '/icons/' + status + '.png',
        title: 'Build '+ status, 
        message: title,
        contextMessage: blame
      }, function () {});
    };

    var parseBuilds = function (data) {
      var build,
        name = data.name;

      build = map(data, BuildModel);

      if(model[name] && model[name].status != build.status) {
        notifications(name, build.status, build.blame);
      }

      model[name] = build;
    };

    var getBuildStatus = function () {
      var x;

      for (x = 0; x < streams.length; x++) {
        BuildResource.GetLast(streams[x]).then(parseBuilds);
      }
    };

    return {
      Notifications: getBuildStatus
    };
  }]);
}(angular.module('monitor.background')));