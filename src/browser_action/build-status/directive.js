(function (module) {
  module.directive('buildStatus', ['BuildModel', 'Persistance', function (BuildModel, Persistance) {
    function link(scope) {
      var x,
        model = {},
        subscribedStreams = Persistance.Get('SubscribedStreams') || [];

      var parseBuilds = function (data) {
        var blame = '';
        if (data.culprits[0]) {
          blame = data.culprits[0].fullName;
        }

        model[data.fullDisplayName] = {
          blame: blame.toLowerCase(),
          url: data.url,
          status: data.building ? 'building' : data.result === 'SUCCESS' ? 'success' : 'failure'
        };
      };

      var getBuildStatus = function (subscribedStreams) {
        for (x = 0; x < subscribedStreams.length; x++) {
          BuildModel.GetLast(subscribedStreams[x]).then(parseBuilds);
        }
      };

      getBuildStatus(subscribedStreams);
      Persistance.Subscribe('SubscribedStreams', getBuildStatus);

      scope.model = model;
    }

    return {
      link: link,
      scope: {},
      templateUrl: 'build-status/template.html'
    };
  }]);
}(angular.module('monitor.action')));