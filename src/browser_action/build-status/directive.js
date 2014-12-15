(function (module) {
  module.directive('buildStatus', ['BuildModel', 'Persistance', function (BuildModel, Persistance) {
    function link(scope) {
      var x,
        model = {},
        subscribedStreams = Persistance.Get('SubscribedStreams') || [];

      var clearModel = function (subscribedStreams) {
        var stream;

        for (stream in model) {
          if (model.hasOwnProperty(stream) && subscribedStreams.indexOf(stream) === -1) {
            delete model[stream];
          }
        }
      };

      var parseBuilds = function (data) {
        var blame = '';
        if (data.culprits[0]) {
          blame = data.culprits[0].fullName;
        }

        model[data.name] = {
          blame: blame.toLowerCase(),
          url: data.url,
          status: data.building ? 'building' : data.result === 'SUCCESS' ? 'success' : 'failure',
          number: data.number
        };
      };

      var getBuildStatus = function (subscribedStreams) {
        clearModel(subscribedStreams);

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