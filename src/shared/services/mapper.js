(function (ngModule) {
  'use strict';

  ngModule.factory('MapperService', [function () {
    return function (resource, viewModel) {
      var x,
        field,
        output = {},
        data = resource;

      for (x in viewModel.fields) {
        if (viewModel.fields.hasOwnProperty(x)) {
          field = viewModel.fields[x];

          if (!field.map) {
            field.map = x;
          }

          if (typeof (field.map) === 'function') {
            output[x] = field.map(data);
          } else if (data[field.map] !== undefined) {
            output[x] = data[field.map];
          }
        }
      }

      return output;
    };
  }]);
}(angular.module('monitor.shared.services')));
