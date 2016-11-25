(function() {
  'use strict';
  angular
    .module('pomodoro')
    .controller('MainController', MainController);

  function MainController(Timer, Audio, Vibration) {
    var self = this;
    self.vibrations = {
      workEnd: new Vibration([200, 200, 2000]),
      restEnd: new Vibration([3000])
    };
    self.clock = {remaining: {}};
    self.settings = {
      workMins: 25,
      restMins: 5
    };
    self.alertSould = new Audio('audio/alert.aac');

    self.toggle = function() {
      if (self.clock.isEnd) {
        return;
      }
      if (self.clock.isCounting) {
        self.clock.pause();
      } else {
        self.clock.start();
      }
    };
    self.changeTargetMins = function(isWork, value) {
      var targetName = isWork ? 'workMins' : 'restMins';
      if (self.settings[targetName] + value > 0) {
        self.settings[targetName] += value;
        self.setTargetMins(isWork, self.settings[targetName]);
      }
    };
    self.setTargetMins = function(isWork, mins) {
      var vibration = isWork ? self.vibrations.workEnd : self.vibrations.restEnd;
      if (self.clock.isCounting) {
        self.clock.destroy();
      }
      self.clock = new Timer.Clock(mins, {
        onEnd: function() {
          self.alertSould.play();
          vibration();
        }
      });
    };
    self.setTargetMins(true, self.settings.workMins);
  }
})();
