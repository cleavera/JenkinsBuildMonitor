(function (module) {
  module.factory('backgroundService', ['BuildModel', 'Persistance', function (BuildModel, Persistance) {
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
        blame = '',
        name = data.name;

      if (data.culprits[0]) {
        blame = data.culprits[0].fullName;
      }

      build = {
        blame: blame.toLowerCase(),
        url: data.url,
        status: data.building ? 'started' : data.result === 'SUCCESS' ? 'succeeded' : 'failed'
      };

      if(model[name] && model[name].status != build.status) {
        notifications(name, build.status, build.blame);
      }

      model[name] = build;
    };

    var getBuildStatus = function () {
      var x;

      for (x = 0; x < streams.length; x++) {
        BuildModel.GetLast(streams[x]).then(parseBuilds);
      }
    };

    return {
      notifications: getBuildStatus
    };
  }]);

  module.run(['$timeout', 'backgroundService', function ($timeout, backgroundService) {
    var go = function () {
      $timeout(function () {
        backgroundService.notifications();
        go();
      }, 10000);
    };

    go();
  }]);
}(angular.module('monitor.background')));