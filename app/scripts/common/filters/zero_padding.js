(function() {
  'use strict';
  angular
    .module('pomodoro.common')
    .filter('pad', function() {
      return function(val) {
        return val < 10 ? '0' + val : val;
      };
    });
})();
