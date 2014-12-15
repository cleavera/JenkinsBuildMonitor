(function (module) {
  module.factory('Persistance', ['Logging', '$window', function (Logging, $window) {
    var storage = $window.localStorage,
      subscribers = {
        all: [],
        keys: {}
      };

    !storage && Logging.Error("No storage defined", $window);

    var getSubList = function (key) {
      var subList = subscribers.all;
      if (key) {
        subList = subscribers.keys[key];
      }

      return subList || [];
    };

    var broadcast = function (key, value, oldValue) {
      var x,
        subList = getSubList(key).concat(getSubList());

      for (x = 0; x < subList.length; x++) {
        if (subList[x]) {
          subList[x](value, oldValue);
        }
      }
    };

    var save = function (key, value) {
      var oldValue = storage[key];
      storage[key] = JSON.stringify(value);
      broadcast(key, value, oldValue);
    };

    var get = function (key) {
      if (!storage[key]) {
        Logging.Info("No persistance data for " + key);
        return;
      }

      return JSON.parse(storage[key]);
    };

    var subscribe = function (key, callback) {
      if (!key) {
        return subscribers.all.push(callback);
      }

      if (!subscribers.keys[key]) {
        subscribers.keys[key] = [];
      }

      return subscribers.keys[key].push(callback);
    };

    var unsubscribe = function (index, key) {
      var subList = getSubList(key);
      subList[index] = null;
    };

    return {
      Get: get,
      Save: save,
      Subscribe: subscribe,
      Unsubscribe: unsubscribe
    };
  }]);
}(angular.module('monitor.shared.services')));