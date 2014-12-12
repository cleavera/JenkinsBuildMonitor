(function (module) {
  module.directive('streamList', ['StreamModel', 'Persistance', function (StreamModel, Persistance) {
    function link(scope) {
      var x,
        subscribed = Persistance.Get('SubscribedStreams') || [],
        streams = StreamModel.Get().then(function (response) {
          var streams = response.data.jobs;
          assignModel(streams);
          return streams;
        });

      scope.model = {};

      var assignModel = function(streams){
        for(x = 0; x < streams.length; x++){
          if(subscribed.indexOf(streams[x].name) > -1){
            scope.model[streams[x].name] = true;
          } else {
            scope.model[streams[x].name] = false;
          }
        }
      };

      scope.$watch('model', function(value){
        var arr = [];

        for(var key in value){
          if(value[key] === true){
            arr.push(key);
          }
        }

        Persistance.Save('SubscribedStreams', arr);
      }, true);
    }

    return {
      link: link,
      scope: {},
      templateUrl: 'stream-list/template.html'
    };
  }]);
}(angular.module('monitor.action')));