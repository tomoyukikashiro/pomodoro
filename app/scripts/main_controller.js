(function() {
  'use strict';
  angular
    .module('pomodoro')
    .controller('MainController', MainController);

  function MainController(Timer, Audio) {
    var self = this;
    self.clock = {remaining: {}};
    self.alertSould = new Audio('audio/alert.aac');

    self.toggle = function() {
      if (self.clock.isCounting) {
        self.clock.pause();
      } else {
        self.clock.start();
      }
    };
    self.setTargetMins = function($event, mins) {
      mins = angular.isNumber($event) ? $event : mins;
      if (self.clock.isCounting) {
        self.clock.destroy();
      }
      self.clock = new Timer.Clock(mins, {
        onEnd: self.alertSould.play.bind(self.alertSould)
      });
      if (!angular.isNumber($event)) {
        $event.stopPropagation();
      }
    };
    self.setTargetMins(25);
  }
})();
