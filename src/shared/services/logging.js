(function (module) {
  module.factory('Logging', [function () {
    var x = 0;

    var logLevel = 0;

    var info = function () {
      if (logLevel > 0) {
        return;
      }

      for (x = 0; x < arguments.length; x++) {
        console.info(arguments[x]);
      }
    };

    var debug = function () {
      if (logLevel > 1) {
        return;
      }

      for (x = 0; x < arguments.length; x++) {
        console.debug(arguments[x]);
      }
    };

    var warn = function () {
      if (logLevel > 2) {
        return;
      }

      for (x = 0; x < arguments.length; x++) {
        console.warn(arguments[x]);
      }
    };

    var error = function () {
      if (logLevel > 3) {
        return;
      }

      for (x = 0; x < arguments.length; x++) {
        console.error(arguments[x]);
      }
    };

    var fatal = function () {
      if (logLevel > 4) {
        return;
      }

      for (x = 0; x < arguments.length; x++) {
        console.error("Fatal: " + arguments[x]);
      }
    };

    return {
      LogLevel: logLevel,
      Info: info,
      Debug: debug,
      Warn: warn,
      Error: error,
      Fatal: fatal
    };
  }]);
}(angular.module('monitor.shared.services')));