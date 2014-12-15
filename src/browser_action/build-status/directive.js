(function (module) {
  module.directive('buildStatus', ['MapperService', 'BuildResource', 'Persistance', 'BuildModel', function (map, BuildResource, Persistance, BuildModel) {
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
        model[data.name] = map(data, BuildModel);
      };

      var getBuildStatus = function (subscribedStreams) {
        clearModel(subscribedStreams);

        for (x = 0; x < subscribedStreams.length; x++) {
          BuildResource.GetLast(subscribedStreams[x]).then(parseBuilds);
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