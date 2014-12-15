(function (ngModule) {
  'use strict';

  ngModule.value('BuildModel', {
    fields: {
      blame: {
        map: function (data) {
          var blame = '';
          if (data.culprits[0]) {
            blame = data.culprits[0].fullName;
          }

          return blame.toLowerCase();
        }
      },

      url: {
        map: 'url'
      },

      number: {
        map: 'number'
      },

      status: {
        map: function (data) {
          return data.building ? 'started' : data.result === 'SUCCESS' ? 'succeeded' : 'failed';
        }
      }
    }
  });
}(angular.module('monitor.shared.models')));
