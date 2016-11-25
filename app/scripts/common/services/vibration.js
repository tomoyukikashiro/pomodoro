(function() {
  'use strict';

  var vibrate = window.navigator.vibrate;
  var canVibrate = Boolean(vibrate);

  angular
    .module('pomodoro.common')
    .factory('Vibration', function() {
      function Vibration(rhythm) {
        self.rhythm = rhythm;
      }
      Vibration.vibrate = function() {
        if (canVibrate) {
          vibrate(self.rhythm);
        }
      };
      return Vibration;
    });
})();
